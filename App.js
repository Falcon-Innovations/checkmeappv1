/* eslint-disable global-require */
import { Platform } from 'react-native';
import ErrorBoundary from 'react-native-error-boundary';
import { Provider as PaperProvider } from 'react-native-paper';
import { enGB, registerTranslation } from 'react-native-paper-dates';
import * as Sentry from '@sentry/react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { QueryClient, QueryClientProvider, focusManager } from 'react-query';
import 'react-native-gesture-handler';
import './assets/i18n/i18n';
import { useEffect, useCallback } from 'react';
import { Provider as UserProvider } from './src/contexts/userContext';
import { ErrorFallback } from './src/components/error-fallback/error-fallback';
import Navigation from './src/navigation';
import { useOnlineManager } from './src/hooks/useOnlineManager';
import { useAppState } from './src/hooks/useAppState';
// import useInitFCM from './src/hooks/useInitFCM';

Sentry.init({
  dsn: 'https://efc5604af7f94d5783b9f7068d8462f7@o4504313404915712.ingest.sentry.io/4504313407930369',
  enableNative: false,
});

registerTranslation('en-GB', enGB);

export const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 2 } },
});

function onAppStateChange(status) {
  // React Query already supports in web browser refetch on window focus by default
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active');
  }
}

export default function App() {
  useOnlineManager();
  useAppState(onAppStateChange);

  const [fontsLoaded, fontError] = useFonts({
    Poppins_Regular: require('./assets/fonts/Poppins-Regular.ttf'),
    Poppins_Medium: require('./assets/fonts/Poppins-Medium.ttf'),
    Poppins_SemiBold: require('./assets/fonts/Poppins-SemiBold.ttf'),
    Poppins_Bold: require('./assets/fonts/Poppins-Bold.ttf'),
  });

  async function checkFontsStatus() {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }

  useEffect(() => {
    checkFontsStatus();
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  // useInitFCM();

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <QueryClientProvider client={queryClient}>
        <PaperProvider>
          <UserProvider>
            <Navigation />
          </UserProvider>
        </PaperProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
