import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View, Dimensions, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { useNavigation, useRoute } from '@react-navigation/native';
import {Dustin, Mark, CheckBox, SmallArrow, Arrow} from "../libs/exportData"
import { useTheme } from '../context/ThemeProvider';
import { useSQLiteContext } from 'expo-sqlite'
import { deleteScheduleData, updateSchedule } from '../database/db-service';

const EditScheduleScreen = () => {

    const route = useRoute();
    const { schedule } = route.params;
    const{theme} = useTheme()
    let data = schedule
    const db = useSQLiteContext();
    const navigation = useNavigation();
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isDatePickerFinishVisible, setDatePickerFinishVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState(data.start);
    const [finishDate, setFinishDate] = useState(data.finish);
    const[title, setTitle] = useState(data.title)
    const[note, setNote] = useState(data.note)
    const[place, setPlace] = useState(data.place)
    const [isRepeatModalVisible, setRepeatModalVisible] = useState(false);
    const [isReminderModalVisible, setReminderModalVisible] = useState(false);
    const [selectedRepeat, setSelectedRepeat] = useState(data.repeat);
    const [selectedReminder, setSelectedReminder] = useState(data.reminder);
    const[isChecked, setisChecked] = useState(data.completed == 0 ? false : true)

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
        setSelectedRepeat(option);
        setRepeatModalVisible(false);
    };

    const handleReminderOptionSelect = (option) => {
        setSelectedReminder(option);
        setReminderModalVisible(false);
    };

    // Function to save the edited schedule
    const saveEditedSchedule = async () => {
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
            await updateSchedule(db, data.id, newSchedule )
              
            console.log('Schedule data updated successfully!');
            navigation.goBack();
        } catch (error) {
            console.error('Error updating schedule:', error);
        }
    };

    // Function to delete the schedule
    const deleteSchedule = async () => {
        try {
            await deleteScheduleData(db, data.id)
            console.log('Schedule deleted successfully!');
            navigation.goBack();
        } catch (error) {
            console.error('Error deleting schedule:', error);
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
                    <CheckBox 
                        isChecked={isChecked} 
                        onPress={() => setisChecked(!isChecked)}
                        text={theme.text == "#403B36" ? "#403B36" : "#F8EEE2"}
                    />
                    <TouchableOpacity style={{width: 20, height: 20}} onPress={() => deleteSchedule()}>
                        <Dustin color={theme.text} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => saveEditedSchedule()}>
                        <Mark color={theme.text} />
                    </TouchableOpacity>
                </View>

            </View>

            <View style={styles.createScheule}>
                <Text style={[styles.createScheuleFullText, {color: theme.text, paddingBottom: 7}]}>Enter Schedule</Text>
                <TextInput style={[styles.createScheuleInput, {borderColor: theme.text, color: theme.text}]} placeholder='Enter Title' value={title} onChangeText={(text) => setTitle(text)} />

                <View style={styles.createScheulePla}>
                        <View style={styles.createScheuleFull}>
                            <Text style={[styles.createScheuleFullText, {color: theme.text}]}>Start from</Text>
                            <TouchableOpacity style={styles.createScheuleSecon} onPress={showDatePicker}>
                                <Text style={styles.createScheuleSeconText}>{selectedDate
                                    ? `${moment(selectedDate).format('MMMM, Do YYYY hh:mm A')}`
                                    : `${moment(schedule.selectedDate).format('MMMM, Do YYYY hh:mm A')}`}
                                </Text>
                
                                <SmallArrow />
                            </TouchableOpacity>
                        </View>
                      
                        <View style={styles.createScheuleFull}>
                            <Text style={[styles.createScheuleFullText, {color: theme.text}]}>Finish</Text>
                            <TouchableOpacity style={styles.createScheuleSecon} onPress={showDateFinishPicker}>
                                <Text style={styles.createScheuleSeconText}>{finishDate
                                    ? `${moment(finishDate).format('MMMM, Do YYYY hh:mm A')}`
                                    : `${moment(schedule.finishDate).format('MMMM, Do YYYY hh:mm A')}`}</Text>
                                <SmallArrow />
                            </TouchableOpacity>
                        </View>

                        

                        <View style={styles.createScheuleFull}>
                            <Text style={[styles.createScheuleFullText, {color: theme.text}]}>Repeat</Text>
                            <TouchableOpacity style={styles.createScheuleSecon} onPress={() => toggleRepeatModal()}>
                                <Text style={styles.createScheuleSeconText}>{selectedRepeat}</Text>
                                <SmallArrow />
                            </TouchableOpacity>
                        </View>
                                    
                        {/* reminder section start */}
                        <View style={styles.createScheuleFull}>
                            <Text style={[styles.createScheuleFullText, {color: theme.text}]}>Reminder</Text>
                            <TouchableOpacity style={styles.createScheuleSecon} onPress={() => toggleReminderModal()}>
                                <Text style={styles.createScheuleSeconText}>{selectedReminder}</Text>
                                <SmallArrow />
                            </TouchableOpacity>
                        </View>
                        {/* reminder section end */}

                        <View style={styles.scheduleInput}>
                            <Text style={[styles.createScheuleFullText, {color: theme.text, paddingBottom: 7}]}>Enter Place of task </Text>
                            <TextInput placeholder='Place...' style={[styles.createScheuleInput, {borderColor: theme.text, color: theme.text}]} value={place} onChangeText={(text) => setPlace(text)} />
                        </View>

                        <View style={styles.scheduleInput}>
                            <Text style={[styles.createScheuleFullText, {color: theme.text, paddingBottom: 7}]}>Enter description </Text>
                            <TextInput placeholder='Note...' style={[styles.createScheuleInput, {borderColor: theme.text, color: theme.text}]} multiline value={note} onChangeText={(text) => setNote(text)}/>
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

export default EditScheduleScreen

const { width, height } = Dimensions.get('window');
const modalWidth = width - 40; 
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
        gap: 12,
        alignItems: "center"
    },
    createScheule: {
        paddingTop: 30
    },
    createScheuleText: {
        fontFamily: 'Nunito-Bold',
        fontSize: 16,
        marginBottom: 20
    },
    createScheuleInput: {
        width: "100%",
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 5,
        fontSize: 14,
        fontFamily: 'Nunito-Regular',
        paddingHorizontal: 10,
    },
    createScheuleFull: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    createScheuleFullText: {
        fontSize: 15,
        fontFamily: 'Nunito-SemiBold',
        textTransform: "capitalize"
    },
    createScheuleSecon: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },
    createScheuleSeconText: {
        color: "#939393",
        fontSize: 12,
        fontFamily: 'Nunito-Regular',
    },
    createScheulePla: {
        gap: 17,
        marginTop: 14
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 20,
        width: modalWidth,
        maxHeight: modalHeight,
        overflow: 'hidden',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalOption: {
        fontSize: 16,
        marginBottom: 7,
        color: '#333333',
    },
})