import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import moment from "moment";
import {Dustin, Edit, CheckBox} from "./exportData"
import { useNavigation } from '@react-navigation/native';
import { deleteScheduleData } from '../database/db-service';
import { useSQLiteContext } from 'expo-sqlite'
import { useTheme } from '../context/ThemeProvider';

const ShowSchedule = (data) => {
    const navigation = useNavigation()
    let{place, note, title, finish, start, completed, id} = data.item
    const[isChecked, setisChecked] = useState(completed == 0 ? false : true)
    const db = useSQLiteContext();
    const{theme} = useTheme()

    const deleteSchedule = async () => {
        try {
            await deleteScheduleData(db, id)
            console.log('Schedule deleted successfully!');
            navigation.goBack();
        } catch (error) {
            console.error('Error deleting schedule:', error);
        }
    };

  return (
    <View key={id} style={[styles.returnSchedule, {backgroundColor: completed ? theme.text + "4D" : theme.text }]}>
        <View style={[styles.returnScheduleHeader, {borderBottomColor: theme.light}]}>
            <Text style={[styles.returnScheduleHeaderText, {color: theme.light}]}>{title.length > 28 ? `${title.substring(0, 32)}...` : note}</Text>
        </View>

        <View >
        <View style={styles.returnScheduleContent}>
            <Text style={[styles.returnScheduleContentText, {color: theme.light}]}>Date:</Text>
            <Text style={[styles.returnScheduleContentText1, {color: theme.light}]}>{moment(start).format("D/MM/YYYY")} - {moment(finish).format("D/MM/YYYY")}</Text>
        </View>

        <View style={styles.returnScheduleContent}>
            <Text style={[styles.returnScheduleContentText, {color: theme.light}]}>Time:</Text>
            <Text style={[styles.returnScheduleContentText1, {color: theme.light}]}>{moment(start).format("hh.mm a")} - {moment(finish).format("hh.mm a")}</Text>
        </View>

        <View style={styles.returnScheduleContent}>
            <Text style={[styles.returnScheduleContentText, {color: theme.light}]}>Place:</Text>
            <Text style={[styles.returnScheduleContentText1, {color: theme.light}]}>{place.length > 28 ? `${note.substring(0, 28)}...` : note}</Text>
        </View>

        <View style={styles.returnScheduleContent}>
            <Text style={[styles.returnScheduleContentText, {color: theme.light}]}>Notes:</Text>
            <Text style={[styles.returnScheduleContentText1, {color: theme.light}]}>{note.length > 27 ? `${note.substring(0, 28)} ...` : note}</Text>
        </View>

        <View style={styles.returnScheduleHeaderIcon}>
            <CheckBox 
                onPress={() => console.log("hello")}
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