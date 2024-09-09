import React from 'react';
import ConnexionBtn from './ConnexionBtn';

interface ConnexionBtnBurgerProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function ConnexionBtnBurger({ setIsOpen }: ConnexionBtnBurgerProps) {
  return (
    <div className="md:hidden pt-6">
      <ConnexionBtn setIsOpen={setIsOpen} />
    </div>
  );
}

export default ConnexionBtnBurger;
