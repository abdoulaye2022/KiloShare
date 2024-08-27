import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Header } from "@rneui/themed";
import Entypo from "@expo/vector-icons/Entypo";
import CardAnnonce from "../components/CardAnnonce";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const HomeScreen = ({ navigation }) => {
  const data = [
    { id: "1", title: "Annonce 1", description: "Description de l'annonce 1" },
    { id: "2", title: "Annonce 2", description: "Description de l'annonce 2" },
    { id: "3", title: "Annonce 2", description: "Description de l'annonce 2" },
    { id: "4", title: "Annonce 2", description: "Description de l'annonce 2" },
    { id: "5", title: "Annonce 2", description: "Description de l'annonce 2" },
    { id: "6", title: "Annonce 2", description: "Description de l'annonce 2" },
    { id: "7", title: "Annonce 2", description: "Description de l'annonce 2" },
    { id: "8", title: "Annonce 2", description: "Description de l'annonce 2" },
    { id: "9", title: "Annonce 2", description: "Description de l'annonce 2" },
    { id: "10", title: "Annonce 2", description: "Description de l'annonce 2" },
    { id: "11", title: "Annonce 2", description: "Description de l'annonce 2" },
    { id: "12", title: "Annonce 2", description: "Description de l'annonce 2" },
    // Ajoutez plus d'annonces ici
  ];

  const authenticathed = useSelector((state) => state.user.authenticathed);

  useEffect(() => {
    navigation.navigate("Home");
    // console.log("Home is mounted !")
  }, [authenticathed]);

  return (
    <View style={styles.container}>
      <Header
        centerComponent={{
          text: "Annonces",
          style: { color: "#fff", fontSize: 20 },
        }}
        rightComponent={
          <TouchableOpacity onPress={() => navigation.navigate("home")}>
            {/* <Text style={styles.postAdButton}>+ Poster une annonce</Text> */}
          </TouchableOpacity>
        }
        backgroundColor="#8E44AD"
      />
      <TextInput
        style={styles.searchBar}
        placeholder="Rechercher des annonces..."
      />
      <FlatList
        data={data}
        renderItem={CardAnnonce}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate("Announcement")}
      >
        <Entypo name="circle-with-plus" size={60} style={styles.btnAdd} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  searchBar: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 20,
    margin: 10,
    paddingLeft: 20,
    backgroundColor: "#fff",
  },
  postAdButton: {
    color: "#fff",
    fontSize: 16,
  },
  btnAdd: {
    position: "absolute",
    bottom: 20,
    right: 20,
    color: "#8E44AD",
  },
});

export default HomeScreen;
