import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tool } from 'react-feather';
import { useAppSelector, useAppDispatch } from '../../../hooks/redux';
import MaMeteo from './Meteo/Meteo';
import MesFavoris from './Favoris/MesFavoris';
import { Product } from '../../../@types/types';
import { fetchUserData } from '../../../store/thunks/myGardenThunks';
import PotagerVirtuel from './PotagerVirtuel/PotagerVirtuel';
import Loader from '../../Loader/Loader';
import Alerte from './Meteo/Alerte';
import ErrorNotif from '../../ErrorNotif/ErrorNotif';
import GestionAlertes from './GestionAlertes/GestionAlertes';

interface MonJardinProps {
  logged: boolean;
  allFavProducts: Product[];
}

function MonJardin({ logged, allFavProducts }: MonJardinProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isPotagerVirtuel, setIsPotagerVirtuel] = useState(false);
  const [alertes, setAlertes] = useState({
    rain: false,
    hot: false,
    thunderstorm: false,
    isForecastAlertActive: false,
    isWateringAlertActive: false,
  });

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  const { userData } = useAppSelector((state) => state.myGarden);
  const { weatherForecast } = useAppSelector((state) => state.meteo);
  const { loading, error } = useAppSelector((state) => state.myGarden);

  useEffect(() => {
    setAlertes({
      rain: weatherForecast.some((forecast) => forecast.rain),
      hot: weatherForecast.some((forecast) => forecast.temp > 30),
      thunderstorm: weatherForecast.some((forecast) => forecast.thunderstorm),
      isForecastAlertActive: userData.forecastAlert,
      isWateringAlertActive: userData.wateringAlert,
    });
  }, [weatherForecast, userData.forecastAlert, userData.wateringAlert]);


  if (loading) return <Loader />;
  if (error) return <ErrorNotif error={error} />;

  return (
    <div className={`${loading ? 'opacity-20' : ''}`}>
      <div className="w-full p-4">
        <div className="flex flex-col md:flex-row justify-around py-4 gap-4 ">
          <button
            type="button"
            className={`w-full md:w-auto text-center hover:font-[800] px-16 py-3 rounded-full border border-2 border-[#16A1AF]  focus:outline-none focus:ring-2 focus:ring-[#16A1AF] focus:ring-offset-2 ${
              !isPotagerVirtuel
                ? 'bg-[#16A1AF] text-white'
                : 'bg-white text-[#16A1AF]'
            }`}
            onClick={() => setIsPotagerVirtuel(false)}
          >
            Mon tableau de bord
          </button>

          <button
            type="button"
            className={`w-full md:w-auto text-center hover:font-[800] px-16 py-3 rounded-full border border-2 border-[#7AC808]  focus:outline-none focus:ring-2 focus:ring-[#7AC808] focus:ring-offset-2 ${
              isPotagerVirtuel
                ? 'bg-[#7AC808] text-white'
                : 'bg-white text-[#7AC808]'
            }`}
            onClick={() => setIsPotagerVirtuel(true)}
          >
            Mon Jardin virtuel
          </button>
        </div>

        {!isPotagerVirtuel && (
          <>
            <h1 className="text-center">Bienvenue {userData.firstname} !</h1>
            <div className="flex flex-col md:flex-row md:justify-between rounded-lg gap-6 -m-4 my-4 py-4 px-4">
              <div className="flex flex-col rounded-lg shadow-lg border border-gray-200 p-4 md:w-1/4 bg-[#16A1AF]">
                <div className="flex flex-row justify-between">
                  <h2 className="font-bold text-white text-center">
                    Mes alertes
                  </h2>
                  <button
                    className={`rounded-full text-white ${
                      isSettingsOpen && 'bg-white text-[#16A1AF] p-1'
                    }`}
                    type="button"
                    onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                  >
                    <Tool
                      className={`rounded-full ${
                        isSettingsOpen && 'text-[#16A1AF] p-0.5'
                      }`}
                    />
                  </button>
                </div>

                {alertes.isForecastAlertActive && <Alerte {...alertes} />}
                {isSettingsOpen && <GestionAlertes />}
              </div>
              <MaMeteo userData={userData} />
            </div>
            <MesFavoris allFavProducts={allFavProducts} />
          </>
        )}

        {isPotagerVirtuel && <PotagerVirtuel />}
      </div>
    </div>
  );
}

export default MonJardin