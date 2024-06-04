import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';

const MyCalendar = () => {
  return (
    <View style={{height: 250}}>
      <Calendar 
      style={{backgroundColor: "transparent", height: 150}}
      theme={{
        backgroundColor: "transparent",
        calendarBackground: "transparent",
        selectedDayBackgroundColor: "#3C1F7B",
        selectedDayTextColor: "#ffffff",
        dayTextColor: "#ffffff",
        arrowColor: "#3C1F7B",
        monthTextColor: "#ffffff",
        textMonthFontWeight: "800",
        textMonthFontSize: 20
      }}
      />
    </View>
  );
};

export default MyCalendar;
