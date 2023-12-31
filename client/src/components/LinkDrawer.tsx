import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';
import { useUser } from './UserContext';

type props = {
  isOpen: boolean;
  onClick: VoidFunction;
};

export default function LinkDrawer({ isOpen, onClick }: props) {
  const { user, onSignOut } = useUser();
  const navigate = useNavigate();

  function handleSignOut() {
    onSignOut();
    onClick();
    navigate('/');
  }

  return (
    <>
      {isOpen && (
        <div className="absolute top-0 left-0 flex w-full">
          <div
            onClick={onClick}
            className="lg:basis-4/5 md:basis-2/3 bg-opacity-40 bg-black"
          />
          <div className="bg-primary text-white font-roboto h-screen basis-full md:basis-1/3 lg:basis-1/5 p-5">
            <div className="flex justify-end">
              <AiOutlineClose
                onClick={onClick}
                className="text-3xl cursor-pointer hover:text-tertiary"
              />
            </div>
            <div className="flex flex-wrap">
              <div className="basis-full pt-5 ps-2">
                <Link to="/">
                  <span
                    onClick={onClick}
                    className="text-2xl hover:text-tertiary">
                    Home
                  </span>
                </Link>
              </div>
              <div className="basis-full pt-5 ps-2">
                <Link to="/new-adventure">
                  <span
                    onClick={onClick}
                    className="text-2xl hover:text-tertiary">
                    New Post
                  </span>
                </Link>
              </div>
              <div className="basis-full pt-5 ps-2">
                <Link to={`/profiles/${user?.username}`}>
                  <span
                    onClick={onClick}
                    className="text-2xl hover:text-tertiary">
                    My Profile ({user?.username})
                  </span>
                </Link>
              </div>
              <div className="basis-full pt-5 ps-2">
                <span
                  onClick={handleSignOut}
                  className="text-2xl hover:text-tertiary cursor-pointer">
                  Sign Out
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
