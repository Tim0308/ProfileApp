export interface Event {
  id: number;
  title: string;
  description: string;
  location: string;
  date: string;
  rated: boolean;
  rating?: number; // 1-5 star rating
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export interface UserProfile {
  name: string;
  bio: string;
  profileImageUrl: string;
  birthdate?: string;
  email?: string;
  phone?: string;
  interests: string[];
  location?: string;
  occupation?: string;
  attendedEvents: Event[];
} 