interface CharacterData {
  id: string;
  name: string;
  species: { name: string };
  filmConnection: {
    films: { title: string }[]
  }
  homeworld: { name: string };
}

type CharacterKeys = "films" | "planet";

interface PageInfo {
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  startCursor: string;
  endCursor: string;
}

interface ResponseCharactersData {
  allPeople: {
    people: CharacterData[];
    pageInfo: PageInfo;
  }
}

interface ResponseCharacterData {
  person: Omit<CharacterData, "id">;
}

interface MappedItemData {
  id: string;
  name: string;
  species?: string;
  films: string;
  planet: string;
}

interface MappedCharactersData {
  characters: MappedItemData[];
  pageInfo: PageInfo;
}

interface Filter {
  label: string;
  title: string;
}

interface FiltersFields {
  films: string;
  planet: string;
}

interface Searchers extends Filters {
  name: string;
}
