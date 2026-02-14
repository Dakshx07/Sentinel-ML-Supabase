import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
    Shield, Zap, Lock, Code2, Terminal, Cpu,
    ArrowRight, CheckCircle2, Github, ChevronRight,
    Activity, Layers, Globe, Command, Sparkles,
    MousePointer2, Box, Brain, Search, GitPullRequest,
    AlertTriangle, Check, X
} from 'lucide-react';
import { cn } from '../../lib/utils';

// --- Local Components (Reverted from extraction) ---

const Logo = () => {
    return (
        <div className="relative group cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
            {/* Subtle hover glow */}
            <div className="absolute -inset-2 bg-white/10 rounded-xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>

            <div className="relative flex items-center space-x-3">
                {/* Neural Network Icon - Matching reference image */}
                <div className="w-11 h-11 relative flex items-center justify-center bg-black border border-white/20 rounded-xl group-hover:border-white/40 transition-all duration-300">
                    {/* Outer rounded container hover effect */}
                    <div className="absolute inset-0 rounded-xl bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                    {/* Neural network SVG - molecular structure */}
                    <svg viewBox="0 0 24 24" className="w-6 h-6 text-white relative z-10" fill="none" stroke="currentColor" strokeWidth="1.5">
                        {/* Central node */}
                        <circle cx="12" cy="12" r="2.5" fill="currentColor" strokeWidth="0" />

                        {/* Outer nodes - 4 corners */}
                        <circle cx="5" cy="7" r="1.5" fill="currentColor" strokeWidth="0" />
                        <circle cx="19" cy="7" r="1.5" fill="currentColor" strokeWidth="0" />
                        <circle cx="5" cy="17" r="1.5" fill="currentColor" strokeWidth="0" />
                        <circle cx="19" cy="17" r="1.5" fill="currentColor" strokeWidth="0" />

                        {/* Connection lines to center */}
                        <line x1="5" y1="7" x2="12" y2="12" strokeLinecap="round" />
                        <line x1="19" y1="7" x2="12" y2="12" strokeLinecap="round" />
                        <line x1="5" y1="17" x2="12" y2="12" strokeLinecap="round" />
                        <line x1="19" y1="17" x2="12" y2="12" strokeLinecap="round" />

                        {/* Cross connections */}
                        <line x1="5" y1="7" x2="19" y2="17" strokeLinecap="round" className="opacity-30" />
                        <line x1="19" y1="7" x2="5" y2="17" strokeLinecap="round" className="opacity-30" />
                    </svg>
                </div>

                {/* Brand Name */}
                <span className="text-xl font-bold font-heading tracking-tight text-white uppercase">
                    Sentinel
                </span>
            </div>
        </div>
    );
};

// Unique nav link with split letter hover effect
const NavLink = ({ href, children }: { href: string; children: string }) => (
    <a
        href={href}
        className="relative px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors duration-300 group"
    >
        {/* Split letters that stagger on hover */}
        <span className="relative inline-flex overflow-hidden">
            {children.split('').map((char, i) => (
                <span
                    key={i}
                    className="inline-block group-hover:-translate-y-full transition-transform duration-300"
                    style={{ transitionDelay: `${i * 20}ms` }}
                >
                    {char === ' ' ? '\u00A0' : char}
                </span>
            ))}
        </span>
        <span className="absolute top-0 left-4 inline-flex overflow-hidden">
            {children.split('').map((char, i) => (
                <span
                    key={i}
                    className="inline-block translate-y-full group-hover:translate-y-0 text-white transition-transform duration-300"
                    style={{ transitionDelay: `${i * 20}ms` }}
                >
                    {char === ' ' ? '\u00A0' : char}
                </span>
            ))}
        </span>

        {/* Underline that grows from left */}
        <span className="absolute bottom-1 left-4 right-4 h-[1px] bg-white/50 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
    </a>
);

const Navbar = ({ onNavigate }: { onNavigate: any }) => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4"
        >
            <div className={cn(
                "flex items-center justify-between px-6 py-3 rounded-full transition-all duration-500 w-full max-w-5xl",
                scrolled ? "bg-black/60 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50" : "bg-transparent border border-transparent"
            )}>
                <Logo />

                <div className="hidden md:flex items-center space-x-2">
                    <NavLink href="/features">Features</NavLink>
                    <NavLink href="/#how-it-works">How it Works</NavLink>
                    <NavLink href="/#testimonials">Testimonials</NavLink>
                    <NavLink href="/pricing">Pricing</NavLink>
                </div>

                <div className="flex items-center space-x-4">
                    {/* Sign In - Underline reveal */}
                    <button
                        onClick={() => onNavigate('auth')}
                        className="hidden md:block relative text-sm font-medium text-gray-300 hover:text-white transition-colors group overflow-hidden py-2"
                    >
                        <span className="relative z-10">Sign In</span>
                        <span className="absolute bottom-1 left-0 w-full h-[1px] bg-white transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                    </button>

                    {/* Get Started - Liquid fill button */}
                    <button
                        onClick={() => onNavigate('auth')}
                        className="group relative px-6 py-2.5 bg-white text-black text-sm font-bold rounded-full overflow-hidden"
                    >
                        {/* Liquid blob background */}
                        <span className="absolute inset-0 bg-white"></span>
                        <span className="absolute top-full left-1/2 -translate-x-1/2 w-[200%] aspect-square bg-black rounded-[40%] group-hover:top-[-50%] transition-all duration-700 ease-out"></span>

                        {/* Text */}
                        <span className="relative z-10 group-hover:text-white transition-colors duration-300 delay-100">Get Started</span>

                        {/* Arrow that appears */}
                        <ArrowRight className="relative z-10 inline-block w-0 h-4 ml-0 opacity-0 group-hover:w-4 group-hover:ml-2 group-hover:opacity-100 transition-all duration-300 group-hover:text-white" />
                    </button>
                </div>
            </div>
        </motion.nav>
    );
};

const Footer = () => {
    const footerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: footerRef,
        offset: ["start end", "end end"]
    });

    const textY = useTransform(scrollYProgress, [0, 1], ['100px', '0px']);
    const textOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);
    const textScale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);

    return (
        <footer ref={footerRef} className="relative py-40 px-6 bg-black overflow-hidden min-h-[60vh]">
            {/* White/Gray gradient glow behind text - NO purple */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[80%] h-[400px] bg-gradient-to-r from-white/5 via-white/10 to-white/5 blur-[100px] rounded-full"></div>
            </div>

            {/* Top ambient line - white only */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>

            {/* Giant SENTINEL text - Metallic gray/white effect */}
            <motion.div
                className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
                style={{ y: textY, opacity: textOpacity, scale: textScale }}
            >
                <h1
                    className="text-[18vw] md:text-[15vw] font-black font-heading tracking-tighter whitespace-nowrap select-none"
                    style={{
                        background: 'linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.7) 30%, rgba(150,150,150,0.5) 60%, rgba(100,100,100,0.3) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        textShadow: '0 0 80px rgba(255, 255, 255, 0.15), 0 0 160px rgba(255, 255, 255, 0.1)',
                    }}
                >
                    SENTINEL
                </h1>
            </motion.div>

            {/* Secondary layer for depth */}
            <motion.div
                className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
                style={{ y: textY, opacity: useTransform(textOpacity, (v) => v * 0.3) }}
            >
                <h1
                    className="text-[18vw] md:text-[15vw] font-black font-heading tracking-tighter whitespace-nowrap select-none text-white/5 blur-[2px]"
                    style={{ transform: 'translateY(3px)' }}
                >
                    SENTINEL
                </h1>
            </motion.div>

            {/* Bottom bar - Minimal with relevant links */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute bottom-0 left-0 right-0 px-6 py-8"
            >
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs tracking-widest uppercase">
                    {/* Left - Copyright & Status */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-gray-600 mb-4 md:mb-0 text-center md:text-left"
                    >
                        <span className="block md:inline">© 2025 Sentinel AI</span>
                        <span className="hidden md:inline mx-3">·</span>
                        <span className="block md:inline text-green-500/80">All Systems Operational</span>
                    </motion.div>

                    {/* Center - Relevant Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="flex space-x-8 mb-4 md:mb-0"
                    >
                        {['Documentation', 'Changelog', 'Privacy', 'Terms'].map((item) => (
                            <motion.a
                                key={item}
                                href="#"
                                whileHover={{ y: -2 }}
                                className="group text-gray-500 hover:text-white transition-colors relative"
                            >
                                <span>{item}</span>
                                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-300"></span>
                            </motion.a>
                        ))}
                    </motion.div>

                    {/* Right - Credit */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-600 text-center md:text-right"
                    >
                        <span className="block md:inline">Engineered by</span>
                        <span className="hidden md:inline ml-2"></span>
                        <motion.a
                            href="https://synthesis-labs.vercel.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block md:inline text-white cursor-pointer hover:underline"
                            whileHover={{ scale: 1.05 }}
                        >
                            SYNTHESIS LABS
                        </motion.a>
                    </motion.div>
                </div>
            </motion.div>

            {/* Scroll to top indicator */}
            <motion.button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.1 }}
                className="absolute bottom-20 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-500 hover:text-white hover:border-white/30 transition-all"
            >
                <motion.svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <path d="M8 12V4M8 4L4 8M8 4L12 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </motion.svg>
            </motion.button>
        </footer>
    );
};

// --- Data ---
const FEATURES = [
    {
        id: 'smart-analysis',
        title: 'Neural Code Analysis',
        description: 'Beyond regex. Sentinel understands code context, data flow, and vulnerability reachability.',
        icon: Brain,
        color: 'from-purple-500 to-indigo-500',
        content: (
            <div className="bg-black/50 rounded-xl border border-white/10 p-6 font-mono text-xs md:text-sm overflow-hidden">
                <div className="flex items-center space-x-2 mb-4 border-b border-white/10 pb-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="ml-2 text-gray-500">analysis_engine.py</span>
                </div>
                <div className="space-y-1">
                    <p className="text-gray-400"># Detecting hardcoded secrets...</p>
                    <p className="text-blue-400">def scan_repository(repo_url):</p>
                    <p className="pl-4 text-white">tokens = ml_model.predict(file_content)</p>
                    <p className="pl-4 text-purple-400">if tokens.confidence &gt; 0.98:</p>
                    <div className="bg-red-500/20 border-l-2 border-red-500 pl-4 py-1 my-2">
                        <p className="text-red-300">CRITICAL: AWS Key Pattern Detected</p>
                        <p className="text-white font-bold">AKIA...</p>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 'gitops',
        title: 'GitOps Enforcement',
        description: 'Block insecure PRs automatically. Sentinel acts as a mandatory status check in your workflow.',
        icon: GitPullRequest,
        color: 'from-blue-500 to-cyan-500',
        content: (
            <div className="bg-zinc-900 rounded-xl border border-white/10 p-4">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                        <Github className="w-5 h-5 text-white" />
                        <span className="text-white font-bold">Pull Request #42</span>
                    </div>
                    <span className="px-2 py-0.5 bg-red-500/20 text-red-400 text-xs rounded-full border border-red-500/30">Checks Failed</span>
                </div>
                <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2 text-gray-400">
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                            <span>Build / Test</span>
                        </div>
                        <span className="text-green-500">Passed</span>
                    </div>
                    <div className="flex items-center justify-between text-sm bg-red-500/10 p-2 rounded border border-red-500/20">
                        <div className="flex items-center space-x-2 text-white">
                            <Shield className="w-4 h-4 text-red-500" />
                            <span>Sentinel Security Check</span>
                        </div>
                        <span className="text-red-500 font-bold">Blocking</span>
                    </div>
                    <p className="text-xs text-gray-500 pl-6">
                        Found 2 high-severity vulnerabilities. Remediation required before merge.
                    </p>
                </div>
            </div>
        )
    },
    {
        id: 'remediation',
        title: 'Auto-Remediation',
        description: 'Don’t just find bugs—fix them. One-click PR generation to patch known CVEs.',
        icon: Zap,
        color: 'from-orange-500 to-yellow-500',
        content: (
            <div className="relative h-full flex flex-col items-center justify-center text-center">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative px-6 py-3 bg-white text-black font-bold rounded-lg overflow-hidden mb-4"
                >
                    <span className="relative z-10 flex items-center space-x-2">
                        <Zap className="w-4 h-4 fill-black" />
                        <span>Fix Vulnerability</span>
                    </span>
                </motion.button>
                <div className="text-xs text-gray-400 flex items-center space-x-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span>Generating Fix...</span>
                </div>
            </div>
        )
    }
];

const FeaturesPage = ({ onNavigate }: { onNavigate: any }) => {
    const [activeFeature, setActiveFeature] = useState(0);

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black pt-20">
            <Navbar onNavigate={onNavigate} />

            {/* Header */}
            <section className="py-20 px-6 text-center max-w-4xl mx-auto">
                <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-widest text-cyan-400 mb-6"
                >
                    CAPABILITIES MATRIX
                </motion.span>
                <motion.h1
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-5xl md:text-7xl font-black font-heading mb-6"
                >
                    Complete Security <br />
                    <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Architecture
                    </span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl text-gray-400 max-w-2xl mx-auto"
                >
                    Sentinel isn't a wrapper. It's a deep-learning driven security engine that lives inside your workflow, protecting every commit.
                </motion.p>
            </section>

            {/* Interactive Feature Showcase */}
            <section className="py-20 px-6 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[600px] lg:h-[500px]">
                    {/* Sidebar Tabs */}
                    <div className="lg:col-span-4 flex flex-col justify-center space-y-4">
                        {FEATURES.map((feature, idx) => (
                            <button
                                key={feature.id}
                                onClick={() => setActiveFeature(idx)}
                                className={`group text-left p-6 rounded-2xl transition-all duration-300 border ${activeFeature === idx
                                        ? 'bg-white/10 border-white/20 shadow-2xl scale-105'
                                        : 'bg-transparent border-transparent hover:bg-white/5 opacity-50 hover:opacity-100'
                                    }`}
                            >
                                <div className="flex items-center space-x-3 mb-2">
                                    <div className={`p-2 rounded-lg bg-gradient-to-br ${feature.color} text-white`}>
                                        <feature.icon className="w-5 h-5" />
                                    </div>
                                    <h3 className="font-bold text-lg">{feature.title}</h3>
                                </div>
                                <p className="text-sm text-gray-400 leading-relaxed">
                                    {feature.description}
                                </p>
                            </button>
                        ))}
                    </div>

                    {/* Display Area */}
                    <div className="lg:col-span-8 bg-zinc-900/50 border border-white/10 rounded-3xl p-8 relative overflow-hidden group">
                        {/* Background Gradients */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${FEATURES[activeFeature].color} opacity-5 blur-[100px] transition-all duration-700`} />

                        <div className="relative z-10 h-full flex items-center justify-center">
                            <AnimatePresence mode='wait'>
                                <motion.div
                                    key={activeFeature}
                                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                                    transition={{ duration: 0.4 }}
                                    className="w-full max-w-lg"
                                >
                                    {FEATURES[activeFeature].content}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </section>

            {/* Comparison Grid */}
            <section className="py-32 px-6 border-t border-white/5 bg-zinc-950">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-16 font-heading">Why Sentinel?</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Traditional SAST */}
                        <div className="p-8 rounded-2xl border border-white/5 bg-black/50 grayscale opacity-50 hover:opacity-100 transition-opacity">
                            <div className="mb-6 bg-gray-800 w-12 h-12 rounded-full flex items-center justify-center">
                                <Search className="w-6 h-6 text-gray-400" />
                            </div>
                            <h3 className="text-xl font-bold mb-4">Traditional SAST</h3>
                            <ul className="space-y-4 text-gray-500 text-sm">
                                <li className="flex items-start space-x-2">
                                    <X className="w-4 h-4 text-red-500 mt-0.5" />
                                    <span>High false positive rate</span>
                                </li>
                                <li className="flex items-start space-x-2">
                                    <X className="w-4 h-4 text-red-500 mt-0.5" />
                                    <span>Regex-based matching</span>
                                </li>
                                <li className="flex items-start space-x-2">
                                    <X className="w-4 h-4 text-red-500 mt-0.5" />
                                    <span>No remediation context</span>
                                </li>
                            </ul>
                        </div>

                        {/* Generic AI */}
                        <div className="p-8 rounded-2xl border border-white/5 bg-black/50 hover:border-white/20 transition-colors">
                            <div className="mb-6 bg-blue-900/20 w-12 h-12 rounded-full flex items-center justify-center border border-blue-500/30">
                                <BotIcon className="w-6 h-6 text-blue-400" />
                            </div>
                            <h3 className="text-xl font-bold mb-4">Generic LLMs</h3>
                            <ul className="space-y-4 text-gray-400 text-sm">
                                <li className="flex items-start space-x-2">
                                    <Check className="w-4 h-4 text-blue-500 mt-0.5" />
                                    <span>Understands code</span>
                                </li>
                                <li className="flex items-start space-x-2">
                                    <X className="w-4 h-4 text-red-500 mt-0.5" />
                                    <span>Hallucinates vulnerabilities</span>
                                </li>
                                <li className="flex items-start space-x-2">
                                    <X className="w-4 h-4 text-red-500 mt-0.5" />
                                    <span>No repo-wide context</span>
                                </li>
                            </ul>
                        </div>

                        {/* Sentinel */}
                        <div className="relative p-8 rounded-2xl border border-purple-500/30 bg-purple-900/10 hover:bg-purple-900/20 transition-colors transform scale-105 shadow-2xl shadow-purple-900/20">
                            <div className="absolute top-0 right-0 px-3 py-1 bg-purple-500 text-[10px] font-bold text-white rounded-bl-xl rounded-tr-xl">
                                RECOMMENDED
                            </div>
                            <div className="mb-6 bg-purple-500 w-12 h-12 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/50">
                                <Shield className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold mb-4 text-white">Sentinel AI</h3>
                            <ul className="space-y-4 text-gray-300 text-sm">
                                <li className="flex items-start space-x-2">
                                    <Check className="w-4 h-4 text-green-400 mt-0.5" />
                                    <span>Graph-based + AI Analysis</span>
                                </li>
                                <li className="flex items-start space-x-2">
                                    <Check className="w-4 h-4 text-green-400 mt-0.5" />
                                    <span>Verification Agent (No False Positives)</span>
                                </li>
                                <li className="flex items-start space-x-2">
                                    <Check className="w-4 h-4 text-green-400 mt-0.5" />
                                    <span>One-Click Auto-Fix</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="py-20 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-black pointer-events-none" />
                <h2 className="text-4xl font-bold mb-8 font-heading relative z-10">Stop vulnerabilities at the source.</h2>
                <button
                    onClick={() => onNavigate('auth')}
                    className="relative z-10 px-10 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.3)]"
                >
                    Deploy Sentinel
                </button>
            </section>

            <Footer />
        </div>
    );
};

// Helper Icon
const BotIcon = (props: any) => (
    <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24" height="24" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    >
        <path d="M12 8V4H8" />
        <rect width="16" height="12" x="4" y="8" rx="2" />
        <path d="M2 14h2" />
        <path d="M20 14h2" />
        <path d="M15 13v2" />
        <path d="M9 13v2" />
    </svg>
);

export default FeaturesPage;
