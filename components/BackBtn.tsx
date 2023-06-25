//Imports for BackBtn Component
import React from "react";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";

//Component BackBtn
const BackBtn = () => {
    const router = useRouter();
    return (
        <View style={styles.btnContainer}>
            <TouchableOpacity onPress={() => router.back()} >
                <Image source={require("../constants/icons/back.png")} />
            </TouchableOpacity>
        </View >
    );
};


//Style
const styles = StyleSheet.create({
    btnContainer: {
        marginLeft: 0,
    },
});

export default BackBtn;