/**
 * Future backend contracts for User and Authentication domain.
 * Pure interface definitions ready for future PostgreSQL/Auth integration.
 * DO NOT IMPLEMENT LIVE DATABASE CALLS NOW.
 */

export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
  role: 'student' | 'instructor' | 'admin';
  createdAt: string;
  updatedAt: string;
}

export interface UserPreferences {
  theme: 'dark' | 'light' | 'system';
  fontSize: 'small' | 'medium' | 'large';
  editorKeybindings: 'standard' | 'vim';
  dailyGoalMinutes: number;
}

export interface UserRepository {
  getCurrentUser(): Promise<UserProfile | null>;
  getUserPreferences(userId: string): Promise<UserPreferences>;
  updateUserPreferences(userId: string, prefs: Partial<UserPreferences>): Promise<UserPreferences>;
  signOut(): Promise<void>;
}
