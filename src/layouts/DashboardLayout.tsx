import React, { useState, useEffect, Suspense } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from '../../components/common/Sidebar';
import GlobalSearchModal from '../../components/dashboard/GlobalSearchModal';
import { User, DashboardView, Repository, AppView } from '../../types';
import { logout } from '../../services/authService';

import UserProfileDropdown from '../../components/dashboard/UserProfileDropdown';

interface DashboardLayoutProps {
    user: User | null;
    repos: Repository[];
    onNavigate: (view: AppView | DashboardView, options?: any) => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ user, repos }) => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // Handle resize logic
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setIsSidebarCollapsed(true);
            } else {
                setIsSidebarCollapsed(false);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Global keyboard shortcut for search
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsSearchOpen(prev => !prev);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const getActiveView = (): DashboardView => {
        const path = location.pathname.replace('/app', '');
        if (path === '' || path === '/') return 'developerCommandCenter';
        const view = path.substring(1);
        if (view === '') return 'developerCommandCenter';
        return view.split('/')[0] as DashboardView;
    };

    const handleSidebarNavigate = (view: DashboardView) => {
        if (view === 'developerCommandCenter') {
            navigate('/app');
        } else {
            navigate(`/app/${view}`);
        }
    };

    const handleSearchNavigate = (view: DashboardView) => {
        setIsSearchOpen(false);
        if (view === 'developerCommandCenter') {
            navigate('/app');
        } else {
            navigate(`/app/${view}`);
        }
    };

    const handleSignOut = () => {
        logout();
        navigate('/');
        window.location.href = '/';
    };

    if (!user) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-black">
                <div className="flex flex-col items-center space-y-3">
                    <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    <p className="text-gray-500 text-sm">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white font-sans flex relative">
            {/* Global Search Modal */}
            <GlobalSearchModal
                isOpen={isSearchOpen}
                onClose={() => setIsSearchOpen(false)}
                repos={repos}
                onNavigate={handleSearchNavigate}
            />

            <Sidebar
                activeView={getActiveView()}
                setActiveView={handleSidebarNavigate}
                isCollapsed={isSidebarCollapsed}
                setIsCollapsed={setIsSidebarCollapsed}
                user={user}
                onLogout={handleSignOut}
                onToggleSearch={() => setIsSearchOpen(true)}
            />

            {/* Top Right Profile Dropdown */}
            <div className="fixed top-6 right-8 z-50 hidden lg:block">
                <UserProfileDropdown user={user} repos={repos} onLogout={handleSignOut} />
            </div>

            <main
                className="flex-1 transition-all duration-300 bg-black overflow-y-auto h-screen"
                style={{ marginLeft: isSidebarCollapsed ? '4.5rem' : '16rem' }}
            >
                <div className="px-8 pb-8 pt-24 min-h-full flex flex-col">
                    <Suspense fallback={
                        <div className="h-full w-full flex items-center justify-center pt-20">
                            <div className="flex flex-col items-center space-y-4">
                                <div className="w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                                <p className="text-gray-500 text-sm font-mono">Loading Module...</p>
                            </div>
                        </div>
                    }>
                        <Outlet />
                    </Suspense>
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
