import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from '../context/ThemeProvider' 

const Gradient = ({children}) => {
  const {theme} = useTheme()
  return (
    <View style={[styles.background, {backgroundColor: theme.light}]}>
        {children}
      </View>
  )
}

export default Gradient

const styles = StyleSheet.create({
  background: {
    flex: 1,
  }
})
