import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Event, UserProfile } from './index';

// Navigation parameter list for the app's stack navigator
// Note: The callback functions in navigation params will trigger warnings about
// non-serializable values. This is expected and acceptable for our use case
// as we need to pass callbacks for data synchronization between screens.
export type RootStackParamList = {
  Profile: {
    profile: UserProfile;
  };
  EventDetail: {
    event: Event;
  };
  EditProfile: {
    profile: UserProfile;
    onUpdateProfile: (updatedProfile: UserProfile) => void;
  };
};

export type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Profile'
>;

export type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Profile'>;

export type EventDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'EventDetail'
>;

export type EventDetailScreenRouteProp = RouteProp<RootStackParamList, 'EventDetail'>;

export type EditProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'EditProfile'
>;

export type EditProfileScreenRouteProp = RouteProp<RootStackParamList, 'EditProfile'>; 