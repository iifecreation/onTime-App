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
        selectedDayBackgroundColor: "#A792F933",
        selectedDayTextColor: "#ffffff",
        dayTextColor: "#ffffff",
        arrowColor: "#A792F933",
        monthTextColor: "#ffffff",
        textMonthFontWeight: "800",
        textMonthFontSize: 20
      }}
      />
    </View>
  );
};

export default MyCalendar;
