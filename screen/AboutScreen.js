import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'
import {Arrow, Gradient} from "../libs/exportData"
import { useTheme } from '../context/ThemeProvider'

const AboutScreen = ({navigation }) => {
    const {theme} = useTheme()
  return (
    <View style={styles.AboutScreen}>
        <StatusBar style={theme.status} />
        <Gradient>           
            <SafeAreaView style={styles.AboutContainer}>  
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Arrow color={theme.text} />
                    </TouchableOpacity>
                </View>
                <Text style={[styles.AboutHeader, {color: theme.text}]}>About OnTime</Text>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={[styles.AboutTextPart, {color: theme.text}]}>Welcome to OnTime, your ultimate companion for organizing schedules and jotting down important notes effortlessly. At OnTime, we believe in simplifying your life by providing you with a powerful yet user-friendly platform to manage your time effectively.</Text>

                    <View>
                        <Text style={[styles.AboutTextHeader, {color: theme.text}]}>Our Mission</Text>
                        <Text style={[styles.AboutTextPart, {color: theme.text}]}>Our mission at OnTime is to empower individuals to take control of their time and maximize productivity. We understand the challenges of juggling multiple tasks and commitments, which is why we've designed OnTime to be your go-to solution for staying organized and on track.</Text>
                    </View> 

                    <View>
                        <Text style={[styles.AboutTextHeader, , {color: theme.text}]}>What Sets Us Apart</Text>
                        <View>
                            <Text style={styles.AboutTextList}>
                                <Text style={[styles.AboutTextListHeader, {color: theme.text}]}>{`\u29BF`} Intuitive Design:</Text>
                                <Text style={[styles.AboutTextListDesc, {color: theme.text}]}>  OnTime boasts a sleek and intuitive interface, ensuring a seamless user experience for everyone.</Text>
                            </Text>

                            <Text style={styles.AboutTextList}>
                                <Text style={[styles.AboutTextListHeader, {color: theme.text}]}>{`\u29BF`} Flexible Scheduling: </Text>
                                <Text style={[styles.AboutTextListDesc, {color: theme.text}]}>Whether it's daily routines, project deadlines, or long-term goals, OnTime offers flexible scheduling options to suit your unique needs.</Text>
                            </Text>

                            <Text style={styles.AboutTextList}>
                                <Text style={[styles.AboutTextListHeader, {color: theme.text}]}>{`\u29BF`} Robust Note-Taking:</Text>
                                <Text style={[styles.AboutTextListDesc, {color: theme.text}]}>Capture your thoughts, ideas, and reminders on the go with our comprehensive note-taking feature.</Text>
                            </Text>

                            <Text style={styles.AboutTextList}>
                                <Text style={[styles.AboutTextListHeader, {color: theme.text}]}>{`\u29BF`} Sync Across Devices: </Text>
                                <Text style={[styles.AboutTextListDesc, {color: theme.text}]}>  Stay synced across all your devices, allowing you to access your schedules and notes anytime, anywhere.</Text>
                            </Text>
                        </View>
                    </View> 

                    <View>
                        <Text style={[styles.AboutTextHeader, {color: theme.text}]}>Our Team</Text>
                        <Text style={[styles.AboutTextPart, {color: theme.text}]}>Behind OnTime is a team of passionate individuals dedicated to revolutionizing the way you manage your time. We're committed to continuous improvement and are always eager to hear your feedback to enhance your OnTime experience.</Text>
                    </View> 

                    <View>
                        <Text style={[styles.AboutTextHeader, {color: theme.text}]}>Get in Touch</Text>
                        <Text style={[styles.AboutTextPart, {color: theme.text}]}>Have questions, suggestions, or just want to say hello? We'd love to hear from you! Reach out to us at [contact@email.com] and join the OnTime community today.</Text>
                    </View> 

                    <Text style={[styles.AboutTextPa, {color: theme.text}]}>Thank you for choosing OnTime to help you stay organized and productive!</Text>
                </ScrollView>
            </SafeAreaView>
        </Gradient>
    </View>
  )
}

export default AboutScreen

const styles = StyleSheet.create({
    AboutScreen: {
        flex: 1,
    },
    AboutContainer: {
        paddingTop: 15,
        paddingHorizontal: 15
    },
    AboutHeader: {
        fontFamily: 'Nunito-Bold',
        textAlign: "center",
        marginBottom: 20,
        fontSize: 25
    },
    AboutTextPart: {
        textAlign: "justify",
        marginBottom: 10,
        fontFamily: 'Nunito-Regular'
    },
    AboutTextHeader: {
        fontFamily: 'Nunito-SemiBold',
        fontWeight: "700",
        fontSize: 20,
        marginBottom: 5
    },
    AboutTextPa: {
        textAlign: "center",
        fontFamily: 'Nunito-Regular',
        paddingBottom: 100,
        paddingTop: 20
    },
    AboutTextList: {
        paddingLeft: 20,
        paddingBottom: 15,
        lineHeight: 18
    },
    AboutTextListHeader: {
        fontFamily: 'Nunito-SemiBold',
        fontWeight: "700",
        marginRight: 20,
        fontSize: 14
    },
    AboutTextListDesc: {
        fontFamily: 'Nunito-Regular',
        fontSize: 14
    }
})