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
  ScrollView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { EventCard } from '../components/EventCard';
import { ImageZoomModal } from '../components/ImageZoomModal';
import { AnimatedButton } from '../components/AnimatedButton';
import { AnimatedCard } from '../components/AnimatedCard';
import { UserProfile, Event } from '../types';
import { ProfileScreenNavigationProp, ProfileScreenRouteProp } from '../types/navigation';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../styles/theme';

interface ProfileScreenProps {
  navigation: ProfileScreenNavigationProp;
  route: ProfileScreenRouteProp;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation, route }) => {
  const [profile, setProfile] = useState<UserProfile>(route.params.profile);
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

  const handleEventPress = useCallback((event: Event) => {
    navigation.navigate('EventDetail', {
      event,
    });
  }, [navigation]);

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

  const renderHeader = () => (
    <LinearGradient
      colors={Colors.gradients.primary as [string, string]}
      style={styles.headerGradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView style={styles.headerSafeArea}>
        <View style={styles.headerContent}>
          {/* Edit Button */}
          <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
            <MaterialIcons name="edit" size={18} color={Colors.text.white} />
          </TouchableOpacity>

          {/* Profile Image */}
          <TouchableOpacity onPress={handleImagePress} style={styles.imageContainer}>
            <Image
              source={getImageSource()}
              style={styles.profileImage}
              defaultSource={require('../../assets/favicon.png')}
            />
            <View style={styles.imageOverlay}>
              <MaterialIcons name="camera-alt" size={20} color={Colors.text.white} />
            </View>
          </TouchableOpacity>
          
          <Text style={styles.name}>{profile.name}</Text>
          {profile.occupation && (
            <Text style={styles.occupation}>{profile.occupation}</Text>
          )}
          {profile.location && (
            <View style={styles.locationContainer}>
              <MaterialIcons name="location-on" size={16} color={Colors.text.white} />
              <Text style={styles.location}>{profile.location}</Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );

  const renderPersonalInfo = () => (
    <AnimatedCard style={styles.infoCard}>
      <Text style={styles.sectionTitle}>About</Text>
      <Text style={styles.bio}>{profile.bio}</Text>

      {/* Personal Details */}
      <View style={styles.detailsContainer}>
        {profile.birthdate && (
          <View style={styles.detailRow}>
            <View style={styles.iconWrapper}>
              <MaterialIcons name="cake" size={18} color={Colors.primary} />
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Birthday</Text>
              <Text style={styles.detailValue}>
                {formatDate(profile.birthdate)} • {calculateAge(profile.birthdate)} years old
              </Text>
            </View>
          </View>
        )}
        
        {profile.email && (
          <View style={styles.detailRow}>
            <View style={styles.iconWrapper}>
              <MaterialIcons name="email" size={18} color={Colors.primary} />
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Email</Text>
              <Text style={styles.detailValue}>{profile.email}</Text>
            </View>
          </View>
        )}
        
        {profile.phone && (
          <View style={styles.detailRow}>
            <View style={styles.iconWrapper}>
              <MaterialIcons name="phone" size={18} color={Colors.primary} />
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Phone</Text>
              <Text style={styles.detailValue}>{profile.phone}</Text>
            </View>
          </View>
        )}
      </View>
    </AnimatedCard>
  );

  const renderInterests = () => {
    if (!profile.interests || profile.interests.length === 0) return null;
    
    return (
      <AnimatedCard style={styles.interestsCard}>
        <Text style={styles.sectionTitle}>Interests</Text>
        <View style={styles.interestsContainer}>
          {profile.interests.map((interest, index) => (
            <View key={index} style={styles.interestTag}>
              <Text style={styles.interestText}>{interest}</Text>
            </View>
          ))}
        </View>
      </AnimatedCard>
    );
  };

  const renderStats = () => (
    <AnimatedCard style={styles.statsCard}>
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{profile.attendedEvents.length}</Text>
          <Text style={styles.statLabel}>Events Attended</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>
            {profile.attendedEvents.filter(e => e.rated).length}
          </Text>
          <Text style={styles.statLabel}>Events Rated</Text>
        </View>
      </View>
    </AnimatedCard>
  );

  const renderEventsHeader = () => (
    <View style={styles.eventsHeader}>
      <Text style={styles.eventsTitle}>Past Events</Text>
      <Text style={styles.eventsSubtitle}>
        Tap any event to view details and rate your experience
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {renderHeader()}
        
        <View style={styles.contentContainer}>
          {renderPersonalInfo()}
          {renderInterests()}
          {renderStats()}
          {renderEventsHeader()}
          
          {/* Events List */}
          {profile.attendedEvents.map((event, index) => (
            <EventCard
              key={event.id}
              event={event}
              onPress={() => handleEventPress(event)}
            />
          ))}
          
          <View style={styles.bottomSpacer} />
        </View>
      </ScrollView>

      <ImageZoomModal
        visible={isImageModalVisible}
        imageUri={getImageUriForModal()}
        onClose={() => setIsImageModalVisible(false)}
        onImageChange={handleImageChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  headerGradient: {
    paddingBottom: Spacing['2xl'],
  },
  headerSafeArea: {
    paddingTop: Spacing.base,
  },
  headerContent: {
    alignItems: 'center',
    paddingHorizontal: Spacing.base,
    paddingBottom: Spacing.lg,
  },
  editButton: {
    position: 'absolute',
    top: 0,
    right: Spacing.base,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: Spacing.md,
    borderRadius: BorderRadius.full,
    zIndex: 1,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: Spacing.lg,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: Colors.text.white,
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.primary,
    padding: Spacing.sm,
    borderRadius: BorderRadius.full,
    borderWidth: 2,
    borderColor: Colors.text.white,
  },
  name: {
    fontSize: Typography.size['3xl'],
    fontWeight: Typography.weight.bold as any,
    color: Colors.text.white,
    marginBottom: Spacing.xs,
    textAlign: 'center',
  },
  occupation: {
    fontSize: Typography.size.lg,
    fontWeight: Typography.weight.medium as any,
    color: Colors.text.white,
    marginBottom: Spacing.sm,
    textAlign: 'center',
    opacity: 0.9,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontSize: Typography.size.base,
    color: Colors.text.white,
    marginLeft: Spacing.xs,
    opacity: 0.8,
  },
  contentContainer: {
    marginTop: -Spacing.xl,
    paddingHorizontal: Spacing.base,
  },
  infoCard: {
    marginBottom: Spacing.base,
  },
  sectionTitle: {
    fontSize: Typography.size.xl,
    fontWeight: Typography.weight.bold as any,
    color: Colors.text.primary,
    marginBottom: Spacing.base,
  },
  bio: {
    fontSize: Typography.size.base,
    color: Colors.text.secondary,
    lineHeight: Typography.size.base * Typography.lineHeight.relaxed,
    marginBottom: Spacing.lg,
  },
  detailsContainer: {
    gap: Spacing.base,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.primaryUltraLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.medium as any,
    color: Colors.text.tertiary,
    marginBottom: 2,
  },
  detailValue: {
    fontSize: Typography.size.base,
    color: Colors.text.primary,
  },
  interestsCard: {
    marginBottom: Spacing.base,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  interestTag: {
    backgroundColor: Colors.primaryUltraLight,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.sm,
  },
  interestText: {
    color: Colors.primary,
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.medium as any,
  },
  statsCard: {
    marginBottom: Spacing.lg,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: Typography.size['2xl'],
    fontWeight: Typography.weight.bold as any,
    color: Colors.primary,
    marginBottom: Spacing.xs,
  },
  statLabel: {
    fontSize: Typography.size.sm,
    color: Colors.text.secondary,
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: Colors.border.light,
    marginHorizontal: Spacing.lg,
  },
  eventsHeader: {
    marginBottom: Spacing.lg,
  },
  eventsTitle: {
    fontSize: Typography.size.xl,
    fontWeight: Typography.weight.bold as any,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  eventsSubtitle: {
    fontSize: Typography.size.base,
    color: Colors.text.secondary,
  },
  bottomSpacer: {
    height: Spacing['2xl'],
  },
}); 