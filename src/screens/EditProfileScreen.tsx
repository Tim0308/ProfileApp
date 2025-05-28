import React, { useState, useCallback } from 'react';
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
import { LinearGradient } from 'expo-linear-gradient';
import { UserProfile } from '../types';
import { AnimatedCard } from '../components/AnimatedCard';
import { AnimatedButton } from '../components/AnimatedButton';
import { EditProfileScreenNavigationProp, EditProfileScreenRouteProp } from '../types/navigation';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../styles/theme';

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
  const [newInterest, setNewInterest] = useState('');

  const handleSave = useCallback(() => {
    if (!editedProfile.name.trim()) {
      Alert.alert('Error', 'Name is required');
      return;
    }
    if (!editedProfile.bio.trim()) {
      Alert.alert('Error', 'Bio is required');
      return;
    }
    
    onUpdateProfile(editedProfile);
    navigation.goBack();
    Alert.alert('Success', 'Profile updated successfully!');
  }, [editedProfile, onUpdateProfile, navigation]);

  const handleAddInterest = useCallback(() => {
    if (!newInterest.trim()) return;
    
    const interests = editedProfile.interests || [];
    if (interests.includes(newInterest.trim())) {
      Alert.alert('Duplicate', 'This interest already exists');
      return;
    }
    
    setEditedProfile(prev => ({
      ...prev,
      interests: [...interests, newInterest.trim()],
    }));
    setNewInterest('');
  }, [newInterest, editedProfile.interests]);

  const handleRemoveInterest = useCallback((index: number) => {
    setEditedProfile(prev => ({
      ...prev,
      interests: prev.interests?.filter((_, i) => i !== index) || [],
    }));
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
          <TouchableOpacity
            onPress={navigation.goBack}
            style={styles.backButton}
          >
            <MaterialIcons name="arrow-back" size={24} color={Colors.text.white} />
          </TouchableOpacity>
          
          <Text style={styles.headerTitle}>Edit Profile</Text>
          
          <View style={styles.headerSpacer} />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );

  const renderPersonalInfo = () => (
    <AnimatedCard style={styles.sectionCard}>
      <View style={styles.sectionHeader}>
        <MaterialIcons name="person" size={24} color={Colors.primary} />
        <Text style={styles.sectionTitle}>Personal Information</Text>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Full Name *</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter your full name"
          placeholderTextColor={Colors.text.tertiary}
          value={editedProfile.name}
          onChangeText={(text) => setEditedProfile(prev => ({ ...prev, name: text }))}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Occupation</Text>
        <TextInput
          style={styles.textInput}
          placeholder="What do you do for work?"
          placeholderTextColor={Colors.text.tertiary}
          value={editedProfile.occupation || ''}
          onChangeText={(text) => setEditedProfile(prev => ({ ...prev, occupation: text }))}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Location</Text>
        <View style={styles.inputWithIcon}>
          <MaterialIcons name="location-on" size={20} color={Colors.text.tertiary} />
          <TextInput
            style={styles.textInputWithIcon}
            placeholder="Where are you based?"
            placeholderTextColor={Colors.text.tertiary}
            value={editedProfile.location || ''}
            onChangeText={(text) => setEditedProfile(prev => ({ ...prev, location: text }))}
          />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Bio *</Text>
        <TextInput
          style={[styles.textInput, styles.bioInput]}
          placeholder="Tell us about yourself..."
          placeholderTextColor={Colors.text.tertiary}
          value={editedProfile.bio}
          onChangeText={(text) => setEditedProfile(prev => ({ ...prev, bio: text }))}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />
      </View>
    </AnimatedCard>
  );

  const renderContactInfo = () => (
    <AnimatedCard style={styles.sectionCard}>
      <View style={styles.sectionHeader}>
        <MaterialIcons name="contact-mail" size={24} color={Colors.secondary} />
        <Text style={styles.sectionTitle}>Contact Information</Text>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Email</Text>
        <View style={styles.inputWithIcon}>
          <MaterialIcons name="email" size={20} color={Colors.text.tertiary} />
          <TextInput
            style={styles.textInputWithIcon}
            placeholder="your.email@example.com"
            placeholderTextColor={Colors.text.tertiary}
            value={editedProfile.email || ''}
            onChangeText={(text) => setEditedProfile(prev => ({ ...prev, email: text }))}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Phone</Text>
        <View style={styles.inputWithIcon}>
          <MaterialIcons name="phone" size={20} color={Colors.text.tertiary} />
          <TextInput
            style={styles.textInputWithIcon}
            placeholder="+1 (555) 123-4567"
            placeholderTextColor={Colors.text.tertiary}
            value={editedProfile.phone || ''}
            onChangeText={(text) => setEditedProfile(prev => ({ ...prev, phone: text }))}
            keyboardType="phone-pad"
          />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Birthdate</Text>
        <View style={styles.inputWithIcon}>
          <MaterialIcons name="cake" size={20} color={Colors.text.tertiary} />
          <TextInput
            style={styles.textInputWithIcon}
            placeholder="YYYY-MM-DD"
            placeholderTextColor={Colors.text.tertiary}
            value={editedProfile.birthdate || ''}
            onChangeText={(text) => setEditedProfile(prev => ({ ...prev, birthdate: text }))}
          />
        </View>
      </View>
    </AnimatedCard>
  );

  const renderInterests = () => (
    <AnimatedCard style={styles.sectionCard}>
      <View style={styles.sectionHeader}>
        <MaterialIcons name="favorite" size={24} color={Colors.accent} />
        <Text style={styles.sectionTitle}>Interests & Hobbies</Text>
      </View>

      <View style={styles.interestInputContainer}>
        <TextInput
          style={styles.interestInput}
          placeholder="Add an interest..."
          placeholderTextColor={Colors.text.tertiary}
          value={newInterest}
          onChangeText={setNewInterest}
          onSubmitEditing={handleAddInterest}
          returnKeyType="done"
        />
        <TouchableOpacity onPress={handleAddInterest} style={styles.addInterestButton}>
          <MaterialIcons name="add" size={20} color={Colors.text.white} />
        </TouchableOpacity>
      </View>

      <View style={styles.interestsContainer}>
        {(editedProfile.interests || []).map((interest, index) => (
          <View key={index} style={styles.interestTag}>
            <Text style={styles.interestText}>{interest}</Text>
            <TouchableOpacity
              onPress={() => handleRemoveInterest(index)}
              style={styles.removeInterestButton}
            >
              <MaterialIcons name="close" size={16} color={Colors.text.secondary} />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </AnimatedCard>
  );

  const renderSaveButton = () => (
    <View style={styles.saveButtonContainer}>
      <AnimatedButton
        title="Save Changes"
        onPress={handleSave}
        variant="primary"
        size="lg"
        icon="save"
        style={styles.saveButton}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {renderHeader()}
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.contentContainer}>
            {renderPersonalInfo()}
            {renderContactInfo()}
            {renderInterests()}
            {renderSaveButton()}
            
            <View style={styles.bottomSpacer} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
  },
  headerGradient: {
    paddingBottom: Spacing.base,
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
  },
  headerTitle: {
    flex: 1,
    fontSize: Typography.size.xl,
    fontWeight: Typography.weight.bold as any,
    color: Colors.text.white,
    textAlign: 'center',
  },
  headerSpacer: {
    width: 48, // Same width as back button
  },
  keyboardAvoid: {
    flex: 1,
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
  sectionCard: {
    marginBottom: Spacing.base,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: Typography.size.xl,
    fontWeight: Typography.weight.bold as any,
    color: Colors.text.primary,
    marginLeft: Spacing.md,
  },
  inputGroup: {
    marginBottom: Spacing.lg,
  },
  inputLabel: {
    fontSize: Typography.size.base,
    fontWeight: Typography.weight.semibold as any,
    color: Colors.text.primary,
    marginBottom: Spacing.sm,
  },
  textInput: {
    backgroundColor: Colors.background.primary,
    borderWidth: 2,
    borderColor: Colors.border.light,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md,
    fontSize: Typography.size.base,
    color: Colors.text.primary,
    minHeight: 48,
  },
  bioInput: {
    minHeight: 100,
    paddingTop: Spacing.md,
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.primary,
    borderWidth: 2,
    borderColor: Colors.border.light,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.base,
    minHeight: 48,
  },
  textInputWithIcon: {
    flex: 1,
    paddingVertical: Spacing.md,
    paddingLeft: Spacing.sm,
    fontSize: Typography.size.base,
    color: Colors.text.primary,
  },
  interestInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  interestInput: {
    flex: 1,
    backgroundColor: Colors.background.primary,
    borderWidth: 2,
    borderColor: Colors.border.light,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md,
    fontSize: Typography.size.base,
    color: Colors.text.primary,
    marginRight: Spacing.sm,
    minHeight: 48,
  },
  addInterestButton: {
    backgroundColor: Colors.primary,
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.sm,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  interestTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primaryUltraLight,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.sm,
  },
  interestText: {
    color: Colors.primary,
    fontSize: Typography.size.sm,
    fontWeight: Typography.weight.medium as any,
    marginRight: Spacing.xs,
  },
  removeInterestButton: {
    padding: 2,
  },
  saveButtonContainer: {
    marginTop: Spacing.xl,
    marginBottom: Spacing.lg,
  },
  saveButton: {
    width: '100%',
  },
  bottomSpacer: {
    height: Spacing['3xl'],
  },
}); 