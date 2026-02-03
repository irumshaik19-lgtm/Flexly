
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { 
  Dumbbell, 
  LayoutDashboard, 
  Map as MapIcon, 
  Ticket, 
  User as UserIcon, 
  ShieldCheck, 
  LogOut,
  Menu,
  X,
  CreditCard,
  Settings,
  Users,
  ChevronRight,
  Home,
  ChevronDown,
  Globe
} from 'lucide-react';
import { UserRole, User } from './types';
import UserPortal from './components/UserPortal';
import OwnerPortal from './components/OwnerPortal';
import AdminPortal from './components/AdminPortal';
import LandingPage from './components/LandingPage';
import AuthModal from './components/AuthModal';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleLogin = (role: UserRole) => {
    setCurrentUser({
      id: Math.random().toString(36).substr(2, 9),
      name: role === UserRole.ADMIN ? 'System Admin' : role === UserRole.OWNER ? 'Rajesh Kumar' : 'Alex Thompson',
      email: `${role.toLowerCase()}@flexly.com`,
      role: role,
      kycStatus: role === UserRole.OWNER ? 'PENDING' : 'VERIFIED'
    });
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const switchPortal = (role: UserRole) => {
    if (currentUser) {
      setCurrentUser({ ...currentUser, role });
      setIsSidebarOpen(false);
    }
  };

  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen bg-slate-950">
        {currentUser && (
          <Navigation 
            user={currentUser} 
            onLogout={handleLogout} 
            onSwitchPortal={switchPortal}
            isOpen={isSidebarOpen} 
            setIsOpen={setIsSidebarOpen} 
          />
        )}
        
        <main className={`flex-grow ${currentUser ? 'md:ml-64' : ''}`}>
          <Routes>
            <Route path="/" element={
              currentUser ? (
                currentUser.role === UserRole.USER ? <UserPortal user={currentUser} /> :
                currentUser.role === UserRole.OWNER ? <OwnerPortal user={currentUser} /> :
                <AdminPortal user={currentUser} />
              ) : <LandingPage onLogin={(role) => {
                if (role === UserRole.USER) setIsAuthModalOpen(true);
                else handleLogin(role);
              }} />
            } />
            
            <Route path="/passes" element={currentUser?.role === UserRole.USER ? <UserPortal user={currentUser} /> : <LandingPage onLogin={() => setIsAuthModalOpen(true)} />} />
            <Route path="/profile" element={currentUser?.role === UserRole.USER ? <UserPortal user={currentUser} /> : <LandingPage onLogin={() => setIsAuthModalOpen(true)} />} />
            <Route path="/gyms" element={currentUser?.role === UserRole.OWNER ? <OwnerPortal user={currentUser} /> : <LandingPage onLogin={() => setIsAuthModalOpen(true)} />} />
            <Route path="/payouts" element={currentUser?.role === UserRole.OWNER ? <OwnerPortal user={currentUser} /> : <LandingPage onLogin={() => setIsAuthModalOpen(true)} />} />
            <Route path="/approvals" element={currentUser?.role === UserRole.ADMIN ? <AdminPortal user={currentUser} /> : <LandingPage onLogin={() => setIsAuthModalOpen(true)} />} />
            <Route path="/users" element={currentUser?.role === UserRole.ADMIN ? <AdminPortal user={currentUser} /> : <LandingPage onLogin={() => setIsAuthModalOpen(true)} />} />
          </Routes>
        </main>

        <AuthModal 
          isOpen={isAuthModalOpen} 
          onClose={() => setIsAuthModalOpen(false)} 
          onAuth={handleLogin} 
        />
      </div>
    </HashRouter>
  );
};

interface NavProps {
  user: User;
  onLogout: () => void;
  onSwitchPortal: (role: UserRole) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const Navigation: React.FC<NavProps> = ({ user, onLogout, onSwitchPortal, isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showRoleSwitcher, setShowRoleSwitcher] = useState(false);

  const navItems = {
    [UserRole.USER]: [
      { name: 'Discover', icon: <MapIcon className="w-5 h-5" />, path: '/' },
      { name: 'Active Passes', icon: <Ticket className="w-5 h-5" />, path: '/passes' },
      { name: 'Profile', icon: <UserIcon className="w-5 h-5" />, path: '/profile' },
    ],
    [UserRole.OWNER]: [
      { name: 'Overview', icon: <LayoutDashboard className="w-5 h-5" />, path: '/' },
      { name: 'My Facilities', icon: <Dumbbell className="w-5 h-5" />, path: '/gyms' },
      { name: 'Financials', icon: <CreditCard className="w-5 h-5" />, path: '/payouts' },
    ],
    [UserRole.ADMIN]: [
      { name: 'Command Center', icon: <LayoutDashboard className="w-5 h-5" />, path: '/' },
      { name: 'Verification Audit', icon: <ShieldCheck className="w-5 h-5" />, path: '/approvals' },
      { name: 'User Governance', icon: <Users className="w-5 h-5" />, path: '/users' },
    ]
  };

  const currentItems = navItems[user.role];

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-3 bg-slate-800/80 backdrop-blur-md border border-slate-700 rounded-2xl md:hidden text-emerald-400 shadow-xl"
      >
        {isOpen ? <X /> : <Menu />}
      </button>

      <aside className={`fixed top-0 left-0 h-full w-64 bg-slate-900 border-r border-slate-800 transform transition-transform duration-500 ease-in-out z-40 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 shadow-2xl`}>
        <div className="p-8 h-full flex flex-col">
          <button 
            onClick={() => { navigate('/'); setIsOpen(false); }} 
            className="flex items-center gap-3 mb-10 hover:opacity-80 transition-all group"
          >
            <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-slate-950 font-black text-xl shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">F</div>
            <div className="text-left">
              <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Flexly</span>
              <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest leading-none">Pan India Fitness</p>
            </div>
          </button>

          {/* Portal Switcher - Only for ADMIN or Demo visibility */}
          {user.role === UserRole.ADMIN && (
            <div className="mb-10 relative">
               <div className="text-[9px] font-black text-slate-600 uppercase tracking-widest px-4 mb-2">Admin Context</div>
               <button 
                 onClick={() => setShowRoleSwitcher(!showRoleSwitcher)}
                 className="w-full flex items-center justify-between p-4 bg-slate-800 border border-slate-700 rounded-2xl text-xs font-black uppercase tracking-widest text-emerald-400 hover:bg-slate-700 transition-all shadow-lg"
               >
                 <div className="flex items-center gap-3">
                   <ShieldCheck className="w-4 h-4" />
                   {user.role}
                 </div>
                 <ChevronDown className={`w-4 h-4 transition-transform ${showRoleSwitcher ? 'rotate-180' : ''}`} />
               </button>
               
               {showRoleSwitcher && (
                 <div className="absolute top-full left-0 right-0 mt-3 bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-50 animate-in fade-in slide-in-from-top-2 duration-300">
                   {Object.values(UserRole).map((role) => (
                     <button
                       key={role}
                       onClick={() => { 
                         onSwitchPortal(role); 
                         setShowRoleSwitcher(false); 
                         navigate('/'); 
                       }}
                       className={`w-full text-left px-5 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-emerald-500 hover:text-slate-950 transition-all flex items-center gap-3 ${user.role === role ? 'bg-emerald-500/10 text-emerald-400' : 'text-slate-500'}`}
                     >
                       {role === UserRole.USER ? <UserIcon className="w-4 h-4" /> : role === UserRole.OWNER ? <Dumbbell className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
                       Jump to {role}
                     </button>
                   ))}
                 </div>
               )}
            </div>
          )}

          <nav className="space-y-3 flex-grow overflow-y-auto custom-scrollbar pr-2">
            {currentItems.map((item) => (
              <button
                key={item.name}
                onClick={() => { navigate(item.path); setIsOpen(false); }}
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all group relative overflow-hidden ${
                  location.pathname === item.path 
                    ? 'bg-emerald-500 text-slate-950 font-black shadow-xl shadow-emerald-500/20' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <span className={`${location.pathname === item.path ? 'text-slate-950' : 'text-emerald-500 group-hover:scale-110 transition-transform'}`}>
                  {item.icon}
                </span>
                <span className="text-xs uppercase tracking-widest font-black">{item.name}</span>
                {location.pathname === item.path && (
                  <div className="absolute right-4 w-1.5 h-1.5 bg-slate-950 rounded-full"></div>
                )}
              </button>
            ))}
          </nav>

          <div className="pt-8 border-t border-slate-800 mt-auto space-y-4">
            <button 
              onClick={() => { navigate('/'); setIsOpen(false); }}
              className="w-full flex items-center gap-4 px-5 py-3 text-slate-500 hover:text-emerald-400 text-[10px] font-black uppercase tracking-widest transition-colors"
            >
              <Home className="w-4 h-4" /> Flexly Home
            </button>

            <div className="bg-slate-800/50 p-4 rounded-3xl border border-slate-800">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-emerald-400 font-black text-lg">
                  {user.name.charAt(0)}
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs font-black truncate text-white uppercase tracking-tighter">{user.name}</p>
                  <p className="text-[8px] text-slate-500 font-black uppercase tracking-widest">{user.role}</p>
                </div>
              </div>
              
              <button 
                onClick={onLogout}
                className="w-full flex items-center justify-center gap-2 py-3 bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-slate-950 rounded-xl transition-all font-black text-[9px] uppercase tracking-widest border border-rose-500/20"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </aside>

      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
        ></div>
      )}
    </>
  );
};

export default App;
