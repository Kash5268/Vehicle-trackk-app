//My imports
import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

//My imports
type Lang = "en" | "ru";
type Props = {
  setLanguage: React.Dispatch<React.SetStateAction<Lang>>;
  language: Lang
}

//Component renders button to go back 
const NameBtn = ({ setLanguage, language }: Props) => {
  return (
    <View style={styles.btnContainer}>
      <TouchableOpacity style={{ borderWidth: 1, borderRadius: 15, padding: 5 }} onPress={() => { language === "en" ? setLanguage("ru") : setLanguage("en") }} >
        <Text style={{ fontFamily: "DMBold", fontSize: 20 }} >{language}</Text>
      </TouchableOpacity>
    </View >
  );
};

//Style
const styles = StyleSheet.create({
  btnContainer: {
    marginRight: 0,
  },
});

export default NameBtn;
