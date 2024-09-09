import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Page from '../Page/Page';

import { getTokenFromLocalStorage } from '../../localStorage/localstorage';
import { actionLogIn } from '../../store/reducers/user';
import { addTokenToAxiosInstance } from '../../axios/axios';
import fetchAllProducts from '../../store/thunks/productThunks';
import fetchAllTutorials from '../../store/thunks/tutorielsThunk';
import Loader from '../Loader/Loader';
import { fetchUserData } from '../../store/thunks/myGardenThunks';
import { getTokenfromCookies } from '../../cookies/cookies';

function App() {
  const dispatch = useAppDispatch();

  const loadingProducts = useAppSelector((state) => state.products.loading);
  const loadingTutos = useAppSelector((state) => state.tutoriels.loading);

  useEffect(() => {
    const token  = getTokenfromCookies();
    // console.log("cook",token)
    if (token) {
      dispatch(actionLogIn({ token }));
      addTokenToAxiosInstance(token);
      dispatch(fetchUserData());
    } else {
      console.log('empty localstorage');
    }
  }, []);

  useEffect(() => {
    dispatch(fetchUserData());
    dispatch(fetchAllProducts());
    dispatch(fetchAllTutorials());
  }, [dispatch]);

  return (
    <>
      {loadingTutos && loadingProducts && <Loader />}

      <div
        className={`flex flex-col justify-between min-h-screen bg-[#f9f9f9] ${
          loadingTutos && loadingProducts ? 'opacity-20' : ''
        }`}
      >
        <Header />
        <div className="w-full md:w-5/6 md:mx-auto flex-1">
          <Page />
        </div>
        <Footer />
      </div>
    </>
  );
}
export default App;
