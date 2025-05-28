import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { EventDetailScreen } from './src/screens/EventDetailScreen';
import { EditProfileScreen } from './src/screens/EditProfileScreen';
import { RootStackParamList } from './src/types/navigation';
import profileData from './src/data/profile.json';
import { NavigationState, PartialState } from '@react-navigation/native';

const Stack = createStackNavigator<RootStackParamList>();

interface UpdateEventAction {
  type: 'UPDATE_EVENT';
  payload: any;
}

export default function App() {
  const [profile, setProfile] = useState(profileData);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Profile"
        screenListeners={{
          state: (e) => {
            const state = e.data.state as NavigationState;
            const lastAction = state.routes[0].state?.routes.slice(-1)[0]?.params as UpdateEventAction;
            
            if (lastAction?.type === 'UPDATE_EVENT') {
              setProfile(prevProfile => ({
                ...prevProfile,
                attendedEvents: prevProfile.attendedEvents.map(event =>
                  event.id === lastAction.payload.id ? lastAction.payload : event
                ),
              }));
            }
          },
        }}
        screenOptions={{
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: '#333',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          initialParams={{ profile }}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="EventDetail"
          component={EventDetailScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfileScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
