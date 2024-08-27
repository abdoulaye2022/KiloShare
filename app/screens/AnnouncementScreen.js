import { useState, useRef } from "react";
import { StyleSheet } from "react-native";
import { Text, Input, Button } from "@rneui/themed";
import { View } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import AntDesign from '@expo/vector-icons/AntDesign';

const AnnouncementScreen = () => {
  const [spaceAvailable, setSpaceAvailable] = useState("");
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const inputRef = useRef(null); 

  const handleChangeText = (text) => {
    const formattedText = text.replace(",", ".");
    if (!isNaN(formattedText) || formattedText === "") {
      setSpaceAvailable(formattedText);
    }
  };

  const formatToDecimal = (numberString) => {
    const num = parseFloat(numberString);
    if (isNaN(num)) {
      return "";
    }
    return num.toFixed(2);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios'); // iOS needs special handling
    setDate(currentDate);
    if (Platform.OS !== 'ios') {
      // Enlever le focus de l'Input après la sélection de la date
      if (inputRef.current) {
        inputRef.current.blur();
      }
      setShow(false);
    }
  };

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // January is 0!
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <View style={styles.container}>
      <Text h4>Creer une annonce</Text>
      <Input
        placeholder="Espace disponible en KG"
        onChangeText={handleChangeText}
        keyboardType="numeric"
        inputMode="decimal"
        value={spaceAvailable}
        onBlur={() => setSpaceAvailable(formatToDecimal(spaceAvailable))}
      />
      <Input
        ref={inputRef}
        placeholder="Select a date"
        value={formatDate(date)}
        onFocus={() => setShow(true)}
        // rightIcon={
        //   <AntDesign name="calendar" size={24} color="black" onPress={() => setShow(true)}/>
        // }
      />
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}
      {/* <Button title="Show Date Picker" onPress={() => setShow(true)} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AnnouncementScreen;
