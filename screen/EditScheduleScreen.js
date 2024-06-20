import { Modal, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View, Dimensions, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState } from 'react'
import Arrow from "../component/Arrow"
import Mark from "../component/Mark"
import Dustin from "../component/Dustin"
import SmallArrow from "../component/SmallArrow"
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {CheckBox} from 'rn-inkpad';

const EditScheduleScreen = () => {

    const route = useRoute();
    const { schedule } = route.params;

    const navigation = useNavigation();
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isDatePickerFinishVisible, setDatePickerFinishVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [finishDate, setFinishDate] = useState(null);
    const[title, setTitle] = useState(schedule.title)
    const[note, setNote] = useState(schedule.note)
    const[place, setPlace] = useState(schedule.place)
    const[fullday, setFullDay] = useState(schedule.fullday)
    const [isRepeatModalVisible, setRepeatModalVisible] = useState(false);
    const [isReminderModalVisible, setReminderModalVisible] = useState(false);
    const [selectedRepeatOption, setSelectedRepeatOption] = useState(schedule.selectedRepeatOption);
    const [selectedReminderOption, setSelectedReminderOption] = useState(schedule.selectedReminderOption);


    const currentDate = new Date();

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

    // Function to save the edited schedule
    const saveEditedSchedule = async () => {
        try {
            // Retrieve existing schedules from AsyncStorage
            let schedules = [];
            const existingSchedule = await AsyncStorage.getItem('scheduleData');
            if (existingSchedule) {
                schedules = JSON.parse(existingSchedule);
            }

            // Update the schedule with edited data
            const updatedSchedule = {
                id: schedule.id,
                title,
                note,
                place,
                fullday,
                selectedDate: selectedDate ? selectedDate.toString() : null,
                finishDate: finishDate ? finishDate.toString() : null,
                selectedRepeatOption: schedule.selectedRepeatOption,
                selectedReminderOption: schedule.selectedReminderOption
            };

            // Find and replace the old schedule with the updated one
            const index = schedules.findIndex(s => s.id === schedule.id);
            if (index !== -1) {
                schedules[index] = updatedSchedule;
            }

            // Save the updated schedules back to AsyncStorage
            await AsyncStorage.setItem('scheduleData', JSON.stringify(schedules));
            console.log('Schedule data updated successfully!');
            navigation.goBack();
        } catch (error) {
            console.error('Error updating schedule:', error);
        }
    };

    // Function to delete the schedule
    const deleteSchedule = async () => {
        try {
            // Retrieve existing schedules from AsyncStorage
            let schedules = [];
            const existingSchedule = await AsyncStorage.getItem('scheduleData');
            if (existingSchedule) {
                schedules = JSON.parse(existingSchedule);
            }
            // Remove the schedule from the array
            const updatedSchedules = schedules.filter(s => s.id !== schedule.id);

            // Save the updated schedules back to AsyncStorage
            await AsyncStorage.setItem('scheduleData', JSON.stringify(updatedSchedules));
            console.log('Schedule deleted successfully!');
            navigation.goBack();
        } catch (error) {
            console.error('Error deleting schedule:', error);
        }
    };


  return (
    <View style={styles.schedule}>
        <View style={styles.scheduleContainer}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Arrow />
                </TouchableOpacity>
                <View style={styles.headerNav}>
                    {/* <CheckBox iconColor='#fff' textStyle={{display: "none"}} /> */}
                    <TouchableOpacity style={{width: 20, height: 20}} onPress={() => deleteSchedule()}>
                        <Dustin />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => saveEditedSchedule()}>
                        <Mark />
                    </TouchableOpacity>
                </View>

            </View>
                <View style={styles.createScheule}>
                    <Text style={styles.createScheuleText}>Schedule</Text>
                    <TextInput style={styles.createScheuleInput} placeholder='Enter Title' value={title} onChangeText={(text) => setTitle(text)} />

                    <View style={styles.createScheuleFull}>
                        <Text style={styles.createScheuleFullText}>Fullday</Text>
                        <Switch value={fullday} onValueChange={toggleSwitch} />
                    </View>

                <View style={styles.createScheulePla}>
                        <View style={styles.createScheuleFull}>
                            <Text style={styles.createScheuleFullText}>Start from</Text>
                            <TouchableOpacity style={styles.createScheuleSecon} onPress={showDatePicker}>
                                <Text style={styles.createScheuleSeconText}>{selectedDate
                                    ? `${moment(selectedDate).format('MMMM, Do YYYY hh:mm A')}`
                                    : `${moment(schedule.selectedDate).format('MMMM, Do YYYY hh:mm A')}`}
                                </Text>
                
                                <SmallArrow />
                            </TouchableOpacity>
                        </View>

                        

                        <View style={styles.createScheuleFull}>
                            <Text style={styles.createScheuleFullText}>Finish</Text>
                            <TouchableOpacity style={styles.createScheuleSecon} onPress={showDateFinishPicker}>
                                <Text style={styles.createScheuleSeconText}>{finishDate
                                    ? `${moment(finishDate).format('MMMM, Do YYYY hh:mm A')}`
                                    : `${moment(schedule.finishDate).format('MMMM, Do YYYY hh:mm A')}`}</Text>
                                <SmallArrow />
                            </TouchableOpacity>
                        </View>

                        

                        <View style={styles.createScheuleFull}>
                            <Text style={styles.createScheuleFullText}>Repeat</Text>
                            <TouchableOpacity style={styles.createScheuleSecon} onPress={() => toggleRepeatModal()}>
                                <Text style={styles.createScheuleSeconText}>{selectedRepeatOption}</Text>
                                <SmallArrow />
                            </TouchableOpacity>
                        </View>
                                    
                        {/* reminder section start */}
                        <View style={styles.createScheuleFull}>
                            <Text style={styles.createScheuleFullText}>Reminder</Text>
                            <TouchableOpacity style={styles.createScheuleSecon} onPress={() => toggleReminderModal()}>
                                <Text style={styles.createScheuleSeconText}>{selectedReminderOption}</Text>
                                <SmallArrow />
                            </TouchableOpacity>
                        </View>
                        {/* reminder section end */}

                        <View style={styles.scheduleInput}>
                            <TextInput placeholder='Place...' style={[styles.createScheuleInput, {marginBottom: 0}]} value={place} onChangeText={(text) => setPlace(text)} />
                        </View>

                        <View style={styles.scheduleInput}>
                            <TextInput placeholder='Note...' style={styles.createScheuleInput} multiline value={note} onChangeText={(text) => setNote(text)}/>
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
        backgroundColor: "#282530",
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
        color: "#ffffff",
        fontFamily: 'Nunito-SemiBold',
        fontSize: 16,
        marginBottom: 20
    },
    createScheuleInput: {
        backgroundColor: "#ffffff",
        borderRadius: 10,
        paddingVertical: 7,
        fontSize: 16,
        fontFamily: 'Nunito-Regular',
        paddingHorizontal: 10,
        marginBottom: 25
    },
    createScheuleFull: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    createScheuleFullText: {
        fontSize: 16,
        fontFamily: 'Nunito-Regular',
        color: "#ffffff",
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
        color: '#333333',
    },
})