import ErrorBoundary from 'react-native-error-boundary';
import { Provider as PaperProvider } from 'react-native-paper';
import { enGB, registerTranslation } from 'react-native-paper-dates';
import * as Sentry from '@sentry/react-native';
import SplashScreen from 'react-native-splash-screen';

import 'react-native-gesture-handler';
import './assets/i18n/i18n';
import { useEffect } from 'react';
import { Provider as UserProvider } from './src/contexts/userContext';
import { ErrorFallback } from './src/components/error-fallback/error-fallback';
import Navigation from './src/navigation';

Sentry.init({
  dsn: 'https://efc5604af7f94d5783b9f7068d8462f7@o4504313404915712.ingest.sentry.io/4504313407930369',
});

registerTranslation('en-GB', enGB);

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <PaperProvider>
        <UserProvider>
          <Navigation />
        </UserProvider>
      </PaperProvider>
    </ErrorBoundary>
  );
}
