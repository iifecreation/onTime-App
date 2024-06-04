import { StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Arrow from "../component/Arrow"
import Mark from "../component/Mark"
import Dustin from "../component/Dustin"
import SmallArrow from "../component/SmallArrow"
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import {CheckBox} from 'rn-inkpad';

const ScheduleScreen = () => {
    const navigation = useNavigation();
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };
    
    const hideDatePicker = () => {
    setDatePickerVisibility(false);
    };
    
    const handleConfirm = (date) => {
    hideDatePicker();
    setSelectedDate(date);
    };

  return (
    <View style={styles.schedule}>
        <View style={styles.scheduleContainer}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Arrow />
                </TouchableOpacity>
                <View style={styles.headerNav}>
                    <CheckBox iconColor='#fff' textStyle={{display: "none"}} />
                    <View style={{width: 20, height: 20}}>
                        <Dustin />
                    </View>
                    <Mark />
                </View>

            </View>

            <View style={styles.createScheule}>
                <Text style={styles.createScheuleText}>Schedule</Text>
                <TextInput style={styles.createScheuleInput} placeholder='Enter Title' />

                <View style={styles.createScheuleFull}>
                    <Text style={styles.createScheuleFullText}>Fullday</Text>
                    <Switch />
                </View>

               <View style={styles.createScheulePla}>
                    <View style={styles.createScheuleFull}>
                        <Text style={styles.createScheuleFullText}>Start from</Text>
                        <TouchableOpacity style={styles.createScheuleSecon} onPress={showDatePicker}>
                            <Text style={styles.createScheuleSeconText}>{selectedDate
                                ? `${moment(selectedDate).format('MMMM, Do YYYY hh:mm A')}`
                                : 'Mon, 20 Sep 2021 10:00 AM '}
                            </Text>
            
                            <SmallArrow />
                        </TouchableOpacity>
                    </View>

                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="datetime"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                    />

                    <View style={styles.createScheuleFull}>
                        <Text style={styles.createScheuleFullText}>Finish</Text>
                        <TouchableOpacity style={styles.createScheuleSecon} onPress={showDatePicker}>
                            <Text style={styles.createScheuleSeconText}>{selectedDate
                                ? `${moment(selectedDate).format('MMMM, Do YYYY hh:mm A')}`
                                : 'Mon, 20 Sep 2021 10:00 AM '}</Text>
                            <SmallArrow />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.createScheuleFull}>
                        <Text style={styles.createScheuleFullText}>Repeat</Text>
                        <TouchableOpacity style={styles.createScheuleSecon}>
                            <Text style={styles.createScheuleSeconText}>One time</Text>
                            <SmallArrow />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.createScheuleFull}>
                        <Text style={styles.createScheuleFullText}>Reminder</Text>
                        <TouchableOpacity style={styles.createScheuleSecon}>
                            <Text style={styles.createScheuleSeconText}>Before 5 minutes</Text>
                            <SmallArrow />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.scheduleInput}>
                        <TextInput placeholder='Place...' style={[styles.createScheuleInput, {marginBottom: 0}]} />
                    </View>

                    <View style={styles.scheduleInput}>
                        <TextInput placeholder='Note...' style={styles.createScheuleInput} multiline/>
                    </View>
               </View>

            </View>
            
        </View>
    </View>
  )
}

export default ScheduleScreen

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
    scheduleInput: {

    },
})