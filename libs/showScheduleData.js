import moment from "moment";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {Dustin, Edit, CheckBox} from "./exportData"

export const showScheduleData = (item, index) => {  
  return(
    <View key={index} style={styles.scheduleData}>
      <View style={styles.scheduleDataDate}>
        <View style={styles.scheduleDataText}>
          <Text style={styles.scheduleDataTextInside}>{moment(item.title, 'DD-MM-YYYY').format('D')}</Text>
        </View>
        <View style={styles.scheduleDataLine}></View>
      </View>

      <View style={styles.returnScheduleData}>
          {item.data.map(schedule => {

              const {place, note, title, finish, start, completed} = JSON.parse(schedule)     
              return (
                  <View key={schedule.id} style={styles.returnSchedule}>
                      <View style={styles.returnScheduleHeader}>
                          <Text style={styles.returnScheduleHeaderText}>{title}</Text>
                      </View>

                      <View >
                        <View style={styles.returnScheduleContent}>
                          <Text style={styles.returnScheduleContentText}>Date:</Text>
                          <Text style={styles.returnScheduleContentText1}>{moment(start).format("D/MM/YYYY")} - {moment(finish).format("D/MM/YYYY")}</Text>
                        </View>

                        <View style={styles.returnScheduleContent}>
                          <Text style={styles.returnScheduleContentText}>Time:</Text>
                          <Text style={styles.returnScheduleContentText1}>{moment(start).format("hh.mm a")} - {moment(finish).format("hh.mm a")}</Text>
                        </View>

                        <View style={styles.returnScheduleContent}>
                          <Text style={styles.returnScheduleContentText}>Place:</Text>
                          <Text style={styles.returnScheduleContentText1}>{place}</Text>
                        </View>

                        <View style={styles.returnScheduleContent}>
                          <Text style={styles.returnScheduleContentText}>Notes:</Text>
                          <Text style={styles.returnScheduleContentText1}>{note.length > 27 ? `${note.substring(0, 28)} ...` : note}</Text>
                        </View>

                        <View style={styles.returnScheduleHeaderIcon}>
                          <TouchableOpacity style={{width: 14, height: 14}} onPress={() => deleteSchedule(schedule.id)}>
                              <CheckBox 
                                onPress={() => console.log("hello")}
                                isChecked={completed}
                              />
                          </TouchableOpacity>

                          <TouchableOpacity style={{width: 14, height: 14}} onPress={() => deleteSchedule(schedule.id)}>
                              <Edit color="red" />
                          </TouchableOpacity>

                          <TouchableOpacity style={{width: 14, height: 14}} onPress={() => deleteSchedule(schedule.id)}>
                              <Dustin color="red" />
                          </TouchableOpacity>
                        </View>
                      </View>
                  </View>
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
            backgroundColor: "#fff",
            borderRadius: 50,
            width: 35,
            height: 35,    
            borderColor: "#A792F933",
            borderWidth: 3, 
            justifyContent: "center",
            alignItems: "center",
            borderStyle: "solid"
          },
          scheduleDataTextInside: {
            fontFamily: 'Nunito-Bold',
            color: "#515151",
            fontSize: 16,
          },
          scheduleDataDate:{
            flexDirection: "column",
            alignItems: "center"
          },
          scheduleDataLine: {
            width: 10,
            backgroundColor: "#A792F933",
            marginTop: -2,
            flex: 1
          },
          returnSchedule: {
            borderRadius: 15,
            backgroundColor: "#A792F933",
            marginBottom: 20,
            padding: 15
          },
          returnScheduleHeader: {
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 12,
            borderBottomColor: "#ffffffB3",
            borderBottomWidth: 1,
            paddingBottom: 7,
            marginBottom: 10
          },
          returnScheduleHeaderText: {
            color: "#fff",
            fontFamily: 'Nunito-SemiBold',
            fontSize: 15
          },
          returnScheduleHeaderIcon: {
            flexDirection: "row",
            alignItems: 'center',
            gap: 5
          },
          returnScheduleContent: {
            flexDirection: "row",
            gap: 20,
            alignItems: "center"
          },
          returnScheduleContentText: {
            color: "#fff",
            fontFamily: 'Nunito-Bold',
            fontSize: 13
          },
          returnScheduleContentText1: {
            color: "#fff",
            fontFamily: 'Nunito-Regular',
            fontSize: 13
          },
          returnScheduleData: {
            flex: 1
          }
    }
)


// onPress={() => navigation.navigate('EditSchedule', { schedule: schedule })}