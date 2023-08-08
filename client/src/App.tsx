import NavBar from './components/NavBar';
import { Route, Routes } from 'react-router-dom';
import NewPostPage from './pages/NewPostPage';
import BlogPostPage from './pages/BlogPostPage';
import Feed from './pages/Feed';
import EditPostPage from './pages/EditPostPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<NavBar />}>
        <Route index element={<Feed />} />
        <Route path="new-adventure" element={<NewPostPage />} />
        <Route path="edit-adventure" element={<EditPostPage />} />
        <Route path="post/:entryId" element={<BlogPostPage />} />
        <Route path="profiles/:username" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
}

export default App;
