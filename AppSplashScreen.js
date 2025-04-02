import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

export default function AppSplashScreen({ navigation }) {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Keep native splash screen visible
        await SplashScreen.preventAutoHideAsync();
        
        // Wait for 3 seconds (adjust as needed)
        await new Promise(resolve => setTimeout(resolve, 3000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Hide native splash and navigate
        setAppIsReady(true);
        await SplashScreen.hideAsync();
        navigation.replace('LoginScreen');
      }
    }

    prepare();
  }, []);

  // Show your custom splash screen with company logo
  return (
    <View style={styles.container}>
      <Image 
        source={require('./assets/icon.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  logo: {
    width: 200,
    height: 200,
  },
});