import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Background } from './Background';  

export default function Auth({ setView }: { setView: (view: 'dashboard' | 'account') => void }) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authView, setAuthView] = useState('signIn'); // 'signIn' or 'signUp'
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      setView('dashboard');
    } catch (error: any) {
      setError(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      setMessage('Check your email for confirmation!');
    } catch (error: any) {
      setError(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  const signInWithProvider = async (provider: 'google' | 'github' | 'facebook') => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
    });
    if (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <Background />
      <div className="w-full max-w-sm p-8 space-y-6 bg-white/50 rounded-lg shadow-xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">{authView === 'signIn' ? 'Welcome Back' : 'Create an Account'}</h1>
          <p className="text-gray-500">{authView === 'signIn' ? 'Sign in to access your resources' : 'Join us and start discovering'}</p>
        </div>
        
        <form onSubmit={authView === 'signIn' ? handleLogin : handleSignUp} className="space-y-4">
          <div>
            <input
              className="w-full px-4 py-3 text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="relative">
            <input
              className="w-full px-4 py-3 text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
              type={showPassword ? 'text' : 'password'}
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 px-4 py-3 text-gray-500">
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}
          {message && <p className="text-sm text-green-600">{message}</p>}

          <button 
            className={`w-full px-4 py-3 font-bold text-white rounded-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 ${authView === 'signIn' ? 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500' : 'bg-green-600 hover:bg-green-700 focus:ring-green-500'}`}
            disabled={loading}
          >
            {loading ? <span>Loading...</span> : <span>{authView === 'signIn' ? 'Sign In' : 'Sign Up'}</span>}
          </button>
        </form>

        <div className="text-center">
          <button 
            onClick={() => setAuthView(authView === 'signIn' ? 'signUp' : 'signIn')}
            className="text-sm text-blue-600 hover:underline"
          >
            {authView === 'signIn' ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
          </button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2  text-gray-500">Or continue with</span>
          </div>
        </div>

        <div className="flex justify-center space-x-4">
  {/* Google */}
  <button
    onClick={() => signInWithProvider('google')}
    className="p-3 rounded-full border border-gray-300 bg-white hover:bg-gray-50 transition-all transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
    disabled={loading}
  >
    <svg className="w-6 h-6" viewBox="0 0 48 48">
      <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
      <path fill="#FF3D00" d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"/>
      <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
      <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.012 35.245 44 30.028 44 24c0-1.341-.138-2.65-.389-3.917z"/>
    </svg>
  </button>

  {/* GitHub */}
  <button
    onClick={() => signInWithProvider('github')}
    className="p-3 rounded-full bg-[#24292F] hover:bg-black transition-all transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
    disabled={loading}
  >
    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.2-1.2-1.5-1.2-1.5-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 .1.7 2 3.7 1.4.1-.8.4-1.4.7-1.7-2.6-.3-5.3-1.3-5.3-5.9 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.7.8 1.2 1.8 1.2 3.1 0 4.6-2.7 5.6-5.3 5.9.4.4.8 1 .8 2v3c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.65 18.35.5 12 .5Z"/>
    </svg>
  </button>

  {/* Facebook */}
  <button
    onClick={() => signInWithProvider('facebook')}
    className="p-3 rounded-full bg-[#1877F2] hover:bg-blue-700 transition-all transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    disabled={loading}
  >
    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.675 0H1.325C.6 0 0 .6 0 1.325v21.35C0 23.4.6 24 1.325 24h11.495v-9.3H9.7V11h3.12V8.4c0-3.1 1.9-4.8 4.6-4.8 1.3 0 2.5.1 2.8.1v3.3h-1.9c-1.5 0-1.9.7-1.9 1.8V11h3.3l-.4 3.7h-2.9V24h5.7C23.4 24 24 23.4 24 22.675V1.325C24 .6 23.4 0 22.675 0Z"/>
    </svg>
  </button>
</div>


      </div>
    </div>
  );
}
