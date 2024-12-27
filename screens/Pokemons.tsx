import React, { useEffect } from "react";
import { FlatList, ListRenderItemInfo, StyleSheet, View } from "react-native";
import { useAppDispatch, useAppSelector } from "@/store/redux/hook";
import { getPokemons } from "@/store/redux/slices/pokemons";
import PokemonCard from "../components/Cards/PokemonCard";
import { POKEMONS } from "../data/dummy-data";
import { RootState } from "@/store/redux";
import Header from "@/components/ui/Header";
import { BlueBackArrow, Menu } from "@/components/icons";

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
    // Get dispatch and state from Redux
    const dispatch = useAppDispatch();
    const { pokemons, loading } = useAppSelector((state: RootState) => state.pokemonsReducer);
    // Fetch pokemons when the component mounts
    useEffect(() => {
        dispatch(getPokemons()); // Dispatch the action to fetch pokemons
    }, [dispatch]);

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
            data={pokemons}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderPokemonItem}
            numColumns={2}
        />
    );
};

export default PokemonsScreen;

const styles = StyleSheet.create({});
