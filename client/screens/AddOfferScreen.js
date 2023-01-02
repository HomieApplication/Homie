import React from "react";
import {
    Dimensions,
    StyleSheet,
    Text,
    View,
    TextInput,
    Image,
    ScrollView,
    ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import SignInBtn from "../components/signIn/SignInBtn";
import { auth } from "../components/firebase/config";
import { displayAlertBox } from "../components/alert";
const storage = getStorage();

function LoadingAnimation() {
    return (
        <View style={styles.indicatorWrapper}>
            <ActivityIndicator
                size="large"
                color="#114B5F"
                style={styles.indicator}
            />
            <Text style={styles.indicatorText}>Adding offer...</Text>
        </View>
    );
}

const AddOfferScreen = ({ navigation }) => {
    const [localType, onChangeLocalType] = React.useState("");
    const [description, onChangeDescription] = React.useState("");
    const [localization, onChangeLocalization] = React.useState("");
    const [images, setImages] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
        });

        if (!result.cancelled) {
            setImages([result.uri, ...images]);
        } else {
            displayAlertBox(
                "Please, try again",
                "You did not select any image"
            );
        }
    };

    const uploadImage = async (uri) => {
        const response = await fetch(uri);
        const imageBlob = await response.blob();
        const imageRef = ref(
            storage,
            `images/${auth.currentUser.uid}/${uri.substring(
                uri.lastIndexOf("/") + 1
            )}`
        );
        await uploadBytes(imageRef, imageBlob);
        return getDownloadURL(imageRef);
    };

    const sendData = async () => {
        const urls = await Promise.all(
            images.map((image) => uploadImage(image))
        );

        axios
            .post(`/api/offers`, {
                localType: localType,
                description: description,
                localization: localization,
                photoURLArray: urls,
            })
            .then(() => {
                setLoading(false);
                displayAlertBox("Offer successfully published!");
                navigation.push("Main");
            })
            .catch((error) => {
                setLoading(false);
                displayAlertBox("Please, try again later", error.message);
            });
    };

    return (
        <SafeAreaView style={styles.containerMain}>
            {loading ? (
                <LoadingAnimation />
            ) : (
                <View style={styles.container}>
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

                    {/* inny przycisk może */}
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
                    <View style={{ flexDirection: "row" }}>
                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                        >
                            {/* Brzydko zrobiłem trzeba to trochę zmienić..., dodać usuwanie zdjęć */}
                            {images.map((image) => (
                                <Image
                                    key={image}
                                    source={{ uri: image }}
                                    style={{ width: 150, height: 150 }}
                                />
                            ))}
                        </ScrollView>
                    </View>
                    <SignInBtn
                        style={styles.button}
                        title="Create offer"
                        onPress={() => {
                            setLoading(true);
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
                </View>
            )}
        </SafeAreaView>
    );
};

export default AddOfferScreen;

const styles = StyleSheet.create({
    containerMain: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    container: {
        flex: 1,
        width: "100%",
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
    itemText: {
        color: "#fff",
        fontSize: 24,
    },
    indicatorWrapper: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    indicator: {},
    indicatorText: {
        fontSize: 18,
        marginTop: 12,
    },
});
