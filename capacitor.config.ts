import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.lovingpaws.app',
  appName: 'LovingPaws',
  webDir: 'dist',
  server: {
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
