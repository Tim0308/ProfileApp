import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { Event } from '../types';

interface EventCardProps {
  event: Event;
  onPress?: () => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onPress }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'MMMM d, yyyy \'at\' h:mm a');
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <MaterialIcons
          key={i}
          name="star"
          size={14}
          color={i <= rating ? '#FFD700' : '#E0E0E0'}
          style={{ marginLeft: 2 }}
        />
      );
    }
    return stars;
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{event.title}</Text>
        <View style={styles.ratingContainer}>
          {event.rated && event.rating && (
            <View style={styles.starsRow}>
              {renderStars(event.rating)}
            </View>
          )}
          {event.rated && !event.rating && (
            <MaterialIcons name="star" size={20} color="#FFD700" style={styles.starIcon} />
          )}
        </View>
      </View>
      <Text style={styles.description}>{event.description}</Text>
      <Text style={styles.location}>📍 {event.location}</Text>
      <Text style={styles.date}>{formatDate(event.date)}</Text>
      
      {/* Tap indicator */}
      <View style={styles.tapIndicator}>
        <Text style={styles.tapText}>Tap for details</Text>
        <MaterialIcons name="chevron-right" size={16} color="#999" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
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
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  ratingContainer: {
    alignItems: 'flex-end',
  },
  starsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    marginLeft: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
  location: {
    fontSize: 14,
    color: '#888',
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: '#888',
    fontStyle: 'italic',
    marginBottom: 8,
  },
  tapIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 4,
  },
  tapText: {
    fontSize: 12,
    color: '#999',
    marginRight: 4,
  },
}); 