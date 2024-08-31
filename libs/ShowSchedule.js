import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import moment from "moment";
import {Dustin, Edit, CheckBox} from "./exportData"
import { useNavigation } from '@react-navigation/native';
import { deleteScheduleData, updateCheckSchedule } from '../database/db-service';
import { useSQLiteContext } from 'expo-sqlite'
import { useTheme } from '../context/ThemeProvider';
import localNotifcataion from './notiee';

const ShowSchedule = (data) => {
  const navigation = useNavigation()
  let{place, note, title, finish, start, completed, id, reminder, repeat} = data.item
  const[isChecked, setisChecked] = useState(completed != 0)
  const db = useSQLiteContext();
  const{theme, setScheduleData, setFilteredSchedule, groupByCreationDate, setNotification, setShowNotified} = useTheme()
  
  const deleteSchedule = useCallback(async () => {
    try {
      const data = await deleteScheduleData(db, id);
      const sche = groupByCreationDate(data);
      setScheduleData(sche);
      setFilteredSchedule(sche);
    } catch (error) {
      console.error('Error deleting schedule:', error);
    }
  }, [db, id]);

  const completeSchedule = useCallback(async (newCheckedState) => {
    try {
      const data = await updateCheckSchedule(db, id, newCheckedState);
      const sche = groupByCreationDate(data);
      setScheduleData(sche);
      setFilteredSchedule(sche);
    } catch (error) {
      console.error('Error updating schedule:', error);
    }
  }, [db, id]);

  const handleCheckBoxPress = () => {
    const newCheckedState = !isChecked;
    setisChecked(newCheckedState);
    completeSchedule(newCheckedState);
  };
  
  const getReminder = () => {
    switch (reminder) {
      case "Before 5 minutes":
        return 5 * 60;
      case "Before 10 minutes":
        return 10 * 60;
      case "Before 15 minutes":
        return 15 * 60;
      case "Before 30 minutes":
        return 30 * 60;
      case "Before a day":
        return 86400;
      default:
        return 0;
    }
  };

  const getRepeat = () => {
    switch (repeat) {
      case "One time":
        return 1;
      case "Two times":
        return 2;
      case "Five times":
        return 5;
      default:
        return 0;
    }
  };
  const reminderDate = new Date(new Date(finish).getTime() - getReminder() * 1000);
  const repeatTime = getRepeat()

  useEffect(() => {
    localNotifcataion(db, title, note, repeatTime, reminderDate, setNotification, setShowNotified);
}, [db, title ]);

  

  return (
    <View key={id} style={[styles.returnSchedule, {backgroundColor: completed ? theme.text + "4D" : theme.text }]}>
        <View style={[styles.returnScheduleHeader, {borderBottomColor: theme.light}]}>
            <Text style={[styles.returnScheduleHeaderText, {color: theme.light}]}>{title.length > 28 ? `${title.substring(0, 30)}...` : title}</Text>
        </View>

        <View >
        <View style={styles.returnScheduleContent}>
            <Text style={[styles.returnScheduleContentText, {color: theme.light}]}>Date:</Text>
            <Text style={[styles.returnScheduleContentText1, {color: theme.light}]}>{moment(new Date(start)).format("D/MM/YYYY")} - {moment(new Date(finish)).format("D/MM/YYYY")}</Text>
        </View>

        <View style={styles.returnScheduleContent}>
            <Text style={[styles.returnScheduleContentText, {color: theme.light}]}>Time:</Text>
            <Text style={[styles.returnScheduleContentText1, {color: theme.light}]}>{moment(new Date(start)).format("hh:mm a")} - {moment(new Date(finish)).format("hh:mm a")}</Text>
        </View>

        <View style={styles.returnScheduleContent}>
            <Text style={[styles.returnScheduleContentText, {color: theme.light}]}>Place:</Text>
            <Text style={[styles.returnScheduleContentText1, {color: theme.light}]}>{place.length > 28 ? `${place.substring(0, 28)}...` : place}</Text>
        </View>

        <View style={styles.returnScheduleContent}>
            <Text style={[styles.returnScheduleContentText, {color: theme.light}]}>Notes:</Text>
            <Text style={[styles.returnScheduleContentText1, {color: theme.light}]}>{note.length > 27 ? `${note.substring(0, 28)}...` : note}</Text>
        </View>

        <View style={styles.returnScheduleHeaderIcon}>
            <CheckBox 
                onPress={handleCheckBoxPress}
                isChecked={isChecked}
                text={theme.text == "#403B36" ? "#F8EEE2" : "#403B36"}
            />
            <TouchableOpacity style={{width: 18, height: 18}} onPress={() => navigation.navigate('EditSchedule', { schedule: data.item })}>
                <Edit color={theme.light}  />
            </TouchableOpacity>

            <TouchableOpacity style={{width: 16, height: 16}} onPress={() => deleteSchedule(id)}>
                <Dustin color={theme.light} />
            </TouchableOpacity>
        </View>
        </View>
    </View>
  )
}

export default ShowSchedule

const styles = StyleSheet.create({
    returnSchedule: {
        borderRadius: 15,
        marginBottom: 20,
        padding: 15
      },
      returnScheduleHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 12,
        borderBottomWidth: 1,
        paddingBottom: 7,
        marginBottom: 10
      },
      returnScheduleHeaderText: {
        fontFamily: 'Nunito-SemiBold',
        fontSize: 15
      },
      returnScheduleHeaderIcon: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "flex-start",
        gap: 5,
        paddingTop: 5
      },
      returnScheduleContent: {
        flexDirection: "row",
        gap: 20,
        alignItems: "center"
      },
      returnScheduleContentText: {
        fontFamily: 'Nunito-Bold',
        fontSize: 14
      },
      returnScheduleContentText1: {
        fontFamily: 'Nunito-Regular',
        fontSize: 12
      }
})