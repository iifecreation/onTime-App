// import React, { useRef, useState } from "react";
// import { Text, Platform, KeyboardAvoidingView, SafeAreaView, ScrollView } from "react-native";
// import {actions, RichEditor, RichToolbar} from "react-native-pell-rich-editor";


// const handleHead = ({tintColor}) => <Text style={{color: tintColor}}>H1</Text>

// const TempScreen = () => {
// 	const richText = React.useRef();
//   const scrollRef = React.useRef(null);
//   // const handleCursorPosition = (cursorPosition) => {
//   //   const scrollY = cursorPosition.pageY; // Get the Y position of the cursor
//   //   // Adjust scroll position if necessary
//   //   scrollRef.current.scrollTo({ y: scrollY - 30, animated: true });
//   // };
  

// 	return (
//     <SafeAreaView style={{flexDirection: "column-reverse"}} >
//       <ScrollView ref={scrollRef} keyboardDismissMode={'none'}  nestedScrollEnabled={true}
//         scrollEventThrottle={20}>
//         <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}	style={{ flex: 1 }}>
//           <RichEditor
//             initialFocus={false}
//             firstFocusEnd={false}
//             ref={richText}
//             useContainer={true}
//             initialHeight={400}
//             enterKeyHint={'done'}
//             placeholder={'please input content'}
//             pasteAsPlainText={true}
//             onChange={ descriptionText => {
//                 console.log("descriptionText:", descriptionText);
//             }}
//           />
//         </KeyboardAvoidingView>
//       </ScrollView>

//       <RichToolbar
//         editor={richText}
//         actions={[ 
//           actions.setBold, 
//           actions.setItalic, 
//           actions.setUnderline, 
//           actions.heading1, 
//           actions.insertBulletsList ]}
//         iconMap={{ [actions.heading1]: handleHead }}
//       />
//     </SafeAreaView>
//   );
// };

// export default TempScreen;


import React from 'react';
import {
    Button,
    KeyboardAvoidingView,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View,
    Text
} from 'react-native';
import {RichEditor, RichToolbar} from '@neocoast/react-native-pell-rich-editor';

const initHTML = `<br/>
<center><b>Pell.js Rich Editor</b></center>
<center>React Native</center>
<br/>
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1024px-React-icon.svg.png" ></br></br>
</br></br>
`;

class TempScreen extends React.Component {

    save = async () => {
        // Get the data here and call the interface to save the data
        let html = await this.richText.getContentHtml();
        // console.log(html);
        alert( html);
    };

    onPressAddImage = ()=> {
        // insert URL
        this.richText.insertImage("https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1024px-React-icon.svg.png");
        // insert base64
        // this.richText.insertImage(`data:${image.mime};base64,${image.data}`);
        this.richText.blurContentEditor();
    };

    onHome = ()=> {
        this.props.navigation.push('index');
    };

    render() {
        let that = this;
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.nav}>
                    <Button title={'HOME'} onPress={that.onHome}/>
                    <Button title="Save" onPress={that.save}/>
                </View>
                <Text>hello</Text>
                <ScrollView style={styles.scroll}>
                    <RichEditor
                        ref={rf => that.richText = rf}
                        initialContentHTML={initHTML}
                        style={styles.rich}
                    />
                </ScrollView>
                <KeyboardAvoidingView behavior={'padding'} >
                    <RichToolbar
                        style={styles.richBar}
                        getEditor={() => that.richText}
                        iconTint={'#000033'}
                        selectedIconTint={'#2095F2'}
                        selectedButtonStyle={{backgroundColor: "transparent"}}
                        onPressAddImage={that.onPressAddImage}
                    />
                </KeyboardAvoidingView>

            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    nav: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 5,
    },
    rich: {
        height: 300,
        flex: 1
    },
    richBar: {
        height: 50,
        backgroundColor: '#F5FCFF'
    },
    scroll : {
        backgroundColor:'#ffffff'
    }
});

export default TempScreen