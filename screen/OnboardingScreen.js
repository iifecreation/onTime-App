import { StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'
import Logo from "../component/Logo"
import { StatusBar } from 'expo-status-bar'
import { useTheme } from '../context/ThemeProvider'

const OnboardingScreen = ({navigation}) => {
  const{theme} = useTheme()
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login'); 
    }, 3000); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={[styles.onBoard, {backgroundColor: theme.light}]}>
      <StatusBar style={theme.status} />
        <View style={styles.onBoardLogo}>
          <Logo color={theme.text} />
        </View>
    </View>
  )
}

export default OnboardingScreen

const styles = StyleSheet.create({
    onBoard: {
      flex: 1,
    },
    onBoardLogo: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    }
})
