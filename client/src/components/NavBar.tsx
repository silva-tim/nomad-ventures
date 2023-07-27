import { useState } from 'react';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { Link } from 'react-router-dom';

export default function NavBar() {
  const [sideOpen, setSideOpen] = useState(false);

  return (
    <div>
      <nav>
        {sideOpen && (
          <div className="absolute top-0 right-0 bg-gray-400 h-screen">
            <div>
              <AiOutlineClose onClick={() => setSideOpen(false)} />
              <Link to="/">
                <span>Home</span>
              </Link>
              <Link to="/">
                <span>New Post</span>
              </Link>
              <Link to="/">
                <span>My Profile</span>
              </Link>
            </div>
          </div>
        )}
        <div className="flex justify-between p-5 border-black border-b">
          <Link to="/">
            <span className="text-xl">NOMAD VENTURES</span>
          </Link>
          <AiOutlineMenu
            onClick={() => setSideOpen(true)}
            className="text-2xl"
          />
        </div>
      </nav>
    </div>
  );
}
