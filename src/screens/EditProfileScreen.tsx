import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { UserProfile } from '../types';
import { EditProfileScreenNavigationProp, EditProfileScreenRouteProp } from '../types/navigation';

interface EditProfileScreenProps {
  navigation: EditProfileScreenNavigationProp;
  route: EditProfileScreenRouteProp;
}

export const EditProfileScreen: React.FC<EditProfileScreenProps> = ({
  navigation,
  route,
}) => {
  const { profile, onUpdateProfile } = route.params;
  const [editedProfile, setEditedProfile] = useState<UserProfile>(profile);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [newInterest, setNewInterest] = useState('');

  const handleSave = () => {
    onUpdateProfile(editedProfile);
    Alert.alert('Success', 'Profile updated successfully!', [
      { text: 'OK', onPress: () => navigation.goBack() }
    ]);
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setEditedProfile({
        ...editedProfile,
        birthdate: selectedDate.toISOString().split('T')[0],
      });
    }
  };

  const addInterest = () => {
    if (newInterest.trim() && !editedProfile.interests.includes(newInterest.trim())) {
      setEditedProfile({
        ...editedProfile,
        interests: [...editedProfile.interests, newInterest.trim()],
      });
      setNewInterest('');
    }
  };

  const removeInterest = (interest: string) => {
    setEditedProfile({
      ...editedProfile,
      interests: editedProfile.interests.filter(i => i !== interest),
    });
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Select Date';
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // This is the behavior for iOS
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20} 
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={navigation.goBack}
            style={styles.backButton}
          >
            <MaterialIcons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Profile</Text>
          <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>

        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.formContainer}>
            {/* Name */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                value={editedProfile.name}
                onChangeText={(text) =>
                  setEditedProfile({ ...editedProfile, name: text })
                }
                placeholder="Enter your name"
                returnKeyType="next"
              />
            </View>

            {/* Bio */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Bio</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={editedProfile.bio}
                onChangeText={(text) =>
                  setEditedProfile({ ...editedProfile, bio: text })
                }
                placeholder="Tell us about yourself"
                multiline
                numberOfLines={3}
                returnKeyType="next"
              />
            </View>

            {/* Email */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                value={editedProfile.email || ''}
                onChangeText={(text) =>
                  setEditedProfile({ ...editedProfile, email: text })
                }
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType="next"
              />
            </View>

            {/* Phone */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Phone</Text>
              <TextInput
                style={styles.input}
                value={editedProfile.phone || ''}
                onChangeText={(text) =>
                  setEditedProfile({ ...editedProfile, phone: text })
                }
                placeholder="Enter your phone number"
                keyboardType="phone-pad"
                returnKeyType="next"
              />
            </View>

            {/* Location */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Location</Text>
              <TextInput
                style={styles.input}
                value={editedProfile.location || ''}
                onChangeText={(text) =>
                  setEditedProfile({ ...editedProfile, location: text })
                }
                placeholder="Enter your location"
                returnKeyType="next"
              />
            </View>

            {/* Interests */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Interests</Text>
              <View style={styles.interestsContainer}>
                {editedProfile.interests.map((interest, index) => (
                  <View key={index} style={styles.interestTag}>
                    <Text style={styles.interestText}>{interest}</Text>
                    <TouchableOpacity
                      onPress={() => removeInterest(interest)}
                      style={styles.removeInterestButton}
                    >
                      <MaterialIcons name="close" size={16} color="#666" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
              <View style={styles.addInterestContainer}>
                <TextInput
                  style={[styles.input, styles.addInterestInput]}
                  value={newInterest}
                  onChangeText={setNewInterest}
                  placeholder="Add new interest"
                  onSubmitEditing={addInterest}
                  returnKeyType="done"
                  blurOnSubmit={false}
                />
                <TouchableOpacity onPress={addInterest} style={styles.addButton}>
                  <MaterialIcons name="add" size={24} color="#007AFF" />
                </TouchableOpacity>
              </View>
            </View>
            
            {/* Add some bottom padding to ensure content is accessible above keyboard */}
            <View style={styles.bottomSpacer} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  keyboardAvoidingView: {
    flex: 1, // this means the keyboardAvoidingView will take up the full height of the screen
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  saveButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  saveButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  formContainer: {
    padding: 16,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  dateButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateButtonText: {
    fontSize: 16,
    color: '#333',
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  interestTag: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  interestText: {
    color: '#fff',
    fontSize: 14,
    marginRight: 4,
  },
  removeInterestButton: {
    padding: 2,
  },
  addInterestContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addInterestInput: {
    flex: 1,
    marginRight: 8,
  },
  addButton: {
    padding: 8,
  },
  bottomSpacer: {
    height: 100, // Extra space at bottom to ensure content is accessible
  },
}); 