import NavBar from './components/NavBar';
import { Route, Routes } from 'react-router-dom';
import NewPostPage from './pages/NewPostPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<NavBar />}>
        <Route path="new-adventure" element={<NewPostPage />} />
      </Route>
    </Routes>
  );
}

export default App;
