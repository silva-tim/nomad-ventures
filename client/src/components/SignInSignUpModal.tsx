import { FormEvent, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useUser } from './UserContext';

type props = {
  onClose: () => void;
  isSignIn: boolean;
  changeToSignIn: () => void;
};

export default function SignInSignUpModal({
  onClose,
  isSignIn,
  changeToSignIn,
}: props) {
  const [error, setError] = useState<unknown>();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [successfulSignUp, setSuccessfulSignUp] = useState(false);
  const { onSignIn } = useUser();

  async function handleSignUp(event: FormEvent) {
    event.preventDefault();
    try {
      const userInfo = { username, password };
      const req = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo),
      };
      const res = await fetch('/api/sign-up', req);
      if (!res.ok) {
        throw new Error(`fetch Error ${res.status}`);
      }
      setUsername('');
      setPassword('');
      setSuccessfulSignUp(true);
    } catch (err) {
      setError(err);
    }
  }

  async function handleSignIn(event: FormEvent) {
    event.preventDefault();
    try {
      const userInfo = { username, password };
      const req = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo),
      };
      const res = await fetch('/api/sign-in', req);
      if (!res.ok) {
        throw new Error(`fetch Error ${res.status}`);
      }
      const auth = await res.json();
      onSignIn(auth);
      setUsername('');
      setPassword('');
      onClose();
    } catch (err) {
      setError(err);
    }
  }

  if (error) {
    return (
      <div>
        {error instanceof Error ? error.message : JSON.stringify(error)}
      </div>
    );
  }

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
            {isSignIn ? 'Sign In' : successfulSignUp ? 'Success!' : 'Sign Up'}
          </span>
        </div>
        {successfulSignUp ? (
          <div className="flex justify-around pt-7 pb-5">
            <button
              type="button"
              onClick={() => {
                changeToSignIn();
                setSuccessfulSignUp(false);
              }}
              className="py-3 px-7 w-96 bg-primary text-white">
              Continue to Sign In
            </button>
          </div>
        ) : (
          <form
            className="py-3"
            onSubmit={isSignIn ? handleSignIn : handleSignUp}
            autoComplete="off">
            <div className="flex flex-wrap">
              <div className="basis-full py-4 px-6">
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="outline-0 text-xl p-2 w-full border-gray-300 border-b"
                />
              </div>
              <div className="basis-full py-4 px-6">
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="outline-0 text-xl p-2 w-full border-gray-300 border-b"
                />
              </div>
            </div>
            <div className="flex justify-around pt-7 pb-3">
              <button
                type="submit"
                className={`py-3 px-7 w-96 ${
                  isSignIn ? 'bg-primary text-white' : 'bg-green-400'
                } `}>
                {isSignIn ? 'Sign In' : 'Sign Up'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
