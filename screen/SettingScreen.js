import { ScrollView, StyleSheet, Text, TouchableOpacity, Switch, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import Gradient from '../common/Gradient';
import Arrow from "../component/Arrow"
import { useTheme } from '../context/ThemeProvider'

const SettingScreen = () => {
    const navigation = useNavigation();
    const{theme, toggleTheme} = useTheme()
    const [isEnabled, setIsEnabled] = useState(false);

    const toggleSwitch = () => {
      console.log("hello ");
      setIsEnabled(previousState => !previousState)
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
              thumbColor={isEnabled ? theme.main : '#ffffff'}
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>

          <View style={styles.notiCont}>
            <Text style={[styles.notiContHeader, {color: theme.text}]}>Notification</Text>
            <Text style={[styles.notiContHeaderText, {color: theme.text}]}>Audio</Text>
            <View style={styles.notiContSwitch}>
                <Text style={[styles.notiContHeaderText, {color: theme.text}]}>Notification bar</Text>
                <Switch />
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