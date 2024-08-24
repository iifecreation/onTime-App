import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import Arrow from "../component/Arrow"
import Mark from "../component/Mark"
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeProvider'
import {actions, RichEditor, RichToolbar } from 'react-native-pell-rich-editor'
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { saveNoteData } from '../database/db-service';
import { useSQLiteContext } from 'expo-sqlite'

const NoteScreen = () => {
  const navigation = useNavigation()
  const[note, setNote] = useState("")
  const{theme, setNoteData} = useTheme()
  const db = useSQLiteContext();

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
      // const imageUri = result.assets[0].uri;
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
  

  const saveNote = async () => {
    try {

      const newNote = {
        note,
        createdAt: Date.now()
      };

      let data = await saveNoteData(db, newNote)
      setNoteData(data)
      console.log('Schedule data saved successfully!');
      navigation.navigate("Home")
      
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };


  return (
    <SafeAreaView style={[styles.schedule, {backgroundColor: theme.light}]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Arrow color={theme.text}  />
        </TouchableOpacity>
        <View style={styles.headerNav}>
          <TouchableOpacity onPress={() => saveNote()}>
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
          initialFocus={false}
          firstFocusEnd={false}
          ref={richText}
          style={[styles.rich]}
          editorStyle={{backgroundColor: theme.light, color: theme.text, placeholderColor: theme.text + "73", caretColor: theme.text, borderBottomWidth: 0}}
          useContainer={true}
          initialHeight={400}
          enterKeyHint={'done'}
          pasteAsPlainText={true}
          onCursorPosition={handleCursorPosition}
          placeholder={'please note content'}
          onChange={async (text) => {
            setNote(text)
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

export default NoteScreen


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
    borderColor: '#fff0',
  },
})