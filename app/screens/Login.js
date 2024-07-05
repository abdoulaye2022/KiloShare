import { View, StyleSheet } from "react-native";
import { Text, Input, Button, Dialog } from "@rneui/themed";
import { useEffect, useState } from "react";
import axios from "../axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("OK");
  }, []);

  const handleSubmit = async () => {
    if (email != "" && password != "") {
      if (validateEmail(email)) {
        axios
          .post(`/login`, {
            email: email,
            password: password,
          })
          .then((res) => {
            console.log(JSON.stringify(res.data, null, 2));
          })
          .catch((error) => {
            console.error("Error request:", error);
          });
      } else {
        setVisible(true);
        setError("Adresse e-mail invalide");
      }
    } else {
      setVisible(true);
      setError("Tous les champs sont obligatoire.");
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  return (
    <View style={styles.container}>
      <Text h3 style={styles.texte}>
        Connexion
      </Text>
      <Dialog isVisible={visible} onBackdropPress={() => setVisible(!visible)}>
        <Dialog.Title title="Error" />
        <Text>{error}</Text>
      </Dialog>
      <Input placeholder="E-mail" onChangeText={(value) => setEmail(value)} />
      <Input
        placeholder="Password"
        onChangeText={(value) => setPassword(value)}
      />
      <Button
        title="Se connecter"
        buttonStyle={{
          backgroundColor: "#8E44AD",
          borderRadius: 3,
        }}
        containerStyle={{
          width: "98%",
          marginHorizontal: 50,
          marginVertical: 10,
        }}
        onPress={() => handleSubmit()}
      />
      <Text h6 style={styles.texte}>
        Pas encore de compte ? S'inscrire
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  texte: {
    color: "#34495E",
  },
});

export default Login;
