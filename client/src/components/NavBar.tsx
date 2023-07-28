import { useState } from 'react';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { Link } from 'react-router-dom';

export default function NavBar() {
  const [sideOpen, setSideOpen] = useState(false);

  return (
    <div>
      <nav>
        {sideOpen && (
          <div className="absolute top-0 right-0 bg-primary text-white font-roboto h-screen w-1/5 p-5">
            <div className="flex justify-end">
              <AiOutlineClose
                onClick={() => setSideOpen(false)}
                className="text-3xl cursor-pointer hover:text-gray-200"
              />
            </div>
            <div className="flex flex-wrap">
              <div className="basis-full pt-5 ps-2">
                <Link to="/">
                  <span className="text-2xl">Home</span>
                </Link>
              </div>
              <div className="basis-full pt-5 ps-2">
                <Link to="/">
                  <span className="text-2xl">New Post</span>
                </Link>
              </div>
              <div className="basis-full pt-5 ps-2">
                <Link to="/">
                  <span className="text-2xl">My Profile</span>
                </Link>
              </div>
            </div>
          </div>
        )}
        <div className="flex justify-between p-5 border-black border-b">
          <Link to="/">
            <span className="text-xl font-inter">NOMAD VENTURES</span>
          </Link>
          <AiOutlineMenu
            onClick={() => setSideOpen(true)}
            className="text-2xl cursor-pointer"
          />
        </div>
      </nav>
    </div>
  );
}
