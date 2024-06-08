import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Arrow from "../component/Arrow"
import Mark from "../component/Mark"
import Pin from "../component/Pin"
import AsyncStorage from '@react-native-async-storage/async-storage';
import Dustin from "../component/Dustin"

const EditNoteScreen = ({ route, navigation }) => {
    const { note } = route.params;
    const [title, setTitle] = useState(note.title);
    const [desc, setDesc] = useState(note.desc);

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
    <View style={styles.schedule}>
        <View style={styles.scheduleContainer}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Arrow />
                </TouchableOpacity>
                <View style={styles.headerNav}>
                    <TouchableOpacity style={{width: 14, height: 14}} onPress={() => deleteNote()} >
                        <Dustin />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Pin />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => updateNote()}>
                        <Mark />
                    </TouchableOpacity>
                </View>

            </View>
            
            <ScrollView style={styles.createScheule}>
                <Text style={styles.createScheuleText}>Edit Note</Text>
        
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.keyboardAvoidingContainer}>
                    <Text style={styles.noteCreateText}>Title</Text>
                    <TextInput placeholder='Enter title....'  style={styles.noteCreateInput} placeholderTextColor="#fff" value={title} onChangeText={(text) => setTitle(text)}/>
                    <Text style={[styles.noteCreateText, {marginTop: 20}]}>Description</Text>
                    
                    <TextInput placeholder='Enter title....' style={[styles.noteCreateInput, {paddingBottom: 20}]} value={desc}placeholderTextColor="#fff" multiline onChangeText={(text) => setDesc(text)}  />
                </KeyboardAvoidingView >
        
            </ScrollView>
            
        </View>
    </View>
  )
}

export default EditNoteScreen


const styles = StyleSheet.create({
  schedule: {
      backgroundColor: "#282530",
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
      color: "#ffffff",
      fontFamily: 'Nunito-SemiBold',
      fontSize: 18,
      marginBottom: 30
  },
  noteCreateText: {
    color: "#ffffff",
    fontFamily: 'Nunito-SemiBold',
    fontSize: 14,
    marginBottom: 10
  },
  noteCreateInput: {
    borderColor: "#fff",
    borderWidth: 2,
    paddingVertical: 5,
    paddingHorizontal: 10,
    color: "#fff",
  },
  keyboardAvoidingContainer: {
    flex: 1,
  },
})