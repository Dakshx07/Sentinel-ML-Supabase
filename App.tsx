import React, { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { User, Repository } from './types';
import { ThemeProvider } from './components/common/ThemeContext';
import { ToastProvider } from './components/common/ToastContext';
import GlobalSearchModal from './components/dashboard/GlobalSearchModal';
import { getCurrentUser, logout, updateUser, initAuthListener } from './services/authService';
import { supabase } from './lib/supabase';

// Layouts
import LandingLayout from './src/layouts/LandingLayout';
import DashboardLayout from './src/layouts/DashboardLayout';

// Components (Eager load for critical paths)
// Components (Eager load for critical paths)
import LandingPage from './components/landing/LandingPage';
import AuthPage from './components/auth/AuthPage';
import PricingPage from './components/landing/PricingPage';
import FeaturesPage from './components/landing/FeaturesPage';
import SentinelLoader from './components/common/SentinelLoader';

// Components (Lazy load for Dashboard)
const DeveloperCommandCenter = React.lazy(() => import('./components/dashboard/DeveloperCommandCenter'));
const SmartAlerts = React.lazy(() => import('./components/dashboard/SmartAlerts'));
const RepositoriesDashboard = React.lazy(() => import('./components/dashboard/RepositoriesDashboard').then(module => ({ default: module.RepositoriesDashboard })));
const SentinelStudio = React.lazy(() => import('./components/dashboard/SentinelStudio'));
const GitHubScanner = React.lazy(() => import('./components/dashboard/GitHubScanner'));
const CommitScanner = React.lazy(() => import('./components/dashboard/CommitScanner'));
const PushPullPanel = React.lazy(() => import('./components/dashboard/PushPullPanel'));
const RefactorSimulator = React.lazy(() => import('./components/dashboard/RefactorSimulator'));
const RepoReportDashboard = React.lazy(() => import('./components/dashboard/RepoReportDashboard'));
const DevWorkflowStreamliner = React.lazy(() => import('./components/dashboard/DevWorkflowStreamliner'));
const READMEGenerator = React.lazy(() => import('./components/dashboard/READMEGenerator'));
const ImageGenerator = React.lazy(() => import('./components/dashboard/ImageGenerator'));
const SettingsPage = React.lazy(() => import('./components/dashboard/SettingsPage'));
const DocumentationDashboard = React.lazy(() => import('./components/dashboard/DocumentationDashboard'));

const AppContent: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [repos, setRepos] = useState<Repository[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Check for existing user on mount with minimum loading time
  useEffect(() => {
    const initApp = async () => {
      // Minimum loader duration for premium feel
      const minLoadTime = new Promise(resolve => setTimeout(resolve, 2000));

      const loggedInUser = getCurrentUser();
      if (loggedInUser) {
        setUser(loggedInUser);
      }

      // Also check Supabase session (for OAuth redirects)
      const sessionCheck = supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          const appUser: User = {
            username: session.user.user_metadata?.username || session.user.email?.split('@')[0] || 'User',
            email: session.user.email || '',
            avatarUrl: session.user.user_metadata?.avatar_url ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(session.user.email?.split('@')[0] || 'User')}&background=random`,
          };
          setUser(appUser);
          localStorage.setItem('sentinelUser', JSON.stringify(appUser));
          // Redirect to dashboard if on auth pages
          if (location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/') {
            navigate('/app');
          }
        }
      });

      await Promise.all([minLoadTime, sessionCheck]);
      setIsInitializing(false);
    };

    initApp();
  }, []);

  // Listen for auth state changes (OAuth callbacks)
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event, session?.user?.email);
      if (event === 'SIGNED_IN' && session?.user) {
        const appUser: User = {
          username: session.user.user_metadata?.username || session.user.user_metadata?.user_name || session.user.email?.split('@')[0] || 'User',
          email: session.user.email || '',
          avatarUrl: session.user.user_metadata?.avatar_url ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(session.user.email?.split('@')[0] || 'User')}&background=random`,
        };
        setUser(appUser);
        localStorage.setItem('sentinelUser', JSON.stringify(appUser));
        // Only navigate to /app if not already on a dashboard route
        if (!location.pathname.startsWith('/app')) {
          navigate('/app');
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        localStorage.removeItem('sentinelUser');
        navigate('/');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, location.pathname]);


  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(isOpen => !isOpen);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (user) {
      const savedReposJson = localStorage.getItem(`sentinel-repos-${user.email}`);
      if (savedReposJson) {
        try {
          const savedRepos: Repository[] = JSON.parse(savedReposJson);
          const normalizedRepos = savedRepos.map(repo => ({
            ...repo,
            autoReview: repo.autoReview === true,
          }));
          setRepos(normalizedRepos);
        } catch (error) {
          console.error("Failed to parse repos from local storage:", error);
          setRepos([]);
        }
      }
    } else {
      setRepos([]);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`sentinel-repos-${user.email}`, JSON.stringify(repos));
    }
  }, [repos, user]);

  const handleProfileUpdate = (updatedProfile: Partial<User>) => {
    setUser(currentUser => {
      if (!currentUser) return null;
      const newUser = { ...currentUser, ...updatedProfile };
      if (updatedProfile.github && updatedProfile.github.avatar_url) {
        newUser.avatarUrl = updatedProfile.github.avatar_url;
      }
      updateUser(newUser);
      return newUser;
    });
  }

  const handleAuthSuccess = (authenticatedUser: User) => {
    setUser(authenticatedUser);
    navigate('/app');
  };

  const handleNavigate = (view: any) => {
    // Adapter for components that might still use onNavigate prop if any
    // Ideally we replace them with useNavigate() hook inside components
    console.log("Legacy navigation requested:", view);
  }

  return (
    <>
      {user && <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        repos={repos}
        onNavigate={(view) => {
          setIsSearchOpen(false);
          if (view === 'repositories') navigate('/app/repositories');
          // Add other mappings if GlobalSearchModal uses them
        }}
      />}

      <AnimatePresence mode="wait">
        {isInitializing ? (
          <motion.div
            key="loader"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[100]"
          >
            <SentinelLoader />
          </motion.div>
        ) : (
          <Suspense fallback={<SentinelLoader />}>
            <Routes>
              {/* Public Routes */}
              <Route element={<LandingLayout />}>
                <Route path="/" element={<LandingPage onNavigate={(view) => {
                  if (view === 'auth') navigate('/login');
                  if (view === 'pricing') navigate('/pricing');
                  if (view === 'repositories') navigate('/app/repositories'); // Or login first
                }} />} />
                <Route path="/features" element={<FeaturesPage onNavigate={(view) => {
                  if (view === 'auth') navigate('/login');
                }} />} />
                <Route path="/pricing" element={<PricingPage onNavigate={(view) => {
                  if (view === 'auth') navigate('/login');
                }} />} />
                <Route path="/login" element={<AuthPage initialMode="login" onAuthSuccess={handleAuthSuccess} onNavigate={(view) => { if (view === 'landing') navigate('/'); }} />} />
                <Route path="/signup" element={<AuthPage initialMode="signup" onAuthSuccess={handleAuthSuccess} onNavigate={(view) => { if (view === 'landing') navigate('/'); }} />} />
              </Route>

              {/* Protected Dashboard Routes */}
              <Route element={<DashboardLayout user={user} repos={repos} onNavigate={handleNavigate} />}>
                <Route path="/app" element={<DeveloperCommandCenter user={user} repos={repos} setActiveView={() => { }} />} />
                <Route path="/app/repositories" element={<RepositoriesDashboard user={user} setActiveView={() => { }} repos={repos} setRepos={setRepos} />} />
                <Route path="/app/smartAlerts" element={<SmartAlerts />} />
                <Route path="/app/studio" element={<SentinelStudio onNavigateToSettings={() => navigate('/app/settings')} />} />
                <Route path="/app/gitops" element={<GitHubScanner user={user} onNavigateToSettings={() => navigate('/app/settings')} repos={repos} />} />
                <Route path="/app/commits" element={<CommitScanner user={user} onNavigateToSettings={() => navigate('/app/settings')} repos={repos} />} />
                <Route path="/app/pushpull" element={<PushPullPanel setActiveView={() => { }} repos={repos} />} />
                <Route path="/app/refactor" element={<RefactorSimulator onNavigateToSettings={() => navigate('/app/settings')} repos={repos} user={user} />} />
                <Route path="/app/repoReport" element={<RepoReportDashboard repos={repos} user={user} onNavigateToSettings={() => navigate('/app/settings')} />} />
                <Route path="/app/workflowStreamliner" element={<DevWorkflowStreamliner repos={repos} user={user} onNavigateToSettings={() => navigate('/app/settings')} />} />
                <Route path="/app/readmeGenerator" element={<READMEGenerator repos={repos} user={user} onNavigateToSettings={() => navigate('/app/settings')} />} />
                <Route path="/app/imageGenerator" element={<ImageGenerator onNavigateToSettings={() => navigate('/app/settings')} />} />
                <Route path="/app/settings" element={<SettingsPage user={user} onProfileUpdate={handleProfileUpdate} />} />
                <Route path="/app/docs" element={<DocumentationDashboard />} />
              </Route>

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        )}
      </AnimatePresence>
    </>
  );
};

const App: React.FC = () => (
  <ThemeProvider>
    <ToastProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ToastProvider>
  </ThemeProvider>
);

export default App;