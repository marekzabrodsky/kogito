import 'moment/locale/cs';

import React from 'react';
import Moment from 'react-moment';
import {StatusBar} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {ApolloProvider} from '@apollo/client';
import {NavigationContainer} from '@react-navigation/native';

import {AppStateTracking, logScreen} from './src/analytics';
import ApolloClient from './src/apollo/client';
import {ENV} from './src/env';
import {AuthProvider} from './src/modules/auth/auth-context';
import LogMoodModal from './src/modules/diary/modal/LogMoodModal/LogMoodModal';
import {getCurrentRoute, navigationRef} from './src/navigation';
import Navigation from './src/navigation/Navigation';

Moment.globalLocale = 'cs';
Moment.globalFormat = 'Do MMMM YYYY';

const onNavigationStateChange = () => {
  const routeName = getCurrentRoute()?.name;
  routeName && logScreen(routeName);
};
// TODO PROSTE SE SNAZ VIC HERMANE
const App = () => {
  console.log(`
  ----------------------------------------------------
  ----------------------------------------------------
  Running app with config
  ${JSON.stringify(ENV, null, 2)}
  ----------------------------------------------------
  ----------------------------------------------------  
  `);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <AppStateTracking />
      <NavigationContainer
        ref={navigationRef}
        onStateChange={onNavigationStateChange}>
        <AuthProvider>
          <ApolloProvider client={ApolloClient}>
            <StatusBar barStyle="dark-content" />
            <Navigation />
            <LogMoodModal />
          </ApolloProvider>
        </AuthProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
