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
  ScrollView,
  Vibration,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import SignInBtn from "../components/signIn/SignInBtn";
import { auth } from "../components/firebase/config";
import { displayAlertBox } from "../components/alert";

import MapView, { PROVIDER_GOOGLE, Marker} from "react-native-maps";
import mapMarker from "../assets/map_icon.png"; 
import beutifulCastle from "../assets/beautiful_castle.png";
import {markers} from "../components/AddOfferScreen/Markers";
import LoadingAnimation from "../components/LoadingAnimation";
import COLORS from "../components/assets";

const storage = getStorage();


const AddOfferScreen = ({ navigation }) => {
  const [title, onChangeTitle] = React.useState("");
  const [description, onChangeDescription] = React.useState("");
  const [localization, onChangeLocalization] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [dormitory, onChangeDormitory] = React.useState("");
  const [images, setImages] = React.useState([]);

  //post new offer 
  const sendData = async () => {
      const urls = await Promise.all(
          images.map((image) => uploadImage(image))
      ).catch((error) => {
          setLoading(false);
          displayAlertBox("Please, try again later", error.message);
      });

      axios
          .post(`/api/offers`, {
              title: title,
              // localType: localType,
              description: description,
              localization: localization,
              photoURLArray: urls,
          })
          .then(() => {
              setLoading(false);
              displayAlertBox("Offer successfully published!");
              Vibration.vibrate();
              navigation.push("Main");
          })
          .catch((error) => {
              setLoading(false);
              displayAlertBox("Please, try again later", error.message);
          });
  };

  //checks if dormitory was selected
  const domitoryChoiceHandler = () => {
    if(dormitory == "")
    {
      displayAlertBox("You haven't chosen any 😢", "please choose dormitory");
    }
    else
    {
      displayAlertBox("You chose:", dormitory);
    }
  }

  //changes states 
  const setLocalization = (dorm, local) => {
    onChangeDormitory(dorm);
    onChangeLocalization(local);
  }
  

  //picking images
  const pickImageAsync = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          quality: 0.5,
      }).catch((error) => {
        setLoading(false);
        displayAlertBox("Please, try again later", error.message);
      });

      //add picked images to array
      if (!result.cancelled) {
          setImages([result.uri, ...images]);
      } else {
          displayAlertBox(
              "Please, try again",
              "You did not select any image"
          );
      }
  };

  //uploading picked images (urls) to firebase storage
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


  const clearImages = () => {
      setImages([]);
  };

  return (
    <SafeAreaView style={styles.containerMain}>
      {loading ? (
        <LoadingAnimation text="Adding offer"/>
      ) : (
        <View style={styles.container}>
          <Text style={styles.h2}>Post new offer</Text>
          <TextInput
              style={styles.textboxes}
              onChangeText={onChangeTitle}
              value={title}
              placeholder="Offer title"
          />
          {/* <TextInput
            style={styles.textboxes}
            onChangeText={onChangeLocalType}
            value={localType}
            placeholder="Local type (dormitory/flat)"
          /> */}
          <TextInput
            style={styles.textboxes}
            onChangeText={onChangeDescription}
            value={description}
            placeholder="Description"
          />
          <View style={styles.textboxes}>
            {dormitory ? <Text
             >{dormitory}</Text> : <Text style={{color: "gray"}}
             >Choose dormitory</Text>}
          </View>

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
                      identifier={marker.identifier}
                      onPress={ e => setLocalization( e.nativeEvent.id, e.nativeEvent.coordinate)}
                      key={marker.identifier}
                    >                    
                    <Image
                    source={mapMarker}
                    style={{width:12, height:18}}
                    /></MapView.Marker>
                  ))}
                  <MapView.Marker coordinate={{ latitude: 50.066, longitude: 19.9140}}>
                    <Image
                      source={beutifulCastle}
                      style={{width:60, height:60}}
                      /></MapView.Marker>
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
            <SignInBtn
              style={styles.button}
              onPress={() => setModalVisible(!modalVisible)}
              title="Choose Dormitory"
              >
            </SignInBtn>
          </View>

          <SignInBtn
              style={styles.button}
              title="Add image"
              onPress={() => {
                  pickImageAsync().catch((error) => {
                    setLoading(false);
                    displayAlertBox("Please, try again later", error.message);
                });
              }}
          ></SignInBtn>
          <View style={{ flexDirection: "row" }}>
              <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
              >
                  {images.map((image) => (
                      <Image
                          key={image}
                          source={{ uri: image }}
                          style={{ width: 150, height: 150, marginHorizontal: 5}}
                      />
                  ))}
              </ScrollView>
          </View>
          {/* Tu też na pewno da się ładniej */}
          {images.length > 0 && (
              <Pressable onPress={clearImages}>
                  <Text>Clear all images</Text>
              </Pressable>
          )}
          <SignInBtn
            style={styles.buttonComfirm}
            title="Create offer"
            onPress={() => {
              if (title === "") {
                displayAlertBox("Failed to publish your offer", "Add title!");
              } else if (description === "") {
                displayAlertBox("Failed to publish your offer", "Add description!");
              // } else if (localization === "") {
              //   displayAlertBox("Failed to publish your offer", "Choose dormitory!");
              } else {
                setLoading(true);
                sendData().catch(error =>
                displayAlertBox("Please, try again later", error.message));
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
    backgroundColor: COLORS.background
  },
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    //backgroundColor: COLORS.background
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
    width:200,
    borderRadius: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    backgroundColor: COLORS.primary1,
  },
  buttonComfirm: {
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
    height: "100%",
  },
  modalView: {
    width: "100%",
    height: "100%",
    position: "absolute",
    justifyContent: "center",
    bottom: 0,
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