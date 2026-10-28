import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, User, ShieldCheck } from 'lucide-react';

type ViewType = 'login' | 'register' | 'forgot' | 'check-email' | 'reset-password' | 'verify';

export default function Auth() {
  const [view, setView] = useState<ViewType>('login');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  const InputField = ({ type, placeholder, icon: Icon }: any) => {
    const [show, setShow] = useState(false);
    const inputType = type === 'password' && show ? 'text' : type;
    
    return (
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400" />
        </div>
        <input 
          type={inputType} 
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
        />
        {type === 'password' && (
          <div 
            onClick={() => setShow(!show)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer hover:text-blue-600"
          >
            <Eye className="h-5 w-5 text-gray-400 hover:text-blue-600" />
          </div>
        )}
      </div>
    );
  };

  const GoogleButton = ({ text, onClick }: { text: string, onClick?: () => void }) => (
    <button type="button" onClick={onClick} className="w-full flex items-center justify-center gap-3 border border-gray-400 rounded-md py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
      {text}
    </button>
  );

  const LoginScreen = () => (
    <div className="w-full">
      <div className="flex items-center gap-3 mb-8">
        <ShieldCheck className="h-10 w-10 text-blue-800" />
        <div>
          <h1 className="text-xl font-bold text-blue-900 leading-tight">CFTS</h1>
          <p className="text-xs font-semibold text-blue-700 tracking-wider">INTELLIGENCE</p>
        </div>
      </div>
      <h2 className="text-3xl font-bold text-blue-900 mb-2">Sign in</h2>
      <p className="text-gray-500 text-sm mb-8">Log in by entering your email address and password.</p>

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1.5">Email address</label>
          <InputField type="email" placeholder="email@address.com" icon={Mail} />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1.5">Password</label>
          <InputField type="password" placeholder="••••••••••••" icon={Lock} />
        </div>
        <div className="flex justify-start">
          <button type="button" onClick={() => setView('forgot')} className="text-sm text-gray-600 hover:text-blue-600 hover:underline">
            Forgot password?
          </button>
        </div>
        
        <button type="submit" className="w-full bg-[#0a2a5c] text-white rounded-md py-3 font-semibold hover:bg-blue-900 transition-colors">
          Log in
        </button>

        <div className="flex items-center gap-3 py-2 cursor-pointer" onClick={() => setRememberMe(!rememberMe)}>
          <div className={`relative inline-flex h-5 w-10 shrink-0 items-center rounded-full transition-colors ${rememberMe ? 'bg-blue-600' : 'bg-gray-200'}`}>
            <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition ${rememberMe ? 'translate-x-5' : 'translate-x-1'}`}></span>
          </div>
          <span className="text-sm text-gray-600">Remember me</span>
        </div>

        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink-0 mx-4 text-gray-400 text-sm">Or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <GoogleButton text="Sign in with Google" onClick={() => navigate('/dashboard')} />

        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account? <button type="button" onClick={() => setView('register')} className="text-blue-800 font-semibold hover:underline">Sign up here</button>
        </p>
      </form>
    </div>
  );

  const RegisterScreen = () => (
    <div className="w-full">
      <div className="flex items-center gap-3 mb-8">
        <h2 className="text-3xl font-bold text-blue-900">Create Your Account</h2>
        <User className="h-8 w-8 text-blue-400 fill-blue-200" />
      </div>
      
      <form onSubmit={(e) => { e.preventDefault(); navigate('/dashboard'); }} className="space-y-5">
        <GoogleButton text="Continue with Google" onClick={() => navigate('/dashboard')} />
        
        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink-0 mx-4 text-gray-400 text-sm">Or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1.5">Email address</label>
          <InputField type="email" placeholder="email@address.com" icon={Mail} />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1.5">Password</label>
          <InputField type="password" placeholder="••••••••••••" icon={Lock} />
        </div>
        
        <div className="flex items-start gap-2 pt-2">
          <input type="checkbox" required className="mt-1 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600" />
          <span className="text-sm text-gray-600">The following details belong to this email.</span>
        </div>

        <button type="submit" className="w-full bg-[#0a2a5c] text-white rounded-md py-3 font-semibold hover:bg-blue-900 transition-colors mt-2">
          Create Account
        </button>
        
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account? <button type="button" onClick={() => setView('login')} className="text-blue-800 font-semibold hover:underline">Log in here</button>
        </p>
      </form>
    </div>
  );

  const ForgotScreen = () => (
    <div className="w-full flex flex-col h-full justify-between">
      <div>
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-2xl font-bold text-blue-900">Forgot password?</h2>
          <User className="h-6 w-6 text-blue-400 fill-blue-200" />
        </div>
        <p className="text-gray-500 text-sm mb-8">Enter your email and we'll send you a link to reset your password.</p>
        
        <div className="space-y-5">
          <div>
            <label className="block text-sm text-gray-600 mb-1.5">Email address</label>
            <InputField type="email" placeholder="email@address.com" icon={Mail} />
          </div>
          <button onClick={() => setView('check-email')} className="w-full bg-[#0a2a5c] text-white rounded-md py-3 font-semibold hover:bg-blue-900 transition-colors">
            Reset Password
          </button>
        </div>
      </div>
      <button onClick={() => setView('login')} className="mt-24 text-sm text-gray-600 hover:underline">Go back to Sign In.</button>
    </div>
  );

  const CheckEmailScreen = () => (
    <div className="w-full flex flex-col h-full justify-between">
      <div>
        <h2 className="text-2xl font-bold text-blue-900 mb-6">Check your email</h2>
        <p className="text-gray-500 text-sm mb-6 leading-relaxed">We have sent a password recovery instructions to your email address.</p>
        <p className="text-gray-500 text-sm mb-8 leading-relaxed">Didn't receive the email? Check your spam folder or try to <a href="#" className="underline">Re-send the message</a>.</p>
        <button onClick={() => setView('login')} className="w-full bg-[#0a2a5c] text-white rounded-md py-3 font-semibold hover:bg-blue-900 transition-colors">Go back to Sign In</button>
      </div>
      <button onClick={() => setView('login')} className="mt-24 text-sm text-gray-600 hover:underline text-center w-full">Go back to Sign In.</button>
    </div>
  );

  const ResetPasswordScreen = () => (
    <div className="w-full flex flex-col h-full justify-between">
      <div>
        <h2 className="text-2xl font-bold text-blue-900 mb-4">New password</h2>
        <p className="text-gray-500 text-sm mb-6 leading-relaxed">Your new password must be different from previously used one, and must have at least 8 characters.</p>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1.5">New password</label>
            <InputField type="password" placeholder="••••••••••••" icon={Lock} />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1.5">Confirm password</label>
            <InputField type="password" placeholder="••••••••••••" icon={Lock} />
          </div>
          <button onClick={() => setView('login')} className="w-full bg-[#0a2a5c] text-white rounded-md py-3 font-semibold hover:bg-blue-900 transition-colors mt-2">Reset Password</button>
        </div>
      </div>
      <button onClick={() => setView('login')} className="mt-16 text-sm text-gray-600 hover:underline text-center w-full">Go back to Sign In.</button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-xl border border-gray-100 flex overflow-hidden min-h-[650px]">
        <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center relative">
          <div className="max-w-sm mx-auto w-full h-full flex flex-col justify-center">
            {view === 'login' && <LoginScreen />}
            {view === 'register' && <RegisterScreen />}
            {view === 'forgot' && <ForgotScreen />}
            {view === 'check-email' && <CheckEmailScreen />}
            {view === 'reset-password' && <ResetPasswordScreen />}
          </div>
        </div>

        {/* Right Side - Only shows on Login view */}
        {view === 'login' && (
          <div className="hidden lg:flex w-1/2 p-12 bg-white border-l border-gray-100 flex-col justify-center items-center">
             <div className="max-w-sm w-full">
                <RegisterScreen />
             </div>
          </div>
        )}
      </div>
    </div>
  );
}