import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Gradient from '../common/Gradient'
import Logo from "../component/Logo"
import { StatusBar } from 'expo-status-bar'
import { LIGHT_MODE } from '../common/style'

const OnboardingScreen = ({navigation}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login'); 
    }, 3000); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.onBoard}>
      <StatusBar style={LIGHT_MODE.status} />
        <View style={styles.onBoardLogo}>
          <Logo />
        </View>
    </View>
  )
}

export default OnboardingScreen

const styles = StyleSheet.create({
    onBoard: {
      flex: 1,
      backgroundColor: LIGHT_MODE.main
    },
    onBoardLogo: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    }
})
