import React from "react";
import { FlatList, ListRenderItemInfo, StyleSheet } from "react-native";
import PokemonCard from "../components/PokemonCard";
import { POKEMONS } from "../data/dummy-data";

interface IPokemon {
    id: number;
    name: string;
    url: string;
}

interface PokemonsScreenProps {
    navigation: {
        navigate: (screen: string, params?: { pokemon: IPokemon }) => void;
    };
}

const PokemonsScreen: React.FC<PokemonsScreenProps> = ({ navigation }) => {
    function renderPokemonItem(itemData: ListRenderItemInfo<IPokemon>) {
        function pressHandler() {
            navigation.navigate("PokemonDetail", {
                pokemon: itemData.item,
            });
        }

        return <PokemonCard title={itemData.item.name} url={itemData.item.url} onPress={pressHandler} />;
    }

    return (
        <FlatList
            data={POKEMONS}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderPokemonItem}
            numColumns={2}
        />
    );
};

export default PokemonsScreen;

const styles = StyleSheet.create({});
