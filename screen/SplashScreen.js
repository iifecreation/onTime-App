import { StyleSheet, Text, View } from 'react-native'
import Splash from "../component/Splash"
import Logo from "../component/Logo"
import React from 'react'

const SplashScreen = () => {

  return (
    <View style={styles.container}>
      <Splash />
      <View style={{position: "absolute", bottom: 30}}>
        <Logo color="#403B36" />
      </View>
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8EEE2',
        position: "relative"
    },
})