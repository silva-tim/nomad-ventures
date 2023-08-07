// import { FormEvent, useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

type props = {
  onClose: () => void;
  signInStatus: boolean;
};

export default function SignInSignUpModal({ onClose, signInStatus }: props) {
  // const [error, setError] = useState<unknown>();

  return (
    <div className="fixed top-0 left-0 bg-black bg-opacity-40 w-full h-full z-20">
      <div className="relative top-1/4 left-1/3 bg-white text-primary w-1/3 rounded">
        <div className="flex justify-end">
          <AiOutlineClose
            onClick={onClose}
            className="text-xl mt-3 mr-3 cursor-pointer"
          />
        </div>
        <div className="text-center pt-2">
          <span className="text-2xl">
            {signInStatus ? 'Sign In' : 'Sign Up'}
          </span>
        </div>
        <form
          className="py-3"
          // onSubmit={signInStatus ? handleSignIn : handleSignUp}
        >
          <div className="flex flex-wrap">
            <div className="basis-full py-4 px-6">
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                className="outline-0 text-xl p-2 w-full border-gray-300 border-b"
              />
            </div>
            <div className="basis-full py-4 px-6">
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className="outline-0 text-xl p-2 w-full border-gray-300 border-b"
              />
            </div>
          </div>
          <div className="flex justify-around pt-7 pb-3">
            <button type="submit" className="bg-green-400 py-3 px-7 w-96">
              {signInStatus ? 'Sign In' : 'Sign Up'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
