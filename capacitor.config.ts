
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.9e275ef52047407799bc1bb9f784ab8a',
  appName: 'LovingPaws',
  webDir: 'dist',
  server: {
    url: 'https://9e275ef5-2047-4077-99bc-1bb9f784ab8a.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      backgroundColor: '#8B5CF6',
      androidSplashResourceName: 'splash',
      showSpinner: false
    }
  }
};

export default config;
