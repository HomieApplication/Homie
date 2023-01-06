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
import Map from "../components/AddOfferScreen/Map";

import { displayAlertBox } from "../components/alert";

import MapView, { PROVIDER_GOOGLE, Marker} from "react-native-maps";
import marker from "../assets/icons8-marker.png";

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
  const [domitory, onChangeDormitory] = React.useState("");

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

function Markers() { 

    return (
      <View>
        <Marker
          coordinate={{ latitude : 50.065868409336915 , longitude : 19.915877276798597   }}
          pinColor = 'black'
          title = 'I DS Alfa'
          onPress={(e) => {
            onChangeLocalization(e.nativeEvent.coordinate);
            onChangeDormitory("I DS Alfa");
          }}
        />
        <Marker
          coordinate={{ latitude : 50.06909454120224 , longitude : 19.904426686576333   }}
          pinColor = 'black'
          title = 'DS1 Olimp'
          onPress={(e) => {
            onChangeLocalization(e.nativeEvent.coordinate);
            onChangeDormitory("DS1 Olimp");
          }}
        />
        <Marker
          coordinate={{ latitude : 50.06945669606302 , longitude : 19.905645376062772   }}
          pinColor = 'black'
          title = 'DS2 Babilon'
          onPress={(e) => {
            onChangeLocalization(e.nativeEvent.coordinate);
            onChangeDormitory("DS2 Babilon");
          }}
        />
        <Marker
          coordinate={{ latitude : 50.06971744764018 , longitude : 19.903386380497768   }}
          pinColor = 'black'
          title = 'DS3 Akropol'
          onPress={(e) => {
            onChangeLocalization(e.nativeEvent.coordinate);
            onChangeDormitory("DS3 Akropol");
          }}
        />
        <Marker
          coordinate={{ latitude : 50.069460793917536 , longitude : 19.9059155884422   }}
          pinColor = 'black'
          title = 'DS4 Filutek'
          onPress={(e) => {
            onChangeLocalization(e.nativeEvent.coordinate);
            onChangeDormitory("DS4 Filutek");
          }}
        />
        <Marker
          coordinate={{ latitude : 50.06905674103451 , longitude : 19.90610522467604  }}
          pinColor = 'black'
          title = 'DS5 Strumyk'
          onPress={(e) => {
            onChangeLocalization(e.nativeEvent.coordinate);
            onChangeDormitory("DS5 Strumyk");
          }}
        />
        <Marker
          coordinate={{ latitude : 50.06855879085213, longitude : 19.905613674949148   }}
          pinColor = 'black'
          title = 'DS6 Bratek'
          onPress={(e) => {
            onChangeLocalization(e.nativeEvent.coordinate);
            onChangeDormitory("DS6 Bratek");
          }}
        />
        <Marker
          coordinate={{ latitude : 50.06817409779714, longitude : 19.905322959606522   }}
          pinColor = 'black'
          title = 'DS7 Zaścianek'
          onPress={(e) => {
            onChangeLocalization(e.nativeEvent.coordinate);
            onChangeDormitory("DS7 Zaścianek");
          }}
        />
        <Marker
          coordinate={{ latitude : 50.06772443916539, longitude : 19.905325603784718  }}
          pinColor = 'black'
          title = 'DS8 Stokrotka'
          onPress={(e) => {
            onChangeLocalization(e.nativeEvent.coordinate);
            onChangeDormitory("DS8 Stokrotka");
          }}
        />
        <Marker
          coordinate={{ latitude : 50.06919964379084 , longitude : 19.90736705166221   }}
          pinColor = 'black'
          title = 'DS9 Omega'
          onPress={(e) => {
            onChangeLocalization(e.nativeEvent.coordinate);
            onChangeDormitory("DS9 Omega");
          }}
        />
        <Marker
          coordinate={{ latitude : 50.06886565521682, longitude : 19.907048174949157  }}
          pinColor = 'black'
          title = 'DS10 Hajduczek'
          onPress={(e) => {
            onChangeLocalization(e.nativeEvent.coordinate);
            onChangeDormitory("DS10 Hajduczek");
          }}
        />
        <Marker 
          coordinate={{ latitude : 50.06838423746026, longitude : 19.907120007483826   }}
          pinColor = 'black'
          title = 'DS11 Bonus'
          onPress={(e) => {
            onChangeLocalization(e.nativeEvent.coordinate);
            onChangeDormitory("DS11 Bonus");
          }}
        /> 
        <Marker
          coordinate={{ latitude : 50.068034058082404, longitude : 19.90635435960652   }}
          pinColor = 'black'
          title = 'DS12 Promyk'
          onPress={(e) => {
            onChangeLocalization(e.nativeEvent.coordinate);
            onChangeDormitory("DS12 Promyk");
          }}
        /> 
        <Marker
          coordinate={{ latitude : 50.06748794624835, longitude : 19.906444676798568  }}
          pinColor = 'black'
          title = 'DS13 Straszny Dwór'
          onPress={(e) => {
            onChangeLocalization(e.nativeEvent.coordinate);
            onChangeDormitory("DS13 Straszny Dwór");
          }}
        />
        <Marker
          coordinate={{ latitude : 50.067863618615206, longitude : 19.90730764611346   }}
          pinColor = 'black'
          title = 'DS14 Kapitol'
          onPress={(e) => {
            onChangeLocalization(e.nativeEvent.coordinate);
            onChangeDormitory("DS14 Kapitol");
          }}
        /> 
        <Marker
          coordinate={{ latitude : 50.06825607072731, longitude : 19.902025292141232   }}
          pinColor = 'black'
          title = 'DS15 Maraton'
          onPress={(e) => {
            onChangeLocalization(e.nativeEvent.coordinate);
            onChangeDormitory("DS15 Maraton");
          }}
        /> 
        <Marker
          coordinate={{ latitude : 50.06872718264994, longitude : 19.902064476798696   }}
          pinColor = 'black'
          title = 'DS16 Itaka'
          onPress={(e) => {
            onChangeLocalization(e.nativeEvent.coordinate);
            onChangeDormitory("DS16 Itaka");
          }}
        /> 
        <Marker
          coordinate={{ latitude : 50.069093008559555, longitude : 19.902174001935283   }}
          pinColor = 'black'
          title = 'DS17 Arkadia'
          onPress={(e) => {
            onChangeLocalization(e.nativeEvent.coordinate);
            onChangeDormitory("DS17 Arkadia");
          }}
        /> 
        <Marker
          coordinate={{ latitude : 50.06906546276473, longitude : 19.902216917277883  }}
          pinColor = 'black'
          title = 'DS18 Odyseja'
          onPress={(e) => {
            onChangeLocalization(e.nativeEvent.coordinate);
            onChangeDormitory("DS18 Odyseja");
          }}
        /> 
        <Marker
          coordinate={{ latitude : 50.06996436069946, longitude : 19.90235311727785   }}
          pinColor = 'black'
          title = 'DS19 Apollo'
          onPress={(e) => {
            onChangeLocalization(e.nativeEvent.coordinate);
            onChangeDormitory("DS19 Apollo");
          }}
        />
      </View>


      );
    }


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
            // onChangeText={onChangeDescription}
            value={domitory}
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
                    // provider={PROVIDER_GOOGLE}
                    loadingEnabled
                    showsCompass = {true}
                    initialRegion={{
                        latitude: 50.06761513042561,
                        longitude: 19.90871608490642,
                        latitudeDelta: 0.0122,
                        longitudeDelta: 0.00421,
                      }}
                >
                  <Markers></Markers>
                </MapView>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
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
