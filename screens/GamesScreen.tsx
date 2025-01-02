import React from "react";
import { FlatList, ListRenderItemInfo, StyleSheet } from "react-native";
import GameCard from "../components/Cards/GameCard";
import { games } from "@/data";
import { ImageSourcePropType } from "react-native";

interface IPokemon {
    id: number;
    title: string;
    url: ImageSourcePropType;
}

interface GamesScreenProps {
    navigation: {
        navigate: (screen: string, params?: { pokemon: IPokemon }) => void;
    };
}

const GamesScreen: React.FC<GamesScreenProps> = ({ navigation }) => {
    function renderPokemonItem(data: ListRenderItemInfo<IPokemon>) {
        function pressHandler() {
            navigation.navigate("MatchingCardGame");
        }
        return <GameCard title={data.item.title} url={data.item.url} onPress={pressHandler} />;
    }

    return (
        <FlatList
            data={games}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderPokemonItem}
            numColumns={1}
        />
    );
};

export default GamesScreen;

const styles = StyleSheet.create({});
