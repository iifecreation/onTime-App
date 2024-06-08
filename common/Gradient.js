import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Gradient = ({children}) => {
  return (
    <View style={styles.background}>
        {children}
      </View>
  )
}

export default Gradient

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#231717"
  }
})
