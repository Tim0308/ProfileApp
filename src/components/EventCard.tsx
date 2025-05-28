import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { Event } from '../types';
import { AnimatedCard } from './AnimatedCard';
import { Colors, Typography, Spacing, BorderRadius } from '../styles/theme';

interface EventCardProps {
  event: Event;
  onPress: () => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onPress }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      day: format(date, 'd'),
      month: format(date, 'MMM'),
      time: format(date, 'h:mm a'),
    };
  };

  const { day, month, time } = formatDate(event.date);

  const renderRatingStars = () => {
    if (!event.rating) return null;
    
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <MaterialIcons
          key={i}
          name="star"
          size={14}
          color={i <= event.rating ? Colors.star : Colors.starInactive}
          style={styles.star}
        />
      );
    }
    return stars;
  };

  return (
    <AnimatedCard onPress={onPress} style={styles.cardContainer}>
      <View style={styles.cardContent}>
        {/* Date Badge */}
        <View style={styles.dateBadge}>
          <Text style={styles.dateDay}>{day}</Text>
          <Text style={styles.dateMonth}>{month}</Text>
        </View>

        {/* Event Content */}
        <View style={styles.eventContent}>
          <View style={styles.headerRow}>
            <Text style={styles.title} numberOfLines={2}>
              {event.title}
            </Text>
            {event.rated && (
              <View style={styles.ratingBadge}>
                <MaterialIcons name="star" size={12} color={Colors.star} />
                <Text style={styles.ratingText}>{event.rating}</Text>
              </View>
            )}
          </View>

          <Text style={styles.description} numberOfLines={2}>
            {event.description}
          </Text>

          <View style={styles.detailsRow}>
            <View style={styles.locationRow}>
              <MaterialIcons 
                name="location-on" 
                size={14} 
                color={Colors.text.tertiary} 
              />
              <Text style={styles.location} numberOfLines={1}>
                {event.location}
              </Text>
            </View>
            
            <View style={styles.timeRow}>
              <MaterialIcons 
                name="schedule" 
                size={14} 
                color={Colors.text.tertiary} 
              />
              <Text style={styles.time}>{time}</Text>
            </View>
          </View>

          {/* Rating Stars */}
          {event.rating && (
            <View style={styles.starsContainer}>
              {renderRatingStars()}
            </View>
          )}
        </View>

        {/* Arrow Indicator */}
        <View style={styles.arrowContainer}>
          <MaterialIcons 
            name="chevron-right" 
            size={20} 
            color={Colors.text.tertiary} 
          />
        </View>
      </View>
    </AnimatedCard>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: Spacing.base,
    marginVertical: Spacing.sm,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 0, // AnimatedCard already has padding
  },
  dateBadge: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    alignItems: 'center',
    minWidth: 50,
    marginRight: Spacing.base,
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
  eventContent: {
    flex: 1,
    marginRight: Spacing.sm,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.xs,
  },
  title: {
    fontSize: Typography.size.lg,
    fontWeight: Typography.weight.semibold as any,
    color: Colors.text.primary,
    lineHeight: Typography.size.lg * Typography.lineHeight.tight,
    flex: 1,
    marginRight: Spacing.sm,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.accent,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
  },
  ratingText: {
    fontSize: Typography.size.xs,
    fontWeight: Typography.weight.semibold as any,
    color: Colors.text.white,
    marginLeft: 2,
  },
  description: {
    fontSize: Typography.size.sm,
    color: Colors.text.secondary,
    lineHeight: Typography.size.sm * Typography.lineHeight.relaxed,
    marginBottom: Spacing.md,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: Spacing.base,
  },
  location: {
    fontSize: Typography.size.sm,
    color: Colors.text.tertiary,
    marginLeft: Spacing.xs,
    flex: 1,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    fontSize: Typography.size.sm,
    color: Colors.text.tertiary,
    marginLeft: Spacing.xs,
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    marginRight: 1,
  },
  arrowContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 24,
    height: 24,
  },
}); 