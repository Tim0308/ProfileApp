import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Event, UserProfile } from './index';

export type RootStackParamList = {
  Profile: undefined;
  EventDetail: {
    event: Event;
    onUpdateEvent: (updatedEvent: Event) => void;
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