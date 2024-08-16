import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Gradient from '../common/Gradient'
import Logo from "../component/Logo"
import { StatusBar } from 'expo-status-bar'
import { LIGHT_MODE } from '../common/style'

const LoginScreen = ({navigation}) => {
  return (
    <View style={styles.onBoard}>
      <StatusBar style={LIGHT_MODE.status} />
        <View style={styles.onBoardLogo}>
          <Logo />
          <Text style={styles.onBoardLogoText}>Make yourself more on time</Text>
          <TouchableOpacity style={styles.Logwarn} activeOpacity={0.6} onPress={() => navigation.navigate('Home')}>
            <Text style={styles.LogwarnText}>start</Text>
          </TouchableOpacity>
        </View>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  onBoard: {
    flex: 1,
    backgroundColor: LIGHT_MODE.main
  },
  onBoardLogo: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: "30%",
    paddingHorizontal: "15%"
  },
  Logwarn: {
    backgroundColor: "#ffffff",
    width: "100%",
    paddingVertical: 7,
    borderRadius: 12
  },
  LogwarnText: {
    color: LIGHT_MODE.text,
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