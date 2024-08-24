import moment from "moment";
import { StyleSheet, Text, View } from "react-native";
import ShowSchedule from "./ShowSchedule";
import { useTheme } from "../context/ThemeProvider";

export const showScheduleData = (item, index) => { 
  const {theme} = useTheme() 
  return(
    <View key={index} style={styles.scheduleData}>
      <View style={styles.scheduleDataDate}>
        <View style={[styles.scheduleDataText, {backgroundColor: theme.light, borderColor: theme.text}]}>
          <Text style={[styles.scheduleDataTextInside, {color: theme.text}]}>{moment(item.title, 'DD-MM-YYYY').format('D')}</Text>
        </View>
        <View style={[styles.scheduleDataLine, {backgroundColor: theme.text}]}></View>
      </View>

      <View style={styles.returnScheduleData}>
          {item.data.map(schedule => {
              const load = JSON.parse(schedule)     
              return(
                <ShowSchedule key={load.id} item={{...load}} />
              )
          } )}
      </View>
    </View>
  )
    
}

const styles = StyleSheet.create(
    {
    scheduleData: {
      flexDirection: "row",
      columnGap: 20
    },
    scheduleDataText: {
      display: "flex",
      borderRadius: 50,
      width: 35,
      height: 35,   
      borderWidth: 3, 
      justifyContent: "center",
      alignItems: "center",
      borderStyle: "solid"
    },
    scheduleDataTextInside: {
      fontFamily: 'Nunito-Bold',
      fontSize: 16,
    },
    scheduleDataDate:{
      flexDirection: "column",
      alignItems: "center"
    },
    scheduleDataLine: {
      width: 10,
      marginTop: -2,
      flex: 1
    },
    returnScheduleData: {
      flex: 1
    }
  }
)
