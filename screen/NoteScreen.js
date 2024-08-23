import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import Arrow from "../component/Arrow"
import Mark from "../component/Mark"
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../context/ThemeProvider'
import {actions, RichEditor, RichToolbar, getContentCSS } from 'react-native-pell-rich-editor'
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';

const NoteScreen = () => {
  const navigation = useNavigation();
  const[title, setTitle] = useState("")
  const[desc, setDesc] = useState("")
  const{theme} = useTheme()

  const richText = useRef()
  const scrollRef = useRef(null)
  const[text, setText] = useState("")

  const handleCursorPosition = useCallback((scrollY) => {
    // Positioning scroll bar
    scrollRef.current.scrollTo({y: scrollY - 30, animated: true});
  }, []);

  const onPressAddImage = useCallback(async () => {

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    
    if (!result.canceled && result.assets.length > 0) {
      const imageUri = result.assets[0].uri;
      console.log("Image URI:", imageUri);
  
      // Insert image using the URI
      // Make sure your editor supports the image URI format
      richText.current.insertImage(imageUri);
    } else {
      console.log("Image picking canceled or failed.");
    }
    // richText.current.insertImage(`${result.assets[0].uri}`);
    // insert base64
    // this.richText.current?.insertImage(`data:${image.mime};base64,${image.data}`);
  }, []);
  

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
    // <View style={[styles.schedule, {backgroundColor: theme.light}]}>
    //     <View style={styles.scheduleContainer}>
    //         <View style={styles.header}>
    //             <TouchableOpacity onPress={() => navigation.goBack()}>
    //                 <Arrow color={theme.text}  />
    //             </TouchableOpacity>
    //             <View style={styles.headerNav}>
    //                 <TouchableOpacity onPress={() => saveNote()}>
    //                     <Mark color={theme.text} />
    //                 </TouchableOpacity>
    //             </View>

    //         </View>
            
    //         <ScrollView style={styles.createScheule}>
    //             <Text style={[styles.createScheuleText, {color: theme.text}]}>Create Note</Text>
        
    //             <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.keyboardAvoidingContainer}>
    //                 <Text style={[styles.noteCreateText, {color: theme.text}]}>Title</Text>
    //                 <TextInput placeholder='Enter title....'  style={styles.noteCreateInput} placeholderTextColor={theme.text} onChangeText={(text) => setTitle(text)}/>
    //                 <Text style={[styles.noteCreateText, {marginTop: 20, color: theme.text}]}>Description</Text>
                    
    //                 <TextInput placeholder='Enter title....' style={[styles.noteCreateInput, {paddingBottom: 20}]} placeholderTextColor={theme.text} multiline onChangeText={(text) => setDesc(text)}  />
    //             </KeyboardAvoidingView >
        
    //         </ScrollView>
            
    //     </View>
    // </View>

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
          editorStyle={{backgroundColor: theme.light, color: theme.text, placeholderColor: theme.text}}
          useContainer={true}
          initialHeight={400}
          enterKeyHint={'done'}
          pasteAsPlainText={true}
          onCursorPosition={handleCursorPosition}
          placeholder={'please note content'}
          onChange={(text) => console.log(text)
          }
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
  scheduleContainer: {
      paddingVertical: 40,
      paddingHorizontal: 20
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
  createScheule: {
      paddingTop: 30,
      marginBottom: 10,
      paddingBottom: 100
  },
  createScheuleText: {
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
  rich: {
    minHeight: 300,
    flex: 1,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#e3e3e3',
  },
})