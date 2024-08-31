import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useTheme } from '../context/ThemeProvider';

const MyCalendar = ({ onDateSelect }) => {
  const{theme} = useTheme()
  
  const handleDateSelect = (date) => {
    // Call the callback function with the selected date
    onDateSelect(date.dateString);
  };
  
  return (
    <View style={{height: 250}}>
      <Calendar 
      style={{backgroundColor: "transparent", height: 150}}
      theme={{
        backgroundColor: "transparent",
        calendarBackground: "transparent",
        selectedDayBackgroundColor: theme.text,
        selectedDayTextColor: theme.text,
        dayTextColor: theme.text,
        arrowColor: theme.text,
        monthTextColor: theme.text,
        textMonthFontWeight: "800",
        textMonthFontSize: 20,
        todayBackgroundColor: theme.text,
        todayTextColor: theme.light
      }}
      onDayPress={handleDateSelect}
      />
    </View>
  );
};

export default MyCalendar;
