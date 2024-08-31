export const validateInputs = (title, place, note, selectedDate, currentDate, finishDate, Alert) => {
    if (!title.trim()) {
        Alert.alert("Missing Title", "Please enter a title for the schedule.");
        return false;
    }

    if (!place.trim()) {
        Alert.alert("Missing Place", "Please enter a place for the schedule.");
        return false;
    }

    if (!note.trim()) {
        Alert.alert("Missing Note", "Please enter a note for the schedule.");
        return false;
    }

    if (selectedDate < currentDate) {
        Alert.alert("Invalid Start Date", "The start date cannot be in the past. Please select a valid start date.");
        return false;
    }

    if (finishDate < currentDate) {
        Alert.alert("Invalid Finish Date", "The finish date cannot be in the past. Please select a valid start date.");
        return false;
    }

    if (finishDate < selectedDate) {
        Alert.alert("Invalid Finish Date", "The finish date cannot be earlier than the start date. Please select a valid finish date.");
        return false;
    }

    return true;
};