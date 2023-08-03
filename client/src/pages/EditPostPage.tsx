import { useLocation } from 'react-router-dom';
import BlogPostForm from '../components/BlogPostForm';

export default function EditPostPage() {
  const location = useLocation();

  return (
    <div className="max-w-screen-lg m-auto">
      <BlogPostForm entry={location.state.entry} />
    </div>
  );
}
