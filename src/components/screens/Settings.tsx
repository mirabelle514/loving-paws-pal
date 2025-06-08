
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bell, User, Shield, Info, Heart } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { User as UserType } from '@/types';
import { userStorage } from '@/lib/storage';

const Settings = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notifications: true,
    units: 'metric' as 'metric' | 'imperial',
    theme: 'light' as 'light' | 'dark' | 'system'
  });

  useEffect(() => {
    const savedUser = userStorage.get();
    if (savedUser) {
      setUser(savedUser);
      setFormData({
        name: savedUser.name,
        email: savedUser.email,
        phone: savedUser.phone || '',
        notifications: savedUser.preferences.notifications,
        units: savedUser.preferences.units,
        theme: savedUser.preferences.theme
      });
    }
  }, []);

  const handleSave = () => {
    const userData: UserType = {
      id: user?.id || Date.now().toString(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      preferences: {
        notifications: formData.notifications,
        units: formData.units,
        theme: formData.theme
      },
      createdAt: user?.createdAt || new Date().toISOString()
    };

    userStorage.save(userData);
    setUser(userData);
    
    toast({
      title: "Settings Saved! ✨",
      description: "Your preferences have been updated",
    });
  };

  return (
    <motion.div 
      className="p-4 space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Header */}
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Settings</h2>
        <p className="text-gray-600 text-sm">Customize your LovingPaws experience</p>
      </div>

      {/* Profile Section */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <User className="w-5 h-5 text-purple-600" />
          Profile Information
        </h3>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="Your name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+1 234 567 8900"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </div>
        </div>
      </Card>

      {/* Preferences Section */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Bell className="w-5 h-5 text-blue-600" />
          Preferences
        </h3>
        
        <div className="space-y-6">
          {/* Notifications */}
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium">Push Notifications</Label>
              <p className="text-sm text-gray-500">Get reminders for your pet's health</p>
            </div>
            <Switch
              checked={formData.notifications}
              onCheckedChange={(checked) => setFormData({...formData, notifications: checked})}
            />
          </div>
          
          {/* Units */}
          <div className="space-y-2">
            <Label>Measurement Units</Label>
            <Select value={formData.units} onValueChange={(value: any) => setFormData({...formData, units: value})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="metric">Metric (kg, cm, °C)</SelectItem>
                <SelectItem value="imperial">Imperial (lbs, in, °F)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Theme */}
          <div className="space-y-2">
            <Label>App Theme</Label>
            <Select value={formData.theme} onValueChange={(value: any) => setFormData({...formData, theme: value})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Data & Privacy */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-green-600" />
          Data & Privacy
        </h3>
        
        <div className="space-y-4">
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="text-sm text-green-700">
              <strong>Privacy First:</strong> All your pet's data is stored locally on your device. 
              We don't collect or share any personal information.
            </p>
          </div>
          
          <Button 
            variant="outline" 
            className="w-full border-red-300 text-red-600 hover:bg-red-50"
            onClick={() => {
              if (window.confirm('Are you sure? This will delete all your data permanently.')) {
                localStorage.clear();
                window.location.reload();
              }
            }}
          >
            Clear All Data
          </Button>
        </div>
      </Card>

      {/* About */}
      <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Heart className="w-5 h-5 text-purple-600 fill-current" />
          About LovingPaws
        </h3>
        
        <div className="text-center space-y-3">
          <div className="text-4xl mb-2">🐾</div>
          <p className="text-gray-700 text-sm">
            Made with love for pet parents everywhere. Track your furry friend's health 
            and happiness with our simple, beautiful app.
          </p>
          <p className="text-xs text-gray-500">Version 1.0.0</p>
        </div>
      </Card>

      {/* Save Button */}
      <Button 
        onClick={handleSave}
        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 h-12"
      >
        Save Settings
      </Button>
    </motion.div>
  );
};

export default Settings;
