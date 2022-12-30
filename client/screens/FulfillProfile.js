import React from "react";
import {
    Dimensions,
    StyleSheet,
    Text,
    View,
    TextInput,
    useState,
    Button,
    ScrollView,
    DatePicker,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchableDropdown from "react-native-searchable-dropdown";
import SignInBtn from "../components/signIn/SignInBtn";
// import {DatePicker} from "react-native-date-picker";
import RNSearchablePicker from "react-native-searchable-picker";
import RNPickerSelect from "react-native-picker-select";
import DateTimePicker from '@react-native-community/datetimepicker';

import { register } from "../components/auth";



const FulfillProfile = ({ navigation, route }) => {
    const {id} = route.params

    const [university, onChangeUniversity] = React.useState("");

    const [password, onChangePassword] = React.useState("");
    const [firstName, onChangeFirstName] = React.useState();
    const [secondName, onChangeSecondName] = React.useState();
    const [yearOfStudy, onChangeyearOfStudy] = React.useState();
    const [dateOfBorn, onChangedateOfBorn] = React.useState();
    const [selected, setSelected] = React.useState();

    const [datePicker, setDatePicker] = React.useState(false);
 
    const [date, setDate] = React.useState(new Date());

    function showDatePicker() {
        setDatePicker(true);
      };

      function onDateSelected(event, value) {
        setDate(value);
        setDatePicker(false);
      };

    const options = [
        { value: "chocolate", label: "Chocolate" },
        { value: "strawberry", label: "Strawberry" },
        { value: "vanilla", label: "Vanilla" }
      ]

    const univerities = [
    { value: "agh", label: "Akademia Górniczo Hutnicza" },
    { value: "uj", label: "Uniwersytet Jagielloński" },
    { value: "pk", label: "Politechnika Krakowska" },
    { value: "up", label: "Uniwersytet Pedagogiczny" },
    { value: "ur", label: "Uniwersytet Rolniczy" },
    { value: "ue", label: "Uniwersytet Ekonomiczny" },
    { value: "oth", label: "other..." },

    ]

    React.useEffect(() => {
        console.log(university);
      }, [university]);
      

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.h2}>Complete your profile</Text>

            <Text style={styles.dataText}>University:</Text>
            <RNPickerSelect
                style={pickerSelectStyles}
                onValueChange={(value) => onChangeUniversity(value)}
                items={univerities}
             />

            <Text style={styles.dataText}>Hobby:</Text>
            <RNPickerSelect
                style={pickerSelectStyles}
                onValueChange={(value) => console.log(value)}
                items={options}
             />

            <Text style={styles.dataText}>Date of born:</Text>
            <TextInput 
                style={styles.textboxes}
                onChange={showDatePicker}>
                {date.toDateString()}
            </TextInput>

            {datePicker && (
            <DateTimePicker
                value={date}
                mode={'date'}
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                is24Hour={true}
                onChange={onDateSelected}
                style={styles.datePicker}
            />
            )}

            {!datePicker && (
            <View style={{ marginTop: -10, marginBottom: 20  }}>
                <Button 
                    title="Show Date Picker"
                    color="black"
                    onPress={showDatePicker} />
            </View>
            )}



            <SignInBtn
                style={styles.button}
                title="Confirm"
                onPress={() => 
                    
                    {
                        displayAlertBox("NO WAY TO GET OUT! :{D");
                    // try {
                    //     register(login, password, {
                    //         firstName: firstName,
                    //         lastName: secondName,
                    //         yearOfStudy: yearOfStudy,
                    //     });
                    // } catch (error) {
                    //     displayAlertBox("Failed to register", error.message);
                    // }
                    // // navigation.push('Main')
                }}
            ></SignInBtn>
        </SafeAreaView>
    );
};

export default FulfillProfile;

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
    dataText: {
        fontSize: 20,
        left: "-30%",
        marginVertical: 7,
        color: "#114B5F",
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
    datePicker: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: 320,
        height: 260,
        display: 'flex',
      },
});


const pickerSelectStyles = StyleSheet.create({
    inputIOS: {        
        left: "5%",
        width: "90%",
        fontSize: 15,
        padding: "5%",
        borderWidth: 0.5,
        borderColor: 'gray',
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
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30 // to ensure the text is never behind the icon
    }
});
