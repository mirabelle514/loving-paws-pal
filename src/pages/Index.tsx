
import { useState } from 'react';
import MobileLayout from '@/components/MobileLayout';
import Dashboard from '@/components/screens/Dashboard';
import AddEntry from '@/components/screens/AddEntry';
import PetProfile from '@/components/screens/PetProfile';
import Analytics from '@/components/screens/Analytics';
import Veterinarians from '@/components/screens/Veterinarians';
import Settings from '@/components/screens/Settings';

const Index = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentPage} />;
      case 'add-entry':
        return <AddEntry />;
      case 'pets':
        return <PetProfile />;
      case 'analytics':
        return <Analytics />;
      case 'vets':
        return <Veterinarians />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard onNavigate={setCurrentPage} />;
    }
  };

  return (
    <MobileLayout currentPage={currentPage} onNavigate={setCurrentPage}>
      {renderCurrentPage()}
    </MobileLayout>
  );
};

export default Index;
