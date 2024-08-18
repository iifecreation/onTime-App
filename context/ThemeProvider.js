import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { LIGHT_MODE, DARK_MODE } from "../common/style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDBConnection, createTable, getScheduleData } from "../database/db-service";


const themeContext = createContext(LIGHT_MODE)

const ThemeProvider = ({children}) => {
    const[theme, setTheme] = useState(LIGHT_MODE)

    const loadDataCallback = useCallback( async () => {
        try {
            const db = await getDBConnection();
            await createTable(db)

            // const schedule = await getScheduleData(db)

            // console.log(schedule);
            
        } catch (error) {
            console.error(error);
        }
    }, []) 

    useEffect(() => {

        const loadTheme = async () => {
            try {
                let storedTheme = await AsyncStorage.getItem("theme")

                if(storedTheme){
                    setTheme(storedTheme === "LIGHT_MODE" ? LIGHT_MODE : DARK_MODE)
                }
            } catch (error) {
                console.error("Failed to load theme", error);
            }
        }

        loadTheme()
        loadDataCallback()

    }, [])

    const toggleTheme = async () => {
        const newTheme = theme === LIGHT_MODE ? DARK_MODE : LIGHT_MODE
        setTheme(newTheme)
        try {
            await AsyncStorage.setItem("theme", newTheme === LIGHT_MODE ? "LIGHT_MODE" : "DARK_MODE")
        } catch (error) {
            console.log(error);
                        
        }
    }
    return(
        <themeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </themeContext.Provider>
    )
}

export const useTheme = () => useContext(themeContext)

export default ThemeProvider