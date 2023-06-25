//My imports
import {
    View,
    ScrollView,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    Text, Platform, Linking
} from "react-native";
import { Stack, useGlobalSearchParams } from "expo-router";
import NameBtn from "../../components/NameBtn";
import BackBtn from "../../components/BackBtn";
import { useEffect, useState } from 'react'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'

//My type
type Lang = "en" | "ru";

const Vehicle = () => {
    //My states
    const { index, lang } = useGlobalSearchParams();
    const [vehicle, setVehicle] = useState<any>();
    const [language, setLanguage] = useState<Lang>("en")
    console.log(lang)

    //Load data from locale json database
    useEffect(() => {
        const data = require("../../assets/base.json");
        setVehicle(data.users[Number(index)]);
        setLanguage(lang);
    }, [index]);

    //Function to call
    const makePhoneCall = () => {
        if (Platform.OS === "android") {
            Linking.openURL(`tel:${vehicle.number}`)
        } else {
            Linking.openURL(`telprompt:${vehicle.number}`)
        }
    }

    //function to text
    const textWhatsApp = () => {
        Linking.openURL(`whatsapp://send?text=Добрый день, подскажите пожалуйста, какой номер заказа у вас сейчас в работе&phone=${vehicle.number}`);
    }

    return (
        <SafeAreaView style={{ flex: 1 }} >
            {/* {(Header Screen with change language and back button)} */}
            <Stack.Screen
                options={{
                    headerStyle: {
                        backgroundColor: "#FAFAFC",
                    },
                    headerShadowVisible: false,
                    headerLeft: () => <BackBtn />,
                    headerRight: () => <NameBtn language={language} setLanguage={setLanguage} />,
                    headerTitle: "",
                }}
            />
            {/* {//renders MapView if vehicle is true meaning if it is loaded correctly */}
            {vehicle && (<MapView initialRegion={{
                latitude: +vehicle.coordinates.latitude,
                longitude: +vehicle.coordinates.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
                provider={PROVIDER_GOOGLE} //essential
                showsUserLocation={true}
                customMapStyle={[]}
                style={{ flex: 2 }}
            >
                <Marker
                    coordinate={{ latitude: +vehicle.coordinates.latitude, longitude: +vehicle.coordinates.longitude }}
                    title={vehicle?.en?.name}
                    image={vehicle?.en?.category === "Freight" ? require("../../constants/icons/box-car.png") :
                        (vehicle?.en?.category === "Passenger" ? require("../../constants/icons/bus.png") : require("../../constants/icons/firetruck.png"))}
                    style={{ width: 48, height: 48 }} />
            </MapView>)}

            {/* {Text content} */}

            <View style={{ backgroundColor: "#FAFAFC", flex: 1 }} >
                <Text style={{ fontFamily: "DMRegular", fontSize: 18, margin: 15 }} >{language === "en" ? "Category" : "Категория"}: {language === "en" ? vehicle?.en?.category : vehicle?.ru?.category}</Text>
                <Text style={{ fontFamily: "DMRegular", fontSize: 18, margin: 15 }} >{language === "en" ? "Driver's name" : "Имя водителя"}: {language === "en" ? vehicle?.en?.name : vehicle?.ru?.name}</Text>
                <Text style={{ fontFamily: "DMRegular", fontSize: 18, margin: 15 }} >{language === "en" ? "Number" : "Номер"}: {vehicle?.number}</Text>
            </View >

            {/* {Buttons to call and text} */}
            <View style={{ flex: 1, flexDirection: "row", backgroundColor: "#FAFAFC" }}>
                <TouchableOpacity style={{
                    flex: 1, justifyContent: "center", alignItems: "center", marginHorizontal: 10,
                    borderRadius: 40, borderWidth: 1, margin: 50
                }}
                    onPress={textWhatsApp}
                ><Text style={{ fontSize: 18, fontFamily: "DMMedium", padding: 10 }} >{language === "en" ? "Contact" : "Написать"}</Text></TouchableOpacity>
                <TouchableOpacity
                    style={{
                        flex: 1, justifyContent: "center", alignItems: "center", marginHorizontal: 10,
                        borderRadius: 40, borderWidth: 1, margin: 50
                    }}
                    onPress={makePhoneCall}
                ><Text style={{ fontSize: 18, fontFamily: "DMMedium", padding: 10 }} >{language === "en" ? "Call" : "Позвонить"}</Text></TouchableOpacity>
            </View>
        </SafeAreaView >
    )
}

export default Vehicle