import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Arrow from "../component/Arrow"
import Mark from "../component/Mark"
import Pin from "../component/Pin"
import UnPin from "../component/Unpin"
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NoteScreen = () => {
  const navigation = useNavigation();
  const[title, setTitle] = useState("")
  const[desc, setDesc] = useState("")

  const saveNote = async () => {
    try {
      let notes = [];
      const existingNotes = await AsyncStorage.getItem('noteData');
      if (existingNotes) {
        notes = JSON.parse(existingNotes);
      }

      const newNote = {
        id: Date.now(),
        dateCreated: new Date().toISOString(),
        title,
        desc,
      };

      notes.push(newNote);

      await AsyncStorage.setItem('noteData', JSON.stringify(notes));
      navigation.goBack();
    } catch (error) {
      console.error('Error saving note:', error);
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
                    {/* <TouchableOpacity onPress={() => setPinned(!pinned)}>
                        {pinned ? <UnPin /> : <Pin />}
                    </TouchableOpacity> */}
                    <TouchableOpacity onPress={() => saveNote()}>
                        <Mark />
                    </TouchableOpacity>
                </View>

            </View>
            
            <ScrollView style={styles.createScheule}>
                <Text style={styles.createScheuleText}>Create Note</Text>
        
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.keyboardAvoidingContainer}>
                    <Text style={styles.noteCreateText}>Title</Text>
                    <TextInput placeholder='Enter title....'  style={styles.noteCreateInput} placeholderTextColor="#fff" onChangeText={(text) => setTitle(text)}/>
                    <Text style={[styles.noteCreateText, {marginTop: 20}]}>Description</Text>
                    
                    <TextInput placeholder='Enter title....' style={[styles.noteCreateInput, {paddingBottom: 20}]} placeholderTextColor="#fff" multiline onChangeText={(text) => setDesc(text)}  />
                </KeyboardAvoidingView >
        
            </ScrollView>
            
        </View>
    </View>
  )
}

export default NoteScreen


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