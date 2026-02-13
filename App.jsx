import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Theme } from 'react-native-basic-elements';
import { arRealmTheme } from '@/Config/theme';
// Assuming you set up standard navigation stacks
import AppStack from '@/Navigation/AppStack'; 
import NavigationService from '@/Services/Navigation';

const Stack = createStackNavigator();

const App = () => {
  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <View style={{ flex: 1 }}>
        <Theme.Provider theme={arRealmTheme} mode="dark">
          <NavigationContainer
            ref={r => NavigationService.setTopLevelNavigator(r)}
          >
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              {/* Keep routing clean, AR screens will be inside AppStack */}
              <Stack.Screen name="AppStack" component={AppStack} />
            </Stack.Navigator>
          </NavigationContainer>
        </Theme.Provider>
      </View>
    </SafeAreaProvider>
  );
};

export default App;