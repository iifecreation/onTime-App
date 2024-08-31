import { Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const displayModal = (ModalVisible, modalTitle, modalItem, reminder, theme) => 
    <Modal visible={ModalVisible} transparent={true} animationType="slide" statusBarTranslucent={true}>
        <View style={styles.modalContainer}>
            <View style={[styles.modalContent, {backgroundColor: theme.light}]}>
                <Text style={[styles.modalTitle, {color: theme.text}]}>{modalTitle}</Text>
                {modalItem.map((option) => (
                    <TouchableOpacity key={option} onPress={() => reminder(option)} activeOpacity={0.7}>
                        <Text style={[styles.modalOption, {color: theme.text}]}>{option}</Text>
                    </TouchableOpacity>         
                ))}
            </View>
        </View>
    </Modal>

const { width, height } = Dimensions.get('window');
const modalWidth = width - 40;
const modalHeight = 200;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        borderRadius: 10,
        padding: 20,
        width: modalWidth,
        maxHeight: modalHeight,
        overflow: 'hidden',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalOption: {
        fontSize: 16,
        marginBottom: 7,
    },
})

export const showStartDatePicker = (setPickerMode, setShowStartPicker) => {
    setPickerMode('date');
    setShowStartPicker(true);
};