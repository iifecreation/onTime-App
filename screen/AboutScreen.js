import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Gradient from '../common/Gradient'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'
import Arrow from "../component/Arrow"

const AboutScreen = ({navigation }) => {
  return (
    <View style={styles.AboutScreen}>
        <StatusBar style='light' />
        <Gradient>           
            <SafeAreaView style={styles.AboutContainer}>  
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Arrow />
                    </TouchableOpacity>
                </View>
                <Text style={styles.AboutHeader}>About OnTime</Text>
                <ScrollView>
                    <Text style={styles.AboutTextPart}>Welcome to OnTime, your ultimate companion for organizing schedules and jotting down important notes effortlessly. At OnTime, we believe in simplifying your life by providing you with a powerful yet user-friendly platform to manage your time effectively.</Text>

                    <View>
                        <Text style={styles.AboutTextHeader}>Our Mission</Text>
                        <Text style={styles.AboutTextPart}>Our mission at OnTime is to empower individuals to take control of their time and maximize productivity. We understand the challenges of juggling multiple tasks and commitments, which is why we've designed OnTime to be your go-to solution for staying organized and on track.</Text>
                    </View> 

                    <View>
                        <Text style={styles.AboutTextHeader}>What Sets Us Apart</Text>
                        <View>
                            <Text style={styles.AboutTextList}>
                                <Text style={styles.AboutTextListHeader}>{`\u29BF`} Intuitive Design:</Text>
                                <Text style={styles.AboutTextListDesc}>  OnTime boasts a sleek and intuitive interface, ensuring a seamless user experience for everyone.</Text>
                            </Text>

                            <Text style={styles.AboutTextList}>
                                <Text>{`\u29BF`} Flexible Scheduling: </Text>
                                <Text>  Whether it's daily routines, project deadlines, or long-term goals, OnTime offers flexible scheduling options to suit your unique needs.</Text>
                            </Text>

                            <Text style={styles.AboutTextList}>
                                <Text>{`\u29BF`} Robust Note-Taking:</Text>
                                <Text>  Capture your thoughts, ideas, and reminders on the go with our comprehensive note-taking feature.</Text>
                            </Text>

                            <Text style={styles.AboutTextList}>
                                <Text>{`\u29BF`} Sync Across Devices: </Text>
                                <Text>  Stay synced across all your devices, allowing you to access your schedules and notes anytime, anywhere.</Text>
                            </Text>
                        </View>
                    </View> 

                    <View>
                        <Text style={styles.AboutTextHeader}>Our Team</Text>
                        <Text style={styles.AboutTextPart}>Behind OnTime is a team of passionate individuals dedicated to revolutionizing the way you manage your time. We're committed to continuous improvement and are always eager to hear your feedback to enhance your OnTime experience.</Text>
                    </View> 

                    <View>
                        <Text style={styles.AboutTextHeader}>Get in Touch</Text>
                        <Text style={styles.AboutTextPart}>Have questions, suggestions, or just want to say hello? We'd love to hear from you! Reach out to us at [contact@email.com] and join the OnTime community today.</Text>
                    </View> 

                    <Text style={styles.AboutTextPa}>Thank you for choosing OnTime to help you stay organized and productive!</Text>
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
        color: "#fff",
        fontFamily: 'Nunito-Bold',
        textAlign: "center",
        marginBottom: 20,
        fontSize: 25
    },
    AboutTextPart: {
        color: "#fff",
        textAlign: "justify",
        marginBottom: 10,
        fontFamily: 'Nunito-Regular'
    },
    AboutTextHeader: {
        fontFamily: 'Nunito-SemiBold',
        color: "#fff",
        fontWeight: "700",
        fontSize: 20,
        marginBottom: 5
    },
    AboutTextPa: {
        textAlign: "center",
        color: "#fff",
        fontFamily: 'Nunito-Regular',
        paddingBottom: 60,
        paddingTop: 20
    },
    AboutTextList: {
        paddingLeft: 20,
        color: "#fff",
        paddingBottom: 15,
        lineHeight: 18
    },
    AboutTextListHeader: {
        fontFamily: 'Nunito-SemiBold',
        fontWeight: "700",
        marginRight: 20
    }
})