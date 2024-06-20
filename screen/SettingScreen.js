import { ScrollView, StyleSheet, Text, TouchableOpacity, Switch, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import Gradient from '../common/Gradient';
import Arrow from "../component/Arrow"

const SettingScreen = () => {
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
            <Text style={styles.notifiedHeaderText}>Setting</Text>
          </View>

          <View style={styles.notiCont}>
            <Text style={styles.notiContHeader}>Notification</Text>
            <Text style={styles.notiContHeaderText}>Audio</Text>
            <View style={styles.notiContSwitch}>
                <Text style={styles.notiContHeaderText}>Notification bar</Text>
                <Switch />
            </View>
          </View>

          <View style={styles.notiCont}>
            <Text style={styles.notiContHeader}>Extras</Text>
            <Text style={styles.notiContHeaderText}>Help</Text>
            <TouchableOpacity style={styles.notiContSwitch} onPress={() => navigation.navigate('About')}>
                <Text style={styles.notiContHeaderText}>About</Text>
            </TouchableOpacity>
          </View>

          
        </ScrollView>

      </Gradient>
    </View>
  )
}

export default SettingScreen

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
    notiContHeader: {
        fontSize: 18,
        fontFamily: 'Nunito-SemiBold',
        color: "#ffffff",
        borderBottomColor: "#828282",
        borderBottomWidth: 1,
        paddingVertical: 15
    },
    notiContHeaderText: {
        fontFamily: 'Nunito-Regular',
        color: "#ffffff",
        fontSize: 16,
        paddingVertical: 15
    },
    notiContSwitch: {
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row"
    }
})