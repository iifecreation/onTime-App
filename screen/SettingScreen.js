import { ScrollView, StyleSheet, Text, TouchableOpacity, Switch, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import {Gradient, Arrow} from "../libs/exportData";
import { useTheme } from '../context/ThemeProvider'

const SettingScreen = () => {
    const navigation = useNavigation();
    const{theme, toggleTheme, modeStatus, notified, toggleNotified} = useTheme()

    const toggleSwitch = () => {
      toggleTheme()
    }

  return (
    <View style={styles.notified}>
      <StatusBar style={theme.status} />
      <Gradient> 
        <ScrollView style={styles.notifiedWrapper}>
          
          <View style={styles.notifiedHeader}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Arrow color={theme.text} />
            </TouchableOpacity>
            <Text style={[styles.notifiedHeaderText, {color: theme.text}]}>Setting</Text>
          </View>

          <View style={styles.notiContSwitch}>
            <Text style={[styles.notifiedHeaderText, {color: theme.text}]}>Change mode</Text>
            <Switch
              trackColor={{false: theme.text, true: theme.text}}
              thumbColor={modeStatus ? theme.main : '#ffffff'}
              onValueChange={toggleSwitch}
              value={modeStatus}
            />
          </View>

          <View style={styles.notiCont}>
            <Text style={[styles.notiContHeader, {color: theme.text}]}>Notification</Text>
            <Text style={[styles.notiContHeaderText, {color: theme.text}]}>Audio</Text>
            <View style={styles.notiContSwitch}>
                <Text style={[styles.notiContHeaderText, {color: theme.text}]}>Notification bar</Text>
                <Switch 
                  trackColor={{false: theme.text, true: theme.text}}
                  thumbColor={notified ? theme.main : '#ffffff'}
                  onValueChange={toggleNotified}
                  value={notified}
                />
            </View>
          </View>

          <View style={styles.notiCont}>
            <Text style={[styles.notiContHeader, {color: theme.text}]}>Extras</Text>
            <Text style={[styles.notiContHeaderText, {color: theme.text}]}>Help</Text>
            <TouchableOpacity style={styles.notiContSwitch} onPress={() => navigation.navigate('About')}>
                <Text style={[styles.notiContHeaderText, {color: theme.text}]}>About</Text>
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
        fontFamily: 'Nunito-SemiBold',
        fontSize: 16
    },
    notiContHeader: {
        fontSize: 18,
        fontFamily: 'Nunito-SemiBold',
        borderBottomColor: "#828282",
        borderBottomWidth: 1,
        paddingVertical: 15
    },
    notiContHeaderText: {
        fontFamily: 'Nunito-Regular',
        fontSize: 16,
        paddingVertical: 15
    },
    notiContSwitch: {
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row"
    }
})