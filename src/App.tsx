import { 
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';

import Home from './components/Home';
import Character from './components/Character';
import { client } from './lib/apollo';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path='/characters' element={<Home />} />
          <Route path='/characters/:id' element={<Character />} />
          <Route path='*' element={<Home />} />
        </Routes>
      </Router>
    </ApolloProvider>        
  );
};

export default App;
