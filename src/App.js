import NavBar from './components/NavBar';
import './App.css';
import Banner from './components/Banner';
import RowPost from './components/RowPost';
import {Routes,Route} from 'react-router-dom'
import { originals,actions,ComedyMovies,HorrorMovies,RomanceMovies } from './urls'
import Account from './components/Account';
import Search from './components/Search';

function App() {
  return ( 
  <div className='App'>
     <NavBar/>
  <Routes>
  <Route path="/"
          element={
            <>
              <Banner />
              <RowPost url={originals} title="Netflix Originals" />
              <RowPost url={actions} title="Actions" isSmall />
              <RowPost url={RomanceMovies} title="Romantic" isSmall />
              <RowPost url={ComedyMovies} title="Comedy" isSmall />
              <RowPost url={HorrorMovies} title="Horror" isSmall />
            </>
          }
        />

  <Route path='/account' element={<Account/>}/>
  <Route path='/search' element={<Search/>}/>
  </Routes>
  </div>
  );
}

export default App;
