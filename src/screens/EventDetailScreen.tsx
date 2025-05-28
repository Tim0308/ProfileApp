import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
  Animated,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { MaterialIcons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { LinearGradient } from 'expo-linear-gradient';
import { Event } from '../types';
import { AnimatedCard } from '../components/AnimatedCard';
import { AnimatedButton } from '../components/AnimatedButton';
import { 
  EventDetailScreenNavigationProp, 
  EventDetailScreenRouteProp 
} from '../types/navigation';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../styles/theme';

interface EventDetailScreenProps {
  navigation: EventDetailScreenNavigationProp;
  route: EventDetailScreenRouteProp;
}

export const EventDetailScreen: React.FC<EventDetailScreenProps> = ({
  route,
  navigation,
}) => {
  const { event, onUpdateEvent } = route.params;
  const [currentEvent, setCurrentEvent] = useState(event);

  const formatDate = useCallback((dateString: string) => {
    const date = new Date(dateString);
    return {
      full: format(date, 'EEEE, MMMM d, yyyy \'at\' h:mm a'),
      day: format(date, 'd'),
      month: format(date, 'MMM'),
      year: format(date, 'yyyy'),
      time: format(date, 'h:mm a'),
    };
  }, []);

  const handleRating = useCallback((rating: number) => {
    const updatedEvent = {
      ...currentEvent,
      rated: true,
      rating: rating,
    };
    setCurrentEvent(updatedEvent);
    onUpdateEvent(updatedEvent);
    Alert.alert('Rating Saved', `You rated this event ${rating} star${rating !== 1 ? 's' : ''}!`);
  }, [currentEvent, onUpdateEvent]);

  const renderStars = useCallback(() => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const isSelected = currentEvent.rating && i <= currentEvent.rating;
      stars.push(
        <TouchableOpacity
          key={i}
          onPress={() => handleRating(i)}
          style={[styles.starButton, isSelected ? styles.starButtonSelected : null]}
        >
          <MaterialIcons
            name="star"
            size={32}
            color={isSelected ? Colors.star : Colors.starInactive}
          />
        </TouchableOpacity>
      );
    }
    return stars;
  }, [currentEvent.rating, handleRating]);

  const { full: fullDate, day, month, year, time } = formatDate(currentEvent.date);

  const mapRegion = currentEvent.coordinates
    ? {
        latitude: currentEvent.coordinates.latitude,
        longitude: currentEvent.coordinates.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }
    : null;

  const renderHeader = () => (
    <LinearGradient
      colors={Colors.gradients.primary as [string, string]}
      style={styles.headerGradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView style={styles.headerSafeArea}>
        <View style={styles.headerContent}>
          <TouchableOpacity
            onPress={navigation.goBack}
            style={styles.backButton}
          >
            <MaterialIcons name="arrow-back" size={24} color={Colors.text.white} />
          </TouchableOpacity>
          
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Event Details</Text>
            {currentEvent.rated && (
              <View style={styles.ratedBadge}>
                <MaterialIcons name="star" size={16} color={Colors.star} />
                <Text style={styles.ratedText}>Rated {currentEvent.rating}/5</Text>
              </View>
            )}
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );

  const renderEventInfo = () => (
    <AnimatedCard style={styles.eventCard}>
      {/* Date Badge */}
      <View style={styles.dateBadgeContainer}>
        <View style={styles.dateBadge}>
          <Text style={styles.dateDay}>{day}</Text>
          <Text style={styles.dateMonth}>{month}</Text>
          <Text style={styles.dateYear}>{year}</Text>
        </View>
      </View>

      <Text style={styles.eventTitle}>{currentEvent.title}</Text>
      <Text style={styles.eventDescription}>{currentEvent.description}</Text>
      
      <View style={styles.infoRow}>
        <View style={styles.iconWrapper}>
          <MaterialIcons name="location-on" size={20} color={Colors.primary} />
        </View>
        <View style={styles.infoContent}>
          <Text style={styles.infoLabel}>Location</Text>
          <Text style={styles.infoValue}>{currentEvent.location}</Text>
        </View>
      </View>

      <View style={styles.infoRow}>
        <View style={styles.iconWrapper}>
          <MaterialIcons name="schedule" size={20} color={Colors.primary} />
        </View>
        <View style={styles.infoContent}>
          <Text style={styles.infoLabel}>Time</Text>
          <Text style={styles.infoValue}>{time}</Text>
        </View>
      </View>
    </AnimatedCard>
  );

  const renderRatingSection = () => (
    <AnimatedCard style={styles.ratingCard}>
      <View style={styles.ratingHeader}>
        <MaterialIcons name="star-rate" size={24} color={Colors.accent} />
        <Text style={styles.ratingTitle}>Rate Your Experience</Text>
      </View>
      
      <Text style={styles.ratingSubtitle}>
        How was your experience at this event?
      </Text>
      
      <View style={styles.starsContainer}>
        {renderStars()}
      </View>
      
      {currentEvent.rating && (
        <View style={styles.currentRatingContainer}>
          <Text style={styles.currentRatingText}>
            Your rating: {currentEvent.rating} out of 5 stars
          </Text>
          <Text style={styles.thankYouText}>Thank you for your feedback!</Text>
        </View>
      )}
    </AnimatedCard>
  );

  const renderMapSection = () => {
    if (!mapRegion) return null;
    
    return (
      <AnimatedCard style={styles.mapCard}>
        <View style={styles.mapHeader}>
          <MaterialIcons name="map" size={24} color={Colors.secondary} />
          <Text style={styles.mapTitle}>Event Location</Text>
        </View>
        
        <View style={styles.mapContainer}>
          <MapView style={styles.map} region={mapRegion}>
            <Marker
              coordinate={currentEvent.coordinates!}
              title={currentEvent.title}
              description={currentEvent.location}
            />
          </MapView>
        </View>
        
        <View style={styles.mapFooter}>
          <Text style={styles.mapAddress}>{currentEvent.location}</Text>
          <TouchableOpacity style={styles.directionsButton}>
            <MaterialIcons name="directions" size={16} color={Colors.primary} />
            <Text style={styles.directionsText}>Get Directions</Text>
          </TouchableOpacity>
        </View>
      </AnimatedCard>
    );
  };

  return (
    <View style={styles.container}>
      {renderHeader()}
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentContainer}>
          {renderEventInfo()}
          {renderRatingSection()}
          {renderMapSection()}
          
          <View style={styles.bottomSpacer} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
  },
  headerGradient: {
    paddingBottom: Spacing.lg,
  },
  headerSafeArea: {
    paddingTop: Spacing.base,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.base,
    paddingBottom: Spacing.base,
  },
  backButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: Spacing.md,
    borderRadius: BorderRadius.full,
    marginRight: Spacing.base,
  },
  headerTextContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: Typography.size.xl,
    fontWeight: Typography.weight.bold as any,
    color: Colors.text.white,
    textAlign: 'center',
    right: 32, 
  },
  ratedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    right: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.lg,
    marginTop: Spacing.xs,
  },
  ratedText: {
    color: Colors.text.white,
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.medium as any,
    marginLeft: Spacing.xs,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  contentContainer: {
    marginTop: -Spacing.base,
    paddingHorizontal: Spacing.base,
  },
  eventCard: {
    marginBottom: Spacing.base,
    position: 'relative',
    overflow: 'visible',
  },
  dateBadgeContainer: {
    position: 'absolute',
    top: 20, 
    right: Spacing.base,
    zIndex: 1,
  },
  dateBadge: {
    backgroundColor: Colors.accent,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    alignItems: 'center',
    ...Shadows.md,
  },
  dateDay: {
    fontSize: Typography.size.lg,
    fontWeight: Typography.weight.bold as any,
    color: Colors.text.white,
    lineHeight: Typography.size.lg * Typography.lineHeight.tight,
  },
  dateMonth: {
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.medium as any,
    color: Colors.text.white,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  dateYear: {
    fontSize: Typography.size.xs,
    color: Colors.text.white,
    opacity: 0.8,
  },
  eventTitle: {
    fontSize: Typography.size['2xl'],
    fontWeight: Typography.weight.bold as any,
    color: Colors.text.primary,
    marginBottom: Spacing.md,
    marginTop: Spacing.base,
    lineHeight: Typography.size['2xl'] * Typography.lineHeight.tight,
  },
  eventDescription: {
    fontSize: Typography.size.base,
    color: Colors.text.secondary,
    lineHeight: Typography.size.base * Typography.lineHeight.relaxed,
    marginBottom: Spacing.lg,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.base,
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
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.medium as any,
    color: Colors.text.tertiary,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: Typography.size.base,
    color: Colors.text.primary,
    fontWeight: Typography.weight.medium as any,
  },
  ratingCard: {
    marginBottom: Spacing.base,
  },
  ratingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  ratingTitle: {
    fontSize: Typography.size.xl,
    fontWeight: Typography.weight.bold as any,
    color: Colors.text.primary,
    marginLeft: Spacing.md,
  },
  ratingSubtitle: {
    fontSize: Typography.size.base,
    color: Colors.text.secondary,
    marginBottom: Spacing.lg,
    lineHeight: Typography.size.base * Typography.lineHeight.relaxed,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
    gap: Spacing.sm,
  },
  starButton: {
    padding: Spacing.sm,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.background.tertiary,
  },
  starButtonSelected: {
    backgroundColor: Colors.primaryUltraLight,
    transform: [{ scale: 1.1 }],
  },
  currentRatingContainer: {
    backgroundColor: Colors.background.tertiary,
    padding: Spacing.base,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
  },
  currentRatingText: {
    fontSize: Typography.size.base,
    fontWeight: Typography.weight.semibold as any,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  thankYouText: {
    fontSize: Typography.size.sm,
    color: Colors.text.secondary,
    fontStyle: 'italic',
  },
  mapCard: {
    marginBottom: Spacing.base,
    padding: 0,
    overflow: 'hidden',
  },
  mapHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.xl,
    paddingBottom: Spacing.base,
  },
  mapTitle: {
    fontSize: Typography.size.xl,
    fontWeight: Typography.weight.bold as any,
    color: Colors.text.primary,
    marginLeft: Spacing.md,
  },
  mapContainer: {
    height: 200,
    marginHorizontal: Spacing.xl,
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    ...Shadows.sm,
  },
  map: {
    flex: 1,
  },
  mapFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.xl,
    paddingTop: Spacing.base,
  },
  mapAddress: {
    fontSize: Typography.size.base,
    color: Colors.text.secondary,
    flex: 1,
  },
  directionsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primaryUltraLight,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
  },
  directionsText: {
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.medium as any,
    color: Colors.primary,
    marginLeft: Spacing.xs,
  },
  bottomSpacer: {
    height: Spacing['2xl'],
  },
}); 