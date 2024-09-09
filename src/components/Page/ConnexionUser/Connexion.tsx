import React, { FormEvent, act, useEffect } from 'react';
import { User, Lock, XCircle, Info } from 'react-feather';
import { Link, useNavigate } from 'react-router-dom';
import Input from './ConnexionInput';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import userAction from '../../../store/thunks/userThunk';
import { actionChangeCredential } from '../../../store/reducers/user';

interface LoginFormProps {
  logged: boolean;
}

function Connexion({ logged }: LoginFormProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const email = useAppSelector((state) => state.user.credentials.email);
  const password = useAppSelector((state) => state.user.credentials.password);
  const loginError = useAppSelector((state) => state.user.error);

  const changeField = (value: string, name: 'email' | 'password') => {
    dispatch(
      actionChangeCredential({
        name,
        value,
      })
    );
  };

  const handleChangeField = (name: 'email' | 'password') => (value: string) => {
    changeField(value, name);
  };

  const goBack = () => {
    navigate(-1); // Navigue à l'emplacement précédent
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(userAction.actionCheckLogin());
  };

  useEffect(() => {
    if (logged) {
      navigate('/mon_jardin');
    }
  }, [logged, navigate]);

  return (
    <div className="flex flex-col justify-center rounded-lg items-center">
      <button type="button" className="self-end pr-10" onClick={goBack}>
        <XCircle size="40" />
      </button>
      <div className="w-5/6 md:w-3/5 shadow-3xl ">
        <form className="p-8 md:p-8" autoComplete="off" onSubmit={handleSubmit}>
          <div className="text-center font-bold text-3xl mb-6">Connexion</div>

          <div className="flex items-center mb-2 md:mb-4 b ">
            <User className="absolute ml-3 " />
            <Input
              type="text"
              placeholder="Email"
              onChange={handleChangeField('email')}
              value={email}
            />
          </div>
          <div className="flex items-center mb-4 md:mb-8">
            <Lock className="absolute ml-3" />
            <Input
              placeholder="Mot de passe"
              value={password}
              type="password"
              onChange={handleChangeField('password')}
            />
          </div>
          {loginError && (
            <div
              className="bg-red-100 border-t-4 border-red-600 rounded-b text-red-600 px-3 py-3 mb-6"
              role="alert"
            >
              <div className="rounded-lg" />
              <div>
                <Info className="absolute ml-2" />
                <p className="ml-10">{loginError}</p>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full px-6 py-3 rounded-full text-white bg-[#16A1AF] hover:text-white hover:bg-black focus:outline-none focus:ring-2 focus:ring-[#F6D50E] focus:ring-offset-2 mb-2 md:mb-4 b"
          >
            Continuer
          </button>

          <Link to="/inscription">
            <button
              type="button"
              className="w-full px-6 py-3 rounded-full bg-[#F6D50E] hover:text-white hover:bg-black focus:outline-none focus:ring-2 focus:ring-[#F6D50E] focus:ring-offset-2"
            >
              Créer un compte
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Connexion;
