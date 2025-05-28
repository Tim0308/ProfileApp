import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ImageSourcePropType,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { EventCard } from '../components/EventCard';
import { ImageZoomModal } from '../components/ImageZoomModal';
import { UserProfile, Event } from '../types';
import { ProfileScreenNavigationProp } from '../types/navigation';
import profileData from '../data/profile.json';

interface ProfileScreenProps {
  navigation: ProfileScreenNavigationProp;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const [profile, setProfile] = useState<UserProfile>(profileData);
  const [profileImageUri, setProfileImageUri] = useState<string | null>(null);
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);

  const defaultProfileImage = require('../../assets/profilepic.png');

  const handleImagePress = useCallback(() => {
    setIsImageModalVisible(true);
  }, []);

  const handleImageChange = useCallback((newImageUri: string) => {
    setProfileImageUri(newImageUri);
  }, []);

  const handleUpdateProfile = useCallback((updatedProfile: UserProfile) => {
    setProfile(updatedProfile);
  }, []);

  const handleEditProfile = useCallback(() => {
    navigation.navigate('EditProfile', {
      profile,
      onUpdateProfile: handleUpdateProfile,
    });
  }, [navigation, profile, handleUpdateProfile]);

  const handleUpdateEvent = useCallback((updatedEvent: Event) => {
    setProfile(prevProfile => ({
      ...prevProfile,
      attendedEvents: prevProfile.attendedEvents.map(event =>
        event.id === updatedEvent.id ? updatedEvent : event
      ),
    }));
  }, []);

  const handleEventPress = useCallback((event: Event) => {
    navigation.navigate('EventDetail', {
      event,
      onUpdateEvent: handleUpdateEvent,
    });
  }, [navigation, handleUpdateEvent]);

  const renderEventCard = useCallback(({ item }: { item: Event }) => (
    <EventCard event={item} onPress={() => handleEventPress(item)} />
  ), [handleEventPress]);

  const getImageSource = useCallback((): ImageSourcePropType => {
    return profileImageUri ? { uri: profileImageUri } : defaultProfileImage;
  }, [profileImageUri, defaultProfileImage]);

  const getImageUriForModal = useCallback((): string => {
    return profileImageUri || Image.resolveAssetSource(defaultProfileImage).uri;
  }, [profileImageUri, defaultProfileImage]);

  const formatDate = useCallback((dateString?: string) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }, []);

  const calculateAge = useCallback((birthdate?: string) => {
    if (!birthdate) return null;
    const today = new Date();
    const birth = new Date(birthdate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={profile.attendedEvents}
        renderItem={renderEventCard}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={
          <View style={styles.profileContainer}>
            {/* Edit Button */}
            <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
              <MaterialIcons name="edit" size={20} color="#007AFF" />
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleImagePress}>
              <Image
                source={getImageSource()}
                style={styles.profileImage}
                defaultSource={require('../../assets/favicon.png')}
              />
            </TouchableOpacity>
            
            <Text style={styles.name}>{profile.name}</Text>
            {profile.occupation && (
              <Text style={styles.occupation}>{profile.occupation}</Text>
            )}
            {profile.location && (
              <View style={styles.locationContainer}>
                <MaterialIcons name="location-on" size={16} color="#666" />
                <Text style={styles.location}>{profile.location}</Text>
              </View>
            )}
            
            <Text style={styles.bio}>{profile.bio}</Text>

            {/* Personal Info Section */}
            <View style={styles.infoSection}>
              {profile.birthdate && (
                <View style={styles.infoRow}>
                  <MaterialIcons name="cake" size={16} color="#666" />
                  <Text style={styles.infoText}>
                    {formatDate(profile.birthdate)} ({calculateAge(profile.birthdate)} years old)
                  </Text>
                </View>
              )}
              {profile.email && (
                <View style={styles.infoRow}>
                  <MaterialIcons name="email" size={16} color="#666" />
                  <Text style={styles.infoText}>{profile.email}</Text>
                </View>
              )}
              {profile.phone && (
                <View style={styles.infoRow}>
                  <MaterialIcons name="phone" size={16} color="#666" />
                  <Text style={styles.infoText}>{profile.phone}</Text>
                </View>
              )}
            </View>

            {/* Interests Section */}
            {profile.interests && profile.interests.length > 0 && (
              <View style={styles.interestsSection}>
                <Text style={styles.interestsTitle}>Interests</Text>
                <View style={styles.interestsContainer}>
                  {profile.interests.map((interest, index) => (
                    <View key={index} style={styles.interestTag}>
                      <Text style={styles.interestText}>{interest}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
            
            <View style={styles.statsContainer}>
              <Text style={styles.eventsCount}>
                {profile.attendedEvents.length} Events Attended
              </Text>
            </View>

            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Past Events</Text>
            </View>
          </View>
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />

      <ImageZoomModal
        visible={isImageModalVisible}
        imageUri={getImageUriForModal()}
        onClose={() => setIsImageModalVisible(false)}
        onImageChange={handleImageChange}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    paddingBottom: 20,
  },
  profileContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  editButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    zIndex: 1,
  },
  editButtonText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#e0e0e0',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
    textAlign: 'center',
  },
  occupation: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  location: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  bio: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  infoSection: {
    alignSelf: 'stretch',
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingHorizontal: 20,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
    flex: 1,
  },
  interestsSection: {
    alignSelf: 'stretch',
    marginBottom: 20,
  },
  interestsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
  },
  interestTag: {
    backgroundColor: '#e3f2fd',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
  },
  interestText: {
    color: '#1976d2',
    fontSize: 12,
    fontWeight: '500',
  },
  statsContainer: {
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    marginBottom: 20,
  },
  eventsCount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
  },
  sectionHeader: {
    alignSelf: 'stretch',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
}); 