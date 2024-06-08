import { FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Button } from 'react-native'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
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
import moment from 'moment';
import Dustin from "../component/Dustin"
import UnPin from "../component/Unpin"
// import {CheckBox} from 'rn-inkpad';

const HomeScreen = ({navigation}) => {
  const[schedule, setSchedule] = useState(true)
  const[note, setNote] = useState(false)
  const[plus, setPlus] = useState(false)
  const [scheduleData, setScheduleData] = useState([]);
  const [noteData, setNoteData] = useState([]);
  const [pinnedNotes, setPinnedNotes] = useState([]);
  const [unpinnedNotes, setUnpinnedNotes] = useState([]);

  // Function to group schedules by creation date
  const groupByCreationDate = useMemo(() =>  {
    return (data) => {
      const groupedData = {};
      data.forEach(schedule => {
          const creationDate = moment(schedule.id).format('YYYY-MM-DD');
          if (groupedData[creationDate]) {
              groupedData[creationDate].push(schedule);
          } else {
              groupedData[creationDate] = [schedule];
          }
      });
      return groupedData;
    };
  })

  const deleteSchedule = useCallback(async (scheduleId) => {
    try {
        // Retrieve the schedule data from AsyncStorage
        const jsonValue = await AsyncStorage.getItem('scheduleData');
        if (jsonValue !== null) {
            // Parse the JSON data
            const data = JSON.parse(jsonValue);
            // Filter out the schedule to be deleted
            const newData = data.filter(schedule => schedule.id !== scheduleId);
            // Save the updated schedule data to AsyncStorage
            await AsyncStorage.setItem('scheduleData', JSON.stringify(newData));
            // Update the state to reflect the changes
            const groupedData = groupByCreationDate(newData);
            setScheduleData(groupedData);
        }
    } catch (error) {
        console.error('Error deleting schedule:', error);
    }
}, [scheduleData]);

  useEffect(() => {
    const fetchScheduleData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('scheduleData');
            if (jsonValue !== null) {
                const data = JSON.parse(jsonValue);
                // Group schedules by creation date
                const groupedData = groupByCreationDate(data);
                setScheduleData(groupedData);
            }
        } catch (error) {
            console.error('Error retrieving schedule data:', error);
        }
    };

    const fetchNotes = async () => {
      try {
        const data = await AsyncStorage.getItem('noteData');
        if (data) {
          const parsedData = JSON.parse(data).reverse()
          setNoteData(parsedData);

          // Filter pinned notes
          const pinned = parsedData.filter(note => note.pinned);
          setPinnedNotes(pinned);
        }
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    fetchNotes();
    fetchScheduleData();
  }, [deleteSchedule]);

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
      const updatedNotes = noteData.filter(note => note.id !== id);
      await AsyncStorage.setItem('noteData', JSON.stringify(updatedNotes));
      setNoteData(updatedNotes);
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const pinNote =  useMemo(() =>  {
  return  async (id) => {
    try {
        const noteIndex = noteData.findIndex(note => note.id === id);
        if (noteIndex !== -1) {
            const noteToPin = noteData[noteIndex];
            const updatedNoteData = [...noteData];
            const note = updatedNoteData.splice(noteIndex, 1)[0];
            note.pinned = !note.pinned; // Toggle pin status
            const insertIndex = note.pinned ? Math.min(pinnedNotes.length, 2) : updatedNoteData.length;
            updatedNoteData.splice(insertIndex, 0, note);
            setNoteData(updatedNoteData);
            await AsyncStorage.setItem('noteData', JSON.stringify(updatedNoteData));
        }
    } catch (error) {
        console.error('Error pinning note:', error);
    }
  };
  })

  useEffect(() => {
    // Separate pinned and unpinned notes...
    const pinned = noteData.filter(note => note.pinned);
    const unpinned = noteData.filter(note => !note.pinned);
    setPinnedNotes(pinned);
    setUnpinnedNotes(unpinned);
  }, [noteData]);

  const renderNoteItem = ({ item }) => {
    console.log(item);
    return (
      <View style={styles.showNoteContentContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('EditNote', { note: item })}>
          <Text style={styles.showNoteTexthead}>{item.title}</Text>
          <Text style={styles.showNoteTextDesc}>{item.desc}...</Text>
        </TouchableOpacity>
        <View style={styles.showNoteDateCon}>
          <Text style={styles.showNoteDate}>{new Date(item.dateCreated).toLocaleDateString()}</Text>
          <View style={{flexDirection: "row", gap: 10, alignItems: "center", justifyContent: "center"}}>
            <TouchableOpacity style={{width: 14, height: 14}} onPress={() => deleteNote(item.id)}>
              <Dustin />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => pinNote(item.id)}>
              {pinnedNotes.some(note => note.id === item.id) ? <UnPin /> : <Pin />}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
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

                {Object.keys(scheduleData).length > 0 ? (
                  Object.entries(scheduleData).map(([date, schedules]) => (
                    <View key={date} style={styles.scheduleData}>
                        <View style={styles.scheduleDataDate}>
                          <Text style={styles.scheduleDataText}>{moment(date).format('D')}</Text>
                          <View style={styles.scheduleDataLine}></View>
                        </View>
                        <View style={styles.returnScheduleData}>
                          {schedules.map(schedule => (
                            <View key={schedule.id} style={styles.returnSchedule}>
                                <View style={styles.returnScheduleHeader}>
                                  <Text style={styles.returnScheduleHeaderText}>{schedule.title}</Text>
                                  <View style={styles.returnScheduleHeaderIcon}>
                                    {/* <CheckBox iconColor='#fff' iconSize={17} textStyle={{display: "none"}} /> */}
                                    <TouchableOpacity style={{width: 14, height: 14}} onPress={() => deleteSchedule(schedule.id)}>
                                        <Dustin />
                                    </TouchableOpacity>
                                  </View>
                                </View>

                                <View style={styles.returnScheduleContent}>
                                  <Text style={styles.returnScheduleContentText}>Date:</Text>
                                  <Text style={styles.returnScheduleContentText1}>{moment(schedule.selectedDate).format("D/MM/YYYY")} - {moment(schedule.finishDate).format("D/MM/YYYY")}</Text>
                                </View>

                                <View style={styles.returnScheduleContent}>
                                  <Text style={styles.returnScheduleContentText}>Time:</Text>
                                  <Text style={styles.returnScheduleContentText1}>{moment(schedule.selectedDate).format("hh.mm a")} - {moment(schedule.finishDate).format("hh.mm a")}</Text>
                                </View>

                                <View style={styles.returnScheduleContent}>
                                  <Text style={styles.returnScheduleContentText}>Place:</Text>
                                  <Text style={styles.returnScheduleContentText1}>{schedule.place}</Text>
                                </View>

                                <View style={styles.returnScheduleContent}>
                                  <Text style={styles.returnScheduleContentText}>Notes:</Text>
                                  <Text style={styles.returnScheduleContentText1}>{schedule.note}</Text>
                                </View>
                            </View>
                          ))}
                        </View>
                    </View>
                  ))
                ) : (
                  <View style={styles.schedulesNoTextWrapper}>
                    <Text style={styles.schedulesNoText} >You Didn’t Have Any Schedule.</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Schedule")}>
                      <Text style={styles.schedulesNoButton}>Create Schedule</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>

          </ScrollView>
          )}

          {note && (
            <View style={styles.scheduleContainer}>

              <View style={styles.noteSearch}>
                <Search />
                <TextInput placeholder='Search for note' />
              </View>
              
              <ScrollView>
                <View style={styles.showNoteContent}>
                  {
                    noteData.length === 0 ? (
                      <View style={styles.schedulesNoTextWrapper}>
                        <Text style={styles.schedulesNoText} >You Didn’t Have Any Note.</Text>
                        <TouchableOpacity onPress={() => navigation.navigate("Note")}>
                          <Text style={styles.schedulesNoButton}>Create Note</Text>
                        </TouchableOpacity>
                      </View>
                    ): (
                      <FlatList
                      data={[...pinnedNotes, ...unpinnedNotes]}
                      renderItem={renderNoteItem}
                      keyExtractor={item => item.id.toString()}
                    />
                    )
                  }
                  
                </View>
              </ScrollView>
              
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
    backgroundColor: "#A792F933",
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
    backgroundColor: "#A792F9",
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
    marginTop: 20,
  },
  showNoteContentContainer: {
    backgroundColor: "#7E64FF",
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 10,
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
    fontSize: 16,
    textAlign: "center",
    borderColor: "#A792F933",
    borderWidth: 3,
    fontFamily: 'Nunito-Bold',
    color: "#515151",
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "solid"
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
})