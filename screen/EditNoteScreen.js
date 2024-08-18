import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Arrow from "../component/Arrow"
import Mark from "../component/Mark"
import Pin from "../component/Pin"
import AsyncStorage from '@react-native-async-storage/async-storage';
import Dustin from "../component/Dustin"
import { LIGHT_MODE } from '../common/style'
import { useTheme } from '../context/ThemeProvider'
import { StatusBar } from 'expo-status-bar'

const EditNoteScreen = ({ route, navigation }) => {
    const { note } = route.params;
    const [title, setTitle] = useState(note.title);
    const [desc, setDesc] = useState(note.desc);
    const{theme} = useTheme()

    const updateNote = async () => {
        try {
          const updatedNote = { ...note, title, desc };
          const notes = JSON.parse(await AsyncStorage.getItem('noteData'));
          const updatedNotes = notes.map(item => (item.id === updatedNote.id ? updatedNote : item));
          await AsyncStorage.setItem('noteData', JSON.stringify(updatedNotes));
          navigation.goBack();
        } catch (error) {
          console.error('Error updating note:', error);
        }
    };

    const deleteNote = async () => {
        try {
          const notes = JSON.parse(await AsyncStorage.getItem('noteData'));
          const updatedNotes = notes.filter(item => item.id !== note.id);
          await AsyncStorage.setItem('noteData', JSON.stringify(updatedNotes));
          navigation.goBack();
        } catch (error) {
          console.error('Error deleting note:', error);
        }
    };

  return (
    <View style={[styles.schedule, {backgroundColor: theme.light}]}>
        <View style={styles.scheduleContainer}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{flexDirection: "row", gap: 10}} activeOpacity={0.7}>
                <Arrow color={theme.text}  />
                <Text style={[styles.createScheuleText, {color: theme.text}]}>Edit Note</Text>
            </TouchableOpacity>
            <View style={styles.headerNav}>
                <TouchableOpacity style={{width: 14, height: 14}} onPress={() => deleteNote()} activeOpacity={0.7} >
                    <Dustin color={theme.text} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => updateNote()} activeOpacity={0.7}>
                    <Mark color={theme.text} />
                </TouchableOpacity>
            </View>
          </View>
            
          <ScrollView style={styles.createScheule}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.keyboardAvoidingContainer}>
                    <Text style={[styles.noteCreateText, {color: theme.text}]}>Title</Text>
                    <TextInput placeholder='Enter title....'  style={[styles.noteCreateInput, {borderColor: theme.text, color: theme.text}]} placeholderTextColor={theme.text} value={title} onChangeText={(text) => setTitle(text)}/>
                    <Text style={[styles.noteCreateText, {marginTop: 20, color: theme.text}]}>Description</Text>
                    
                    <TextInput placeholder='Enter title....' style={[styles.noteCreateInput, {paddingBottom: 20, borderColor: theme.text, color: theme.text}]} value={desc} placeholderTextColor={theme.text} multiline onChangeText={(text) => setDesc(text)}  />
              </KeyboardAvoidingView >
        
          </ScrollView>

        </View>
    </View>
  )
}

export default EditNoteScreen


const styles = StyleSheet.create({
  schedule: {
      flex: 1
  },
  scheduleContainer: {
      paddingVertical: 40,
      paddingHorizontal: 20
  },
  header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between"
  },
  headerNav: {
      flexDirection: "row",
      gap: 20,
      alignItems: "center"
  },
  createScheule: {
      paddingTop: 30,
      marginBottom: 10,
      paddingBottom: 100
  },
  createScheuleText: {
      fontFamily: 'Nunito-SemiBold',
      fontSize: 18
  },
  noteCreateText: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 14,
    marginBottom: 10
  },
  noteCreateInput: {
    borderWidth: 2,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  keyboardAvoidingContainer: {
    flex: 1,
  },
})