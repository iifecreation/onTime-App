import { Modal, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View, Dimensions, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState } from 'react'
import Arrow from "../component/Arrow"
import Mark from "../component/Mark"
import SmallArrow from "../component/SmallArrow"
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../context/ThemeProvider'
import {saveScheduleData } from '../database/db-service'
import { useSQLiteContext } from 'expo-sqlite'


const ScheduleScreen = () => {
    const db = useSQLiteContext();
    const currentDate = new Date();
    const navigation = useNavigation();
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isDatePickerFinishVisible, setDatePickerFinishVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState(currentDate);
    const [finishDate, setFinishDate] = useState(currentDate);
    const[title, setTitle] = useState('')
    const[note, setNote] = useState('')
    const[place, setPlace] = useState('')
    const[fullday, setFullDay] = useState(false)
    const [isRepeatModalVisible, setRepeatModalVisible] = useState(false);
    const [isReminderModalVisible, setReminderModalVisible] = useState(false);
    const [selectedRepeatOption, setSelectedRepeatOption] = useState('One time');
    const [selectedReminderOption, setSelectedReminderOption] = useState('Before 5 minutes');
    const{theme} = useTheme()

    const toggleSwitch = () => setFullDay(previousState => !previousState);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const showDateFinishPicker = () => {
        setDatePickerFinishVisibility(true);
    };
    
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const hideDateFinishPicker = () => {
        setDatePickerFinishVisibility(false);
    };
    
    const handleConfirm = (date) => {
        hideDatePicker();
        setSelectedDate(date);
    };

    const handleConfirmFinish = (date) => {
        hideDateFinishPicker();
        setFinishDate(date)
    };

    const toggleRepeatModal = () => {
        setRepeatModalVisible(!isRepeatModalVisible);
    };

    const toggleReminderModal = () => {
        setReminderModalVisible(!isReminderModalVisible);
    };

    const handleRepeatOptionSelect = (option) => {
        setSelectedRepeatOption(option);
        setRepeatModalVisible(false);
    };

    const handleReminderOptionSelect = (option) => {
        setSelectedReminderOption(option);
        setReminderModalVisible(false);
    };

    // Function to save the schedule data
    // const saveSchedule = async () => {
    //     try {
    //         let schedules = [];
    //         const existingSchedule = await AsyncStorage.getItem('scheduleData');
    //         if (existingSchedule) {
    //             schedules = JSON.parse(existingSchedule);
    //         }
    
    //         const newSchedule = {
    //             id: Date.now(),
    //             title,
    //             note,
    //             place,
    //             fullday,
    //             selectedDate: selectedDate ? selectedDate.toString() : null,
    //             finishDate: finishDate ? finishDate.toString() : null,
    //             selectedRepeatOption,
    //             selectedReminderOption
    //         };
    
    //         schedules.push(newSchedule);
    //         await AsyncStorage.setItem('scheduleData', JSON.stringify(schedules));
    //         console.log('Schedule data saved successfully!');
    //         navigation.navigate("Home")
    //     } catch (error) {
    //         console.error('Error saving schedule data:', error);
    //     }
    // };

    const saveSchedule = async () => {
        try {
            const newSchedule = {
                title,
                note,
                place,
                fullday,
                start: selectedDate ? selectedDate.toString() : selectedDate,
                finish: finishDate ? finishDate.toString() : finishDate,
                repeat : selectedRepeatOption,
                reminder: selectedReminderOption,
                completed: false,
                createdAt: Date.now()
            };
            
            let data = await saveScheduleData(db, newSchedule);
            
            console.log('Schedule data saved successfully!', data);
            navigation.navigate("Home")
        } catch (error) {
            console.error('Error saving schedule data:', error);
        }
    };
    

  return (
    <View style={[styles.schedule, {backgroundColor: theme.light}]}>
        <View style={styles.scheduleContainer}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Arrow color={theme.text} />
                </TouchableOpacity>
                <View style={styles.headerNav}>
                    <TouchableOpacity onPress={() => saveSchedule()}>
                        <Mark color={theme.text} />
                    </TouchableOpacity>
                </View>

            </View>
                <View style={styles.createScheule}>
                    <Text style={[styles.createScheuleText, {color: theme.text}]}>Schedule</Text>
                    <TextInput style={[styles.createScheuleInput, {color: theme.light, backgroundColor: theme.text}]} placeholder='Enter Title' onChangeText={(text) => setTitle(text)} placeholderTextColor={theme.light} />

                    <View style={styles.createScheuleFull}>
                        <Text style={[styles.createScheuleFullText, {color: theme.text}]}>Fullday</Text>
                        <Switch value={fullday} onValueChange={toggleSwitch} />
                    </View>

                    <View style={styles.createScheulePla}>
                        <View style={styles.createScheuleFull}>
                            <Text style={[styles.createScheuleFullText, {color: theme.text}]}>Start from</Text>
                            <TouchableOpacity style={styles.createScheuleSecon} onPress={showDatePicker}>
                                <Text style={[styles.createScheuleSeconText, {color: theme.text}]}>{selectedDate
                                    ? `${moment(selectedDate).format('MMMM, Do YYYY hh:mm A')}`
                                    : `${moment(currentDate).format('MMMM, Do YYYY hh:mm A')}`}
                                </Text>
                                <SmallArrow color={theme.color} />
                            </TouchableOpacity>
                        </View>

                        

                        <View style={styles.createScheuleFull}>
                            <Text style={[styles.createScheuleFullText, {color: theme.text}]}>Finish</Text>
                            <TouchableOpacity style={styles.createScheuleSecon} onPress={showDateFinishPicker}>
                                <Text style={[styles.createScheuleSeconText, {color: theme.text}]}>{finishDate
                                    ? `${moment(finishDate).format('MMMM, Do YYYY hh:mm A')}`
                                    : `${moment(new Date(currentDate).setDate(currentDate.getDate() + 2)).format('MMMM, Do YYYY hh:mm A')}`}</Text>
                                <SmallArrow color={theme.color} />
                            </TouchableOpacity>
                        </View>

                        

                        <View style={styles.createScheuleFull}>
                            <Text style={[styles.createScheuleFullText, {color: theme.text}]}>Repeat</Text>
                            <TouchableOpacity style={styles.createScheuleSecon} onPress={() => toggleRepeatModal()}>
                                <Text style={[styles.createScheuleSeconText, {color: theme.text}]}>{selectedRepeatOption}</Text>
                                <SmallArrow color={theme.color} />
                            </TouchableOpacity>
                        </View>
                                    
                        {/* reminder section start */}
                        <View style={styles.createScheuleFull}>
                            <Text style={[styles.createScheuleFullText, {color: theme.text}]}>Reminder</Text>
                            <TouchableOpacity style={styles.createScheuleSecon} onPress={() => toggleReminderModal()}>
                                <Text style={[styles.createScheuleSeconText, {color: theme.text}]}>{selectedReminderOption}</Text>
                                <SmallArrow color={theme.color} />
                            </TouchableOpacity>
                        </View>
                        {/* reminder section end */}

                        <View style={styles.scheduleInput}>
                            <Text>Enter place </Text>
                            <TextInput placeholder='Place...' style={[styles.createScheuleInput, {marginBottom: 0, backgroundColor:theme.text, color: theme.light}]} onChangeText={(text) => setPlace(text)} placeholderTextColor={theme.light} />
                        </View>

                        <View style={styles.scheduleInput}>
                            <Text>Enter note </Text>
                            <TextInput placeholder='Note...' style={[styles.createScheuleInput, {backgroundColor:theme.text, color: theme.light}]} multiline onChangeText={(text) => setNote(text)} placeholderTextColor={theme.light}/>
                        </View>
                    </View>
                </View>
{/* ==================== modal section ==================== */}

            {/* date picker for start date start */}
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="datetime"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
            {/* date picker for start date  end */}

            {/* date picker for finish start */}
            <DateTimePickerModal
                isVisible={isDatePickerFinishVisible}
                mode="datetime"
                onConfirm={handleConfirmFinish}
                onCancel={hideDateFinishPicker}
            />
            {/* date picker for finish end */}

{/* ==================== modal section ==================== */}
            {/* modal for repeat start */}
            <Modal visible={isRepeatModalVisible} transparent={true} animationType="slide" statusBarTranslucent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Select Repeat Option</Text>
                        <TouchableOpacity onPress={() => handleRepeatOptionSelect('One time')}>
                            <Text style={styles.modalOption}>One time</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleRepeatOptionSelect('Two times')}>
                            <Text style={styles.modalOption}>Two times</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleRepeatOptionSelect('Five times')}>
                            <Text style={styles.modalOption}>Five times</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            {/* modal for repeat end */}

            {/* modal for reminder start */}
            <Modal visible={isReminderModalVisible} transparent={true} animationType="slide" statusBarTranslucent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Select Reminder Option</Text>
                        <TouchableOpacity onPress={() => handleReminderOptionSelect('Before 5 minutes')}>
                            <Text style={styles.modalOption}>Before 5 minutes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleReminderOptionSelect('Before 10 minutes')}>
                            <Text style={styles.modalOption}>Before 10 minutes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleReminderOptionSelect('Before 15 minutes')}>
                            <Text style={styles.modalOption}>Before 15 minutes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleReminderOptionSelect('Before 30 minutes')}>
                            <Text style={styles.modalOption}>Before 30 minutes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleReminderOptionSelect('Before a day')}>
                            <Text style={styles.modalOption}>Before a day</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            {/* modal for reminder end */}
            
        </View>
    </View>
  )
}

export default ScheduleScreen

const { width, height } = Dimensions.get('window');
const modalWidth = width - 40; // Adjust as needed
const modalHeight = 200;

const styles = StyleSheet.create({
    schedule: {
        flex: 1
    },
    scheduleContainer: {
        paddingVertical: 40,
        paddingHorizontal: 20
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    headerNav: {
        flexDirection: "row",
        gap: 20,
        alignItems: "center"
    },
    createScheule: {
        paddingTop: 30
    },
    createScheuleText: {
        fontFamily: 'Nunito-SemiBold',
        fontSize: 16,
        marginBottom: 20
    },
    createScheuleInput: {
        borderRadius: 10,
        paddingVertical: 7,
        fontSize: 16,
        fontFamily: 'Nunito-Regular',
        paddingHorizontal: 10,
        marginBottom: 25,
        width: "100%"
    },
    createScheuleFull: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    createScheuleFullText: {
        fontSize: 16,
        fontFamily: 'Nunito-Regular',
    },
    createScheuleSecon: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },
    createScheuleSeconText: {
        fontSize: 12,
        fontFamily: 'Nunito-Regular',
    },
    createScheulePla: {
        gap: 17
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust transparency as needed
    },
    modalContent: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 20,
        width: modalWidth,
        maxHeight: modalHeight,
        overflow: 'hidden', // Ensure content does not overflow modal dimensions
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalOption: {
        fontSize: 16,
        marginBottom: 7,
    },
})