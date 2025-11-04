import { SplashScreen, Stack } from "expo-router";
import "./global.css";
// importing fonts from expo-font
import {useFonts} from 'expo-font';
import { useEffect } from "react";
import GlobalProvider from "@/lib/globalprovider";
export default function RootLayout() {

  SplashScreen.preventAutoHideAsync(); // Prevents the splash screen from auto-hiding
  // Loading Fonts - from expo-font
  const [fontsLoaded] = useFonts({
    "Rubik-Bold": require('../assets/fonts/Rubik-Bold.ttf'),
    "Rubik-Medium": require('../assets/fonts/Rubik-Medium.ttf'),
    "Rubik-Regular": require('../assets/fonts/Rubik-Regular.ttf'),
    "Rubik-SemiBold": require('../assets/fonts/Rubik-SemiBold.ttf'),
    "Rubik-ExtraBold": require('../assets/fonts/Rubik-ExtraBold.ttf'),
    "Rubik-Light": require('../assets/fonts/Rubik-Light.ttf'),
  })
  // If the fonts are loaded -> hide SplashScreen -> and Continue to APP
  useEffect(()=>{
    if(fontsLoaded){
      SplashScreen.hideAsync();
    }
  },[fontsLoaded]);
  if(!fontsLoaded) return null;

  return (
    <GlobalProvider>
      <Stack screenOptions={{headerShown: false}} />
    </GlobalProvider>
    
  )
}
