import React, { useCallback, useRef } from 'react'
import { KeyboardAvoidingView, Platform, TouchableOpacity, View, ScrollView, Text } from 'react-native'
import { Mark, Arrow } from '../exportData'
import { actions, RichEditor, RichToolbar } from 'react-native-pell-rich-editor'
import { styles } from './style'
import { useTheme } from '../../context/ThemeProvider'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';

function Note({children, updateNoteData, editNote, setEditNote }) {
    const{theme} = useTheme()
    const navigation = useNavigation()
    const richText = useRef()
    const scrollRef = useRef(null)

    const handleCursorPosition = useCallback((scrollY) => {
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
          console.error("Image picking canceled or failed.");
        }
        // insert base64
        // this.richText.current?.insertImage(`data:${image.mime};base64,${image.data}`);
      }, []);
    
  return (
    <SafeAreaView style={[styles.schedule, {backgroundColor: theme.light}]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Arrow color={theme.text}  />
        </TouchableOpacity>
        <View style={styles.headerNav}>
          {/* <TouchableOpacity style={{width: 14, height: 14}} onPress={() => deleteNote()}>
            <Dustin color={theme.text} />
          </TouchableOpacity> */}
          {
            children
          }
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

export default Note