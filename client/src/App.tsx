import NavBar from './components/NavBar';
import { Route, Routes } from 'react-router-dom';
import NewPost from './pages/NewPost';

function App() {
  return (
    <Routes>
      <Route path="/" element={<NavBar />}>
        <Route path="new-adventure" element={<NewPost />} />
      </Route>
    </Routes>
  );
}

export default App;
