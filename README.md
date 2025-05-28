# ProfileApp - React Native Profile & Events App

A React Native application built with Expo and TypeScript that displays a user profile and their attended events list with advanced interactive features.

## Features

### Core Features
- **User Profile Display**: Shows user name, bio, profile picture, and events count
- **Events List**: Scrollable list of attended events with FlatList for performance
- **Event Cards**: Display event title, description, location, and formatted date
- **Star Rating System**: Visual indicators for rated events

### Advanced Features

#### 1. Interactive Profile Image
- **Tap to Zoom**: Tap the profile image to view it in full-screen zoom mode
- **Change Profile Picture**: 
  - Take a new photo with camera
  - Choose from photo library
  - Automatic permission handling
  - Real-time image updates

#### 2. Event Detail Navigation
- **Tap Events**: Tap any event card to view detailed information
- **Event Detail Screen**: Comprehensive view with:
  - Full event information
  - Interactive 5-star rating system
  - Location map with marker
  - Back navigation

#### 3. Rating System
- **Interactive Stars**: Tap stars to rate events (1-5 stars)
- **Visual Feedback**: Real-time star highlighting
- **Rating Persistence**: Ratings are saved and displayed
- **Rating Display**: Shows current rating in both list and detail views

#### 4. Map Integration
- **Event Locations**: Interactive maps showing event locations
- **Map Markers**: Custom markers with event title and location
- **Coordinates**: Real Hong Kong locations for demo events

## Technical Implementation

### Dependencies
- **React Native**: Core framework
- **Expo**: Development platform
- **TypeScript**: Type safety
- **React Navigation**: Screen navigation
- **React Native Maps**: Map functionality
- **Expo Image Picker**: Camera and photo library access
- **Date-fns**: Date formatting
- **Expo Vector Icons**: Icon library

### Architecture
- **Component-based**: Modular, reusable components
- **TypeScript Interfaces**: Strong typing for data structures
- **State Management**: React hooks for local state
- **Navigation**: Stack navigation between screens
- **Performance**: FlatList for efficient list rendering

### File Structure
```
src/
├── components/
│   ├── EventCard.tsx          # Clickable event cards
│   ├── ImageZoomModal.tsx     # Profile image zoom/change modal
│   └── RatingComponent.tsx    # Star rating component
├── screens/
│   ├── ProfileScreen.tsx      # Main profile screen
│   └── EventDetailScreen.tsx  # Event detail screen
├── types/
│   └── index.ts              # TypeScript interfaces
└── data/
    └── profile.json          # Sample user data
```

## Getting Started

### Prerequisites
- Node.js (v14 or later)
- Expo CLI
- iOS Simulator or Android Emulator (or Expo Go app)

### Installation
1. Clone the repository
2. Navigate to the ProfileApp directory
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the App
```bash
npm start
```

This will start the Expo development server. You can then:
- Press `i` to open iOS simulator
- Press `a` to open Android emulator
- Scan the QR code with Expo Go app on your device

## Usage Guide

### Profile Image Features
1. **View Profile**: Tap the profile image to open zoom modal
2. **Change Image**: In zoom modal, tap "Change Photo"
3. **Choose Source**: Select "Take Photo" or "Choose from Library"
4. **Permissions**: Grant camera/photo library permissions when prompted

### Event Interaction
1. **View Events**: Scroll through the events list
2. **Event Details**: Tap any event card to view details
3. **Rate Events**: In detail view, tap stars to rate (1-5 stars)
4. **View Location**: See event location on interactive map
5. **Navigation**: Use back button to return to profile

### Rating System
- **Unrated Events**: Show no stars initially
- **Rate Event**: Tap 1-5 stars in detail view
- **Visual Feedback**: Stars highlight in real-time
- **Persistence**: Ratings save and display in list view
- **Update Display**: Event cards show star ratings

## Sample Data

The app includes sample data for "Athena Au" with two events:
1. **Sunset Rooftop Social** (The Crown, Central) - Pre-rated 4 stars
2. **Morning Matcha Meet** (Matchali, K11 Musea) - Unrated

Both events include real Hong Kong coordinates for map display.

## Customization

### Adding New Events
Edit `src/data/profile.json` to add events with:
- Basic info (title, description, location, date)
- Coordinates for map display
- Rating status

### Styling
Modify component stylesheets for:
- Colors and themes
- Layout and spacing
- Typography
- Animation effects

### Features Extension
The modular architecture supports easy addition of:
- More profile fields
- Additional event metadata
- Social features
- Data persistence
- API integration

## Performance Considerations

- **FlatList**: Efficient rendering for large event lists
- **Image Optimization**: Compressed images with quality settings
- **Navigation**: Stack navigation with proper memory management
- **State Management**: Optimized re-renders with React hooks

## Platform Support

- **iOS**: Full feature support including maps and camera
- **Android**: Full feature support including maps and camera
- **Web**: Limited support (no camera, basic maps)

## Troubleshooting

### Common Issues
1. **Maps not loading**: Ensure proper API keys for production
2. **Camera permissions**: Check device settings if denied
3. **Navigation errors**: Verify React Navigation setup
4. **Image picker issues**: Ensure proper permissions

### Development Tips
- Use Expo Go for quick testing
- Check console for detailed error messages
- Verify all dependencies are properly installed
- Test on both iOS and Android platforms

## Future Enhancements

Potential features for future development:
- **Data Persistence**: Local storage or cloud sync
- **Social Features**: Share events, friend connections
- **Event Creation**: Add new events functionality
- **Advanced Maps**: Directions, nearby events
- **Push Notifications**: Event reminders
- **Offline Support**: Cached data and images 