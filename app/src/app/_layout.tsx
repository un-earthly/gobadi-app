import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';
import { Stack } from 'expo-router';

import { AnimatedSplashOverlay } from '@/components/animated-icon';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AnimatedSplashOverlay />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="signup" />
        <Stack.Screen name="otp" />
        <Stack.Screen name="login" />
        <Stack.Screen name="forgot" />
        <Stack.Screen name="congo" />
        <Stack.Screen name="animal-details" />
        <Stack.Screen name="add-animal" />
        <Stack.Screen name="ai-scan" />
        <Stack.Screen name="ai-hold" />
        <Stack.Screen name="ai-summary" />
        <Stack.Screen name="all-doctors" />
        <Stack.Screen name="doctor-detail" />
        <Stack.Screen name="book-slot" />
        <Stack.Screen name="confirm-pay" />
        <Stack.Screen name="payment-method" />
        <Stack.Screen name="bkash-number" />
        <Stack.Screen name="payment-success" />
        <Stack.Screen name="billing-details" />
        <Stack.Screen name="chat" />
        <Stack.Screen name="video-call" />
        <Stack.Screen name="my-treatment" />
        <Stack.Screen name="checkout" />
        <Stack.Screen name="order-success" />
        <Stack.Screen name="animal-billing-details" />
        <Stack.Screen name="cart" />
        <Stack.Screen name="book-animal" />
        <Stack.Screen name="booking-payment" />
        <Stack.Screen name="booking-bkash-number" />
        <Stack.Screen name="edit-profile" />
        <Stack.Screen name="my-task" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </ThemeProvider>
  );
}
