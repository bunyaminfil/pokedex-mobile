import React from "react";
import { Pressable, View, Text, StyleSheet, Platform, GestureResponderEvent, Image } from "react-native";

interface PokemonCardProps {
    title: string;
    url: string;
    onPress: (event: GestureResponderEvent) => void;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ title, url, onPress }) => {
    return (
        <View style={styles.gridItem}>
            <Pressable
                android_ripple={{ color: "#ccc" }}
                style={({ pressed }) => (pressed ? styles.buttonPressed : null)}
                onPress={onPress}
            >
                <View style={styles.innerContainer}>
                    <View>
                        <Image
                            source={{ uri: `https://img.pokemondb.net/artwork/${title}.jpg` }}
                            style={styles.image}
                            resizeMode="contain"
                        />
                        <Text style={styles.title}>{title}</Text>
                    </View>
                </View>
            </Pressable>
        </View>
    );
};

export default PokemonCard;

const styles = StyleSheet.create({
    gridItem: {
        flex: 1,
        margin: 16,
        borderRadius: 8,
        overflow: Platform.OS === "android" ? "hidden" : "visible",
        backgroundColor: "white",
        elevation: 4,
        shadowColor: "black",
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
    },
    buttonPressed: {
        opacity: 0.5,
    },
    innerContainer: {
        borderRadius: 8,
        overflow: "hidden",
        paddingHorizontal: 8,
    },
    image: {
        width: "100%",
        height: 200,
    },
    title: {
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 18,
        margin: 8,
    },
});
