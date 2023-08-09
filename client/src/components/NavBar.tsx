import { useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { Link, Outlet, useLocation } from 'react-router-dom';
import LinkDrawer from './LinkDrawer';
import SignInSignUpModal from './SignInSignUpModal';
import { useUser } from './UserContext';

export default function NavBar() {
  const [sideIsOpen, setSideIsOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isSignIn, setIsSignIn] = useState(false);
  const { user } = useUser();
  const location = useLocation();

  return (
    <div>
      <header
        className={`sticky top-0 p-4 border-b w-full z-10 ${
          location.pathname !== '/' ? 'border-black' : 'border-white'
        }`}>
        <nav>
          <div className="flex items-center justify-between">
            <Link to="/">
              <span
                className={`text-xl font-inter ${
                  location.pathname !== '/' ? 'text-black' : 'text-white'
                }`}>
                NOMAD VENTURES
              </span>
            </Link>
            <div>
              {!user && (
                <div>
                  <button
                    type="button"
                    className="bg-green-400 rounded px-4 py-2 mx-2"
                    onClick={() => {
                      setIsSignIn(false);
                      setModalIsOpen(true);
                    }}>
                    Sign Up
                  </button>
                  <button
                    type="button"
                    className="bg-primary text-white rounded px-4 py-2"
                    onClick={() => {
                      setIsSignIn(true);
                      setModalIsOpen(true);
                    }}>
                    Sign In
                  </button>
                  {modalIsOpen && (
                    <SignInSignUpModal
                      onClose={() => setModalIsOpen(false)}
                      isSignIn={isSignIn}
                      changeToSignIn={() => setIsSignIn(!isSignIn)}
                    />
                  )}
                </div>
              )}
              {user && (
                <div className="hover:bg-secondary rounded-xl">
                  <AiOutlineMenu
                    onClick={() => setSideIsOpen(true)}
                    className="text-3xl cursor-pointer"
                  />
                </div>
              )}
            </div>
          </div>
          <LinkDrawer
            isOpen={sideIsOpen}
            onClick={() => setSideIsOpen(false)}
          />
        </nav>
      </header>
      <Outlet />
    </div>
  );
}
