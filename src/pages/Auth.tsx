import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, User, X } from 'lucide-react';

type ViewType = 'login' | 'register' | 'forgot' | 'check-email' | 'reset-password' | 'verify';

export default function Auth() {
  const [view, setView] = useState<ViewType>('login');
  const [rememberMe, setRememberMe] = useState(false);
  const [googleStep, setGoogleStep] = useState(0); 
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
          <div onClick={() => setShow(!show)} className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer hover:text-blue-600">
            <Eye className="h-5 w-5 text-gray-400 hover:text-blue-600" />
          </div>
        )}
      </div>
    );
  };

  const GoogleButton = ({ text, onClick }: { text: string, onClick?: () => void }) => (
    <button type="button" onClick={onClick} className="w-full flex items-center justify-center gap-3 border border-gray-400 rounded-md py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
      {text}
    </button>
  );

  const LoginScreen = () => (
    <div className="w-full">
      <div className="mb-8 flex items-center gap-4">
        <img src="/logo.png" alt="CFTS" className="h-16 w-auto object-contain mix-blend-multiply" />
        <h1 className="text-xl font-bold text-blue-900 tracking-wider hidden sm:block border-l-2 border-gray-300 pl-4">CFTS INTELLIGENCE</h1>
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

        <GoogleButton text="Sign in with Google" onClick={() => setGoogleStep(1)} />

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
        <GoogleButton text="Continue with Google" onClick={() => setGoogleStep(1)} />
        
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

  const VerifyScreen = () => (
    <div className="w-full flex flex-col h-full justify-between">
      <div>
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-2xl font-bold text-blue-900">Verify it's you</h2>
          <User className="h-6 w-6 text-blue-400 fill-blue-200" />
        </div>
        <p className="text-gray-500 text-sm mb-6 leading-relaxed">We just sent a six-digit code to ***453 phone number. Enter the code below to sign in.</p>
        <div className="mb-6">
          <label className="block text-sm text-gray-600 mb-2">Activation Code</label>
          <div className="flex gap-2 items-center">
            <input type="text" maxLength={1} className="w-12 h-12 text-center text-xl border border-gray-300 rounded-md focus:border-blue-600 outline-none" defaultValue="3" />
            <input type="text" maxLength={1} className="w-12 h-12 text-center text-xl border border-gray-300 rounded-md focus:border-blue-600 outline-none" defaultValue="2" />
            <input type="text" maxLength={1} className="w-12 h-12 text-center text-xl border border-gray-300 rounded-md focus:border-blue-600 outline-none" defaultValue="8" />
            <span className="text-gray-400 font-bold mx-1">-</span>
            <input type="text" maxLength={1} className="w-12 h-12 text-center text-xl border border-gray-300 rounded-md focus:border-blue-600 outline-none" defaultValue="3" />
            <input type="text" maxLength={1} className="w-12 h-12 text-center text-xl border border-gray-300 rounded-md focus:border-blue-600 outline-none" defaultValue="1" />
            <input type="text" maxLength={1} className="w-12 h-12 text-center text-xl border border-gray-300 rounded-md focus:border-blue-600 outline-none" defaultValue="0" />
          </div>
        </div>
        <button onClick={() => setView('login')} className="w-full bg-[#0a2a5c] text-white rounded-md py-3 font-semibold hover:bg-blue-900 transition-colors">Continue</button>
        <p className="text-sm text-gray-500 mt-4">Didn't receive the code? <a href="#" className="underline">Re-send.</a></p>
      </div>
      <button onClick={() => setView('login')} className="mt-16 text-sm text-gray-600 hover:underline text-center w-full">Go back to Sign In.</button>
    </div>
  );

  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center p-4">
      
      {googleStep > 0 && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-[450px] overflow-hidden font-sans border border-gray-200">
            <div className="p-4 border-b border-gray-200 flex items-center gap-2">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              <span className="text-sm text-gray-600">Sign in with Google</span>
              <button onClick={() => setGoogleStep(0)} className="ml-auto text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
            </div>

            {googleStep === 1 && (
              <>
                <div className="p-8 pb-4">
                  <h2 className="text-2xl text-[#202124] mb-2">Choose an account</h2>
                  <p className="text-sm text-[#5f6368]">to continue to <span className="text-[#1a73e8]">CFTS Intelligence</span></p>
                </div>
                <div className="py-2">
                  <button onClick={() => setGoogleStep(2)} className="w-full flex items-center gap-4 px-8 py-3 hover:bg-[#f7f8f8] transition-colors text-left border-b border-gray-100">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-bold text-sm">JM</div>
                    <div>
                      <p className="text-sm text-[#3c4043]">Inspector J. Mokoena</p>
                      <p className="text-xs text-[#5f6368]">j.mokoena@cfts.gov</p>
                    </div>
                  </button>
                </div>
              </>
            )}

            {googleStep === 2 && (
              <>
                <div className="p-8 pb-4">
                  <h2 className="text-2xl text-[#202124] mb-4">Sign in to CFTS Intelligence</h2>
                  <button onClick={() => setGoogleStep(1)} className="flex items-center gap-2 px-3 py-1 border border-gray-300 rounded-full text-sm text-[#3c4043] hover:bg-gray-50 mb-6">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-bold text-xs">JM</div> j.mokoena@cfts.gov
                  </button>
                  <p className="text-[15px] text-[#202124] mb-6">Google will allow CFTS Intelligence to access this info about you</p>
                  <div className="space-y-4 mb-6">
                    <div className="flex items-start gap-4">
                      <User className="w-5 h-5 text-gray-500 mt-1" />
                      <div><p className="text-sm text-[#202124]">Inspector J. Mokoena</p><p className="text-xs text-[#5f6368]">Name and profile picture</p></div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Mail className="w-5 h-5 text-gray-500 mt-1" />
                      <div><p className="text-sm text-[#202124]">j.mokoena@cfts.gov</p><p className="text-xs text-[#5f6368]">Email address</p></div>
                    </div>
                  </div>
                </div>
                <div className="p-6 pt-0 flex justify-end gap-3 border-t border-gray-100">
                  <button onClick={() => setGoogleStep(0)} className="px-6 py-2 text-sm font-medium text-[#1a73e8] rounded-full border border-gray-300 hover:bg-gray-50">Cancel</button>
                  <button onClick={() => navigate('/dashboard')} className="px-6 py-2 text-sm font-medium text-white bg-[#1a73e8] rounded-full hover:bg-blue-700">Continue</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {view === 'login' && (
        <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-gray-100 flex overflow-hidden min-h-[600px]">
          <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center relative">
            <div className="max-w-sm mx-auto w-full h-full flex flex-col justify-center"><LoginScreen /></div>
          </div>
          <div className="hidden lg:flex w-1/2 p-12 bg-white border-l border-gray-100 flex-col justify-center items-center">
             <div className="max-w-sm w-full"><RegisterScreen /></div>
          </div>
        </div>
      )}

      {view !== 'login' && (
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 lg:p-12 min-h-[500px] flex flex-col justify-center">
          <div className="w-full h-full flex flex-col justify-center">
             {view === 'register' && <RegisterScreen />}
             {view === 'forgot' && <ForgotScreen />}
             {view === 'check-email' && <CheckEmailScreen />}
             {view === 'reset-password' && <ResetPasswordScreen />}
             {view === 'verify' && <VerifyScreen />}
          </div>
        </div>
      )}
    </div>
  );
}