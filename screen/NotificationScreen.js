import { FlatList, StyleSheet, Text, TouchableOpacity, View, Animated } from 'react-native'
import React, { useEffect } from 'react'
import Gradient from '../common/Gradient'
import Arrow from "../component/Arrow"
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeProvider'
import { deleteNotificationData, updateNotification } from '../database/db-service'
import moment from 'moment'
import { Swipeable, GestureHandlerRootView } from 'react-native-gesture-handler';

const Notification = () => {

  const navigation = useNavigation();
  const {theme, db, notification, setNotification, setShowNotified} = useTheme()

  const deleteNotification = async (id) => {
    try {
      let data = await deleteNotificationData(db, id);
      setNotification(data)
      
    } catch (error) {
      console.error("unable to delete notification", error);
    }
  };

  useEffect(() => {

    const markNotificationsAsRead = async () => {
      try {
        const data = await updateNotification(db)
        if (data) {
          setShowNotified(false)
        }
        
      } catch (error) {
        console.error("unable to get data", error);    
      }
    }

    markNotificationsAsRead()

  }, [])

  const renderRightActions = (progress, dragX, itemId) => {

    const translateX = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [0, 100],
      extrapolate: 'clamp'
    });

    return (
      <Animated.View style={[styles.deleteButtonContainer, { transform: [{ translateX }] }]}>
        <TouchableOpacity onPress={() => deleteNotification(itemId)} style={[styles.deleteButton, {backgroundColor: theme.text}]}>
          <Text style={[styles.notifiedHeaderText, {color: theme.light}]}>Delete</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  }

  const renderItem = ({ item }) => (
    <Swipeable renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, item.id)}>
      <View style={[styles.notifiedContentPart, { borderColor: theme.text }]}>
        <Text style={[styles.notifiedContentText1, { color: theme.text }]}>{item.title}</Text>
        <Text style={[styles.notifiedContentText2, { color: theme.text + "80" }]}>
          {moment(item.createdAt).format("DD/MM/YY")}
        </Text>
      </View>
    </Swipeable>
  );

  return (
    <GestureHandlerRootView style={styles.notified}>
      <StatusBar style={theme.status} />
      <Gradient> 
        <View style={styles.notifiedWrapper}>
          
          <View style={styles.notifiedHeader}>
            <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.6}>
              <Arrow color={theme.text} />
            </TouchableOpacity>
            <Text style={[styles.notifiedHeaderText, {color: theme.text}]}>Notification</Text>
          </View>

          <View style={styles.notifiedContent}>

            {notification.length > 0 ? (
              <FlatList
                data={notification}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
              />
            ) :
            (
              <View style={{alignItems: "center", justifyContent: "center", height: "90%"}}>
                  <Text style={[styles.notifiedHeaderText, {color: theme.text}]}>There's no Notification</Text>
              </View>
            )
            }
          </View>

        </View>

      </Gradient>
    </GestureHandlerRootView>
  )
}

export default Notification

const styles = StyleSheet.create({
  notified: {
    flex: 1
  },
  notifiedWrapper: {
    paddingTop: 40,
    paddingHorizontal: 20
  },
  notifiedHeader: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    marginBottom: 20
  },
  notifiedHeaderText : {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 16
  },
  notifiedContentPart: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  notifiedContentText1: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 15,
    width: "75%"
  },
  notifiedContentText2: {
    fontFamily: 'Nunito-Regular',
    fontSize: 12
  },
  deleteButton: {
    width: 100,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  }
})