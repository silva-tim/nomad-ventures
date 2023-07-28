import { Link } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';

type props = {
  isOpen: boolean;
  onClick: VoidFunction;
};

export default function LinkDrawer({ isOpen, onClick }: props) {
  return (
    <>
      {isOpen && (
        <div className="absolute top-0 left-0 flex w-full">
          <div onClick={onClick} className="basis-4/5 bg-opacity-40 bg-black" />
          <div className="bg-primary text-white font-roboto h-screen basis-1/5 p-5">
            <div className="flex justify-end">
              <AiOutlineClose
                onClick={onClick}
                className="text-3xl cursor-pointer hover:text-gray-500"
              />
            </div>
            <div className="flex flex-wrap">
              <div className="basis-full pt-5 ps-2">
                <Link to="/">
                  <span
                    onClick={onClick}
                    className="text-2xl hover:text-gray-500">
                    Home
                  </span>
                </Link>
              </div>
              <div className="basis-full pt-5 ps-2">
                <Link to="new-adventure">
                  <span
                    onClick={onClick}
                    className="text-2xl hover:text-gray-500">
                    New Post
                  </span>
                </Link>
              </div>
              <div className="basis-full pt-5 ps-2">
                <Link to="/">
                  <span
                    onClick={onClick}
                    className="text-2xl hover:text-gray-500">
                    My Profile
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
