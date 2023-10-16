import React, { useState, Suspense, lazy } from 'react';
import { useLocation } from 'react-router-dom';
import Spinner from '../Spinner';
import ItemsFilter from '../ItemsFilter';
import SearchBy from '../SearchBy';
import './index.css';
import { FILMS, PLANET, SEARCH_BY_FIELDS } from '../../constants';

const CharcatersList = lazy(() => import('../ItemsList'));

const Home = () => {
  const { state } = useLocation();  
  const [filters, setFilters] = useState<FiltersFields>({ 
    films: state?.filters?.films || '',
    planet: state?.filters?.planet || '',
  });
  const [searchByFields, setSearchByFields] = useState<string[]>(state?.searchBy || []);
  const [amoutOfCharacters, setAmoutOfCharacters] = useState(0);
  const [keyword, setKeyword] = useState(state?.keyword || '');

  const onSubmitHandler = (event: React.MouseEvent<HTMLFormElement>) => {
    event.preventDefault();
    setKeyword(event.currentTarget.keyword.value.trim().toLocaleLowerCase());
  };

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(!event.currentTarget.value) {
      setKeyword(event.currentTarget.value.trim().toLocaleLowerCase());
    }
  };

  return (
    <main className='outer-container'>
      <div className='filters-container'>
        <ItemsFilter value={filters.films || ''} title='Films' items={FILMS} onSelectedItem={setFilters} />
        <ItemsFilter  value={filters.planet || ''} title='Planet' items={PLANET} onSelectedItem={setFilters} />
      </div>
      <div className='main-container'>
        <h1 className='title'>
          <em>{amoutOfCharacters}</em> characters found.
        </h1>
        <div>
          <SearchBy value={state?.searchBy || []} title={'Search fields'} fields={SEARCH_BY_FIELDS} onSelectedFields={setSearchByFields} />
        </div>
        <form className='search-form' onSubmit={onSubmitHandler}>
          <label htmlFor='keyword' >type keyword</label>
          <input
            defaultValue={keyword}
            id='keyword'
            name='keyword'
            placeholder='type a keyword to find in selected search fields'
            onChange={onChangeHandler}
          />
          <button>Search</button>
        </form>
        <Suspense fallback={<Spinner />}>
          <CharcatersList
            keyword={keyword}
            filters={filters}
            searchBy= {searchByFields}
            onCharactersLoaded={setAmoutOfCharacters}
          />
        </Suspense>
        
      </div>
    </main>
  );
};

export default Home;
