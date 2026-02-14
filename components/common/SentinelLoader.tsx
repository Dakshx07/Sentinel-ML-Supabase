import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SentinelLoader: React.FC = () => {
    const [dots, setDots] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            setDots(prev => prev.length >= 3 ? '' : prev + '.');
        }, 500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center font-sans">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center space-y-8"
            >
                {/* Simplified Logo Pulse */}
                <div className="relative w-24 h-24 flex items-center justify-center">
                    <motion.div
                        className="absolute inset-0 bg-white/5 rounded-full"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />

                    {/* The Core Icon (Same SVG as Logo but larger) */}
                    <svg viewBox="0 0 24 24" className="w-16 h-16 text-white relative z-10" fill="none" stroke="currentColor" strokeWidth="1.5">
                        {/* Central node */}
                        <circle cx="12" cy="12" r="2.5" fill="currentColor" strokeWidth="0" />

                        {/* Outer nodes - 4 corners */}
                        <circle cx="5" cy="7" r="1.5" fill="currentColor" strokeWidth="0" />
                        <circle cx="19" cy="7" r="1.5" fill="currentColor" strokeWidth="0" />
                        <circle cx="5" cy="17" r="1.5" fill="currentColor" strokeWidth="0" />
                        <circle cx="19" cy="17" r="1.5" fill="currentColor" strokeWidth="0" />

                        {/* Connection lines to center */}
                        <motion.line
                            x1="5" y1="7" x2="12" y2="12" strokeLinecap="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                        />
                        <motion.line
                            x1="19" y1="7" x2="12" y2="12" strokeLinecap="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1.5, delay: 0.2, ease: "easeInOut" }}
                        />
                        <motion.line
                            x1="5" y1="17" x2="12" y2="12" strokeLinecap="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1.5, delay: 0.4, ease: "easeInOut" }}
                        />
                        <motion.line
                            x1="19" y1="17" x2="12" y2="12" strokeLinecap="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1.5, delay: 0.6, ease: "easeInOut" }}
                        />
                    </svg>
                </div>

                <div className="text-sm font-medium text-gray-400 tracking-widest uppercase">
                    Initializing{dots}
                </div>
            </motion.div>
        </div>
    );
};

export default SentinelLoader;
