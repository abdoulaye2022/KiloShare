import React from "react";
import { View, StyleSheet } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Avatar, Image, Text } from "@rneui/themed";
import { ICON } from "../assets";

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.header}>
        <Avatar
          rounded
          title="AB"
          size="medium"
          avatarStyle={{ backgroundColor: "#FFFFFF", color: "#8E44AD" }}
          titleStyle={styles.avatarTitle}
          //   source={{ uri: "https://randomuser.me/api/portraits/men/36.jpg" }}
        />
        <Text h6 style={{ marginLeft: 5, color: "#FFFFFF" }}>Abdoulaye Mohamed</Text>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 70,
    backgroundColor: "#8E44AD",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10
  },
  avatarTitle: {
    color: "#FF6347", // Changez cette couleur selon vos besoins
    fontSize: 24,
  },
});

export default CustomDrawerContent;
