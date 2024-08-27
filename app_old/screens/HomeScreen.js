import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from "react-native";
import { Header } from '@rneui/themed';

const HomeScreen = () => {
  const data = [
    { id: "1", title: "Annonce 1", description: "Description de l'annonce 1" },
    { id: "2", title: "Annonce 2", description: "Description de l'annonce 2" },
    // Ajoutez plus d'annonces ici
  ];

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header
        centerComponent={{
          text: "Annonces",
          style: { color: "#fff", fontSize: 20 },
        }}
        rightComponent={
          <TouchableOpacity onPress={() => navigation.navigate("PostAd")}>
            <Text style={styles.postAdButton}>+ Poster une annonce</Text>
          </TouchableOpacity>
        }
      />
      <TextInput
        style={styles.searchBar}
        placeholder="Rechercher des annonces..."
      />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  item: {
    backgroundColor: "#fff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "#666",
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
});

export default HomeScreen;
