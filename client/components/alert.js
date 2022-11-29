import { Alert } from "react-native";

export function displayAlertBox(title, text) {
    Alert.alert(title, text, [
        {
            text: "OK",
        },
    ]);
}
