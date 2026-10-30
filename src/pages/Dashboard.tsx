import { useState, useEffect, useRef } from 'react';
import { Briefcase, AlertTriangle, Activity, Users, Search, LogOut, Loader2, User, FileText, X, Camera, Fingerprint, Shield, Smartphone, Lock, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { dashboardStats, recentAlerts } from '../mocks/dashboardData';

export default function Dashboard() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  const [activeTab, setActiveTab] = useState<'profile' | 'security'>('profile');
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [biometrics, setBiometrics] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfilePic(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const getIcon = (name: string) => {
    const props = { className: "w-6 h-6 text-blue-600" };
    if (name === 'Briefcase') return <Briefcase {...props} />;
    if (name === 'AlertTriangle') return <AlertTriangle {...props} />;
    if (name === 'Activity') return <Activity {...props} />;
    return <Users {...props} />;
  };

  const getRiskColor = (risk: string) => {
    if (risk === 'CRITICAL') return 'bg-red-100 text-red-700 border-red-200';
    if (risk === 'HIGH') return 'bg-orange-100 text-orange-700 border-orange-200';
    return 'bg-yellow-100 text-yellow-700 border-yellow-200';
  };

  const handleCardClick = (label: string) => {
    if (label === 'Total Cases') navigate('/cases');
    if (label === 'High-Risk Entities') navigate('/search');
    if (label === 'Suspicious Transactions') navigate('/graph');
    if (label === 'Active Investigations') navigate('/cases');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-transparent flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
        <p className="text-blue-900 font-semibold">Loading dashboard data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      
      {isSettingsOpen && (
        <div className="fixed inset-0 bg-blue-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden relative border border-gray-200">
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50">
              <div>
                <h2 className="text-xl font-bold text-blue-900">Account Settings</h2>
                <p className="text-sm text-gray-500 mt-1">Manage your profile and security</p>
              </div>
              <button onClick={() => setIsSettingsOpen(false)} className="text-gray-500 hover:text-black hover:bg-gray-200 p-1.5 rounded-md transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex border-b border-gray-200">
              <button onClick={() => setActiveTab('profile')} className={`flex-1 py-3 text-sm font-semibold transition-colors border-b-2 ${activeTab === 'profile' ? 'border-blue-600 text-blue-900' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
                Profile Info
              </button>
              <button onClick={() => setActiveTab('security')} className={`flex-1 py-3 text-sm font-semibold transition-colors border-b-2 ${activeTab === 'security' ? 'border-blue-600 text-blue-900' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
                Security & Biometrics
              </button>
            </div>
            
            <div className="p-6 space-y-5 max-h-[60vh] overflow-y-auto">
              {activeTab === 'profile' && (
                <>
                  <div className="flex flex-col items-center mb-6">
                    <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUpload} className="hidden" />
                    <div onClick={() => fileInputRef.current?.click()} className="w-24 h-24 bg-blue-50 border-2 border-dashed border-blue-300 rounded-full flex items-center justify-center overflow-hidden relative cursor-pointer group hover:bg-blue-100 transition-colors">
                      {profilePic ? (
                        <>
                          <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Camera className="w-6 h-6 text-white" />
                          </div>
                        </>
                      ) : (
                        <div className="flex flex-col items-center text-blue-500">
                          <Camera className="w-6 h-6 mb-1" />
                          <span className="text-[10px] font-semibold uppercase">Upload</span>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Click to update profile picture</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                      <input type="text" defaultValue="John" className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-600" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                      <input type="text" defaultValue="Mokoena" className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-600" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input type="email" defaultValue="j.mokoena@cfts.gov" className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-600 bg-gray-50" disabled />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Department / Role</label>
                    <input type="text" defaultValue="Senior Investigator - Financial Crimes Unit" className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-600 bg-gray-50" disabled />
                  </div>
                </>
              )}

              {activeTab === 'security' && (
                <>
                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-2 flex items-start gap-3">
                    <Shield className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-blue-900">Account Security</h4>
                      <p className="text-xs text-blue-700 mt-1">Ensure your account is using a long, random password and biometrics to stay secure.</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Fingerprint className="w-6 h-6 text-gray-500" />
                      <div>
                        <p className="text-sm font-bold text-gray-900">Biometric Login</p>
                        <p className="text-xs text-gray-500">Use Face ID or Fingerprint to sign in</p>
                      </div>
                    </div>
                    <div onClick={() => setBiometrics(!biometrics)} className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors ${biometrics ? 'bg-blue-600' : 'bg-gray-200'}`}>
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition ${biometrics ? 'translate-x-6' : 'translate-x-1'}`}></span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Smartphone className="w-6 h-6 text-gray-500" />
                      <div>
                        <p className="text-sm font-bold text-gray-900">Two-Factor Authentication</p>
                        <p className="text-xs text-gray-500">Require a code from your phone</p>
                      </div>
                    </div>
                    <div onClick={() => setTwoFactor(!twoFactor)} className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors ${twoFactor ? 'bg-blue-600' : 'bg-gray-200'}`}>
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition ${twoFactor ? 'translate-x-6' : 'translate-x-1'}`}></span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100 mt-4">
                    <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <Lock className="w-4 h-4" /> Change Password
                    </h4>
                    {!resetSent ? (
                      <button onClick={() => setResetSent(true)} className="w-full py-2 bg-white border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                        Send Password Reset Email
                      </button>
                    ) : (
                      <div className="w-full py-2 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm font-semibold flex items-center justify-center gap-2">
                        <CheckCircle className="w-4 h-4" /> Reset Email Sent!
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
            
            <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
              <button onClick={() => setIsSettingsOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200 rounded-lg">Cancel</button>
              <button onClick={() => setIsSettingsOpen(false)} className="px-4 py-2 text-sm font-semibold text-white bg-[#0a2a5c] hover:bg-blue-900 rounded-lg shadow-md">Save Changes</button>
            </div>
          </div>
        </div>
      )}

      <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 px-8 py-3 flex justify-between items-center relative z-50 shadow-sm">
        <div className="flex items-center gap-4">
          <img src="/logo.png" alt="CFTS Logo" className="h-12 w-auto object-contain mix-blend-multiply" />
          <h1 className="text-xl font-bold text-blue-900 tracking-wider hidden md:block border-l-2 border-gray-300 pl-4">
            CFTS INTELLIGENCE
          </h1>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="relative">
            <div onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center gap-3 cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition-colors">
              <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center border border-blue-200 overflow-hidden">
                {profilePic ? (
                  <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-sm font-bold text-blue-800">JM</span>
                )}
              </div>
              <div className="hidden sm:block text-right">
                <p className="text-sm font-bold text-blue-900 leading-tight">Inspector J. Mokoena</p>
                <p className="text-xs text-gray-500">j.mokoena@cfts.gov</p>
              </div>
            </div>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-[#0a2a5c] text-white rounded-xl shadow-2xl border border-blue-900 overflow-hidden py-2">
                <div className="px-4 py-3 border-b border-blue-800 flex flex-col items-center relative">
                  <button onClick={(e) => { e.stopPropagation(); setIsProfileOpen(false); }} className="absolute top-2 right-2 text-blue-200 hover:text-white p-1">
                    <X className="w-4 h-4" />
                  </button>
                  <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-xl font-bold mb-2 border-2 border-blue-400 overflow-hidden">
                    {profilePic ? (
                      <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <span>JM</span>
                    )}
                  </div>
                  <p className="font-semibold text-sm">Inspector J. Mokoena</p>
                  <p className="text-xs text-blue-200">j.mokoena@cfts.gov</p>
                </div>
                
                <div className="py-2">
                  <button onClick={() => { setIsSettingsOpen(true); setIsProfileOpen(false); setActiveTab('profile'); }} className="w-full flex items-center gap-3 px-4 py-2 hover:bg-blue-800 transition-colors text-sm">
                    <User className="w-4 h-4" /> My Profile
                  </button>
                  <button onClick={() => { setIsSettingsOpen(true); setIsProfileOpen(false); setActiveTab('security'); }} className="w-full flex items-center gap-3 px-4 py-2 hover:bg-blue-800 transition-colors text-sm">
                    <Shield className="w-4 h-4" /> Security Settings
                  </button>
                  <button onClick={() => navigate('/logs')} className="w-full flex items-center gap-3 px-4 py-2 hover:bg-blue-800 transition-colors text-sm">
                    <FileText className="w-4 h-4" /> Audit History
                  </button>
                </div>

                <div className="border-t border-blue-800 pt-2">
                  <button onClick={() => navigate('/')} className="w-full flex items-center gap-3 px-4 py-2 hover:bg-red-900/50 text-red-300 hover:text-red-200 transition-colors text-sm">
                    <LogOut className="w-4 h-4" /> Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 p-8 max-w-5xl mx-auto w-full mt-4">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-1/2">
            <div className="bg-white/95 backdrop-blur-sm rounded-xl border border-gray-200 shadow-lg overflow-hidden h-full">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h3 className="text-lg font-bold text-blue-900">Recent Alerts</h3>
              </div>
              <div className="divide-y divide-gray-100">
                {recentAlerts.map((alert) => (
                  <div key={alert.id} onClick={() => navigate('/graph')} className="px-6 py-4 flex items-center justify-between hover:bg-blue-50 transition-colors cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center border border-blue-200">
                        <span className="text-sm font-bold text-blue-800">{alert.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-bold text-blue-900">{alert.name}</p>
                        <p className="text-xs text-gray-500 font-medium">{alert.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getRiskColor(alert.risk)}`}>{alert.risk}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            <div className="mb-2 relative">
              <form onSubmit={(e) => { e.preventDefault(); navigate('/search'); }} className="relative w-full shadow-lg">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-blue-500" />
                </div>
                <input type="text" placeholder="Search entities, companies, or wallets..." className="w-full pl-12 pr-4 py-4 border-0 rounded-xl text-sm font-medium text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-sm placeholder-blue-400 bg-white/95 backdrop-blur-sm" />
              </form>
            </div>

            {dashboardStats.map((stat, index) => {
              return (
                <button 
                  key={index} 
                  onClick={() => handleCardClick(stat.label)}
                  className="w-full text-left bg-white/95 backdrop-blur-sm p-6 rounded-xl border border-gray-200 shadow-md flex items-center justify-between cursor-pointer hover:border-blue-500 hover:shadow-xl transition-all transform hover:-translate-y-1"
                >
                  <div>
                    <p className="text-sm font-bold text-gray-500 mb-1">{stat.label}</p>
                    <p className="text-3xl font-extrabold text-blue-900">{stat.value}</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">{getIcon(stat.icon)}</div>
                </button>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}