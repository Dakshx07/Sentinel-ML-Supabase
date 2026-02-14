import React, { useState } from 'react';
import {
    StudioIcon,
    GitBranchIcon,
    SettingsIcon,
    HistoryIcon,
    RepoIcon,
    DocsIcon,
    PullRequestIcon,
    BrainCircuitIcon,
    ImageIcon,
    CommandLineIcon,
    DoubleArrowLeftIcon,
    DoubleArrowRightIcon,
    DocumentTextIcon,
    TrendingUpIcon,
    AlertTriangleIcon,
    DocumentPlusIcon,
    SentinelLogoIcon,
    SearchIcon,
    UserIcon,
    SparklesIcon
} from './icons';
import { DashboardView, User } from '../../types';
import { motion, AnimatePresence } from 'framer-motion';

interface NavLinkProps {
    id: DashboardView;
    label: string;
    icon: React.ReactNode;
    isActive: boolean;
    isCollapsed: boolean;
    onClick: (id: DashboardView) => void;
    accentColor?: string;
    isComingSoon?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ id, label, icon, isActive, isCollapsed, onClick, accentColor = 'blue', isComingSoon }) => {
    const colorClasses: Record<string, { text: string; glow: string }> = {
        blue: { text: 'group-hover:text-blue-400', glow: 'shadow-[0_0_15px_rgba(59,130,246,0.3)]' },
        green: { text: 'group-hover:text-emerald-400', glow: 'shadow-[0_0_15px_rgba(16,185,129,0.3)]' },
        violet: { text: 'group-hover:text-violet-400', glow: 'shadow-[0_0_15px_rgba(139,92,246,0.3)]' },
        amber: { text: 'group-hover:text-amber-400', glow: 'shadow-[0_0_15px_rgba(245,158,11,0.3)]' },
        gray: { text: 'group-hover:text-gray-300', glow: 'shadow-[0_0_10px_rgba(255,255,255,0.1)]' },
    };

    const colors = colorClasses[accentColor] || colorClasses.blue;

    return (
        <button
            onClick={() => !isComingSoon && onClick(id)}
            disabled={isComingSoon}
            className={`relative flex items-center w-full px-3 py-2 my-0.5 text-sm font-medium rounded-lg transition-all duration-200 group
                ${isActive
                    ? 'text-white'
                    : 'text-gray-500 hover:bg-white/[0.03]'
                } ${isComingSoon ? 'cursor-not-allowed opacity-50' : ''}`}
            title={label}
        >
            {/* Active Indicator Line */}
            {isActive && (
                <motion.div
                    layoutId="active-nav-indicator"
                    className="absolute left-0 top-1.5 bottom-1.5 w-0.5 bg-blue-500 rounded-r-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                />
            )}

            <span className={`relative flex-shrink-0 w-5 h-5 transition-colors duration-200 ${isActive ? 'text-blue-400' : colors.text}`}>
                {icon}
            </span>

            {!isCollapsed && (
                <span className={`ml-3 truncate transition-colors duration-200 ${isActive ? 'text-white' : 'group-hover:text-gray-200'}`}>
                    {label}
                </span>
            )}

            {/* Coming Soon Badge */}
            {isComingSoon && !isCollapsed && (
                <span className="ml-auto text-[9px] uppercase tracking-wider font-bold text-gray-600 px-1.5 py-0.5 rounded bg-white/5">
                    Soon
                </span>
            )}
        </button>
    );
};


interface SidebarProps {
    activeView: DashboardView;
    setActiveView: (view: DashboardView) => void;
    isCollapsed: boolean;
    setIsCollapsed: (isCollapsed: boolean) => void;
    user: User | null;
    onLogout: () => void;
    onToggleSearch: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
    activeView,
    setActiveView,
    isCollapsed,
    setIsCollapsed,
    user,
    onLogout,
    onToggleSearch
}) => {

    const navigation = [
        {
            title: "Organization",
            items: [
                { id: 'developerCommandCenter' as DashboardView, label: 'Overview', icon: <TrendingUpIcon />, color: 'blue' },
                { id: 'repositories' as DashboardView, label: 'Repositories', icon: <RepoIcon />, color: 'green' },
                { id: 'smartAlerts' as DashboardView, label: 'Alerts', icon: <AlertTriangleIcon />, color: 'amber' },
            ]
        },
        {
            title: "Security",
            items: [
                { id: 'gitops' as DashboardView, label: 'GitOps Scanner', icon: <GitBranchIcon />, color: 'blue' },
                { id: 'commits' as DashboardView, label: 'Commits', icon: <HistoryIcon />, color: 'gray' },
                { id: 'pushpull' as DashboardView, label: 'PR Review', icon: <PullRequestIcon />, color: 'green' },
                { id: 'studio' as DashboardView, label: 'Studio', icon: <StudioIcon />, color: 'violet' },
            ]
        },
        {
            title: "AI & Tools",
            items: [
                { id: 'refactor' as DashboardView, label: 'Refactor', icon: <BrainCircuitIcon />, color: 'violet' },
                { id: 'workflowStreamliner' as DashboardView, label: 'Chatbot', icon: <CommandLineIcon />, color: 'blue' },
                { id: 'imageGenerator' as DashboardView, label: 'Image Gen', icon: <ImageIcon />, color: 'violet' },
                { id: 'repoReport' as DashboardView, label: 'Report', icon: <DocumentTextIcon />, color: 'amber' },
                { id: 'readmeGenerator' as DashboardView, label: 'README', icon: <DocumentPlusIcon />, color: 'green' },
            ]
        }
    ];

    const accountItems = [
        { id: 'docs' as DashboardView, label: 'Docs', icon: <DocsIcon />, color: 'blue' },
        { id: 'settings' as DashboardView, label: 'Settings', icon: <SettingsIcon />, color: 'gray' },
    ];

    return (
        <motion.aside
            initial={false}
            animate={{ width: isCollapsed ? '4.5rem' : '16rem' }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed top-0 left-0 h-full z-50 flex flex-col bg-[#0A0A0A] border-r border-white/5"
        >
            {/* 1. Header: Logo & Search */}
            <div className="p-4 flex flex-col space-y-4">
                {/* Brand */}
                <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'px-2'}`}>
                    <SentinelLogoIcon className="w-8 h-8 flex-shrink-0" />
                    {!isCollapsed && (
                        <span className="ml-3 font-heading font-bold text-lg tracking-tight text-white">
                            SENTINEL
                        </span>
                    )}
                </div>

                {/* Search Trigger */}
                <button
                    onClick={onToggleSearch}
                    className={`flex items-center ${isCollapsed ? 'justify-center p-2' : 'px-3 py-2'} rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 transition-all group`}
                >
                    <SearchIcon className="w-4 h-4 text-gray-500 group-hover:text-white" />
                    {!isCollapsed && (
                        <>
                            <span className="ml-3 text-sm text-gray-500 group-hover:text-gray-300">Search...</span>
                            <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-white/10 bg-white/5 px-1.5 font-mono text-[10px] font-medium text-gray-400 opacity-100">
                                <span className="text-xs">⌘</span>K
                            </kbd>
                        </>
                    )}
                </button>
            </div>

            {/* 2. Scrollable Navigation */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden px-2 py-2 space-y-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                {navigation.map((section, idx) => (
                    <div key={idx}>
                        {!isCollapsed && (
                            <div className="px-3 mb-2">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-600">
                                    {section.title}
                                </span>
                            </div>
                        )}
                        {/* Divider for collapsed mode to separate sections visually */}
                        {isCollapsed && idx > 0 && <div className="h-px w-8 mx-auto bg-white/5 my-2" />}

                        <div className="space-y-0.5">
                            {section.items.map(item => (
                                <NavLink
                                    key={item.id}
                                    {...item}
                                    isCollapsed={isCollapsed}
                                    isActive={activeView === item.id}
                                    onClick={setActiveView}
                                    accentColor={item.color}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* 3. Footer: Account & User Profile */}
            <div className="p-2 border-t border-white/5 bg-[#0A0A0A]">
                <div className="mb-2">
                    {accountItems.map(item => (
                        <NavLink
                            key={item.id}
                            {...item}
                            isCollapsed={isCollapsed}
                            isActive={activeView === item.id}
                            onClick={setActiveView}
                            accentColor={item.color}
                        />
                    ))}
                </div>

                {/* Collapse Toggle */}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="w-full flex items-center justify-center p-2 mt-2 text-gray-600 hover:text-white transition-colors"
                >
                    {isCollapsed ? <DoubleArrowRightIcon className="w-4 h-4" /> : <DoubleArrowLeftIcon className="w-4 h-4" />}
                </button>
            </div>
        </motion.aside>
    );
};

export default Sidebar;