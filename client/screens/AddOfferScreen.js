import React from "react";
import {
    Dimensions,
    StyleSheet,
    Text,
    View,
    TextInput,
    Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import SignInBtn from "../components/signIn/SignInBtn";
import { auth } from "../components/firebase/config";
import { displayAlertBox } from "../components/alert";

const AddOfferScreen = ({ navigation }) => {
    const [localType, onChangeLocalType] = React.useState("");
    const [description, onChangeDescription] = React.useState("");
    const [localization, onChangeLocalization] = React.useState("");
    // Tu tablica
    const [image, setImage] = React.useState({});

    // Te dwie funkcje lepiej dać do osobnego pliku, ale nie wiem gdzie, getStorage() do config
    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
        });

        if (!result.cancelled) {
            setImage({
                uri: result.uri,
                downloadUrl: await uploadImage(result.uri),
            });
        } else {
            displayAlertBox(
                "Please, try again",
                "You did not select any image"
            );
        }
    };

    const uploadImage = async (uri) => {
        const storage = getStorage();
        const response = await fetch(uri);
        const imageBlob = await response.blob();
        const imageRef = ref(
            storage,
            `images/${auth.currentUser.uid}/${uri.substring(
                uri.lastIndexOf("/") + 1
            )}`
        );
        const metadata = { contentType: "image/jpeg" };
        await uploadBytes(imageRef, imageBlob, metadata).then((snapshot) => {
            console.log("Uploaded an image!");
        });
        return await getDownloadURL(imageRef);
    };

    const sendData = () => {
        axios
            .post(`/api/offers`, {
                localType: localType,
                description: description,
                localization: localization,
            })
            .then(() => {
                displayAlertBox("Offer successfully published!");
                navigation.push("Main");
            })
            .catch((error) => {
                displayAlertBox("Please, try again later", error.message);
            });
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.h2}>Post new offer</Text>
            <TextInput
                style={styles.textboxes}
                onChangeText={onChangeLocalType}
                value={localType}
                placeholder="Local type (dormitory/flat)"
            />
            <TextInput
                style={styles.textboxes}
                onChangeText={onChangeDescription}
                value={description}
                placeholder="Description"
            />
            <TextInput
                style={styles.textboxes}
                onChangeText={onChangeLocalization}
                value={localization}
                placeholder="Localization (city for now...)"
            />

            {/* to do zmiany - inny przycisk może i zapis obrazków w tablicy i wyświetlanie wszystkich dodanych obrazków */}
            <SignInBtn
                style={styles.button}
                title="Add image"
                onPress={() => {
                    pickImageAsync().catch((error) => {
                        displayAlertBox(
                            "Please, try again later",
                            error.message
                        );
                    });
                }}
            ></SignInBtn>
            {/* Jeśli są zdjęcia */}
            <Image
                source={{ uri: image.downloadUrl }}
                style={{ width: 200, height: 200 }}
            />

            <SignInBtn
                style={styles.button}
                title="Create offer"
                onPress={() => {
                    try {
                        sendData();
                    } catch (error) {
                        displayAlertBox(
                            "Please, try again later",
                            error.message
                        );
                    }
                }}
            ></SignInBtn>
        </SafeAreaView>
    );
};

export default AddOfferScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    h2: {
        fontSize: 30,
        marginVertical: 5,
        color: "#1A936F",
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 12,
        paddingHorizontal: 32,
        marginVertical: 10,
        borderRadius: 4,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
        backgroundColor: "#1a936f",
    },
    textboxes: {
        width: "90%",
        fontSize: 15,
        padding: "5%",
        margin: 8,
        borderColor: "grey",
        borderWidth: 0.5,
        borderRadius: 10,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
});
