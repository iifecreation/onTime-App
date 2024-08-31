import { View, Alert } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeProvider'
import {saveScheduleData } from '../database/db-service'
import { useSQLiteContext } from 'expo-sqlite'
import { validateInputs } from '../libs/validateInputs'
import Schedule from '../libs/schedule/Schedule'

const ScheduleScreen = () => {
    const db = useSQLiteContext();
    const currentDate = new Date();
    const navigation = useNavigation();
    const [selectedDate, setSelectedDate] = useState(currentDate);
    const [finishDate, setFinishDate] = useState(currentDate);
    const[title, setTitle] = useState('')
    const[note, setNote] = useState('')
    const[place, setPlace] = useState('')
    const [selectedRepeatOption, setSelectedRepeatOption] = useState('One time');
    const [selectedReminderOption, setSelectedReminderOption] = useState('Before 5 minutes');
    const{setScheduleData, setFilteredSchedule, groupByCreationDate} = useTheme()

    const saveSchedule = async () => {
        if (!validateInputs(title, place, note, selectedDate, currentDate, finishDate, Alert)) return;
        try {
            const newSchedule = {
                title,
                note,
                place,
                start: selectedDate ? selectedDate.toString() : selectedDate,
                finish: finishDate ? finishDate.toString() : finishDate,
                repeat : selectedRepeatOption,
                reminder: selectedReminderOption,
                completed: false,
                createdAt: Date.now()
            };
            
            let data = await saveScheduleData(db, newSchedule);
            let sche = groupByCreationDate(data)
            setScheduleData(sche)
            setFilteredSchedule(sche)
            navigation.navigate("Home", { refresh: true})
        } catch (error) {
            console.error('Error saving schedule data:', error);
        }
    };

  return (

    <Schedule currentFinish={currentDate} currentStart={currentDate} saveEditedSchedule={saveSchedule} selectedDate={selectedDate} setSelectedDate={setSelectedDate} finishDate={finishDate} setFinishDate={setFinishDate} selectedRepeat={selectedRepeatOption} setSelectedRepeat={setSelectedRepeatOption} selectedReminder={selectedReminderOption} setSelectedReminder={setSelectedReminderOption} title={title} setTitle={setTitle} place={place} setPlace={setPlace} note={note} setNote={setNote}>
        <View>

        </View>
    </Schedule>
  )
}

export default ScheduleScreen
