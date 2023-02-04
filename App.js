import ErrorBoundary from 'react-native-error-boundary';
import {Provider as PaperProvider} from 'react-native-paper';
import {enGB, registerTranslation} from 'react-native-paper-dates';
import SplashScreen from 'react-native-splash-screen';

import 'react-native-gesture-handler';
import './assets/i18n/i18n';
import {Provider as UserProvider} from './src/contexts/userContext';
import {ErrorFallback} from './src/components/error-fallback/error-fallback';
import {useEffect} from 'react';
import Navigation from './src/navigation';

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
