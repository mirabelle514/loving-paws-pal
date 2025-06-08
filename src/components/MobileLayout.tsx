
import { ReactNode } from 'react';
import { Home, Plus, User, BarChart3, Stethoscope, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

interface MobileLayoutProps {
  children: ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
}

const MobileLayout = ({ children, currentPage, onNavigate }: MobileLayoutProps) => {
  const navItems = [
    { id: 'dashboard', icon: Home, label: 'Home' },
    { id: 'add-entry', icon: Plus, label: 'Add' },
    { id: 'pets', icon: User, label: 'Pets' },
    { id: 'analytics', icon: BarChart3, label: 'Charts' },
    { id: 'vets', icon: Stethoscope, label: 'Vets' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex flex-col max-w-md mx-auto">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-purple-100 px-4 py-3 sticky top-0 z-50">
        <div className="flex items-center justify-center">
          <motion.div 
            className="flex items-center gap-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">🐾</span>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              LovingPaws
            </h1>
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-white/90 backdrop-blur-md border-t border-purple-100 px-2 py-2 sticky bottom-0">
        <div className="flex justify-around items-center">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <motion.button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex flex-col items-center px-3 py-2 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'text-purple-600 bg-purple-50' 
                    : 'text-gray-400 hover:text-gray-600'
                }`}
                whilePressed={{ scale: 0.95 }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'fill-current' : ''}`} />
                <span className="text-xs mt-1 font-medium">{item.label}</span>
                {isActive && (
                  <motion.div
                    className="w-1 h-1 bg-purple-600 rounded-full mt-1"
                    layoutId="activeIndicator"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default MobileLayout;
