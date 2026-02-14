import React, { useState, useRef, useEffect } from 'react';
import { User, Repository } from '../../types';
import { motion, AnimatePresence } from 'framer-motion';
import { SettingsIcon, UserIcon, LogOutIcon, RepoIcon, ActivityIcon, StarIcon } from '../common/icons';
import { useNavigate } from 'react-router-dom';

interface UserProfileDropdownProps {
    user: User | null;
    repos: Repository[];
    onLogout: () => void;
}

const UserProfileDropdown: React.FC<UserProfileDropdownProps> = ({ user, repos, onLogout }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleNavigate = (path: string) => {
        navigate(path);
        setIsOpen(false);
    };

    if (!user) return null;

    const totalStars = repos.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0);
    const totalIssues = repos.reduce((acc, repo) => acc + (repo.open_issues_count || 0), 0);

    return (
        <div className="relative z-50" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-center outline-none group"
            >
                <div className="relative transition-transform duration-200 group-hover:scale-105">
                    {user.avatarUrl ? (
                        <img
                            src={user.avatarUrl}
                            alt={user.username}
                            className="w-10 h-10 rounded-full border-2 border-white/10 group-hover:border-blue-500/50 transition-colors object-cover bg-gray-800 shadow-lg"
                        />
                    ) : (
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-sm font-bold text-white border-2 border-white/10 group-hover:border-blue-500/50 transition-all shadow-lg">
                            {user.username?.charAt(0).toUpperCase() || 'U'}
                        </div>
                    )}
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#0A0A0A] rounded-full"></div>
                </div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 top-full mt-4 w-72 bg-[#111] border border-white/10 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl"
                    >
                        {/* User Header */}
                        <div className="p-5 border-b border-white/5 bg-gradient-to-br from-blue-500/10 to-purple-500/10">
                            <div className="flex items-center space-x-3">
                                {user.avatarUrl ? (
                                    <img src={user.avatarUrl} alt={user.username} className="w-12 h-12 rounded-full border border-white/10" />
                                ) : (
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-lg font-bold text-white">
                                        {user.username?.charAt(0).toUpperCase()}
                                    </div>
                                )}
                                <div>
                                    <p className="text-base font-bold text-white">{user.username}</p>
                                    <p className="text-xs text-gray-400 font-mono">{user.email || 'No email connected'}</p>
                                </div>
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-3 divide-x divide-white/5 border-b border-white/5 bg-black/20">
                            <div className="p-3 text-center hover:bg-white/5 transition-colors">
                                <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Repos</p>
                                <div className="flex items-center justify-center space-x-1 text-white font-mono">
                                    <RepoIcon className="w-3 h-3 text-blue-400" />
                                    <span>{repos.length}</span>
                                </div>
                            </div>
                            <div className="p-3 text-center hover:bg-white/5 transition-colors">
                                <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Stars</p>
                                <div className="flex items-center justify-center space-x-1 text-white font-mono">
                                    <StarIcon className="w-3 h-3 text-amber-400" />
                                    <span>{totalStars}</span>
                                </div>
                            </div>
                            <div className="p-3 text-center hover:bg-white/5 transition-colors">
                                <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Issues</p>
                                <div className="flex items-center justify-center space-x-1 text-white font-mono">
                                    <ActivityIcon className="w-3 h-3 text-red-400" />
                                    <span>{totalIssues}</span>
                                </div>
                            </div>
                        </div>

                        {/* Navigation Actions */}
                        <div className="p-2 space-y-1">
                            <button
                                onClick={() => handleNavigate('/app/settings')}
                                className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-all group"
                            >
                                <div className="p-1.5 bg-white/5 rounded-lg text-gray-400 group-hover:text-blue-400 group-hover:bg-blue-500/10 transition-colors">
                                    <SettingsIcon className="w-4 h-4" />
                                </div>
                                <span>Settings</span>
                            </button>

                            <button
                                onClick={() => handleNavigate('/app/docs')}
                                className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-all group"
                            >
                                <div className="p-1.5 bg-white/5 rounded-lg text-gray-400 group-hover:text-purple-400 group-hover:bg-purple-500/10 transition-colors">
                                    <UserIcon className="w-4 h-4" />
                                </div>
                                <span>Profile & Docs</span>
                            </button>
                        </div>

                        {/* Logout */}
                        <div className="p-2 border-t border-white/5 bg-red-500/[0.02]">
                            <button
                                onClick={onLogout}
                                className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all group"
                            >
                                <div className="p-1.5 bg-red-500/10 rounded-lg text-red-500 group-hover:bg-red-500/20 transition-colors">
                                    <LogOutIcon className="w-4 h-4" />
                                </div>
                                <span>Sign Out</span>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default UserProfileDropdown;
