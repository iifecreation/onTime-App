import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useTheme } from '../context/ThemeProvider';

const MyCalendar = ({ onDateSelect }) => {
  const{theme} = useTheme()
  
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
        selectedDayBackgroundColor: theme.main,
        selectedDayTextColor: theme.text,
        dayTextColor: theme.text,
        arrowColor: theme.main,
        monthTextColor: theme.main,
        textMonthFontWeight: "800",
        textMonthFontSize: 20,
        todayBackgroundColor: theme.main,
        todayTextColor: "#fff"
      }}
      onDayPress={handleDateSelect}
      />
    </View>
  );
};

export default MyCalendar;
