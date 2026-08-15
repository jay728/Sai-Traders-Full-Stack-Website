import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { forgotPassword, verifyResetCode, resetPassword } from '../../../services/authService';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetStep, setResetStep] = useState('email'); // email, code, reset
  const [resetEmail, setResetEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetMessage, setResetMessage] = useState('');
  
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  if (isAuthenticated) return <Navigate to="/admin" replace />;

  const handleSubmit = async (event) => { 
    event.preventDefault(); 
    setError(''); 
    setIsSubmitting(true); 
    try { 
      await login({ email, password }); 
      navigate('/admin'); 
    } catch (requestError) {
      console.error('Login error:', requestError);
      if (requestError.response) {
        setError(requestError.response.data?.message || requestError.response.statusText || 'Unable to log in.');
      } else if (requestError.request) {
        setError('Server is not responding. Please check if the backend is running.');
      } else {
        setError('Unable to log in. Please check your connection.');
      }
    } finally { 
      setIsSubmitting(false); 
    } 
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError('');
    setResetMessage('');
    setIsSubmitting(true);
    try {
      console.log('Sending forgot password request for:', resetEmail);
      const response = await forgotPassword(resetEmail);
      console.log('Forgot password response:', response.data);
      setResetMessage(response.data.message || 'Reset code sent to your email. Please check your inbox.');
      setResetStep('code');
    } catch (err) {
      console.error('Forgot password error:', err);
      console.error('Error response:', err.response?.data);
      setError(err.response?.data?.message || 'Failed to send reset code. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setError('');
    setResetMessage('');
    setIsSubmitting(true);
    try {
      await verifyResetCode(resetEmail, resetCode);
      setResetMessage('Code verified successfully. Please enter your new password.');
      setResetStep('reset');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid or expired code. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setResetMessage('');
    
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    
    setIsSubmitting(true);
    try {
      await resetPassword(resetEmail, resetCode, newPassword);
      setResetMessage('Password reset successfully. You can now login with your new password.');
      setTimeout(() => {
        setShowForgotPassword(false);
        setResetStep('email');
        setResetEmail('');
        setResetCode('');
        setNewPassword('');
        setConfirmPassword('');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reset password. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToLogin = () => {
    setShowForgotPassword(false);
    setResetStep('email');
    setResetEmail('');
    setResetCode('');
    setNewPassword('');
    setConfirmPassword('');
    setError('');
    setResetMessage('');
  };
  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden bg-slate-950 px-4">
      <div className="absolute -left-20 top-[-7rem] h-80 w-80 rounded-full border-[30px] border-blue-500/20" />
      <div className="absolute -bottom-28 -right-12 h-80 w-80 rounded-full bg-orange-500/15 blur-3xl" />
      
      <section className="relative w-full max-w-md rounded-3xl border border-white/10 bg-white p-7 shadow-2xl sm:p-9">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-700 text-xl font-black text-white">
          S
        </div>
        <p className="mt-6 text-xs font-extrabold uppercase tracking-[.18em] text-orange-600">
          SAI TRADER ADMIN
        </p>
        
        {!showForgotPassword ? (
          <>
            <h1 className="mt-2 text-3xl font-extrabold text-slate-950">Welcome back.</h1>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Log in securely to manage your website content and customer inquiries.
            </p>
            
            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              <label className="block text-sm font-bold text-slate-700">
                Email
                <input 
                  required 
                  type="email" 
                  value={email} 
                  onChange={(event) => setEmail(event.target.value)} 
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100" 
                />
              </label>
              <label className="block text-sm font-bold text-slate-700">
                Password
                <input 
                  required 
                  type="password" 
                  value={password} 
                  onChange={(event) => setPassword(event.target.value)} 
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100" 
                />
              </label>
              {error && (
                <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                  {error}
                </p>
              )}
              <button 
                disabled={isSubmitting} 
                className="w-full rounded-xl bg-orange-500 px-5 py-3.5 text-sm font-extrabold text-white shadow-sm transition hover:bg-orange-600 disabled:opacity-60"
              >
                {isSubmitting ? 'Logging in...' : 'Login to Admin Panel'}
              </button>
            </form>
            
            <button 
              onClick={() => setShowForgotPassword(true)}
              className="mt-4 w-full text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              Forgot your password?
            </button>
          </>
        ) : (
          <>
            <h1 className="mt-2 text-3xl font-extrabold text-slate-950">
              {resetStep === 'email' ? 'Reset Password' : resetStep === 'code' ? 'Verify Code' : 'New Password'}
            </h1>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {resetStep === 'email' 
                ? 'Enter your email to receive a password reset code.'
                : resetStep === 'code'
                ? 'Enter the 6-digit code sent to your email.'
                : 'Create a new password for your account.'}
            </p>
            
            {resetMessage && (
              <div className="mt-4 rounded-xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
                {resetMessage}
              </div>
            )}
            
            {error && (
              <p role="alert" className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                {error}
              </p>
            )}
            
            <form className="mt-6 space-y-5" onSubmit={
              resetStep === 'email' ? handleForgotPassword :
              resetStep === 'code' ? handleVerifyCode :
              handleResetPassword
            }>
              {resetStep === 'email' && (
                <label className="block text-sm font-bold text-slate-700">
                  Email Address
                  <input 
                    required 
                    type="email" 
                    value={resetEmail} 
                    onChange={(e) => setResetEmail(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100" 
                  />
                </label>
              )}
              
              {resetStep === 'code' && (
                <label className="block text-sm font-bold text-slate-700">
                  Reset Code
                  <input 
                    required 
                    type="text" 
                    maxLength={6}
                    value={resetCode} 
                    onChange={(e) => setResetCode(e.target.value)}
                    placeholder="123456"
                    className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-center text-2xl tracking-widest" 
                  />
                </label>
              )}
              
              {resetStep === 'reset' && (
                <>
                  <label className="block text-sm font-bold text-slate-700">
                    New Password
                    <input 
                      required 
                      type="password" 
                      value={newPassword} 
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100" 
                    />
                  </label>
                  <label className="block text-sm font-bold text-slate-700">
                    Confirm New Password
                    <input 
                      required 
                      type="password" 
                      value={confirmPassword} 
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100" 
                    />
                  </label>
                </>
              )}
              
              <button 
                disabled={isSubmitting} 
                className="w-full rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-extrabold text-white shadow-sm transition hover:bg-blue-700 disabled:opacity-60"
              >
                {isSubmitting 
                  ? 'Processing...' 
                  : resetStep === 'email' 
                  ? 'Send Reset Code' 
                  : resetStep === 'code' 
                  ? 'Verify Code' 
                  : 'Reset Password'}
              </button>
            </form>
            
            <button 
              onClick={handleBackToLogin}
              className="mt-4 w-full text-sm font-semibold text-slate-600 hover:text-slate-700 transition-colors"
            >
              ← Back to Login
            </button>
          </>
        )}
      </section>
    </main>
  );
}
export default Login;
