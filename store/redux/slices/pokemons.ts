import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../api";
import { LoadingTypes } from "@/types/loadingTypes";
import { IPokemons, InitStatePokemon } from "@/types/pokemonTypes";

// Constants
const initialState: InitStatePokemon = {
    pokemons: [],
    loading: LoadingTypes.init,
    error: null,
};
export const getPokemons = createAsyncThunk("pokemons/getPokemons", async (_, { rejectWithValue }) => {
    try {
        const response: IPokemons = await axiosInstance.get(`pokemon`);
        const customPokemon = {
            name: "gamzius",
            url: "",
        };
        return response.results;
        // return [...response.results, customPokemon]; // Append the custom object to the results
    } catch (error: any) {
        return error.response;
    }
});

export const pokemonsSlice = createSlice({
    name: "pokemons",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPokemons.pending, (state) => {
                state.loading = LoadingTypes.loading;
                state.error = null;
            })
            .addCase(getPokemons.fulfilled, (state, action) => {
                state.loading = LoadingTypes.loaded;
                state.pokemons = action.payload;
            })
            .addCase(getPokemons.rejected, (state, action) => {
                state.loading = LoadingTypes.loaded;
                state.error = action.payload as string;
            });
    },
});

export default pokemonsSlice.reducer;
