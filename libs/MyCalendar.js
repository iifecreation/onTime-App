import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { LIGHT_MODE } from '../common/style';

const MyCalendar = ({ onDateSelect }) => {
  const handleDateSelect = (date) => {
    // Call the callback function with the selected date
    console.log(date.dateString);
    onDateSelect(date.dateString);
  };
  return (
    <View style={{height: 250}}>
      <Calendar 
      style={{backgroundColor: "transparent", height: 150}}
      theme={{
        backgroundColor: "transparent",
        calendarBackground: "transparent",
        selectedDayBackgroundColor: LIGHT_MODE.main,
        selectedDayTextColor: LIGHT_MODE.text,
        dayTextColor: LIGHT_MODE.text,
        arrowColor: LIGHT_MODE.main,
        monthTextColor: LIGHT_MODE.main,
        textMonthFontWeight: "800",
        textMonthFontSize: 20,
        todayBackgroundColor: LIGHT_MODE.main,
        todayTextColor: "#fff"
      }}
      onDayPress={handleDateSelect}
      />
    </View>
  );
};

export default MyCalendar;
