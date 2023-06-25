//My imports
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useEffect } from "react";
import { useRouter } from "expo-router";

//types
type Lang = "en" | "ru"
type Props = {
  data: any;
  language: Lang;
};

function List({ data, language }: Props) {
  //router to navigate
  const router = useRouter();

  return (
    <View
      style={{
        width: "100%",
        height: "85%",
        borderTopWidth: 1,
      }}
    >
      {/* {(Table 1st row header content)} */}
      <View
        style={{
          columnGap: 10,
          flexDirection: "row",
          width: "100%",
          borderBottomWidth: 1,
          padding: 15,
        }}
      >
        <View style={{ width: "100%", flex: 1 }}>
          <Text style={{ fontFamily: "DMMedium", fontSize: 18 }}>{language === "en" ? "Vehicle" : "Транспорт"} </Text>
        </View>
        <View style={{ width: "100%", flex: 1 }}>
          <Text style={{ fontFamily: "DMMedium", fontSize: 18 }}>{language === "en" ? "Driver" : "Водитель"}</Text>
        </View>
        <View style={{ width: "100%", flex: 1 }}>
          <Text style={{ fontFamily: "DMMedium", fontSize: 18 }}>{language === "en" ? "Category" : "Категория"}</Text>
        </View>
      </View>
      {/* {(Generates row of information on touch it pushes you to respective detailed information screen)} */}
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{ width: "100%" }}
        data={data}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity
              style={{
                columnGap: 10,
                flexDirection: "row",
                width: "100%",
                padding: 15,
                borderBottomWidth: 1,
              }}
              onPress={() => { router.push({ pathname: "/vehicle/About", params: { index: (Number(item.id) - 1), lang: language } }) }}

            >
              <View style={{ width: "100%", flex: 1 }}>
                <Text style={{ fontFamily: "DMRegular", fontSize: 12 }}>
                  {language === "en" ? item.en.vehicle_name : item.ru.vehicle_name}#{item.id}
                </Text>
              </View>
              <View style={{ width: "100%", flex: 1 }}>
                <Text style={{ fontFamily: "DMRegular", fontSize: 12 }}>
                  {language === "en" ? item.en.name : item.ru.name}
                </Text>
              </View>
              <View style={{ width: "100%", flex: 1 }}>
                <Text style={{ fontFamily: "DMRegular", fontSize: 12 }}>
                  {language === "en" ? item.en.category : item.ru.category}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

export default List;
