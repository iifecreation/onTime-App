import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Gradient from '../common/Gradient'
import Logo from "../component/Logo"
import { StatusBar } from 'expo-status-bar'

const OnboardingScreen = ({navigation}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login'); 
    }, 3000); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.onBoard}>
      <StatusBar style='light' />
      <Gradient>
        <View style={styles.onBoardLogo}>
          <Logo />
        </View>
      </Gradient>
    </View>
  )
}

export default OnboardingScreen

const styles = StyleSheet.create({
    onBoard: {
        flex: 1
    },
    onBoardLogo: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    }
})
