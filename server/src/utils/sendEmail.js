import nodemailer from 'nodemailer';

const createTransporter = () => {
  console.log('Creating email transporter with config:', {
    user: process.env.EMAIL_USER ? 'configured' : 'missing',
    pass: process.env.EMAIL_PASS ? 'configured' : 'missing'
  });
  
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error('Email credentials missing in environment variables');
    return null;
  }
  
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

export const sendResetCodeEmail = async (email, resetCode) => {
  try {
    console.log(`Attempting to send email to: ${email}`);
    
    const transporter = createTransporter();
    if (!transporter) {
      console.error('Failed to create email transporter');
      return false;
    }
    
    // Verify connection
    await transporter.verify();
    console.log('Email transporter verified successfully');
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset Code - SAI TRADER Admin',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">SAI TRADER Admin</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Password Reset</p>
          </div>
          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e0e0e0;">
            <p style="color: #333; font-size: 16px; line-height: 1.6;">You requested a password reset for your admin account. Use the following 6-digit code to reset your password:</p>
            <div style="background: white; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0; border: 2px solid #667eea;">
              <span style="font-size: 32px; font-weight: bold; color: #667eea; letter-spacing: 5px;">${resetCode}</span>
            </div>
            <p style="color: #666; font-size: 14px; line-height: 1.6;">This code will expire in 15 minutes. If you didn't request this, please ignore this email.</p>
            <p style="color: #666; font-size: 14px; margin-top: 20px;">For security reasons, please do not share this code with anyone.</p>
          </div>
          <div style="text-align: center; margin-top: 20px; color: #999; font-size: 12px;">
            <p>© 2024 SAI TRADER. All rights reserved.</p>
          </div>
        </div>
      `
    };
    
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending email:', error.message);
    console.error('Full error details:', error);
    return false;
  }
};
