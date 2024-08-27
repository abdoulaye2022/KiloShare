import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text, Input, Button, Dialog } from "@rneui/themed";
import { useEffect, useState } from "react";
// import axios from "../axios";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("OK");
  }, []);

  const handleSubmit = async () => {
    // if (email != "" && password != "") {
    //   if (validateEmail(email)) {
    //     axios
    //       .post(`/login`, {
    //         email: email,
    //         password: password,
    //       })
    //       .then((res) => {
    //         console.log(JSON.stringify(res.data, null, 2));
    //         if (res.data.success) {
    //           navigation.navigate("Home");
    //         }
    //       })
    //       .catch((error) => {
    //         console.error("Error request:", error);
    //       });
    //   } else {
    //     setVisible(true);
    //     setError("Adresse e-mail invalide");
    //   }
    // } else {
    //   setVisible(true);
    //   setError("Tous les champs sont obligatoire.");
    // }
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
      <Input placeholder="Adresse e-mail" onChangeText={(value) => setEmail(value)} />
      <Input
        placeholder="Mot de passe"
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
      <View style={styles.centrer}>
        <Text h6 style={styles.texte}>
          Pas encore de compte ?
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Signin")}>
          <Text style={{color: "#8E44AD"}}>S'inscrire</Text>
        </TouchableOpacity>
      </View>
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
  boutonInscrir: {
    height: 10,
  },
  centrer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Login;
