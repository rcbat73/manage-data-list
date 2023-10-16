import {
  useParams,
  useLocation,
  Link,
} from 'react-router-dom';

import Spinner from '../Spinner';
import { useFecthItem } from '../../hooks';
import './index.css';

const Character = () => {
  const { id } = useParams();
  const { state: { keyword, filters, searchBy }} = useLocation();
  
  const { loading, character, error } = useFecthItem(id);

  if(loading) {
    return <Spinner />;
  }

  return (
    <main className='container'>
      <Link
        to='/characters'
        className='back-link'
        state={{ keyword , filters, searchBy }}
      >
        back to search results
      </Link>
      <div className='character-container'>
        <div className='character-info'>
          <h1>{character?.name}</h1>
          <p className ='common'>{character?.species && `Species ${character?.species}`}</p>
          <p className='common'>{character?.planet && `Palnet ${character?.planet}`}</p>
          <p className='common'>Films</p>
          <ul className='common'>
            {
              character?.films.split('|').map((film) => {
                return (
                  <li key={film}>- {film}</li>
                );
              })
            }
          </ul>
        </div>        
      </div>
    </main>
  );
};

export default Character;
