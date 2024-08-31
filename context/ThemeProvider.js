import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { LIGHT_MODE, DARK_MODE } from "../common/style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getNoteData, getNotificationData, getNotificationRead, getScheduleData } from "../database/db-service";
import moment from "moment";
import { useSQLiteContext } from "expo-sqlite";

const themeContext = createContext(LIGHT_MODE)

const ThemeProvider = ({children}) => {
    const[theme, setTheme] = useState(LIGHT_MODE)
    const[modeStatus, setModeStatus] = useState(false)
    const [scheduleData, setScheduleData] = useState([]);
    const [filteredSchedule, setFilteredSchedule] = useState([]);
    const [noteData, setNoteData] = useState([]);
    const[notification, setNotification] = useState([])
    const[notified, setNotified] = useState(false)
    const[shownotified, setShowNotified] = useState(false)
    const db = useSQLiteContext();

    // Function to group schedules by creation date
    const groupByCreationDate = useMemo(() =>  {
        return (data) => {
            const groupedData = {};
            data.forEach(schedule => {
            const creationDate = moment( Number(schedule.createdAt)).format('DD-MM-YYYY')
            if(groupedData[creationDate]){
                groupedData[creationDate].push(JSON.stringify(schedule))
            }else{
                groupedData[creationDate] = [JSON.stringify(schedule)]
            }
            })

            return groupedData     
        };
    }, [])

    useEffect(() => {

        const loadTheme = async () => {
            try {
                const storedTheme = await AsyncStorage.getItem("theme")

                if(storedTheme){
                    const isDarkMode = storedTheme === "LIGHT_MODE";
                    setTheme( isDarkMode ? LIGHT_MODE : DARK_MODE)
                    setModeStatus(isDarkMode);
                }
            } catch (error) {
                console.error("Failed to load theme", error);
            }
        }

        const fetchData = async () => {
            try {

                const scheduleData = await getScheduleData(db)
                const groupedData = groupByCreationDate(scheduleData)
                setScheduleData(groupedData)
                setFilteredSchedule(groupedData)

                const noteData = await getNoteData(db)
                setNoteData(noteData)

                const notificationData = await getNotificationData(db)
                setNotification(notificationData)

                const notificationReadData = await getNotificationRead(db);
                setShowNotified(!notificationReadData);
                
            } catch (error) {
                console.error('Error retrieving data:', error);
            }
        }

        // const fetchScheduleData = async () => {
        //     try {
        //       const scheduleData = await getScheduleData(db)
      
        //       const groupedData = groupByCreationDate(scheduleData)
      
        //       setScheduleData(groupedData)
        //       setFilteredSchedule(groupedData)
                            
        //     } catch (error) {
        //         console.error('Error retrieving schedule data:', error);
        //     }
        // };

      
        // const fetchNotes = async () => {
        // try {
        //     const noteData = await getNoteData(db)
        //     setNoteData(noteData)
        // } catch (error) {
        //     console.error('Error fetching notes:', error);
        // }
        // };

        // const getNotification = async () => {
        //     try {
        //       const data = await getNotificationData(db)
        //       setNotification(data)
              
        //     } catch (error) {
        //       console.error("unable to get data", error);    
        //     }
        // }

        // const getNotificationReadData = async () => {
        //     try {
        //         const data = await getNotificationRead(db)
        //         if (!data) {
        //             console.log(data);
                    
        //             setShowNotified(true)
        //         }else{
        //             setShowNotified(false)
        //         }
              
        //     } catch (error) {
        //       console.error("unable to get data", error);    
        //     }
        // }
        
        // getNotificationReadData()
        // fetchNotes();
        // fetchScheduleData();
        fetchData()
        loadTheme()
        // getNotification()

    }, [db, groupByCreationDate, theme])

    const toggleTheme = async () => {
        const newTheme = theme === LIGHT_MODE ? DARK_MODE : LIGHT_MODE
        setTheme(newTheme)
        setModeStatus(previousState => !previousState)
        try {
            await AsyncStorage.setItem("theme", newTheme === LIGHT_MODE ? "LIGHT_MODE" : "DARK_MODE")
        } catch (error) {
            console.error(error);              
        }
    }

    const toggleNotified= () => {
        setNotified(previousState => !previousState)
    }

    return(
        <themeContext.Provider value={{theme, toggleTheme, scheduleData, filteredSchedule, noteData, setScheduleData, setFilteredSchedule, setNoteData, groupByCreationDate, modeStatus, notified, toggleNotified, db, notification, setNotification, shownotified, setShowNotified}}>
            {children}      
        </themeContext.Provider>
    )
}

export const useTheme = () => useContext(themeContext)

export default ThemeProvider