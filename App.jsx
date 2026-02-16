import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Theme } from 'react-native-basic-elements';

// --- Redux Imports ---
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/Redux/store';

// --- Architecture Imports ---
import { arRealmTheme } from '@/Config/theme';
import AppStack from '@/Navigation/AppStack'; 

const Stack = createStackNavigator();

const App = () => {
  return (
    // 1. Inject the Redux Store
    <Provider store={store}>
      // 2. Delay rendering UI until persisted state is retrieved from Async Storage
      <PersistGate loading={null} persistor={persistor}>
        
        <SafeAreaProvider style={{ flex: 1 }}>
          <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent
          />
          <View style={{ flex: 1 }}>
            
            <Theme.Provider theme={arRealmTheme} mode="dark">
              <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="AppStack" component={AppStack} />
                </Stack.Navigator>
              </NavigationContainer>
            </Theme.Provider>

          </View>
        </SafeAreaProvider>

      </PersistGate>
    </Provider>
  );
};

export default App;