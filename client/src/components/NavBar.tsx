import { useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { Link, Outlet } from 'react-router-dom';
import LinkDrawer from './LinkDrawer';
import SignInSignUpModal from './SignInSignUpModal';

export default function NavBar() {
  const [sideIsOpen, setSideIsOpen] = useState(false);
  const [signIn, setSignIn] = useState(false);
  const [signUp, setSignUp] = useState(false);

  return (
    <div>
      <header className="sticky top-0 p-4 border-black bg-white border-b w-full z-10">
        <nav>
          <div className="flex items-center justify-between">
            <Link to="/">
              <span className="text-xl font-inter">NOMAD VENTURES</span>
            </Link>
            <div>
              <button
                type="button"
                className="bg-green-400 rounded px-4 py-2 mx-2"
                onClick={() => setSignIn(true)}>
                Sign Up
              </button>
              <button
                type="button"
                className="bg-primary text-white rounded px-4 py-2"
                onClick={() => setSignUp(true)}>
                Sign In
              </button>
              {signIn && (
                <SignInSignUpModal
                  onClose={() => setSignIn(false)}
                  signInStatus={false}
                />
              )}
              {signUp && (
                <SignInSignUpModal
                  onClose={() => setSignUp(false)}
                  signInStatus={true}
                />
              )}
              <div className="hover:bg-secondary rounded-xl">
                <AiOutlineMenu
                  onClick={() => setSideIsOpen(true)}
                  className="text-3xl cursor-pointer"
                />
              </div>
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
