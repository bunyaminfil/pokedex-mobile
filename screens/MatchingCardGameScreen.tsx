import React, { useEffect, useState } from "react";
import { Alert, FlatList, ListRenderItemInfo, StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { useAppDispatch, useAppSelector } from "@/store/redux/hook";
import { getPokemons } from "@/store/redux/slices/pokemons";
import PokemonCard from "../components/Cards/PokemonCard";
import { RootState } from "@/store/redux";
import { LoadingTypes } from "@/types/loadingTypes";
import LoadingOverlay from "@/components/ui/LoadingOverlay";
import ErrorOverlay from "@/components/ui/ErrorOverlay";

interface IPokemon {
    id: number;
    name: string;
    url: string;
}
interface IPokemonCard {
    id: number;
    name: string;
    isMatched: boolean;
}

interface IPlayerScores {
    player1: number;
    player2: number;
}

interface MatchingCardGameScreenProps {
    navigation: {
        navigate: (screen: string, params?: { pokemon: IPokemon }) => void;
    };
}

const MatchingCardGameScreen: React.FC<MatchingCardGameScreenProps> = ({ navigation }) => {
    // Get dispatch and state from Redux
    const dispatch = useAppDispatch();
    const [cards, setCards] = useState<IPokemonCard[]>([]);
    const [selectedCards, setSelectedCards] = useState<IPokemonCard[]>([]);
    const [playerScores, setPlayerScores] = useState<IPlayerScores>({
        player1: 0,
        player2: 0,
    });
    const [currentPlayer, setCurrentPlayer] = useState<"player1" | "player2">("player1");
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { pokemons, loading, error } = useAppSelector((state: RootState) => state.pokemonsReducer);

    const shuffleArray = <T,>(array: T[]): T[] => {
        return array.sort(() => Math.random() - 0.5);
    };
    const handleCardPress = (card: IPokemonCard) => {
        if (selectedCards.length < 2 && !card.isMatched && !selectedCards.includes(card)) {
            setSelectedCards((prev) => [...prev, card]);
        }
    };

    const resetGame = () => {
        dispatch(getPokemons(6));
        setSelectedCards([]);
        setPlayerScores({ player1: 0, player2: 0 });
        setCurrentPlayer("player1");
    };

    // Fetch pokemons when the component mounts
    useEffect(() => {
        dispatch(getPokemons(6)); // Dispatch the action to fetch pokemons
    }, [dispatch]);
    useEffect(() => {
        if (pokemons.length > 0) {
            const pokes = pokemons.map((pokemon: { name: string }, index: number) => ({
                id: index + 1,
                name: pokemon.name,
                isMatched: false,
            }));
            // Create pairs and assign unique IDs
            const pairedPokemon = shuffleArray(
                pokes.flatMap((pokemon: IPokemonCard, index) => [
                    { id: index * 2, name: pokemon.name, isMatched: false },
                    { id: index * 2 + 1, name: pokemon.name, isMatched: false },
                ]),
            );
            setCards(pairedPokemon);
        }
    }, [pokemons]);
    useEffect(() => {
        if (selectedCards.length === 2) {
            const [firstCard, secondCard] = selectedCards;

            if (firstCard.name === secondCard.name) {
                // If they match, update scores and set cards as matched
                setPlayerScores((prevScores) => ({
                    ...prevScores,
                    [currentPlayer]: prevScores[currentPlayer] + 1,
                }));
                setCards((prevCards) =>
                    prevCards.map((card) =>
                        card.id === firstCard.id || card.id === secondCard.id ? { ...card, isMatched: true } : card,
                    ),
                );
                setSelectedCards([]);
            } else {
                // If they don't match, switch turns
                setTimeout(() => {
                    setSelectedCards([]);
                    setCurrentPlayer((prev) => (prev === "player1" ? "player2" : "player1"));
                }, 1000);
            }
        }
    }, [selectedCards]);
    useEffect(() => {
        // Check if the game is over
        if (cards.length > 0 && cards.every((card) => card.isMatched)) {
            Alert.alert(
                "Game Over",
                `Player 1: ${playerScores.player1} points\nPlayer 2: ${playerScores.player2} points`,
                [{ text: "Play Again", onPress: resetGame }],
            );
        }
    }, [cards]);

    function renderPokemonItem(itemData: ListRenderItemInfo<IPokemon>) {
        function pressHandler() {
            navigation.navigate("PokemonDetail", {
                pokemon: itemData.item,
            });
        }

        return <PokemonCard title={itemData.item.name} url={itemData.item.url} onPress={pressHandler} />;
    }

    if (loading === LoadingTypes.loading) {
        return <LoadingOverlay />;
    }

    if (error) {
        return <ErrorOverlay message={error} />;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Pokémon Card Matching Game</Text>
            <Text style={styles.currentPlayer}>
                Current Player: {currentPlayer === "player1" ? "Player 1" : "Player 2"}
            </Text>
            <Text style={styles.scores}>
                Player 1: {playerScores.player1} | Player 2: {playerScores.player2}
            </Text>
            <View style={styles.cardsContainer}>
                {cards.map((card) => (
                    // <TouchableOpacity
                    //     key={card.id}
                    //     style={[styles.card, card.isMatched ? styles.matchedCard : null]}
                    //     onPress={() => handleCardPress(card)}
                    // >
                    //     <Text style={styles.cardText}>
                    //         {selectedCards.includes(card) || card.isMatched ? card.name.toUpperCase() : "❓"}
                    //     </Text>
                    // </TouchableOpacity>
                    <TouchableOpacity
                        key={card.id}
                        style={[styles.card, card.isMatched ? styles.matchedCard : null]}
                        onPress={() => handleCardPress(card)}
                    >
                        {selectedCards.includes(card) || card.isMatched ? (
                            <View style={styles.cardContent}>
                                <Image
                                    source={{ uri: `https://img.pokemondb.net/artwork/${card.name}.jpg` }}
                                    style={styles.pokemonImage}
                                    resizeMode="stretch"
                                />
                                {/* <Text style={styles.cardText}>{card.name.toUpperCase()}</Text> */}
                            </View>
                        ) : (
                            <Text style={styles.cardText}>❓</Text>
                        )}
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
    return (
        <FlatList
            data={pokemons}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderPokemonItem}
            numColumns={2}
        />
    );
};

export default MatchingCardGameScreen;

// const styles = StyleSheet.create({});
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f0f8ff",
        padding: 8,
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 20,
    },
    currentPlayer: {
        fontSize: 18,
        textAlign: "center",
        marginVertical: 10,
    },
    scores: {
        fontSize: 16,
        textAlign: "center",
        marginBottom: 20,
    },
    cardsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
    },
    card: {
        width: 100,
        height: 100,
        margin: 4,
        backgroundColor: "#add8e6",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    matchedCard: {
        borderColor: "#90ee90",
        backgroundColor: "#90ee90",
        padding: 4,
        borderWidth: 6,
    },
    cardContent: {
        justifyContent: "center",
        alignItems: "center",
    },
    pokemonImage: {
        width: 100,
        height: 100,
        // marginBottom: 5,
        borderRadius: 8,
    },
    cardText: {
        fontSize: 14,
        fontWeight: "bold",
    },
    loadingText: {
        fontSize: 18,
        marginTop: 10,
        textAlign: "center",
    },
    errorText: {
        fontSize: 18,
        color: "red",
        textAlign: "center",
        marginTop: 20,
    },
});
