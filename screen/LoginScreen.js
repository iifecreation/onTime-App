import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Gradient from '../common/Gradient'
import Logo from "../component/Logo"
import { StatusBar } from 'expo-status-bar'

const LoginScreen = ({navigation}) => {
  return (
    <View style={styles.onBoard}>
      <StatusBar style='light' />
      <Gradient>
        <View style={styles.onBoardLogo}>
          <Logo />
          <Text style={styles.onBoardLogoText}>Make yourself more on time</Text>
          <TouchableOpacity style={styles.Logwarn} onPress={() => navigation.navigate('Home')}>
            <Text style={styles.LogwarnText}>start</Text>
          </TouchableOpacity>
        </View>
      </Gradient>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  onBoard: {
    flex: 1
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
    color: "#0A0416",
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