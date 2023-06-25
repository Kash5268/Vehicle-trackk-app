// My imports
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";


//type
type Lang = "en" | "ru";
type Props = {
  activeFilter: string;
  setActiveFilter: React.Dispatch<React.SetStateAction<string>>;
  language: Lang;
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>
};

//Array to display in FlatList with changeLanguage option
const vehicleCategory: any = [{ en: "Freight", ru: "Грузовой" }, { en: "Passenger", ru: "Пассажирский" }, { en: "Special", ru: "Спецтранспорт" }];

//Filter Component
function Filter({ activeFilter, setActiveFilter, language, filter, setFilter }: Props) {
  return (
    <View
      style={{
        marginBottom: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 5,
        padding: 5,
        marginVertical: 5,
        backgroundColor: "#FAFAFC",
        columnGap: 10
      }}
    >
      {/* {(Filter options buttons)} */}
      <FlatList
        data={vehicleCategory}
        nestedScrollEnabled
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginHorizontal: 5,
              borderRadius: 40,
              backgroundColor: (activeFilter === item.en || activeFilter === item.ru) ? "cyan" : "#FAFAFC",
              borderWidth: 1,
              paddingHorizontal: 0
            }}
            onPress={() => setActiveFilter(language === "en" ? item.en : item.ru)}
          >
            <Text style={{ fontSize: 12, fontFamily: "DMMedium", padding: 10 }}>
              {language === "en" ? item.en : item.ru}
            </Text>
          </TouchableOpacity>
        )}
        horizontal
        contentContainerStyle={{
          columnGap: 1,
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          flex: 1
        }}
      />
      {/* {(Filter button works as an Apply)} */}
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 50,
          }}
          onPress={() => setFilter(activeFilter)}
        >
          <Image source={require("../constants/icons/filter.png")} />
        </TouchableOpacity>
      </View>
    </View >
  );
}

export default Filter;
