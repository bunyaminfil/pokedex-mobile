export type InitStatePokemon = {
    pokemons: [];
    loading: number;
};
export interface IPokemons {
    count: number;
    next: string | null;
    previous: string | null;
    results: { name: string; url: string }[];
}
