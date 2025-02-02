import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'recipe-finder',
  webDir: 'www',
  plugins: { 
    CapacitorHttp: { 
      enabled: true,
    }
  }
};

export default config;
