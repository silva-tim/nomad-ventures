import BlogPostForm from '../components/BlogPostForm';

export default function NewPostPage() {
  return (
    <div className="max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg m-auto">
      <BlogPostForm entry={undefined} />
    </div>
  );
}
