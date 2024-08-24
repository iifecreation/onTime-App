import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { LIGHT_MODE, DARK_MODE } from "../common/style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getNoteData, getScheduleData } from "../database/db-service";
import moment from "moment";
import { useSQLiteContext } from "expo-sqlite";

const themeContext = createContext(LIGHT_MODE)

const ThemeProvider = ({children}) => {
    const[theme, setTheme] = useState(LIGHT_MODE)
    const[modeStatus, setModeStatus] = useState(false)
    const [scheduleData, setScheduleData] = useState([]);
    const [filteredSchedule, setFilteredSchedule] = useState([]);
    const [noteData, setNoteData] = useState([]);
    const[notified, setNotified] = useState(false)
    const db = useSQLiteContext();

    // Function to group schedules by creation date
    const groupByCreationDate = useMemo((data) =>  {
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

        const fetchScheduleData = async () => {
            try {
              const scheduleData = await getScheduleData(db)
      
              const groupedData = groupByCreationDate(scheduleData)
      
              setScheduleData(groupedData)
              setFilteredSchedule(groupedData)
                            
            } catch (error) {
                console.error('Error retrieving schedule data:', error);
            }
        };
      
        const fetchNotes = async () => {
        try {
            const noteData = await getNoteData(db)
            setNoteData(noteData)
        } catch (error) {
            console.error('Error fetching notes:', error);
        }
        };
    
        fetchNotes();
        fetchScheduleData();
        loadTheme()

    }, [])

    const toggleTheme = async () => {
        const newTheme = theme === LIGHT_MODE ? DARK_MODE : LIGHT_MODE
        setTheme(newTheme)
        setModeStatus(previousState => !previousState)
        try {
            await AsyncStorage.setItem("theme", newTheme === LIGHT_MODE ? "LIGHT_MODE" : "DARK_MODE")
        } catch (error) {
            console.log(error);
                        
        }
    }

    const toggleNotified= () => {
        setNotified(previousState => !previousState)
    }

    return(
        <themeContext.Provider value={{theme, toggleTheme, scheduleData, filteredSchedule, noteData, setScheduleData, setFilteredSchedule, setNoteData, groupByCreationDate, modeStatus, notified, toggleNotified}}>
            {children}      
        </themeContext.Provider>
    )
}

export const useTheme = () => useContext(themeContext)

export default ThemeProvider