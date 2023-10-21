import { Platform } from 'react-native';
import ErrorBoundary from 'react-native-error-boundary';
import { Provider as PaperProvider } from 'react-native-paper';
import { enGB, registerTranslation } from 'react-native-paper-dates';
import * as Sentry from '@sentry/react-native';
import SplashScreen from 'react-native-splash-screen';
import { QueryClient, QueryClientProvider, focusManager } from 'react-query';
import notifee, { AuthorizationStatus } from '@notifee/react-native';
import 'react-native-gesture-handler';
import './assets/i18n/i18n';
import { useEffect } from 'react';
import { Provider as UserProvider } from './src/contexts/userContext';
import { ErrorFallback } from './src/components/error-fallback/error-fallback';
import Navigation from './src/navigation';
import { useOnlineManager } from './src/hooks/useOnlineManager';
import { useAppState } from './src/hooks/useAppState';
import useInitFCM from './src/hooks/useInitFCM';

Sentry.init({
  dsn: 'https://efc5604af7f94d5783b9f7068d8462f7@o4504313404915712.ingest.sentry.io/4504313407930369',
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

async function requestUserPermission() {
  try {
    const settings = await notifee.requestPermission();
    if (settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
      console.log('Permission settings:', settings);
    } else {
      console.log('User declined permissions', settings);
    }
  } catch (error) {
    console.error(error);
  }
}
export default function App() {
  useEffect(() => {
    requestUserPermission();
    SplashScreen.hide();
  }, []);

  useOnlineManager();
  useAppState(onAppStateChange);
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
