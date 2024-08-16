import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Gradient from '../common/Gradient'
import Arrow from "../component/Arrow"
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native';
import { LIGHT_MODE } from '../common/style'

const Notification = () => {

  const navigation = useNavigation();

  return (
    <View style={styles.notified}>
      <StatusBar style={LIGHT_MODE.status} />
      <Gradient> 
        <ScrollView style={styles.notifiedWrapper}>
          
          <View style={styles.notifiedHeader}>
            <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.6}>
              <Arrow color={LIGHT_MODE.text} />
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
    color: LIGHT_MODE.text,
    fontFamily: 'Nunito-SemiBold',
    fontSize: 16
  },
  notifiedContentPart: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: LIGHT_MODE.text,
    paddingVertical: 10
  },
  notifiedContentText1: {
    color: LIGHT_MODE.text,
    fontFamily: 'Nunito-SemiBold',
    fontSize: 15
  },
  notifiedContentText2: {
    color: LIGHT_MODE.main,
    fontFamily: 'Nunito-Regular',
    fontSize: 12
  }
})