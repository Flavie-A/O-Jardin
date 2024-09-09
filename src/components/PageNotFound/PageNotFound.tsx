import React from 'react';
import { Info } from 'react-feather';
import oops from '../../assets/NotFound.gif';

function PageNotFound() {
  return (
    <>
      <div className="w-1/2 md:w-1/2  mx-auto bg-red-100 border-t-4 border-red-600 rounded-b text-red-600 px-3 py-3 mt-6">
        <div className="rounded-lg" />
        <div>
          <Info className="absolute ml-2" />
          <p className="ml-10">Page introuvable</p>
        </div>
      </div>
      <img
        src={oops}
        className="w-1/2 md:w-1/2 mx-auto pb-6"
        alt="Page introuvable (erreur 404)"
      />
      <span className="sr-only">Oups, rien ne pousse par ici... !</span>
    </>
  );
}

export default PageNotFound;
