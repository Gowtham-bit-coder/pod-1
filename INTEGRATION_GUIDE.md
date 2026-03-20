# UserOnboarding Integration Guide

## Overview
This document outlines the integration of the `useronboarding` authentication system into the `app-powerup` Expo Router project.

## Integration Summary

### What Was Added

#### 1. **New Dependencies**
Added to `package.json`:
- `@react-native-async-storage/async-storage@^2.2.0` - For token persistence
- `expo-auth-session@~7.0.10` - For Google OAuth authentication

#### 2. **Authentication Screens** (`app/screens/`)
- `SplashScreen.tsx` - Welcome screen with animations
- `LoginScreen.tsx` - Email/password login with social auth
- `RegisterScreen.tsx` - Sign up with Google OAuth support
- `GoogleSuccessScreen.tsx` - Post-Google login confirmation
- `ProfileScreen.tsx` - User profile completion form

#### 3. **Route Structure** (`app/(auth)/`)
Created file-based routes using Expo Router:
- `app/(auth)/_layout.tsx` - Auth group layout
- `app/(auth)/splash.tsx` - Initial splash screen route
- `app/(auth)/login.tsx` - Login route
- `app/(auth)/register.tsx` - Registration route
- `app/(auth)/google-success.tsx` - Google success route
- `app/(auth)/profile.tsx` - Profile completion route

#### 4. **Utilities**
- `utils/auth.ts` - Authentication helper functions:
  - `useLogout()` - Hook for logout functionality
  - `getToken()` - Retrieve stored token
  - `setToken()` - Save token to storage
  - `clearToken()` - Remove token from storage

#### 5. **Type Definitions**
- `app/types/navigation.ts` - TypeScript types for navigation parameters

#### 6. **Updated Files**
- `app/_layout.tsx` - Enhanced with authentication state management
  - Checks for stored token on app startup
  - Routes users to auth screens if not authenticated
  - Routes authenticated users to tabs
  - Uses Expo Router's `useSegments` and `useRouter` for conditional routing

## Architecture

### Authentication Flow

```
[Splash Screen]
       ↓
   [Check Token]
       ↓
    Token exists? ───Yes──→ [Tabs/Main App]
       ↓
      No
       ↓
   [Login/Register]
       ↓
   [Google OAuth]
       ↓
[Google Success] → [Complete Profile] → [Tabs/Main App]
```

### Route Structure

```
app/
├── (auth)/
│   ├── _layout.tsx
│   ├── splash.tsx
│   ├── login.tsx
│   ├── register.tsx
│   ├── google-success.tsx
│   └── profile.tsx
├── screens/
│   ├── SplashScreen.tsx
│   ├── LoginScreen.tsx
│   ├── RegisterScreen.tsx
│   ├── GoogleSuccessScreen.tsx
│   └── ProfileScreen.tsx
├── (tabs)/
│   ├── _layout.tsx
│   ├── index.tsx
│   └── explore.tsx
├── types/
│   └── navigation.ts
├── modal.tsx
└── _layout.tsx

utils/
└── auth.ts
```

## Key Features

### 1. **Automatic Authentication Check**
- On app startup, the root layout checks for a stored token in AsyncStorage
- If a token exists, users are redirected to the main tabs
- If no token exists, users are shown the splash screen

### 2. **Splash Screen with Auto-redirect**
- Animated splash screen that checks authentication immediately
- If already authenticated, bypasses animations and goes straight to tabs
- If not authenticated, shows full animation and prompts user to log in

### 3. **Multiple Authentication Methods**
- Email/password login and registration
- Google OAuth sign-up and login
- Remember me functionality for login

### 4. **Profile Completion**
- After successful authentication, users complete their profile
- Fields: Name, Mobile Number, Date of Birth, College Name
- Redirects to main tabs after profile creation

### 5. **AsyncStorage Integration**
- Token is persisted to device storage
- Token is automatically validated on app startup
- Token can be cleared for logout functionality

## API Endpoints

All authentication requests are made to:
```
https://b8ltrdc5-8000.inc1.devtunnels.ms/api/v1
```

### Endpoints Used:
- `POST /auth/login` - Login with email/password or Google OAuth
- `POST /auth/signup` - Register new account
- `POST /onboarding` - Complete user profile

## Navigation Paths

| Screen | Path |
|--------|------|
| Splash | `/(auth)/splash` |
| Login | `/(auth)/login` |
| Register | `/(auth)/register` |
| Google Success | `/(auth)/google-success` |
| Profile | `/(auth)/profile` |
| Main Tabs | `/(tabs)` |

## Logout Implementation

To implement logout in your tabs screens, use the provided utility:

```typescript
import { useLogout } from '@/utils/auth';

export default function MyScreen() {
  const { logout } = useLogout();
  
  return (
    <TouchableOpacity onPress={logout}>
      <Text>Logout</Text>
    </TouchableOpacity>
  );
}
```

## Environment Variables

No additional environment variables are required. The API endpoints are hardcoded in the screen components. For production, consider moving these to environment files.

## Testing

To test the integration:

1. **Test Splash Screen Navigation**
   ```bash
   npx expo start
   ```
   - Should show splash animation
   - Should redirect to login if no token

2. **Test Authentication Flow**
   - Register a new account
   - Complete profile
   - Verify token is stored
   - Restart app and verify automatic redirect to tabs

3. **Test Google OAuth**
   - Click "Sign up with Google"
   - Complete Google authentication
   - Verify token is saved

## Dependencies

```json
{
  "@react-native-async-storage/async-storage": "^2.2.0",
  "expo-auth-session": "~7.0.10"
}
```

## Notes

- All screens use Expo Router's file-based routing
- Authentication state is managed through AsyncStorage and route segments
- Google OAuth credentials are configured in RegisterScreen.tsx
- All styling is done with React Native StyleSheet (not NativeWind in auth screens)

## Future Enhancements

1. Add token refresh logic
2. Implement biometric authentication
3. Add password recovery flow
4. Implement proper error boundaries
5. Add analytics tracking
6. Move API endpoints to environment configuration

## Troubleshooting

### Token not persisting
- Ensure AsyncStorage permissions are granted in app.json
- Check if AsyncStorage is properly initialized

### Google OAuth not working
- Verify Google OAuth credentials in RegisterScreen.tsx
- Check that expo-auth-session is properly installed
- Ensure WebBrowser.maybeCompleteAuthSession() is called

### Navigation loops
- Check that app/_layout.tsx is properly checking authentication state
- Verify that segments are correct in the useEffect dependency

