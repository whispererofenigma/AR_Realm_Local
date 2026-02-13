import React from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

// Import Screens
import HomeScreen from '@/Screens/Home/HomeScreen';
import ARWorkspaceScreen from '@/Screens/ARSpace/ARWorkspaceScreen';

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false, // We use custom headers in your architecture
        // A smooth fade or slide transition feels much better when opening a camera view
        cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
      }}
    >
      {/* Main Dashboard */}
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
      />

      {/* AR Camera Workspace */}
      <Stack.Screen 
        name="ARWorkspace" 
        component={ARWorkspaceScreen}
        options={{
          // We treat the AR screen like a full-screen modal
          presentation: 'transparentModal',
          gestureEnabled: false, // Disable swipe-to-back so users don't accidentally close the camera while panning 3D objects
        }}
      />
    </Stack.Navigator>
  );
};

export default AppStack;