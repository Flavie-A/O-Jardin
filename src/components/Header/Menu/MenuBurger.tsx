import React from 'react';
import { XCircle } from 'react-feather';
import Menu from './Menu';
import ConnexionBurger from '../ConnexionBtn/ConnexionBtnBurger';

interface MenuBurgerProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function MenuBurger({ isOpen, setIsOpen }: MenuBurgerProps) {
  return (
    <nav className="absolute z-40 min-h-max w-full p-6 my-6 flex flex-col items-center bg-white text-2xl md:hidden">
      <button
        className="self-end		"
        type="button"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <XCircle size="40" />
      </button>

      <Menu setIsOpen={setIsOpen} />
      <ConnexionBurger setIsOpen={setIsOpen} />
    </nav>
  );
}

export default MenuBurger;
