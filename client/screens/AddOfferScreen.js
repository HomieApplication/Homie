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

import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
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
                <Text style={[styles.aboveMap]}>Choose a location on map</Text>
                <MapView
                  style={styles.map}
                  showsUserLocation={true}
                  provider={PROVIDER_GOOGLE}
                  loadingEnabled
                  showsCompass
                  ref={(el) => (this.mapView = el)}
                ></MapView>
                <View style={styles.markerFixed}>
                  <Image style={styles.marker} source={marker} />
                </View>
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
