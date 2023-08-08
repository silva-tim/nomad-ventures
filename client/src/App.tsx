import NavBar from './components/NavBar';
import { Route, Routes } from 'react-router-dom';
import NewPostPage from './pages/NewPostPage';
import BlogPostPage from './pages/BlogPostPage';
import Feed from './pages/Feed';
import EditPostPage from './pages/EditPostPage';
import ProfilePage from './pages/ProfilePage';
import UserContext from './components/UserContext';
import { useEffect, useState } from 'react';
import { Auth, User } from './lib/types';

function App() {
  const [user, setUser] = useState<User>();
  const [token, setToken] = useState<string>();

  useEffect(() => {
    const auth = localStorage.getItem('tokenKey');
    if (auth) {
      const a = JSON.parse(auth);
      setUser(a.user);
      setToken(a.token);
    }
  }, []);

  function handleSignIn(auth: Auth) {
    sessionStorage.setItem('tokenKey', JSON.stringify(auth));
    setUser(auth.user);
    setToken(auth.token);
  }

  const contextValue = { user, token, handleSignIn };
  return (
    <UserContext.Provider value={contextValue}>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<Feed />} />
          <Route path="new-adventure" element={<NewPostPage />} />
          <Route path="edit-adventure" element={<EditPostPage />} />
          <Route path="post/:entryId" element={<BlogPostPage />} />
          <Route path="profiles/:username" element={<ProfilePage />} />
        </Route>
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
