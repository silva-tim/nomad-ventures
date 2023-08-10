import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SignInSignUpModal from '../components/SignInSignUpModal';
import { useUser } from '../components/UserContext';

export default function HomePage() {
  const [isModal, setIsModal] = useState(false);
  const [isSignIn, setIsSignIn] = useState(false);
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/feed');
    }
  });

  return (
    <div className="w-full bg-center bg-cover h-screen flex-wrap flex justify-center items-center absolute top-0 bg-[url('https://images.unsplash.com/photo-1689631857988-a46ee3adf86b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1856&q=80')]">
      {isModal && (
        <SignInSignUpModal
          onClose={() => setIsModal(false)}
          isSignIn={isSignIn}
          changeToSignIn={() => setIsSignIn(!isSignIn)}
        />
      )}
      <div className="flex flex-wrap">
        <h1 className="text-4xl text-white font-lato font-bold tracking-widest basis-full text-center p-0 mb-5">
          WHAT'S YOUR ADVENTURE?
        </h1>
        <div className="basis-full text-center">
          <button
            onClick={() => setIsModal(true)}
            type="button"
            className="text-xl rounded py-3 px-5 bg-primary text-white">
            Get Started
          </button>
        </div>
        <div className="basis-full text-center">
          <Link to={'/feed'} className="text-white underline">
            Explore
          </Link>
        </div>
      </div>
      <span className="text-white text-sm absolute bottom-3 left-8">
        Photo by{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
          href="https://unsplash.com/@sirsimo?utm_source=nomad-ventures&utm_medium=referral">
          Sir. Simo
        </a>{' '}
        on{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
          href="https://unsplash.com/?utm_source=nomad-ventures&utm_medium=referral">
          Unsplash
        </a>
      </span>
    </div>
  );
}
