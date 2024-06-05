import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import Gradient from '../common/Gradient'
import SmallLogo from "../component/SmallLogo"
import Notification from "../component/Notification"
import Plus from "../component/Plus"
import Search from "../component/Search"
import Pin from "../component/Pin"
import Cross from "../component/Cross"
import Schedule from "../component/Schedule"
import Note from "../component/Note"
import MyCalendar from '../libs/MyCalendar'
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({navigation}) => {

  const[schedule, setSchedule] = useState(true)
  const[note, setNote] = useState(false)
  const[plus, setPlus] = useState(false)
  const [scheduleData, setScheduleData] = useState([]);

  useEffect(() => {
    const fetchScheduleData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('scheduleData');
            if (jsonValue !== null) {
                const data = JSON.parse(jsonValue);
                setScheduleData(data);
            }
        } catch (error) {
            console.error('Error retrieving schedule data:', error);
        }
    };
    fetchScheduleData();
  }, []);

  const showSchedule = () => {
    setNote(false)
    setSchedule(true)
  }

  const showNote = () => {
    setNote(true)
    setSchedule(false)
  }

  const changePlus = () => {
    setPlus(true)
  }

  const changePlusBack = () => {
    setPlus(false)
  }

  return (
    <View style={styles.onBoard}>
      <StatusBar style='light' />
      <Gradient>
        <View style={styles.onBoardLogo}>

          <View style={styles.plusIconWrap}>
            <TouchableOpacity  onPress={() => changePlus()}>
              {plus || <View style={styles.plusIconWrapCon}>
                <Plus />
                </View>}
            </TouchableOpacity>
          </View>

       
            {plus && (
              <View style={styles.showMoreOptions}>
                <View style={styles.plusIconThrid}>
                  <View style={[styles.showMoreOptionsCon, {alignSelf: "flex-end"}]}>
                    <Text style={styles.showMoreOptionsText}>Note</Text>
                    <TouchableOpacity style={styles.plusIconWrapCon} onPress={() => {navigation.navigate("Note"); changePlusBack()}}>
                      <Note />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.showMoreOptionsCon}>
                    <Text style={styles.showMoreOptionsText}>Schedule</Text>
                    <TouchableOpacity style={styles.plusIconWrapCon} onPress={() => {navigation.navigate("Schedule"); changePlusBack()}}>
                      <Schedule />
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity style={[styles.plusIconWrapCon, {alignSelf: "flex-end"}]} onPress={() => changePlusBack()}>
                    <Cross />
                  </TouchableOpacity>
                  
                </View>
              </View>
            )}

          <View style={styles.headerBoard}>
            <SmallLogo />

            <View style={styles.notified}>
                <TouchableOpacity onPress={() => navigation.navigate("Notified")}>
                  <Notification />
                </TouchableOpacity>

                <TouchableOpacity style={styles.circleContainer} onPress={() => navigation.navigate("Setting")}>
                  <View style={styles.circle}></View>
                  <View style={styles.circle}></View>
                  <View style={styles.circle}></View>
                </TouchableOpacity>
            </View>
          </View>

          <View style={styles.cover}>
            <View style={styles.homeSelect}>
              <TouchableOpacity style={styles.homeSelectTextPart} onPress={() => showSchedule()}>
                <Text style={[styles.homeSelectText]}>Schedule</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.homeSelectTextPart} onPress={() => showNote()}>
                <Text style={[styles.homeSelectText]}>Note</Text>
              </TouchableOpacity>
            </View>
          </View>

          {schedule && (
            <ScrollView style={styles.scheduleContainer}>
              <MyCalendar />

              <Text style={styles.scheduleText}>Schedule</Text>

              <View style={styles.schedulesCont}>
                
                {
                  scheduleData.length > 0 ? 
                  (scheduleData.map(schedule => (
                    <View>
                      
                    </View>
                  ))) 
                  :
                  (<Text style={styles.schedulesNoText} >You Didn’t Have Any Schedule.</Text>)
                }
              </View>

          </ScrollView>
          )}

          {note && (
            <ScrollView style={styles.scheduleContainer}>

              <View style={styles.noteSearch}>
                <Search />
                <TextInput placeholder='Search for note' />
              </View>

              <View style={styles.showNoteContent}>
                <TouchableOpacity style={styles.showNoteContentContainer}>
                  <Text style={styles.showNoteTexthead}>Title</Text>
                  <Text style={styles.showNoteTextDesc}>this morning's meeting, we have to improve the quality of office facilities and another...</Text>
                  <View style={styles.showNoteDateCon}>
                    <Text style={styles.showNoteDate}>28/10/2012</Text>
                    <Pin />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.showNoteContentContainer}>
                  <Text style={styles.showNoteTexthead}>Title</Text>
                  <Text style={styles.showNoteTextDesc}>this morning's meeting, we have to improve the quality of office facilities and another...</Text>
                  <View style={styles.showNoteDateCon}>
                    <Text style={styles.showNoteDate}>28/10/2012</Text>
                    <Pin />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.showNoteContentContainer}>
                  <Text style={styles.showNoteTexthead}>Title</Text>
                  <Text style={styles.showNoteTextDesc}>this morning's meeting, we have to improve the quality of office facilities and another...</Text>
                  <View style={styles.showNoteDateCon}>
                    <Text style={styles.showNoteDate}>28/10/2012</Text>
                    <Pin />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.showNoteContentContainer}>
                  <Text style={styles.showNoteTexthead}>Title</Text>
                  <Text style={styles.showNoteTextDesc}>this morning's meeting, we have to improve the quality of office facilities and another...</Text>
                  <View style={styles.showNoteDateCon}>
                    <Text style={styles.showNoteDate}>28/10/2012</Text>
                    <Pin />
                  </View>
                </TouchableOpacity>
              </View>
              
            </ScrollView>
          )}
        </View>
      </Gradient>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  onBoard: {
    flex: 1
  },
  onBoardLogo: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20
  },
  headerBoard: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row"
  },
  circleContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 5
  },
  circle: {
    width: 5,
    height: 5,
    borderRadius: 50,
    backgroundColor: "#ffffff"
  },
  notified: {
    flexDirection: "row",
    gap: 30
  },
  homeSelect: {
    backgroundColor: "#3C1F7B",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
    paddingHorizontal: 5,
    paddingVertical: 12,
    marginTop: 20
  },
  homeSelectText: {
    color: "#ffffff",
    fontFamily: 'Nunito-SemiBold',
    fontSize: 16,
    textAlign: "center"
  },
  cover: {
    justifyContent: "center",
    alignItems: "center"
  },
  scheduleContainer: {
    marginTop: 20
  },
  scheduleText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    color: "#ffffff",
    marginTop: 95
  },
  schedulesNoText: {
    color: "#ffffff",
    backgroundColor: "#3C1F7B",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 30,
    textAlign: "center"
  },
  plusIconWrap: {
    position: "absolute",
    bottom: 20,
    right: 20,
    zIndex: 5
  },
  plusIconWrapCon: {
    backgroundColor: "#3C1F7B",
    borderRadius: 50,
    padding: 15,
    width: 50,
    height: 50,
    alignItems: "center"
  },
  homeSelectTextPart: {
    width: "50%"
  },
  noteSearch: {
    backgroundColor: "#ffffff",
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 15,
    gap: 15
  },
  showNoteContent: {
    gap: 15,
    paddingTop: 20
  },
  showNoteContentContainer: {
    backgroundColor: "#7E64FF",
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  showNoteTexthead: {
    fontFamily: 'Nunito-Bold',
    fontSize: 18,
    color: "#ffffff",
    marginBottom: 5,
  },
  showNoteTextDesc: {
    fontSize: 15,
    color: "#ffffff",
    marginBottom: 5,
    fontFamily: 'Nunito-Regular',
    marginBottom: 10
  },
  showNoteDate: {
    color: "#ffffff",
    fontFamily: 'Nunito-Bold',
    fontSize: 13
  },
  showNoteDateCon: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  plusIconThrid: {
    gap: 20
  },
  showMoreOptions: {
    position: "absolute",
    backgroundColor: "#282530",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    zIndex: 10,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    paddingVertical: 20,
    paddingHorizontal: 20
  },
  showMoreOptionsCon: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center"
  },
  showMoreOptionsText: {
    color: "#ffffff",
    fontFamily: 'Nunito-SemiBold',
    fontSize: 14
  }
})