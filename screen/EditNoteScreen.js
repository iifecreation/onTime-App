import {TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Dustin } from '../libs/exportData'
import { useTheme } from '../context/ThemeProvider'
import { useSQLiteContext } from 'expo-sqlite'
import { deleteNoteData, updateNote } from '../database/db-service'
import Note from '../libs/note/Note'

const EditNoteScreen = ({ route, navigation }) => {
  const { note } = route.params;
  const[editNote, setEditNote] = useState(note.note)
  const{theme, setNoteData} = useTheme()
  const db = useSQLiteContext()

  const updateNoteData = async () => {
    if(editNote == ""){
      Alert.alert(
          "* All field are required",
          "Make sure all field are fill up with the correct data"
      )
    }else{
      try {
        const newNote = {
          note : editNote,
          createdAt: Date.now()
        }
        
        let data = await updateNote(db, note.id, newNote)
        setNoteData(data)
        navigation.navigate("Home")
      } catch (error) {
        console.error('Error updating note:', error);
      }
    }
  };

  const deleteNote = async () => {
      try {
        let data = await deleteNoteData(db, note.id)
        setNoteData(data)
        navigation.navigate("Home")
      } catch (error) {
        console.error('Error deleting note:', error);
      }
  };

  return (
    <Note updateNoteData={updateNoteData} editNote={editNote} setEditNote={setEditNote}>
      <TouchableOpacity style={{width: 14, height: 14}} onPress={() => deleteNote()}>
        <Dustin color={theme.text} />
      </TouchableOpacity>
    </Note>
  )
  }
  
export default EditNoteScreen
  