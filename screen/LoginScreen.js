import {StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Logo from "../component/Logo"
import { StatusBar } from 'expo-status-bar'
import { useTheme } from '../context/ThemeProvider' 

const LoginScreen = ({navigation}) => {
  const {theme} = useTheme()
  
  return (
    <View style={[styles.onBoard, {backgroundColor: theme.light}]}>
      <StatusBar style={theme.status} />
        <View style={styles.onBoardLogo}>
          <Logo color={theme.text} />
          <Text style={[styles.onBoardLogoText, {color: theme.text}]}>Make yourself more on time</Text>
          <TouchableOpacity style={[styles.Logwarn, {backgroundColor: theme.text}]} activeOpacity={0.6} onPress={() => navigation.navigate('Home')}>
            <Text style={[styles.LogwarnText, {color: theme.light}]}>start</Text>
          </TouchableOpacity>
        </View>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  onBoard: {
    flex: 1,
  },
  onBoardLogo: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: "30%",
    paddingHorizontal: "15%"
  },
  Logwarn: {
    width: "100%",
    paddingVertical: 7,
    borderRadius: 12
  },
  LogwarnText: {
    fontFamily: "Montserrat-Bold",
    fontSize: 24,
    textAlign: "center"
  },
  onBoardLogoText: {
    color: "#ffffff",
    fontSize: 32,
    fontFamily: "OpenSans-Regular"
  }
})