import { FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Animated } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import moment from 'moment'
import { useTheme } from '../context/ThemeProvider'
import { deleteNoteData } from '../database/db-service'
import { useSQLiteContext } from 'expo-sqlite'
import { showScheduleData } from '../libs/showScheduleData'
import {Plus, SmallLogo, Search, Cross, Notification, Gradient, MyCalendar, Edit, Dustin, Schedule, Note} from "../libs/exportData"
import {RichEditor } from 'react-native-pell-rich-editor'

const HomeScreen = ({navigation}) => {
  const db = useSQLiteContext();
  const[schedule, setSchedule] = useState(true)
  const[note, setNote] = useState(false)
  const[plus, setPlus] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const {theme, scheduleData, filteredSchedule, noteData, setFilteredSchedule, setNoteData} = useTheme()
  const position = useRef(new Animated.Value(0)).current;

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

  const deleteNote = async (id) => {
    try {
      let data = await deleteNoteData(db, id)
      setNoteData(data)
      console.log('Schedule deleted successfully!');
    } catch (error) {
      console.error('Error deleting schedule:', error);
      
    }
  }

  const renderNoteItem = ({ item }) => {
    
    return (
      <View style={[styles.showNoteContentContainer, {backgroundColor: theme.text}]} key={item.id}>
        <View style={{height: 105, marginBottom: 10}}>
          <RichEditor
          initialContentHTML={item.note}
          disabled={true}
          editorStyle={
            {
              backgroundColor: theme.text,
              color: theme.light,
            }
          }
          style={[styles.rich]}
          />
        </View>
        <View style={styles.showNoteDateCon}>
          <Text style={[styles.showNoteDate, {color: theme.light}]}>{moment(Number(item.createdAt)).format("D/MM/YYYY")}</Text>
          <View style={{flexDirection: "row", gap: 10, alignItems: "center", justifyContent: "center"}}>
            <TouchableOpacity onPress={() => navigation.navigate('EditNote', { note: item })}>
              <Edit color={theme.light}/>
            </TouchableOpacity>
            <TouchableOpacity style={{width: 14, height: 14}} onPress={() => deleteNote(item.id)}>
              <Dustin color={theme.light} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

  // Function to filter schedule data based on selected date
  const filterScheduleData = useCallback((date) => {
    if(date){
      const formattedDate = moment(date).format('DD-MM-YYYY');
      const groupedData = {};
      for (const element in scheduleData) {
        if(formattedDate === element){
          groupedData[element] = scheduleData[element]
          setFilteredSchedule(groupedData);
          break;
        }else{
          console.log("hello");
          
        }
      }
    }else{
      setFilteredSchedule(scheduleData)
    }
    
  }, []);

  // Callback function to handle date selection from calendar
  const handleDateSelect = useCallback(async (date) => {
    setSelectedDate(date);
    filterScheduleData(date)
  }, []);

  const sections = Object.keys(filteredSchedule).map(date => ({
    title: date,
    data: filteredSchedule[date]
  }));

  const moveLeft = () => {
    Animated.timing(position, {
      toValue: 153, // Move left by 100 units
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const moveRight = () => {
    Animated.timing(position, {
      toValue: 3, 
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.onBoard}>
      <StatusBar style={theme.status} />
      <Gradient>
        <View style={styles.onBoardLogo}>
          <View style={styles.plusIconWrap}>
            <TouchableOpacity  onPress={() => changePlus()} activeOpacity={0.8}>
              {plus || <View style={[styles.plusIconWrapCon, {backgroundColor: theme.text}]}>
                <Plus color={theme.light} />
                </View>}
            </TouchableOpacity>
          </View>

       
          {plus && (
            <View style={[styles.showMoreOptions, {backgroundColor: theme.light}]}>
              <View style={styles.plusIconThrid}>
                <View style={[styles.showMoreOptionsCon, {alignSelf: "flex-end"}]}>
                  <Text style={[styles.showMoreOptionsText, {color: theme.text}]}>Note</Text>
                  <TouchableOpacity style={[styles.plusIconWrapCon, {backgroundColor: theme.text}]} onPress={() => {navigation.navigate("Note"); changePlusBack()}} activeOpacity={0.8}>
                    <Note color={theme.light} />
                  </TouchableOpacity>
                </View>

                <View style={styles.showMoreOptionsCon}>
                  <Text style={[styles.showMoreOptionsText, {color: theme.text}]}>Schedule</Text>
                  <TouchableOpacity style={[styles.plusIconWrapCon, {backgroundColor: theme.text}]} onPress={() => {navigation.navigate("Schedule"); changePlusBack()}} activeOpacity={0.8}>
                    <Schedule color={theme.light} />
                  </TouchableOpacity>
                </View>

                <TouchableOpacity style={[styles.plusIconWrapCon, {backgroundColor: theme.text, alignSelf: "flex-end"}]} onPress={() => changePlusBack()} activeOpacity={0.8}>
                  <Cross color={theme.light} />
                </TouchableOpacity>
                
              </View>
            </View>
          )}

          <View style={styles.headerBoard}>
            <SmallLogo color={theme.text} />

            <View style={styles.notified}>
                <TouchableOpacity onPress={() => navigation.navigate("Notified")}>
                  <Notification color={theme.text} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.circleContainer} onPress={() => navigation.navigate("Setting")}>
                  <View style={[styles.circle, {backgroundColor: theme.text}]}></View>
                  <View style={[styles.circle, {backgroundColor: theme.text}]}></View>
                  <View style={[styles.circle, {backgroundColor: theme.text}]}></View>
                </TouchableOpacity>
            </View>
          </View>

          <View style={styles.cover}>
            <View style={[styles.homeSelect, {backgroundColor: theme.text}]}>
              <Animated.View
              style={[
                // styles.box,
                styles.animateButton,
                {
                  backgroundColor: theme.light,
                  transform: [{ translateX: position }],
                  // left: schedule ? position : null,
                  // right: note ? position : null
                },
              ]}
              >
                {/* <View style={[styles.animateButton, {backgroundColor: theme.light, left: schedule ? 5 : null, right: note ? 5 : null }]}></View> */}
              </Animated.View>
              <TouchableOpacity style={styles.homeSelectTextPart} onPress={() => {
                showSchedule()
                moveRight()
              }}>
                <Text style={[styles.homeSelectText, {color: schedule ? theme.text : theme.light}]}>Schedule</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.homeSelectTextPart} onPress={() => {
                showNote()
                moveLeft()
              }}>
                <Text style={[styles.homeSelectText, {color: note ? theme.text : theme.light}]}>Note</Text>
              </TouchableOpacity>
            </View>
          </View>

          {schedule && (
            <ScrollView style={styles.scheduleContainer} showsVerticalScrollIndicator={false}>
              <MyCalendar onDateSelect={handleDateSelect} />

              <Text style={[styles.scheduleText, {color: theme.text}]}>Schedule</Text>

              <View style={styles.schedulesCont}>
                
                {Object.keys(filteredSchedule).length > 0  ? (
                  sections.map((item, index) => {
                    return (
                      showScheduleData(item, index, navigation)
                    )
                  } )
                  ) : (
                    <View style={styles.schedulesNoTextWrapper}>
                      <Text style={[styles.schedulesNoText, {color: theme.text}]}>No schedules for selected date.</Text>
                    </View>
                )}
              </View>

            </ScrollView>
          )}

          {note && (
            <View style={styles.scheduleContainer}>

              <View style={[styles.noteSearch, {borderColor: theme.text}]}>
                <Search color={theme.text} />
                <TextInput placeholder='Search for note' 
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  style={{color: theme.text}}
                  placeholderTextColor={theme.text + "73"} />
              </View>
              
              <View>
                <View style={styles.showNoteContent}>
                  {
                    noteData.length < 0 ? (
                      <View style={styles.schedulesNoTextWrapper}>
                        <Text style={styles.schedulesNoText} >You Didn’t Have Any Note.</Text>
                        <TouchableOpacity onPress={() => navigation.navigate("Note")}>
                          <Text style={styles.schedulesNoButton}>Create Note</Text>
                        </TouchableOpacity>
                      </View>
                    ): (
                      <FlatList
                        data={noteData}
                        renderItem={renderNoteItem}
                        keyExtractor={item => item.id.toString()}
                      />
                    )
                  }
                </View>
              </View>
              
            </View>
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
    width: 7,
    height: 7,
    borderRadius: 50,
  },
  notified: {
    flexDirection: "row",
    gap: 30
  },
  homeSelect: {
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    paddingVertical: 12,
    marginTop: 20,
    position: "relative"
  },
  homeSelectText: {
    fontFamily: 'Nunito-Bold',
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
    marginTop: 95
  },
  schedulesNoTextWrapper: {
    marginTop: 30,
    gap: 15
  },
  schedulesNoText: {
    color: "#ffffff",
    borderRadius: 20,
    textAlign: "center"
  },
  schedulesNoButton: {
    color: "#ffffff",
    backgroundColor: "#A792F933",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    textAlign: "center"
  },
  plusIconWrap: {
    position: "absolute",
    bottom: 20,
    right: 20,
    zIndex: 5
  },
  plusIconWrapCon: {
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
    borderWidth: 1,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 15,
    gap: 15
  },
  showNoteContent: {
    gap: 15,
    marginTop: 20,
  },
  showNoteContentContainer: {
    borderRadius: 10,
    marginBottom: 10,
    paddingVertical: 10,
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
    fontFamily: 'Nunito-Bold',
    fontSize: 13
  },
  showNoteDateCon: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  plusIconThrid: {
    gap: 20
  },
  showMoreOptions: {
    position: "absolute",
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
    fontFamily: 'Nunito-SemiBold',
    fontSize: 14
  },
  schedulesCont:{
    paddingTop: 10
  },
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
  },
  rich:{
    maxHeight: 105,
  },
  animateButton: {
    position: "absolute",
    shadowColor: "#000000a2",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 5,
    paddingVertical: 18,
    borderRadius: 10,
    width: '50%',
    left: 5
    // right: 10
  }
})