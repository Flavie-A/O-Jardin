import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu as Burger } from 'react-feather';
import ConnexionDesktop from './ConnexionBtn/ConnexionBtnDesktop';
import MenuNav from './Menu/MenuNav';
import MenuBurger from './Menu/MenuBurger';

import logo from '../../assets/logo.png';

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="relative mb-6 md:mb-2">
      <ConnexionDesktop setIsOpen={setIsOpen} />
      <div className="md:hidden absolute w-full">
        <button
          className="rounded-full w-5/6"
          type="button"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          {isOpen ? (
            <span className="absolute py-2 px-2 top-6 right-6 rounded-lg text-white bg-[#F6D50E]">
              <Burger size="40" />
            </span>
          ) : (
            <span className="absolute py-2 px-2 top-6 right-6">
              <Burger size="40" />
            </span>
          )}
        </button>
      </div>
      <NavLink
        className=""
        to="/"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <img
          src={logo}
          className="w-1/2 mx-auto md:w-64 pt-6"
          alt="logo O'Jardin"
        />
      </NavLink>

      {isOpen ? <MenuBurger isOpen={isOpen} setIsOpen={setIsOpen} /> : ''}
      <MenuNav setIsOpen={setIsOpen} />
    </header>
  );
}

export default Header;
