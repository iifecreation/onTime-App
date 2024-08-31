import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    schedule: {
        flex: 1
    },
    scheduleContainer: {
        paddingVertical: 40,
        paddingHorizontal: 20
    },
    header: {
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
    },
    createScheuleText: {
        fontFamily: 'Nunito-SemiBold',
        fontSize: 16,
        marginBottom: 20
    },
    createScheuleInput: {
        width: "100%",
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 5,
        fontSize: 14,
        fontFamily: 'Nunito-Regular',
        paddingHorizontal: 10,
    },
    createScheuleFull: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    createScheuleFullText: {
        fontSize: 15,
        fontFamily: 'Nunito-SemiBold',
        textTransform: "capitalize"
    },
    createScheuleSecon: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },
    createScheuleSeconText: {
        fontSize: 12,
        fontFamily: 'Nunito-Regular',
    },
    createScheulePla: {
        gap: 17,
        marginTop: 14
    },
    
})