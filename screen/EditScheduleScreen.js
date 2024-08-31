import { TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import {Dustin, CheckBox } from "../libs/exportData"
import { useTheme } from '../context/ThemeProvider';
import { useSQLiteContext } from 'expo-sqlite'
import { deleteScheduleData, updateSchedule } from '../database/db-service';
import { validateInputs } from '../libs/validateInputs';
import Schedule from '../libs/schedule/Schedule';

const EditScheduleScreen = () => {

    const route = useRoute();
    const { schedule } = route.params;
    const{theme, setScheduleData, setFilteredSchedule, groupByCreationDate} = useTheme()
    let data = schedule;
    const db = useSQLiteContext();
    const navigation = useNavigation();
    const [selectedDate, setSelectedDate] = useState(new Date(data.start));
    const [finishDate, setFinishDate] = useState(new Date(data.finish));
    const[title, setTitle] = useState(data.title)
    const[note, setNote] = useState(data.note)
    const[place, setPlace] = useState(data.place)
    const [selectedRepeat, setSelectedRepeat] = useState(data.repeat);
    const [selectedReminder, setSelectedReminder] = useState(data.reminder);
    const[isChecked, setisChecked] = useState(data.completed == 0 ? false : true)

    const saveEditedSchedule = async () => {
        const currentDate = new Date();
        if (!validateInputs(title, place, note, selectedDate, currentDate, finishDate, Alert)) return;
        
        try {
            const newSchedule = {
                title,
                note,
                place,
                start: selectedDate ? selectedDate.toString() : selectedDate,
                finish: finishDate ? finishDate.toString() : finishDate,
                repeat : selectedRepeat,
                reminder: selectedReminder,
                completed: isChecked,
                createdAt: Date.now()
            };
            let item = await updateSchedule(db, data.id, newSchedule )
            let sche = groupByCreationDate(item)
            setScheduleData(sche)
            setFilteredSchedule(sche)
                
            console.log('Schedule data updated successfully!');
            navigation.goBack();
        } catch (error) {
            console.error('Error updating schedule:', error);
        }
        
    };

    const deleteSchedule = async () => {
        try {
            let item = await deleteScheduleData(db, data.id)
            let sche = groupByCreationDate(item)
            setScheduleData(sche)
            setFilteredSchedule(sche)
            console.log('Schedule deleted successfully!');
            navigation.goBack();
        } catch (error) {
            console.error('Error deleting schedule:', error);
        }
    };

  return (
    <Schedule currentFinish={schedule.finishDate} currentStart={schedule.selectedDate} saveEditedSchedule={saveEditedSchedule} selectedDate={selectedDate} setSelectedDate={setSelectedDate} finishDate={finishDate} setFinishDate={setFinishDate} selectedRepeat={selectedRepeat} setSelectedRepeat={setSelectedRepeat} selectedReminder={selectedReminder} setSelectedReminder={setSelectedReminder} title={title} setTitle={setTitle} place={place} setPlace={setPlace} note={note} setNote={setNote}>
        <CheckBox 
            isChecked={isChecked} 
            onPress={() => setisChecked(!isChecked)}
            text={theme.text == "#403B36" ? "#403B36" : "#F8EEE2"}
        />
        <TouchableOpacity style={{width: 20, height: 20}} onPress={() => deleteSchedule()}>
            <Dustin color={theme.text} />
        </TouchableOpacity>
    </Schedule>
  )
}

export default EditScheduleScreen