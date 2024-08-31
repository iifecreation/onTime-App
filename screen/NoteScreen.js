import { View } from 'react-native'
import React, {useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeProvider'
import { saveNoteData } from '../database/db-service';
import { useSQLiteContext } from 'expo-sqlite'
import Note from '../libs/note/Note';

const NoteScreen = () => {
  const navigation = useNavigation()
  const[note, setNote] = useState("")
  const{ setNoteData} = useTheme()
  const db = useSQLiteContext();
  

  const saveNote = async () => {
    if(note == ""){
      Alert.alert(
          "* All field are required",
          "Make sure all field are fill up with the correct data"
      )
    }else{
      try {

        const newNote = {
          note,
          createdAt: Date.now()
        };

        let data = await saveNoteData(db, newNote)
        setNoteData(data)
        navigation.navigate("Home")
      } catch (error) {
        console.error('Error saving note:', error);
      }
    }
  };


  return (
    <Note updateNoteData={saveNote} editNote={note} setEditNote={setNote}>
      <View>

      </View>
    </Note>
  )
}

export default NoteScreen


