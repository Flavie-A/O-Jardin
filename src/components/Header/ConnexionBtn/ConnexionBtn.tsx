import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Settings } from 'react-feather';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { actionLogOut } from '../../../store/reducers/user';
import { removeTokenJwtFromAxiosInstance } from '../../../axios/axios';

interface ConnexionBtnProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function ConnexionBtn({ setIsOpen }: ConnexionBtnProps) {
  const isLogged = useAppSelector((state) => state.user.logged);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <div className="flex flex-row">
      <div>
        {isLogged && (
          <NavLink
            to="/gestion_profil"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            <button
              className="px-6 py-3 rounded-full text-black "
              type="button"
            >
              <Settings />
            </button>
          </NavLink>
        )}
      </div>
      <div>
        {isLogged && (
          <button
            className="px-6 py-3 rounded-full bg-black text-white focus:outline-none focus:ring-2 focus:ring-[#F6D50E] focus:ring-offset-2"
            type="button"
            onClick={(event) => {
              event.preventDefault();
              setIsOpen(false);
              dispatch(actionLogOut());
              removeTokenJwtFromAxiosInstance();
              // localStorage.removeItem('token');
              navigate('/');
            }}
          >
            Déconnexion
          </button>
        )}
      </div>
      {!isLogged && (
        <NavLink
          to="/connexion"
          onClick={() => {
            setIsOpen(false);
          }}
        >
          <button
            className="px-6 py-3 rounded-full bg-[#F6D50E] hover:text-white hover:bg-black focus:outline-none focus:ring-2 focus:ring-[#F6D50E] focus:ring-offset-2"
            type="button"
          >
            Connexion / Inscription
          </button>
        </NavLink>
      )}
    </div>
  );
}

export default ConnexionBtn;
