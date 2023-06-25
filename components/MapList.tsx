//Google APi Key was loaded to app.json. PROVIDER_GOOGLE acts as a prop to open map as Google Map 
//My imports
import React from 'react'
import { View, SafeAreaView } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { useRouter } from 'expo-router';

//My types
type Lang = "en" | "ru";
type Props = {
    data: any,
    language: Lang
}

//Component to create a map with markers from passed data
const MapList = ({ data, language }: Props) => {
    const router = useRouter();
    return (
        <SafeAreaView style={{ width: "100%", height: "84%" }} >
            <MapView initialRegion={{
                latitude: 51.134192,
                longitude: 71.465986,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
                provider={PROVIDER_GOOGLE}
                showsUserLocation={true}
                customMapStyle={[]}
                style={{ flex: 1 }}
            >
                {data.map((item) =>
                (<Marker
                    key={item.id}
                    onPress={() => router.push({ pathname: "/vehicle/About", params: { index: (Number(item.id) - 1), lang: language } })}
                    coordinate={{ latitude: +item.coordinates.latitude, longitude: +item.coordinates.longitude }}
                    image={item.en.category === "Freight" ? require("../constants/icons/box-car.png") : item.en.category === "Passenger" ? require("../constants/icons/bus.png") : require("../constants/icons/firetruck.png")}
                    style={{ width: 48, height: 48 }} />))}
            </MapView></ SafeAreaView>
    )
}

export default MapList