export type InitStatePokemon = {
    pokemons: [];
    loading: number;
    error: null | string;
};
export interface IPokemons {
    count: number;
    next: string | null;
    previous: string | null;
    results: { name: string; url: string }[];
}
