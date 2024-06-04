import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';

const Gradient = ({children}) => {
  return (
    <LinearGradient
        colors={['#000000', '#1F1338', '#000000']}
        start={{ x: 0, y: 0 }}
        end={[0, 1]}
        locations={[0, 0.05, 0.9]}
        style={styles.gradient}
      >
        {children}
      </LinearGradient>
  )
}

export default Gradient

const styles = StyleSheet.create({
  gradient: {
    flex: 1
  }
})

/* Opening Apps */

// position: relative;
// width: 414px;
// height: 896px;

// background: linear-gradient(191.14deg, #2A2A2E -5.44%, #2B125A 52.05%, #000000 112.41%);
// border-radius: 25px;
