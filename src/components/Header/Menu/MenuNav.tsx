import React from 'react';
import Menu from './Menu';

interface MenuNavProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function MenuNav({ setIsOpen }: MenuNavProps) {
  return (
    <nav className="hidden md:mx-4 md:flex items-center md:justify-center md:flex-row md:gap-12 md:text-xl md:my-6 md:pt-6 border-t border-t-solid border-t-[#052018]">
      <Menu setIsOpen={setIsOpen} />
    </nav>
  );
}

export default MenuNav;
