import React from "react";
import {
    Dimensions,
    StyleSheet,
    Text,
    View,
    TextInput,
    useState,
    ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchableDropdown from "react-native-searchable-dropdown";
import SignInBtn from "../components/signIn/SignInBtn";
import axios from "axios";

import { displayAlertBox } from "../components/alert";


function LoadingAnimation() {
    return (
      <View style={styles.indicatorWrapper}>
        <ActivityIndicator size="large" color="#114B5F" style={styles.indicator}/>
        <Text style={styles.indicatorText}>Adding offer...</Text>
      </View>
    );
  }

const AddOfferScreen = ({ navigation }) => {
    const [localType, onChangeLocalType] = React.useState("");
    const [description, onChangeDescription] = React.useState("");
    const [localization, onChangeLocalization] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    const sendData = () => {
        axios
            .post(`/api/offers`, {
                localType: localType,
                description: description,
                localization: localization,
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
        <SafeAreaView style={styles.container}>
            { loading ? 
            <LoadingAnimation/> :

            <View>
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
        }
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
    itemText: {
        color: '#fff',
        fontSize: 24,
    },
    indicatorWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    indicator: {},
    indicatorText: {
        fontSize: 18,
        marginTop: 12,
    },
});
