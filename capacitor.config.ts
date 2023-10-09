import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ionic.deeplink',
  appName: 'deeplink',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
