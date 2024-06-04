import { KeyboardAvoidingView, Platform, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Arrow from "../component/Arrow"
import Mark from "../component/Mark"
import Pin from "../component/Pin"
import { useNavigation } from '@react-navigation/native';
import TempScreen from '../libs/TempScreen'



const NoteScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.schedule}>
        <View style={styles.scheduleContainer}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Arrow />
                </TouchableOpacity>
                <View style={styles.headerNav}>

                    <View>
                        <Pin />
                    </View>
                    <Mark />
                </View>

            </View>

            <View style={styles.createScheule}>
              <Text style={styles.createScheuleText}>Create Note</Text>
              
              <View>
                <TempScreen />
              </View>
            </View>
            
        </View>
    </View>
  )
}

export default NoteScreen


const styles = StyleSheet.create({
  schedule: {
      backgroundColor: "#282530",
      flex: 1
  },
  scheduleContainer: {
      paddingVertical: 40,
      paddingHorizontal: 20
  },
  header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between"
  },
  headerNav: {
      flexDirection: "row",
      gap: 20,
      alignItems: "center"
  },
  createScheule: {
      paddingTop: 30
  },
  createScheuleText: {
      color: "#ffffff",
      fontFamily: 'Nunito-SemiBold',
      fontSize: 16,
      marginBottom: 30
  }
})