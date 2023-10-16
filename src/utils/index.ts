export const itemsFilter = (
  items: MappedItemData[],
  keyword: string,
  filters: FiltersFields,
  searchBy: string[],
) => {
  let filtered: MappedItemData[] = items.map((item) => ({ ...item }));
  
  Object.keys(filters).forEach((filter) => {    
    filtered = filtered.filter((item) => {
      return filters[filter as keyof FiltersFields]
        ? item[filter as keyof FiltersFields].toLowerCase().includes(filters[filter as keyof FiltersFields].toLowerCase())
        : item;
    });
  });

  const getIsKeywordIncluded = (item: MappedItemData, keyword: string) => {
    let isKeywordIncluded = false;
    searchBy.forEach((field) => {
      isKeywordIncluded = isKeywordIncluded || item[field as keyof Searchers].toLowerCase().includes(keyword);
    });
    return isKeywordIncluded;
  };
  
  if(!keyword || !searchBy.length) {
    return filtered;
  }
  
  filtered = filtered.filter((item) => {
    return getIsKeywordIncluded(item, keyword);
  });

  return filtered;
};

export const charactersMapper = (reponseData: ResponseCharactersData): MappedCharactersData => {
  const rawCharacters = reponseData?.allPeople?.people || [];
  const pageInfo = reponseData?.allPeople?.pageInfo;

  const characters = rawCharacters.map((character) => {    
    return {
      id: character?.id,
      name: character?.name,
      films: character?.filmConnection?.films
            .map((film: { title: string }) => film.title)
            .join('|'),
      planet: character?.homeworld?.name?.toLowerCase(),
    };
  });

  return {
    characters,
    pageInfo,
  };
};

export const characterMapper = (reponseData: CharacterData): Omit<MappedItemData, "id"> => {
  const person: Omit<CharacterData, "id"> = reponseData;
  
  return {
    name: person?.name || '',
    species: person?.species?.name || '',
    films: (person?.filmConnection?.films || [])
      .map((film: { title: string }) => film.title)
      .join('|'),
    planet: person?.homeworld?.name || '',
  }
};
