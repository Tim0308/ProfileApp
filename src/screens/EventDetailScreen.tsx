import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { MaterialIcons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { Event } from '../types';
import { 
  EventDetailScreenNavigationProp, 
  EventDetailScreenRouteProp 
} from '../types/navigation';

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'EEEE, MMMM d, yyyy \'at\' h:mm a');
  };

  const handleRating = (rating: number) => {
    const updatedEvent = {
      ...currentEvent,
      rated: true,
      rating: rating,
    };
    setCurrentEvent(updatedEvent);
    onUpdateEvent(updatedEvent);
    Alert.alert('Rating Saved', `You rated this event ${rating} stars!`);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity
          key={i}
          onPress={() => handleRating(i)}
          style={styles.starButton}
        >
          <MaterialIcons
            name="star"
            size={32}
            color={
              currentEvent.rating && i <= currentEvent.rating
                ? '#FFD700'
                : '#E0E0E0'
            }
          />
        </TouchableOpacity>
      );
    }
    return stars;
  };

  const mapRegion = currentEvent.coordinates
    ? {
        latitude: currentEvent.coordinates.latitude,
        longitude: currentEvent.coordinates.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }
    : null;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={navigation.goBack}
            style={styles.backButton}
          >
            <MaterialIcons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Event Details</Text>
        </View>

        {/* Event Info */}
        <View style={styles.eventContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{currentEvent.title}</Text>
            {currentEvent.rated && (
              <View style={styles.ratedBadge}>
                <MaterialIcons name="star" size={16} color="#FFD700" />
                <Text style={styles.ratingText}>
                  {currentEvent.rating || 'Rated'}
                </Text>
              </View>
            )}
          </View>

          <Text style={styles.description}>{currentEvent.description}</Text>
          
          <View style={styles.infoRow}>
            <MaterialIcons name="location-on" size={20} color="#666" />
            <Text style={styles.location}>{currentEvent.location}</Text>
          </View>

          <View style={styles.infoRow}>
            <MaterialIcons name="schedule" size={20} color="#666" />
            <Text style={styles.date}>{formatDate(currentEvent.date)}</Text>
          </View>
        </View>

        {/* Rating Section */}
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingTitle}>Rate this event</Text>
          <Text style={styles.ratingSubtitle}>
            How was your experience at this event?
          </Text>
          <View style={styles.starsContainer}>{renderStars()}</View>
          {currentEvent.rating && (
            <Text style={styles.currentRating}>
              Your rating: {currentEvent.rating} star{currentEvent.rating !== 1 ? 's' : ''}
            </Text>
          )}
        </View>

        {/* Map Section */}
        {mapRegion && (
          <View style={styles.mapContainer}>
            <Text style={styles.mapTitle}>Event Location</Text>
            <MapView style={styles.map} region={mapRegion}>
              <Marker
                coordinate={currentEvent.coordinates!}
                title={currentEvent.title}
                description={currentEvent.location}
              />
            </MapView>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  eventContainer: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  ratedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8DC',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#B8860B',
    fontWeight: '600',
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  location: {
    fontSize: 16,
    color: '#666',
    marginLeft: 8,
  },
  date: {
    fontSize: 16,
    color: '#666',
    marginLeft: 8,
  },
  ratingContainer: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  ratingTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  ratingSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 12,
  },
  starButton: {
    padding: 4,
    marginHorizontal: 4,
  },
  currentRating: {
    textAlign: 'center',
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  mapContainer: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  mapTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    padding: 16,
    paddingBottom: 12,
  },
  map: {
    height: 200,
  },
}); 