import React, { createContext, useContext, useEffect, useState } from "react";
import { LIGHT_MODE, DARK_MODE } from "../common/style";
import AsyncStorage from "@react-native-async-storage/async-storage";

const themeContext = createContext(LIGHT_MODE)

const ThemeProvider = ({children}) => {
    const[theme, setTheme] = useState(LIGHT_MODE)

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