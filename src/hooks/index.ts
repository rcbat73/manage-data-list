import { useQuery } from "@apollo/client";

import { charactersQuery, characterQuery } from '../queries';
import { charactersMapper, itemsFilter, characterMapper } from '../utils';
import { DATA_PAGE_SiZE } from '../constants';

const getDataVariables = (endCursor: string) => ({
    first: DATA_PAGE_SiZE,
    after: endCursor,  
});

export const useFecthItems = (
  keyword: string,
  filters: FiltersFields,
  searchBy: string[],
) => {
  const { data, loading, fetchMore } = useQuery(charactersQuery, {
    variables: getDataVariables(""),
    notifyOnNetworkStatusChange: true,
  });

  if (loading && !data?.allPeople?.people) {     
    return { loading, characters: [] };
  }

  const loadMore = () => {
    return fetchMore({
      query: charactersQuery,
      variables: getDataVariables(data?.allPeople?.pageInfo?.endCursor),
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const characters = fetchMoreResult?.allPeople;
        const newCharacters = characters?.people;
        const pageInfo = characters?.pageInfo;

        return newCharacters.length
          ? {
              allPeople: {
                people: [...previousResult?.allPeople?.people, ...newCharacters],
                pageInfo,
              }
            }
          : previousResult;
      },
    });
  };
  
  const mappedCharacters = charactersMapper(data);  
  const filteredCharacters = itemsFilter(mappedCharacters.characters, keyword, filters, searchBy);

  return {
    characters: filteredCharacters || [],
    hasNextPage: mappedCharacters?.pageInfo?.hasNextPage,
    loading,
    loadMore,
  };
};

export const useFecthItem = (id = '') => {  
  const { data, loading, error } = useQuery(characterQuery, {
    variables: { id },
    notifyOnNetworkStatusChange: true,
  });

  const character = data?.person;
  if (loading && !character) {     
    return { loading, character: null };
  }

  const mappedCharacter = characterMapper(character);

  return {
    loading,
    character: mappedCharacter,
    error,
  };
};
