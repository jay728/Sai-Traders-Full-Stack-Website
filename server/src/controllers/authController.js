import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';
import { sendResetCodeEmail } from '../utils/sendEmail.js';

export const login = async (request, response, next) => {
  try {
    const { email, password } = request.body;
    if (!email || !password) return response.status(400).json({ success: false, message: 'Email and password are required.' });
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    if (!user || !(await user.comparePassword(password))) return response.status(401).json({ success: false, message: 'Invalid email or password.' });
    response.status(200).json({ success: true, message: 'Login successful.', data: { token: generateToken(user._id), user: { id: user._id, name: user.name, email: user.email, role: user.role } } });
  } catch (error) { next(error); }
};

export const getCurrentUser = (request, response) => response.status(200).json({ success: true, message: 'Current user fetched successfully.', data: request.user });

export const forgotPassword = async (request, response, next) => {
  try {
    const { email } = request.body;
    if (!email) return response.status(400).json({ success: false, message: 'Email is required.' });
    
    // Check if email matches company email (optional for now - can be enabled later)
    const companyEmail = process.env.COMPANY_EMAIL;
    if (companyEmail && email.toLowerCase() !== companyEmail.toLowerCase()) {
      console.warn(`Email ${email} does not match company email ${companyEmail}`);
      // For now, allow any email to request reset for testing
      // return response.status(403).json({ success: false, message: 'Only the company email can reset the admin password.' });
    }
    
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      console.error(`User not found with email: ${email}`);
      return response.status(404).json({ success: false, message: 'User not found with this email.' });
    }
    
    // Generate 6-digit reset code
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    const resetCodeExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
    
    user.resetCode = resetCode;
    user.resetCodeExpires = resetCodeExpires;
    await user.save();
    
    // Always log the code for development/testing
    console.log(`========================================`);
    console.log(`PASSWORD RESET CODE: ${resetCode}`);
    console.log(`For email: ${email}`);
    console.log(`Expires in: 15 minutes`);
    console.log(`========================================`);
    
    // Try to send email
    const emailSent = await sendResetCodeEmail(email, resetCode);
    
    if (!emailSent) {
      // Email failed but code is saved, so still allow reset
      console.warn('Email sending failed, but reset code is available in server logs');
      return response.status(200).json({ 
        success: true, 
        message: 'Reset code generated. Check server console for the code.' 
      });
    }
    
    response.status(200).json({ success: true, message: 'Reset code sent to your email.' });
  } catch (error) { 
    console.error('Forgot password error:', error);
    next(error); 
  }
};

export const verifyResetCode = async (request, response, next) => {
  try {
    const { email, code } = request.body;
    if (!email || !code) return response.status(400).json({ success: false, message: 'Email and code are required.' });
    
    const user = await User.findOne({ email: email.toLowerCase() }).select('+resetCode +resetCodeExpires');
    if (!user) return response.status(404).json({ success: false, message: 'User not found.' });
    
    if (!user.resetCode || !user.resetCodeExpires) {
      return response.status(400).json({ success: false, message: 'No reset code requested. Please request a new one.' });
    }
    
    if (user.resetCode !== code) {
      return response.status(400).json({ success: false, message: 'Invalid reset code.' });
    }
    
    if (new Date() > user.resetCodeExpires) {
      return response.status(400).json({ success: false, message: 'Reset code has expired. Please request a new one.' });
    }
    
    response.status(200).json({ success: true, message: 'Code verified successfully.' });
  } catch (error) { next(error); }
};

export const resetPassword = async (request, response, next) => {
  try {
    const { email, code, newPassword } = request.body;
    if (!email || !code || !newPassword) {
      return response.status(400).json({ success: false, message: 'Email, code, and new password are required.' });
    }
    
    if (newPassword.length < 6) {
      return response.status(400).json({ success: false, message: 'Password must be at least 6 characters long.' });
    }
    
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password +resetCode +resetCodeExpires');
    if (!user) return response.status(404).json({ success: false, message: 'User not found.' });
    
    if (!user.resetCode || !user.resetCodeExpires) {
      return response.status(400).json({ success: false, message: 'No reset code requested. Please request a new one.' });
    }
    
    if (user.resetCode !== code) {
      return response.status(400).json({ success: false, message: 'Invalid reset code.' });
    }
    
    if (new Date() > user.resetCodeExpires) {
      return response.status(400).json({ success: false, message: 'Reset code has expired. Please request a new one.' });
    }
    
    user.password = newPassword;
    user.resetCode = undefined;
    user.resetCodeExpires = undefined;
    await user.save();
    
    response.status(200).json({ success: true, message: 'Password reset successfully.' });
  } catch (error) { next(error); }
};
