import React, { useState, useEffect } from "react";
import {
    Dimensions,
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    Pressable,
    Image,
    DatePicker,
    FlatList,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import SignInBtn from "../components/signIn/SignInBtn";
import RNMultiSelect from "@freakycoder/react-native-multiple-select";
import DateTimePicker from "@react-native-community/datetimepicker";
import { SelectList } from "react-native-dropdown-select-list";

import { getAuth } from "@firebase/auth";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import COLORS from "../components/assets";
import { displayAlertBox } from "../components/alert";
import LoadingAnimation from "../components/LoadingAnimation";

const storage = getStorage();

const FulfillProfile = ({ navigation }) => {
    const userId = getAuth().currentUser.uid;
    const [userData, setUser] = useState({});
    const [loading, setLoading] = React.useState(true);
    const [university, onChangeUniversity] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [image, setImage] = React.useState("");
    const [selected, setSelected] = React.useState([]);
    const [datePicker, setDatePicker] = React.useState(false);
    const [dateOfBirth, setDateOfBirth] = React.useState(null);
    const [selectedHobbies, setSelectedHobbies] = useState([]);
    const [selectedUniversity, setSelectedUniversity] = useState("");
    const [selectedGender, setSelectedGender] = useState("");
    const [imageChanged, setImageChanged] = useState(false);
    const [selectedYear, setSelectedYear] = useState(false);

    const years = [
        { key: "1", value: "1" },
        { key: "2", value: "2" },
        { key: "3", value: "3" },
        { key: "4", value: "4" },
        { key: "5", value: "5" },
        { key: "6", value: ">5" },
    ];

    useEffect(() => {
        axios
            .get(`/api/users`)
            .then((res) => res.data)
            .then((data) => {
                setUser(data);
                console.log(userData);
                setDescription(data.description);
                onChangeUniversity(data.university);
                setImage(data.photoURL);
                setDateOfBirth(new Date(data.birthDate));
                setSelectedGender(data.gender);
                setSelectedUniversity(data.university);
                setSelectedHobbies(data.interests);
                setLoading(false);
            })
            .catch((error) => {
                console.log("Connection error: " + error.message);
                displayAlertBox("Please, try again later", error.message);
            });
    }, []);

    const getSelectedHobbies = () => {
        var hobbies = [];
        selected.forEach((e) => {
            console.log(e.value);
            hobbies.push(e.value);
        });
        return hobbies;
    };

    const updateUserData = async () => {
        const uri = imageChanged ? await uploadImage(image) : userData.photoURL;

        const hobbies = getSelectedHobbies();
        console.log("hobbies: ", hobbies);

        axios
            .put(`/api/users`, {
                university: university,
                photoURL: uri,
                description: description,
                birthDate: dateOfBirth,
                interests: hobbies,
                university: selectedUniversity,
                gender: selectedGender,
                year: selectedYear,
            })
            .then(() => {
                setLoading(false);
                displayAlertBox("Profile was successfully updated!");
                navigation.push("Main");
            })
            .catch((error) => {
                setLoading(false);
                displayAlertBox("Please, try again later", error.message);
            });
    };

    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.uri);
        } else {
            displayAlertBox(
                "Please, try again",
                "You did not select any image"
            );
        }
        console.log(image);
    };

    const uploadImage = async (uri) => {
        const response = await fetch(uri).catch((error) => {
            setLoading(false);
            displayAlertBox("Please, try again later", error.message);
        });
        const imageBlob = await response.blob().catch((error) => {
            setLoading(false);
            displayAlertBox("Please, try again later", error.message);
        });
        const imageRef = ref(
            storage,
            `images/${auth.currentUser.uid}/${uri.substring(
                uri.lastIndexOf("/") + 1
            )}`
        );
        await uploadBytes(imageRef, imageBlob).catch((error) => {
            setLoading(false);
            displayAlertBox("Please, try again later", error.message);
        });
        return getDownloadURL(imageRef);
    };

    function showDatePicker() {
        setDatePicker(true);
    }

    function onDateSelected(event, value) {
        setDateOfBirth(value);
        setDatePicker(false);
    }

    const staticData = [
        { id: 0, value: "Sport", isChecked: false },
        { id: 1, value: "Computers", isChecked: false },
        { id: 2, value: "Cooking", isChecked: false },
        { id: 3, value: "Art", isChecked: false },
        { id: 4, value: "Literature", isChecked: false },
        { id: 5, value: "Journey", isChecked: false },
        { id: 6, value: "Music", isChecked: false },
        { id: 7, value: "Video games", isChecked: false },
        { id: 8, value: "other...", isChecked: false },
    ];

    const univerities = [
        { value: "agh", label: "Akademia Górniczo Hutnicza" },
        { value: "uj", label: "Uniwersytet Jagielloński" },
        { value: "pk", label: "Politechnika Krakowska" },
        { value: "up", label: "Uniwersytet Pedagogiczny" },
        { value: "ur", label: "Uniwersytet Rolniczy" },
        { value: "ue", label: "Uniwersytet Ekonomiczny" },
        { value: "oth", label: "other..." },
    ];

    const genders = [
        { key: 1, value: "male" },
        { key: 2, value: "female" },
    ];

    function getUniversityObject() {
        return univerities.find((obj) => obj.value === selectedUniversity);
    }

    function getGenderObject() {
        return genders.find((obj) => obj.value === selectedGender);
    }

    return (
        <View
            style={{
                flex: 1,
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: COLORS.background,
            }}
        >
            {loading ? (
                <LoadingAnimation text="Updating profile" />
            ) : (
                <FlatList
                    ListHeaderComponent={
                        <View style={styles.container}>
                            <Pressable style={styles.goBack}>
                                <MaterialCommunityIcons
                                    name="arrow-left"
                                    color={COLORS.primary1}
                                    size={35}
                                    onPress={navigation.goBack}
                                />
                            </Pressable>
                            <Text style={styles.h2}>Complete your profile</Text>

                            <Text style={styles.dataText}>University:</Text>
                            {/* <RNPickerSelect
                        style={pickerSelectStyles}
                        onValueChange={(value) => onChangeUniversity(value)}
                        items={univerities}
                    /> */}
                            <TextInput
                                style={styles.textboxes}
                                onChangeText={onChangeUniversity}
                                value={university}
                                placeholder={university}
                            />

                            <Text style={styles.dataText}>Description:</Text>
                            <TextInput
                                style={styles.textboxes}
                                onChangeText={(value) => {
                                    setDescription(value);
                                }}
                                value={description}
                                placeholder={description}
                            />

                            <Text style={styles.dataText}>Date of birth:</Text>
                            <TextInput
                                style={styles.textboxes}
                                onChange={showDatePicker}
                            >
                                {dateOfBirth
                                    ? dateOfBirth.toDateString()
                                    : undefined}
                            </TextInput>

                            {datePicker && (
                                <DateTimePicker
                                    value={dateOfBirth}
                                    mode={"date"}
                                    display={
                                        Platform.OS === "ios"
                                            ? "spinner"
                                            : "default"
                                    }
                                    is24Hour={true}
                                    onChange={onDateSelected}
                                    style={styles.datePicker}
                                />
                            )}

                            {!datePicker && (
                                <View
                                    style={{
                                        marginBottom: 20,
                                        paddingVertical: 12,
                                        paddingHorizontal: 32,
                                        width: 240,
                                        borderRadius: 50,
                                    }}
                                >
                                    <Button
                                        title="Show Date Picker"
                                        color={COLORS.primary1}
                                        onPress={showDatePicker}
                                    />
                                </View>
                            )}
                        </View>
                    }
                    ListFooterComponent={
                        <View style={styles.containerHobby}>
                            <Text style={styles.dataText}>
                                Select new profile picture:
                            </Text>
                            <View style={styles.imgContainer}>
                                <Image
                                    style={styles.img}
                                    source={{ uri: image }}
                                />
                            </View>
                            <SignInBtn
                                style={styles.button2}
                                title="Select image"
                                onPress={() => {
                                    setImageChanged(true);
                                    pickImageAsync().catch((error) => {
                                        displayAlertBox(
                                            "Please, try again later",
                                            error.message
                                        );
                                    });
                                }}
                            >
                                {" "}
                            </SignInBtn>
                            <Text style={styles.dataText}>Hobby:</Text>
                            {/* Zamiast tego proponuje użyć tego co do filtrów - jak chcecie */}
                            <RNMultiSelect
                                disableAbsolute
                                data={staticData}
                                onSelect={(selectedItems) =>
                                    setSelected(selectedItems)
                                }
                                menuBarContainerStyle={styles.hobbyBox}
                                buttonContainerStyle={styles.hobbyBox}
                            />
                            <Text style={styles.dataText}>University:</Text>
                            <SelectList
                                boxStyles={pickerSelectStyles.dropdownBox}
                                dropdownStyles={pickerSelectStyles.dropdown}
                                inputStyles={pickerSelectStyles.dropdownInput}
                                data={univerities}
                                save="value"
                                placeholder="Select University"
                                setSelected={(val) =>
                                    setSelectedUniversity(val)
                                }
                                defaultOption={getUniversityObject()}
                            />
                            <Text style={styles.dataText}>Gender:</Text>
                            <SelectList
                                boxStyles={pickerSelectStyles.dropdownBox}
                                dropdownStyles={
                                    pickerSelectStyles.genderDropdown
                                }
                                inputStyles={pickerSelectStyles.dropdownInput}
                                data={genders}
                                save="value"
                                placeholder="Select gender"
                                search={false}
                                setSelected={(val) => setSelectedGender(val)}
                                defaultOption={getGenderObject()}
                            />
                            <Text style={styles.dataText}>Year of study:</Text>
                            <SelectList
                                boxStyles={pickerSelectStyles.dropdownBox}
                                dropdownStyles={pickerSelectStyles.dropdown}
                                inputStyles={pickerSelectStyles.dropdownInput}
                                data={years}
                                save="value"
                                placeholder="Select year"
                                search={false}
                                setSelected={(val) => setSelectedYear(val)}
                            />
                            <SignInBtn
                                style={styles.button}
                                title="Save Changes"
                                onPress={() => {
                                    setLoading(true);
                                    console.log(selected);
                                    updateUserData().catch((error) =>
                                        displayAlertBox(
                                            "Please, try again later",
                                            error.message
                                        )
                                    );
                                    setLoading(false);
                                }}
                            ></SignInBtn>
                        </View>
                    }
                />
            )}
        </View>
    );
};

export default FulfillProfile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.background,
    },
    containerHobby: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.background,
    },
    h2: {
        fontSize: 30,
        marginVertical: 5,
        color: "#1A936F",
    },
    dataText: {
        fontSize: 20,
        marginVertical: 7,
        color: "#114B5F",
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 12,
        paddingHorizontal: 32,
        width: 180,
        borderRadius: 4,
        backgroundColor: "#1a936f",
        marginTop: 120,
        marginBottom: 20,
    },
    button2: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 12,
        paddingHorizontal: 32,
        width: 180,
        borderRadius: 4,
        marginVertical: 10,
        backgroundColor: COLORS.primary1,
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
    datePicker: {
        justifyContent: "center",
        alignItems: "flex-start",
        width: 320,
        height: 260,
        display: "flex",
    },
    hobbyBox: {
        //left:"2%",
        width: "100%",
        padding: "5%",
        margin: 0,
        borderRadius: 10,
        backgroundColor: "transparent",
    },
    hobbyText: {
        fontSize: 15,
        marginVertical: 7,
        color: "black",
    },
    imgContainer: {
        marginVertical: 5,
        height: 200,
        width: 200,
        borderColor: COLORS.primary1,
        borderWidth: 0.5,
    },
    img: {
        height: "100%",
        width: "100%",
    },
    goBack: {
        position: "absolute",
        left: 10,
        top: 30,
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        left: "5%",
        width: "90%",
        fontSize: 15,
        padding: "5%",
        borderWidth: 0.5,
        borderColor: "gray",
        borderRadius: 10,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: "purple",
        borderRadius: 8,
        color: "black",
        paddingRight: 30,
    },
    dropdownInput: {
        fontSize: 15,
        color: "grey",
    },
    dropdownBox: {
        width: Dimensions.get("window").width * 0.9,
        alignItems: "center",
        fontSize: 15,
        margin: 8,
        height: 67,
        borderColor: "grey",
        borderWidth: 0.5,
        borderRadius: 10,
        backgroundColor: "#fff",
        shadowColor: "#000",
        elevation: 3,
    },
    genderDropdown: {
        fontSize: 15,
        margin: 8,
        height: 95,
        borderColor: "grey",
        borderWidth: 0.5,
        borderRadius: 10,
        backgroundColor: "#fff",
        shadowColor: "#000",
        elevation: 3,
    },
    dropdown: {
        fontSize: 15,
        margin: 8,
        borderColor: "grey",
        borderWidth: 0.5,
        borderRadius: 10,
        backgroundColor: "#fff",
        shadowColor: "#000",
        elevation: 3,
    },
});
