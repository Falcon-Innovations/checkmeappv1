import ErrorBoundary from 'react-native-error-boundary';
import {Provider as PaperProvider} from 'react-native-paper';
import {enGB, registerTranslation} from 'react-native-paper-dates';

import './assets/i18n/i18n';
import Navigation from './src/navigation/ScreenNavigator';
import {Provider as UserProvider} from './src/contexts/userContext';
import {ErrorFallback} from './src/components/error-fallback/error-fallback';

import SplashScreen from 'react-native-splash-screen';
import {useEffect} from 'react';

// import {NetworkGuard} from './src/components/';

registerTranslation('en-GB', enGB);

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <PaperProvider>
        {/* <NetworkGuard> */}
        <UserProvider>
          <Navigation />
        </UserProvider>
        {/* </NetworkGuard> */}
      </PaperProvider>
    </ErrorBoundary>
  );
}
