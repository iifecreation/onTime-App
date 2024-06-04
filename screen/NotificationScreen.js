import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Gradient from '../common/GradientP'
import Arrow from "../component/Arrow"
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native';

const Notification = () => {

  const navigation = useNavigation();

  return (
    <View style={styles.notified}>
      <StatusBar style='light' />
      <Gradient> 
        <ScrollView style={styles.notifiedWrapper}>
          
          <View style={styles.notifiedHeader}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Arrow />
            </TouchableOpacity>
            <Text style={styles.notifiedHeaderText}>Notification</Text>
          </View>

          <View style={styles.notifiedContent}>
            <View style={styles.notifiedContentPart}>
              <Text style={styles.notifiedContentText1}>Dinner with Anna</Text>
              <Text style={styles.notifiedContentText2}>20 Sep 2021 08:00 PM</Text>
            </View>

            <View style={styles.notifiedContentPart}>
              <Text style={styles.notifiedContentText1}>Pay House Tax</Text>
              <Text style={styles.notifiedContentText2}>20 Sep 2021 08:00 PM</Text>
            </View>

            <View style={styles.notifiedContentPart}>
              <Text style={styles.notifiedContentText1}>Make A New Proposal</Text>
              <Text style={styles.notifiedContentText2}>20 Sep 2021 08:00 PM</Text>
            </View>

            <View style={styles.notifiedContentPart}>
              <Text style={styles.notifiedContentText1}>Meeting with A New Client</Text>
              <Text style={styles.notifiedContentText2}>20 Sep 2021 08:00 PM</Text>
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
    color: "#ffffff",
    fontFamily: 'Nunito-SemiBold',
    fontSize: 16
  },
  notifiedContentPart: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#828282",
    paddingVertical: 10
  },
  notifiedContentText1: {
    color: "#ffffff",
    fontFamily: 'Nunito-SemiBold',
    fontSize: 15
  },
  notifiedContentText2: {
    color: "#828282",
    fontFamily: 'Nunito-Regular',
    fontSize: 12
  }
})