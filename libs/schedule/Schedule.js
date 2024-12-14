import { View, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, TextInput } from 'react-native'
import { Mark, SmallArrow, Arrow} from "../exportData"
import { useTheme } from '../../context/ThemeProvider';
import DateTimePicker from "@react-native-community/datetimepicker"
import { styles } from './ScheduleStyle';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react'
import { displayModal, showStartDatePicker } from '../ScheduleLogic';
import moment from 'moment';

const Schedule = ({children, currentFinish, currentStart, saveEditedSchedule, selectedDate, setSelectedDate, finishDate, setFinishDate, selectedRepeat, setSelectedRepeat, selectedReminder, setSelectedReminder, title, setTitle, place, setPlace, note, setNote}) => {
    const{theme } = useTheme()
    const navigation = useNavigation();
    const [isRepeatModalVisible, setRepeatModalVisible] = useState(false);
    const [isReminderModalVisible, setReminderModalVisible] = useState(false);
    const [showStartPicker, setShowStartPicker] = useState(false);
    const [showFinishPicker, setShowFinishPicker] = useState(false);
    const [pickerMode, setPickerMode] = useState('date');

    const onStartChange = (event, selected) => {
        if (event.type === 'set') {
            if (pickerMode === 'date') {
                setSelectedDate(selected);
                setPickerMode('time');
                setShowStartPicker(true);
            } else {
                const combinedDateTime = new Date(selected);
                combinedDateTime.setHours(selected.getHours(), selected.getMinutes());
                setSelectedDate(combinedDateTime);
                setShowStartPicker(false);
            }
        } else {
            setShowStartPicker(false);
        }
    };

    const onFinishChange = (event, selected) => {
        if (event.type === 'set') {
            if (pickerMode === 'date') {
                setFinishDate(selected);
                setPickerMode('time'); // Switch to time picker
                setShowFinishPicker(true); // Show time picker next
            } else {
                const combinedDateTime = new Date(selected);
                combinedDateTime.setHours(selected.getHours(), selected.getMinutes());
                setFinishDate(combinedDateTime);
                setShowFinishPicker(false);
            }
        } else {
            setShowFinishPicker(false);
        }
    };

    const toggleRepeatModal = () => setRepeatModalVisible(!isRepeatModalVisible);

    const toggleReminderModal = () => setReminderModalVisible(!isReminderModalVisible);

    const handleRepeatOptionSelect = (option) => {
        setSelectedRepeat(option);
        setRepeatModalVisible(false);
    };

    const handleReminderOptionSelect = (option) => {
        setSelectedReminder(option);
        setReminderModalVisible(false);
    };

    const repeatOptions = ['One time', 'Two times', 'Five times'];
    const reminderOptions = ['Before 5 minutes', 'Before 10 minutes', 'Before 15 minutes', 'Before 30 minutes', 'Before a day'];

  return (
    <View style={[styles.schedule, {backgroundColor: theme.light}]}>
        <View style={styles.scheduleContainer}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Arrow color={theme.text} />
                </TouchableOpacity>
                <View style={styles.headerNav}>
                    {
                        children
                    }
                    <TouchableOpacity onPress={() => saveEditedSchedule()}>
                        <Mark color={theme.text} />
                    </TouchableOpacity>
                </View>

            </View>

            <ScrollView style={styles.createScheule}>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{marginBottom: 50}}>
                    <Text style={[styles.createScheuleFullText, {color: theme.text, paddingBottom: 7}]}>Enter Schedule</Text>
                    <TextInput style={[styles.createScheuleInput, {borderColor: theme.text, color: theme.text}]} placeholder='Enter Title' value={title} onChangeText={(text) => setTitle(text)} placeholderTextColor={theme.text}/>

                    <View style={styles.createScheulePla}>
                            <View style={styles.createScheuleFull}>
                                <Text style={[styles.createScheuleFullText, {color: theme.text}]}>Start from</Text>
                                <TouchableOpacity style={styles.createScheuleSecon} onPress={() => showStartDatePicker(setPickerMode, setShowStartPicker)} activeOpacity={0.6}>
                                    <Text style={[styles.createScheuleSeconText, {color: theme.text}]}>{selectedDate
                                        ? `${moment(selectedDate).format('MMMM, Do YYYY hh:mm A')}`
                                        : `${moment(currentStart).format('MMMM, Do YYYY hh:mm A')}`}
                                    </Text>
                    
                                    <SmallArrow />
                                </TouchableOpacity>
                            </View>
                        
                            <View style={styles.createScheuleFull}>
                                <Text style={[styles.createScheuleFullText, {color: theme.text}]}>Finish</Text>
                                <TouchableOpacity style={styles.createScheuleSecon} onPress={() => showStartDatePicker(setPickerMode, setShowFinishPicker)} activeOpacity={0.6}>
                                    <Text style={[styles.createScheuleSeconText, {color: theme.text}]}>{finishDate
                                        ? `${moment(finishDate).format('MMMM, Do YYYY hh:mm A')}`
                                        : `${moment(currentFinish).format('MMMM, Do YYYY hh:mm A')}`}</Text>
                                    <SmallArrow />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.createScheuleFull}>
                                <Text style={[styles.createScheuleFullText, {color: theme.text}]}>Repeat</Text>
                                <TouchableOpacity style={styles.createScheuleSecon} onPress={() => toggleRepeatModal()}>
                                    <Text style={[styles.createScheuleSeconText, {color: theme.text}]}>{selectedRepeat}</Text>
                                    <SmallArrow />
                                </TouchableOpacity>
                            </View>
                                        
                            {/* reminder section start */}
                            <View style={styles.createScheuleFull}>
                                <Text style={[styles.createScheuleFullText, {color: theme.text}]}>Reminder</Text>
                                <TouchableOpacity style={styles.createScheuleSecon} onPress={() => toggleReminderModal()}>
                                    <Text style={[styles.createScheuleSeconText, {color: theme.text}]}>{selectedReminder}</Text>
                                    <SmallArrow />
                                </TouchableOpacity>
                            </View>
                            {/* reminder section end */}

                            <View style={styles.scheduleInput}>
                                <Text style={[styles.createScheuleFullText, {color: theme.text, paddingBottom: 7}]}>Enter Place of task </Text>
                                <TextInput placeholder='Place...' style={[styles.createScheuleInput, {borderColor: theme.text, color: theme.text}]} value={place} onChangeText={(text) => setPlace(text)} placeholderTextColor={theme.text} />
                            </View>

                            <View style={styles.scheduleInput}>
                                <Text style={[styles.createScheuleFullText, {color: theme.text, paddingBottom: 7}]}>Enter description </Text>
                                <TextInput placeholder='Note...' style={[styles.createScheuleInput, {borderColor: theme.text, color: theme.text}]} multiline value={note} onChangeText={(text) => setNote(text)} placeholderTextColor={theme.text} />
                            </View>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>

            {/* date picker for start date start */}
            {showStartPicker && (
                <DateTimePicker
                    value={pickerMode === 'date' ? selectedDate : new Date(selectedDate)}
                    mode={pickerMode}
                    is24Hour={true}
                    display="default"
                    onChange={onStartChange}
                />
            )}
            {/* date picker for start date  end */}

            {/* date picker for finish start */}
            {showFinishPicker && (
                <DateTimePicker
                    value={pickerMode === 'date' ? finishDate : new Date(finishDate)}
                    mode={pickerMode}
                    is24Hour={true}
                    display="default"
                    onChange={onFinishChange}
                />
            )}
            {/* date picker for finish end */}

            {/* modal for repeat start */}
            {displayModal(isRepeatModalVisible, "Select Repeat Option", repeatOptions, handleRepeatOptionSelect, theme)}
            {/* modal for repeat end */}

            {/* modal for reminder start */}
            {displayModal(isReminderModalVisible, "Select Reminder Option", reminderOptions, handleReminderOptionSelect, theme)}
            {/* modal for reminder end */}
        </View>
    </View>
  )
}

export default Schedule