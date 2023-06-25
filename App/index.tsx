// All imports
import { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Text,
} from "react-native";
import { Stack } from "expo-router";
import NameBtn from "../components/NameBtn";
import Filter from "../components/Filter";
import List from "../components/List";
import MapList from "../components/MapList";

// My types
type Option = "List" | "Map";
type Lang = "en" | "ru"


// Home component that automatically renders when index loads out as the main screen in the app
const Home = () => {
  // States for Home
  const [activeFilter, setActiveFilter] = useState("");
  const [filter, setFilter] = useState("")
  const [activeOption, setActiveOption] = useState<Option>("List");
  const [language, setLanguage] = useState<Lang>("en")
  const [data, setData] = useState<any>("");

  // Loading data from locale json file
  // Consequently, it creates new array accoring to filter option
  useEffect(() => {
    const data = require("../assets/base.json");
    const arr: any = [];
    data.users.map((user) => {
      if (filter === "") {
        arr.push(user);
      } else if (user.en.category === filter || user.ru.category === filter) {
        arr.push(user);
      }
    })
    setData(arr); //changing data state to my filtered options
  }, [filter]); // as the filter option changes at defalt empty state it renders all locale json file


  return (
    <SafeAreaView style={{ margin: 0 }}>
      {/* {Header Screen} */}
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: "#FAFAFC",
          },
          headerShadowVisible: false,
          headerRight: () => <NameBtn setLanguage={setLanguage} language={language} />,
          headerTitle: "",
        }}
      />

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          padding: 0,
          backgroundColor: "#FAFAFC",
        }}
      >
        {/* {filter component} */}
        <Filter activeFilter={activeFilter} setActiveFilter={setActiveFilter} language={language} filter={filter} setFilter={setFilter} />
        {/* {(List and Map options on how to view data)} */}
        <View style={{ flexDirection: "row", width: "100%", margin: 0 }}>
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginLeft: 1,
              width: "100%",
              flex: 1,
              backgroundColor: activeOption === "List" ? "cyan" : "#FAFAFC",
            }}
            onPress={() => setActiveOption("List")}
          >
            <Text style={{ fontSize: 20, fontFamily: "DMBold", padding: 5 }}>
              {language === "en" ? "List" : "Лист"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginRight: 1,
              width: "100%",
              flex: 1,
              backgroundColor: activeOption === "Map" ? "cyan" : "#FAFAFC",
            }}
            onPress={() => setActiveOption("Map")}
          >
            <Text style={{ fontSize: 20, fontFamily: "DMBold", padding: 5 }}>
              {language === "en" ? "Map" : "Карта"}
            </Text>
          </TouchableOpacity>
        </View>
        {/* {if activeOption is List it render List otherwise it renders Map} */}
        {activeOption === "List" ? (<List data={data} language={language} />) : (<MapList language={language} data={data} />)}
      </View>
    </SafeAreaView>
  );
};

export default Home;
