import { StyleSheet, View } from "react-native";
import { Text } from "@rneui/themed";
import { FontAwesome5 } from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Fontisto from '@expo/vector-icons/Fontisto';

const CardAnnonce = ({ item }) => {
  return (
    <View style={styles.item}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>
          <FontAwesome5 name="plane-departure" size={16} color="black" /> Canada
          - <FontAwesome5 name="plane-arrival" size={16} color="black" /> Niger
        </Text>
        <Text><Fontisto name="date" size={16} color="black" /> Mardi 12 juillet 2024</Text>
      </View>
      <View style={styles.righBlock}>
        <Text style={{ marginRight: 3, fontSize: 16 }}>12</Text>
        <MaterialCommunityIcons
          name="weight-kilogram"
          size={16}
          color="black"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  title: {
    fontWeight: "bold",
    marginBottom: 5
  },
  description: {
    fontSize: 14,
    color: "#666",
  },
  righBlock: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    fontWeight: "bold"
  }
});

export default CardAnnonce;
