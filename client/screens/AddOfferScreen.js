import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TextInput,
  useState,
  ActivityIndicator,
  Alert,
  Modal,
  Pressable,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchableDropdown from "react-native-searchable-dropdown";
import SignInBtn from "../components/signIn/SignInBtn";
import axios from "axios";

import { displayAlertBox } from "../components/alert";

import MapView, { PROVIDER_GOOGLE, Marker, Callout} from "react-native-maps";
import mapMarker from "../assets/map_icon.png";
import beutifulCastle from "../assets/beautiful_castle.png";

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
  const [loading, setLoading] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [dormitory, onChangeDormitory] = React.useState("");

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

  const domitoryChoiceHandler = () => {
    displayAlertBox("You chose:", dormitory);
    if(dormitory == 'DS14 Kapitol')
    {
      console.log("JEEEEEEEEJ");
    }
  }
  const setLocalization = (dorm, local) => {
    onChangeDormitory(dorm);
    onChangeLocalization(local);
    console.log(dorm);
  }
    const markers = [{
      title: 'I DS Alfa',
      coordinates: {
        latitude : 50.065868409336915 ,
        longitude : 19.915877276798597
      },
      identifier: 'I DS Alfa',
    },
    {
      title: 'DS1 Olimp',
      coordinates: {
        latitude : 50.06909454120224 , 
        longitude : 19.904426686576333,
      },
      identifier: 'DS1 Olimp',
    },
    {
      title: 'DS2 Babilon',
      coordinates: {
        latitude : 50.06945669606302 , 
        longitude : 19.905645376062772
      },
      identifier: 'DS2 Babilon',
    },
    {
      title: 'DS3 Akropol',
      coordinates: {
        latitude : 50.06971744764018 , 
        longitude : 19.903386380497768
      },
      identifier: 'DS3 Akropol',
    },
    {
      title: 'DS4 Filutek',
      coordinates: {
        latitude : 50.069460793917536 , 
        longitude : 19.9059155884422
      },
      identifier: 'DS4 Filutek',
    },
    {
      title: 'DS5 Strumyk',
      coordinates: {
        latitude : 50.06905674103451 , 
        longitude : 19.90610522467604
      },
      identifier: 'DS5 Strumyk',
    },
    {
      title: 'DS6 Bratek',
      coordinates: {
        latitude : 50.06855879085213, 
        longitude : 19.905613674949148
      },
      identifier: 'DS6 Bratek',
    },
    {
      title: 'DS7 Zaścianek',
      coordinates: {
        latitude : 50.06817409779714, 
        longitude : 19.905322959606522 
      },
      identifier: 'DS7 Zaścianek',
    },
    {
      title: 'DS8 Stokrotka',
      coordinates: {
        latitude : 50.06772443916539, 
        longitude : 19.905325603784718
      },
      identifier: 'DS8 Stokrotka',
    },
    {
      title: 'DS9 Omega',
      coordinates: {
        latitude : 50.06919964379084 , 
        longitude : 19.90736705166221
      },
      identifier: 'DS9 Omega',
    },
    {
      title: 'DS10 Hajduczek',
      coordinates: {
        latitude : 50.06886565521682, 
        longitude : 19.907048174949157
      },
      identifier: 'DS10 Hajduczek',
    },
    {
      title: 'DS11 Bonus',
      coordinates: {
        latitude : 50.06838423746026, 
        longitude : 19.907120007483826
      },
      identifier: 'DS11 Bonus',
    },
    {
      title: 'DS12 Promyk',
      coordinates: {
        latitude : 50.068034058082404, 
        longitude : 19.90635435960652
      },
      identifier: 'DS12 Promyk',
    },
    {
      title: 'DS13 Straszny Dwór',
      coordinates: {
        latitude : 50.06748794624835, 
        longitude : 19.906444676798568
      },
      identifier: 'DS13 Straszny Dwór',
    },
    {
      title: 'DS14 Kapitol',
      coordinates: {
        latitude : 50.067863618615206, 
        longitude : 19.90730764611346
      },
      identifier: 'DS14 Kapitol',
    },
    {
      title: 'DS15 Maraton',
      coordinates: {
        latitude : 50.06825607072731, 
        longitude : 19.902025292141232
      },
      identifier: 'DS15 Maraton',
    },
    {
      title: 'DS16 Itaka',
      coordinates: {
        latitude : 50.06872718264994, 
        longitude : 19.902064476798696
      },
      identifier: 'DS16 Itaka',
    },
    {
      title: 'DS17 Arkadia',
      coordinates: {
        latitude : 50.06908944917313, 
        longitude : 19.902272932620487
      },
      identifier: 'DS17 Arkadia',
    },
    {
      title: 'DS18 Odyseja',
      coordinates: {
        latitude : 50.06954129586869, 
        longitude : 19.902069605444794
      },
      identifier: 'DS18 Odyseja',
    },
    {
      title: 'DS19 Apollo',
      coordinates: {
        latitude : 50.06996436069946, 
        longitude : 19.90235311727785
      },
      identifier: 'DS19 Apollo',
    },]


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
            // onChangeText={displayAlertBox("You chose: ", dormitory)}
            value={dormitory}
            placeholder="Dormitory"
          />
          {/*}
          <TextInput
            style={styles.textboxes}
            onChangeText={onChangeLocalization}
            value={localization}
            placeholder="Localization (city for now...)"
          />
          */}
          <View>
            <Modal
              animationType="slide"
              visible={modalVisible}
              transparent={true}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
              }}
            >
              <View style={styles.modalView}>
                <MapView
                    style={styles.map}
                    showsUserLocation={true}
                    provider={PROVIDER_GOOGLE}
                    loadingEnabled
                    showsCompass = {true}
                    initialRegion={{
                        latitude: 50.066, 
                        longitude: 19.91,
                        latitudeDelta: 0.001,
                        longitudeDelta: 0.015,
                      }}
                >
                  {markers.map(marker => (
                    <MapView.Marker 
                      coordinate={marker.coordinates}
                      title={marker.title}
                      image={mapMarker}
                      identifier={marker.identifier}
                      onPress={ e => setLocalization( e.nativeEvent.id, toString(e.nativeEvent.coordinate))}
                    />
                  ))}
                  <MapView.Marker image={beutifulCastle} coordinate={{ latitude: 50.066, longitude: 19.9140}}></MapView.Marker>
                </MapView>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {setModalVisible(!modalVisible), domitoryChoiceHandler()}
                  }
                >
                  <Text style={styles.itemText}>Done</Text>
                </Pressable>
              </View>
            </Modal>
            <Pressable
              style={[styles.button, styles.buttonOpen]}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.itemText}>Choose a location</Text>
            </Pressable>
          </View>
          {/*
          <View style={styles.container}>
            <MapView
              style={styles.map}
              showsUserLocation={true}
              provider={PROVIDER_GOOGLE}
              loadingEnabled
              showsCompass
              ref={(el) => (this.mapView = el)}
            ></MapView>
          </View>
            */}
          <SignInBtn
            style={styles.button}
            title="Create offer"
            onPress={() => {
              setLoading(true);
              try {
                sendData();
              } catch (error) {
                displayAlertBox("Please, try again later", error.message);
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
  map: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "95%",
  },
  modalView: {
    width: "100%",
    height: "92%",
    position: "absolute",
    justifyContent: "center",
    bottom: 0,
    paddingTop: 20,
    marginTop: 20,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonClose: {
    position: "absolute",
    bottom: 25,
  },
  aboveMap: {
    position: "absolute",
    top: 15,
    color: "#000",
    fontSize: 24,
    fontWeight: "bold",
  },
  markerFixed: {
    left: "50%",
    marginLeft: -24,
    marginTop: -48,
    position: "absolute",
    top: "50%",
  },
  marker: {
    height: 48,
    width: 48,
  },
});
