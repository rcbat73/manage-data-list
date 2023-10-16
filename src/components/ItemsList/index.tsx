import React, { useEffect } from 'react';
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { 
  Link,
} from 'react-router-dom';


import { useFecthItems } from '../../hooks';
import './index.css';

interface CharactersProps {
  keyword: string;
  filters: FiltersFields;
  searchBy: string[];
  onCharactersLoaded: React.Dispatch<React.SetStateAction<number>>;
}

const ItemsList = ({ keyword, filters, searchBy, onCharactersLoaded }: CharactersProps) => {
  const { characters, loading, loadMore, hasNextPage } = useFecthItems(keyword, filters, searchBy);
  const charactersAmount = hasNextPage ? characters.length + 1 : characters.length;
  
  useEffect(() => {
    onCharactersLoaded(characters?.length || 0);
  }, [characters?.length, onCharactersLoaded]);

  const Item = ({ index, style }: { index: number; style: any }) => {
    const character = characters[index];

    return (
      <>
        {
          character?.id && 
          <Link
            to={`/characters/${character?.id}`}
            style={style}
            className='item-container'
            state={{ keyword, filters, searchBy }}
          >
            <div className='item-text'>
              <p>{character?.name}</p>
            </div>
          </Link>
        }
      </>
      
    );
  };

  return (
    <>
      <div className="items-list">
        <AutoSizer>
          {({height, width}: Record<'height' | 'width', number>) => (
            <List
              height={height}
              itemCount={charactersAmount}
              itemSize={40}
              width={width}>
                {Item}
            </List>
          )}
        </AutoSizer>
      </div>
      <div className="loadMoreBtn-container">
        <button type="button" onClick={() => { loadMore && loadMore() }}>Load more data</button>
      </div>      
    </>
  );
};

export default ItemsList;
