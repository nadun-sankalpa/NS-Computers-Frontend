import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { CheckCircle, X, Sparkles } from 'lucide-react';

interface AuthNotificationProps {
  onClose: () => void;
  visible: boolean;
}

export function AuthNotification({ onClose, visible }: AuthNotificationProps) {
  const { user } = useAuth();
  const [isVisible, setIsVisible] = useState(visible);
  const [progress, setProgress] = useState(100);
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, size: number, delay: number}>>([]);
  
  // Sync local visibility with prop and handle animations
  useEffect(() => {
    if (visible && !isVisible) {
      // When becoming visible, generate new particles and show
      const newParticles = Array.from({ length: 15 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 0.5
      }));
      setParticles(newParticles);
      
      // Set visible after a small delay to allow for animation
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 10);
      
      return () => clearTimeout(timer);
    } else if (!visible && isVisible) {
      // When hiding, let the animation complete before updating state
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [visible, isVisible]);

  // Handle progress bar and auto-close
  useEffect(() => {
    if (!visible) return;
    
    setProgress(100);
    
    // Progress bar animation
    const interval = setInterval(() => {
      setProgress(prev => Math.max(0, prev - 1));
    }, 50);
    
    // Auto-close after 5 seconds
    const timer = setTimeout(() => {
      handleClose();
    }, 5000);
    
    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [visible]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose(), 300); // Wait for exit animation
  };

  if (!visible && !isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-[1000] w-80">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: -100, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -50, opacity: 0, scale: 0.9 }}
            transition={{ 
              type: 'spring', 
              stiffness: 400, 
              damping: 25,
              duration: 0.3
            }}
            className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 shadow-2xl border border-gray-700"
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-blue-500/10" />
            
            {/* Decorative elements */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-red-500/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl" />
            
            {/* Floating particles */}
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute bg-white/20 rounded-full"
                style={{
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  top: `${particle.y}%`,
                  left: `${particle.x}%`,
                }}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 0.8, 0],
                  y: [0, -20, -40],
                  x: [0, (Math.random() - 0.5) * 20],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: particle.delay,
                  ease: 'easeOut',
                }}
              />
            ))}

            {/* Close button */}
            <motion.button
              onClick={handleClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-3 right-3 p-1.5 rounded-full bg-gray-800/80 text-gray-300 hover:text-white hover:bg-gray-700/90 transition-all z-10"
            >
              <X className="h-4 w-4" />
            </motion.button>

            <div className="relative z-10 p-5">
              <div className="flex items-start space-x-3">
                {/* Animated checkmark */}
                <motion.div 
                  className="flex-shrink-0"
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    type: 'spring',
                    stiffness: 300,
                    damping: 15,
                    delay: 0.2
                  }}
                >
                  <div className="p-2 rounded-full bg-gradient-to-br from-red-500 to-blue-600 shadow-lg">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                </motion.div>

                <div className="flex-1">
                  <motion.h3 
                    className="text-lg font-bold text-white"
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    Welcome back, {user?.name?.split(' ')[0] || 'Valued Customer'}! 👋
                  </motion.h3>
                  <motion.p 
                    className="mt-1 text-sm text-gray-300"
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    You've successfully signed in to NS Computers.
                  </motion.p>
                  
                  {/* Progress bar */}
                  <motion.div 
                    className="mt-3 h-1 bg-gray-800 rounded-full overflow-hidden"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <motion.div 
                      className="h-full bg-gradient-to-r from-red-500 via-purple-500 to-blue-500"
                      initial={{ width: '100%' }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 5, ease: 'linear' }}
                    />
                  </motion.div>
                </div>
              </div>
              
              {/* Sparkles effect */}
              <motion.div 
                className="absolute -top-2 -right-2 text-yellow-400"
                initial={{ scale: 0, rotate: 0 }}
                animate={{ scale: 1, rotate: 360 }}
                transition={{ 
                  type: 'spring',
                  stiffness: 300,
                  damping: 20,
                  delay: 0.5
                }}
              >
                <Sparkles className="h-5 w-5" />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
