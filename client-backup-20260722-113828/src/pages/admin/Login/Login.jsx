import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

function Login() {
  const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [error, setError] = useState(''); const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, isAuthenticated } = useAuth(); const navigate = useNavigate();
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
  return <main className="relative grid min-h-screen place-items-center overflow-hidden bg-slate-950 px-4"><div className="absolute -left-20 top-[-7rem] h-80 w-80 rounded-full border-[30px] border-blue-500/20" /><div className="absolute -bottom-28 -right-12 h-80 w-80 rounded-full bg-orange-500/15 blur-3xl" /><section className="relative w-full max-w-md rounded-3xl border border-white/10 bg-white p-7 shadow-2xl sm:p-9"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-700 text-xl font-black text-white">S</div><p className="mt-6 text-xs font-extrabold uppercase tracking-[.18em] text-orange-600">SAI TRADER ADMIN</p><h1 className="mt-2 text-3xl font-extrabold text-slate-950">Welcome back.</h1><p className="mt-2 text-sm leading-6 text-slate-600">Log in securely to manage your website content and customer inquiries.</p><form className="mt-8 space-y-5" onSubmit={handleSubmit}><label className="block text-sm font-bold text-slate-700">Email<input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100" /></label><label className="block text-sm font-bold text-slate-700">Password<input required type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100" /></label>{error && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p>}<button disabled={isSubmitting} className="w-full rounded-xl bg-orange-500 px-5 py-3.5 text-sm font-extrabold text-white shadow-sm transition hover:bg-orange-600 disabled:opacity-60">{isSubmitting ? 'Logging in...' : 'Login to Admin Panel'}</button></form></section></main>;
}
export default Login;
