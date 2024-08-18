import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Gradient from '../common/Gradient'
import Logo from "../component/Logo"
import { StatusBar } from 'expo-status-bar'
import { useTheme } from '../context/ThemeProvider'
import AsyncStorage from '@react-native-async-storage/async-storage'

const OnboardingScreen = ({navigation}) => {
  const{theme} = useTheme()
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login'); 
    }, 3000); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={[styles.onBoard, {backgroundColor: theme.main}]}>
      <StatusBar style={theme.status} />
        <View style={styles.onBoardLogo}>
          <Logo color={theme.logo} />
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
