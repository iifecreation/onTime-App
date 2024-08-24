import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import {actions, RichEditor, RichToolbar } from 'react-native-pell-rich-editor'
import { Dustin, Mark, Arrow } from '../libs/exportData'
import { useTheme } from '../context/ThemeProvider'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as ImagePicker from 'expo-image-picker';
import { useSQLiteContext } from 'expo-sqlite'
import { deleteNoteData, updateNote } from '../database/db-service'

const EditNoteScreen = ({ route, navigation }) => {
  const { note } = route.params;
  const[editNote, setEditNote] = useState(note.note)
  const{theme, setNoteData} = useTheme()
  const db = useSQLiteContext()

  const richText = useRef()
  const scrollRef = useRef(null)

  const handleCursorPosition = useCallback((scrollY) => {
    // Positioning scroll bar
    scrollRef.current.scrollTo({y: scrollY - 30, animated: true});
  }, []);

  const onPressAddImage = useCallback(async () => {

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
      quality: 1,
    });
    
    if (!result.canceled && result.assets.length > 0) {
      const base64Image = result.assets[0].base64;
      const base64Type = result.assets[0].mimeType
      const imageData = `data:${base64Type};base64,${base64Image}`; 
  
      richText.current.insertImage(imageData);
    } else {
      console.log("Image picking canceled or failed.");
    }
    // insert base64
    // this.richText.current?.insertImage(`data:${image.mime};base64,${image.data}`);
  }, []);

  const updateNoteData = async () => {
    try {
      const newNote = {
        note : editNote,
        createdAt: Date.now()
      }
      
      let data = updateNote(db, note.id, newNote)
      setNoteData(data)
      console.log('Schedule data saved successfully!');
      navigation.navigate("Home")
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  const deleteNote = async () => {
      try {
        let data = await deleteNoteData(db, note.id)
        setNoteData(data)
        console.log('Schedule deleted successfully!');
        navigation.navigate("Home")
      } catch (error) {
        console.error('Error deleting note:', error);
      }
  };

  return (
    <SafeAreaView style={[styles.schedule, {backgroundColor: theme.light}]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Arrow color={theme.text}  />
        </TouchableOpacity>
        <View style={styles.headerNav}>
          <TouchableOpacity style={{width: 14, height: 14}} onPress={() => deleteNote()}>
            <Dustin color={theme.text} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => updateNoteData()}>
            <Mark color={theme.text} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        ref={scrollRef}
        keyboardDismissMode={'none'}
        nestedScrollEnabled={true}
        scrollEventThrottle={20}
      >
        <RichEditor 
          initialContentHTML={editNote}
          initialFocus={false}
          firstFocusEnd={false}
          ref={richText}
          style={[styles.rich]}
          editorStyle={{backgroundColor: theme.light, color: theme.text, placeholderColor: theme.text, caretColor: theme.text, borderBottomWidth: 0}}
          useContainer={true}
          initialHeight={400}
          enterKeyHint={'done'}
          pasteAsPlainText={true}
          onCursorPosition={handleCursorPosition}
          placeholder={'please note content'}
          onChange={(text) => {
            setEditNote(text)
          }}
        />
      </ScrollView>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <RichToolbar
          style={{backgroundColor: theme.light}}
          iconTint={theme.text}
          selectedIconTint={theme.main}
          editor={richText}
          getEditor={() => richText.current}
          onPressAddImage={onPressAddImage}
          actions={[
            actions.keyboard,
            actions.insertImage,
            actions.undo,
            actions.redo,
            actions.setBold,
            actions.setItalic,
            actions.insertBulletsList,
            actions.insertOrderedList,
            actions.setStrikethrough,
            actions.setUnderline,
            actions.checkboxList,
            actions.alignLeft,
            actions.alignCenter,
            actions.alignRight,
            actions.insertLink,
            actions.code,
            actions.line,
            actions.removeFormat,
            actions.heading1,
            actions.heading4,
            'insertEmoji',
            'insertHTML',
            'fontSize',
          ]}
          iconMap={{
            // insertEmoji: phizIcon,
            [actions.foreColor]: () => <Text style={[styles.tib, {color: 'blue'}]}>FC</Text>,
            [actions.hiliteColor]: ({tintColor}) => (
              <Text style={[styles.tib, {color: tintColor, backgroundColor: 'red'}]}>BC</Text>
            ),
            [actions.heading1]: ({tintColor}) => <Text style={[styles.tib, {color: tintColor}]}>H1</Text>,
            [actions.heading4]: ({tintColor}) => <Text style={[styles.tib, {color: tintColor}]}>H4</Text>,
            // insertHTML: htmlIcon,
          }}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
  }
  
export default EditNoteScreen
  
  
const styles = StyleSheet.create({
  schedule: {
      flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  headerNav: {
      flexDirection: "row",
      gap: 20,
      alignItems: "center"
  },
  rich: {
    minHeight: 300,
    flex: 1,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#e3e3e3',
  },
})