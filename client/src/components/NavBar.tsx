import { useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { Link, Outlet } from 'react-router-dom';
import LinkDrawer from './LinkDrawer';

export default function NavBar() {
  const [sideIsOpen, setSideIsOpen] = useState(false);

  return (
    <div>
      <header className="sticky top-0 p-4 border-black bg-white border-b w-full z-10">
        <nav>
          <div className="flex justify-between">
            <Link to="/">
              <span className="text-xl font-inter">NOMAD VENTURES</span>
            </Link>
            <div className="hover:bg-secondary rounded-xl">
              <AiOutlineMenu
                onClick={() => setSideIsOpen(true)}
                className="text-3xl cursor-pointer"
              />
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
