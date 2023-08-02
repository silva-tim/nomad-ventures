import NavBar from './components/NavBar';
import { Route, Routes } from 'react-router-dom';
import NewPostPage from './pages/NewPostPage';
import BlogPostPage from './pages/BlogPostPage';
import { Entry } from './lib/types';

const entry: Entry = {
  title: 'What I Learned in China',
  subtitle: 'And what you could learn there too.',
  location: 'Sichuan, China',
  body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  url: 'https://images.unsplash.com/photo-1516545595035-b494dd0161e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0ODI3MzJ8MHwxfHNlYXJjaHw1fHxjaGluYXxlbnwwfDB8fHwxNjkwODQ2NDc4fDA&ixlib=rb-4.0.3&q=80&w=1080',
  photographer: 'Tim Silva',
  photographerURL: 'https://unsplash.com/@runninghead',
  alt: 'Test8',
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<NavBar />}>
        <Route index element={<BlogPostPage entry={entry} />} />
        <Route path="new-adventure" element={<NewPostPage />} />
        {/* <Route path="post/:id" element={<BlogPostPage entry={} />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
