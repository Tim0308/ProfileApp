# ProfileApp - React Native Profile & Events App

A React Native application built with Expo and TypeScript that displays a user profile and their attended events list with advanced interactive features.

## Getting Started

### Prerequisites
- Node.js (v14 or later)
- Expo CLI
- iOS Simulator or Android Emulator (or Expo Go app)

### Installation
1. Clone the repository
   ```bash
   git clone https://github.com/Tim0308/ProfileApp.git
   ```
2. Navigate to the ProfileApp directory
   ```bash
   e.g: cd ProfileApp
   ```
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
- For IOS, download Expo Go from apple store and Scan the QR code displayed on the terminal with your phone camera. 


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
│   └── EditProfileScrenn.tsx  # Edit user profile screen
├── types/
│   └── index.ts              # TypeScript interfaces
└── data/
    └── profile.json          # Sample user data
```

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


## Future Enhancements

Potential features for future development:
- **Data Persistence**: Local storage or cloud sync
- **Social Features**: Share events, friend connections
- **Third-Party UI library**: Add more interactive and visual appealing UI componenet
- **Advanced Maps**: Directions, nearby events
- **Push Notifications**: Event reminders
- **Offline Support**: Cached data and images 