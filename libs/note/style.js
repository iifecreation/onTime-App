import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    schedule: {
        flex: 1,
    },
    header: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between"
    },
    headerNav: {
      flexDirection: "row",
      gap: 20,
      alignItems: "center"
    },
    rich: {
      minHeight: 300,
      flex: 1,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: '#fff0',
    },
  })