import NavBar from './components/NavBar';
import { Route, Routes } from 'react-router-dom';
import NewPostPage from './pages/NewPostPage';
import BlogPostPage from './pages/BlogPostPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<NavBar />}>
        {/* <Route index element={<BlogPostPage entry={entry} />} /> */}
        <Route path="new-adventure" element={<NewPostPage />} />
        <Route path="post/:id" element={<BlogPostPage />} />
      </Route>
    </Routes>
  );
}

export default App;
