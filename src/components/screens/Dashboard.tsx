
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Activity, Calendar, Plus, Bell } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pet, HealthEntry } from '@/types';
import { petStorage, healthStorage } from '@/lib/storage';

interface DashboardProps {
  onNavigate: (page: string) => void;
}

const Dashboard = ({ onNavigate }: DashboardProps) => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [recentEntries, setRecentEntries] = useState<HealthEntry[]>([]);

  useEffect(() => {
    setPets(petStorage.getAll());
    const allEntries = healthStorage.getAll();
    setRecentEntries(allEntries.slice(-5).reverse());
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="p-4 space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Welcome Section */}
      <motion.div variants={cardVariants}>
        <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 border-0">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold mb-2">Welcome back! 👋</h2>
              <p className="text-purple-100">
                {pets.length === 0 
                  ? "Let's add your first pet to get started"
                  : `You have ${pets.length} ${pets.length === 1 ? 'pet' : 'pets'} to care for`
                }
              </p>
            </div>
            <motion.div 
              className="text-4xl"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              🐕
            </motion.div>
          </div>
        </Card>
      </motion.div>

      {/* Quick Stats */}
      <motion.div variants={cardVariants}>
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-500 rounded-lg">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-emerald-600 font-medium">Total Pets</p>
                <p className="text-2xl font-bold text-emerald-700">{pets.length}</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-500 rounded-lg">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-orange-600 font-medium">Health Logs</p>
                <p className="text-2xl font-bold text-orange-700">{healthStorage.getAll().length}</p>
              </div>
            </div>
          </Card>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={cardVariants}>
        <h3 className="text-lg font-semibold mb-3 text-gray-800">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          <Button 
            onClick={() => onNavigate('add-entry')}
            className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 h-auto py-4 flex-col gap-2"
          >
            <Plus className="w-6 h-6" />
            <span className="text-sm">Log Health</span>
          </Button>
          
          <Button 
            onClick={() => onNavigate('pets')}
            variant="outline"
            className="h-auto py-4 flex-col gap-2 border-purple-200 hover:bg-purple-50"
          >
            <Calendar className="w-6 h-6 text-purple-600" />
            <span className="text-sm text-purple-600">View Pets</span>
          </Button>
        </div>
      </motion.div>

      {/* Your Pets */}
      {pets.length > 0 && (
        <motion.div variants={cardVariants}>
          <h3 className="text-lg font-semibold mb-3 text-gray-800">Your Pets</h3>
          <div className="space-y-3">
            {pets.slice(0, 3).map((pet) => (
              <Card key={pet.id} className="p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                    <span className="text-white text-lg">
                      {pet.species === 'dog' ? '🐕' : pet.species === 'cat' ? '🐱' : '🐾'}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{pet.name}</h4>
                    <p className="text-sm text-gray-500 capitalize">
                      {pet.species} • {pet.age} years old
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-700">{pet.weight}kg</p>
                    <p className="text-xs text-gray-400">Weight</p>
                  </div>
                </div>
              </Card>
            ))}
            {pets.length > 3 && (
              <Button 
                variant="ghost" 
                onClick={() => onNavigate('pets')}
                className="w-full text-purple-600 hover:text-purple-700 hover:bg-purple-50"
              >
                View all {pets.length} pets
              </Button>
            )}
          </div>
        </motion.div>
      )}

      {/* Recent Activity */}
      {recentEntries.length > 0 && (
        <motion.div variants={cardVariants}>
          <h3 className="text-lg font-semibold mb-3 text-gray-800">Recent Activity</h3>
          <div className="space-y-2">
            {recentEntries.map((entry) => {
              const pet = pets.find(p => p.id === entry.petId);
              return (
                <Card key={entry.id} className="p-3 bg-gradient-to-r from-gray-50 to-white">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <Activity className="w-4 h-4 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">
                        {pet?.name} - {entry.type.replace('_', ' ')}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(entry.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Getting Started */}
      {pets.length === 0 && (
        <motion.div variants={cardVariants}>
          <Card className="p-6 text-center bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
            <motion.div 
              className="text-4xl mb-4"
              animate={{ bounce: [0, -10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
            >
              🏠
            </motion.div>
            <h3 className="text-lg font-semibold mb-2 text-gray-800">Get Started</h3>
            <p className="text-gray-600 mb-4 text-sm">
              Add your first pet to start tracking their health and happiness
            </p>
            <Button 
              onClick={() => onNavigate('pets')}
              className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
            >
              Add Your First Pet
            </Button>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Dashboard;
