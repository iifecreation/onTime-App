import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Gradient from '../common/Gradient'
import Arrow from "../component/Arrow"
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeProvider'

const Notification = () => {

  const navigation = useNavigation();
  const {theme} = useTheme()

  return (
    <View style={styles.notified}>
      <StatusBar style={theme.status} />
      <Gradient> 
        <ScrollView style={styles.notifiedWrapper}>
          
          <View style={styles.notifiedHeader}>
            <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.6}>
              <Arrow color={theme.text} />
            </TouchableOpacity>
            <Text style={[styles.notifiedHeaderText, {color: theme.text}]}>Notification</Text>
          </View>

          <View style={styles.notifiedContent}>
            <View style={[styles.notifiedContentPart, {borderColor: theme.text}]}>
              <Text style={[styles.notifiedContentText1, {color: theme.text}]}>Dinner with Anna</Text>
              <Text style={[styles.notifiedContentText2, {color: theme.text + "80"}]}>20 Sep 2021 08:00 PM</Text>
            </View>

            <View style={[styles.notifiedContentPart, {borderColor: theme.text}]}>
              <Text style={[styles.notifiedContentText1, {color: theme.text}]}>Pay House Tax</Text>
              <Text style={[styles.notifiedContentText2, {color: theme.text + "80"}]}>20 Sep 2021 08:00 PM</Text>
            </View>

            <View style={[styles.notifiedContentPart, {borderColor: theme.text}]}>
              <Text style={[styles.notifiedContentText1, {color: theme.text}]}>Make A New Proposal</Text>
              <Text style={[styles.notifiedContentText2, {color: theme.text + "80"}]}>20 Sep 2021 08:00 PM</Text>
            </View>

            <View style={[styles.notifiedContentPart, {borderColor: theme.text}]}>
              <Text style={[styles.notifiedContentText1, {color: theme.text}]}>Meeting with A New Client</Text>
              <Text style={[styles.notifiedContentText2, {color: theme.text + "80"}]}>20 Sep 2021 08:00 PM</Text>
            </View>
          </View>

        </ScrollView>

      </Gradient>
    </View>
  )
}

export default Notification

const styles = StyleSheet.create({
  notified: {
    flex: 1
  },
  notifiedWrapper: {
    paddingTop: 40,
    paddingHorizontal: 20
  },
  notifiedHeader: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    marginBottom: 20
  },
  notifiedHeaderText : {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 16
  },
  notifiedContentPart: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    paddingVertical: 10
  },
  notifiedContentText1: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 15
  },
  notifiedContentText2: {
    fontFamily: 'Nunito-Regular',
    fontSize: 12
  }
})