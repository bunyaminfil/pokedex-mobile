import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "@/constants/colors";
import Fonts from "@/constants/fonts";
import { Text } from "@/components/ui/Text";
import { hp, wp } from "../helpers/screenResize";

const SplashScreen: React.FC = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.mainText}>Pokemon</Text>
                <Text style={styles.subText}>Uygulamasına Hoşgeldiniz!</Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.shadowGrey,
    },
    content: {
        flex: 1,
        // justifyContent:'center',
        paddingTop: hp(10),
        paddingHorizontal: wp(5),
        // alignItems:'center'
    },
    mainText: {
        color: Colors.lime,
        fontSize: wp(8),
        fontWeight: "700",
        textAlign: "left",
        fontFamily: Fonts.Black,
    },
    subText: {
        color: Colors.lime,
        fontSize: wp(10),
    },
});

export default SplashScreen;
