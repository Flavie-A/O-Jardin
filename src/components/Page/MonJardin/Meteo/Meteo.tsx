import React, { useEffect } from 'react';
import fetchMeteo from '../../../../store/thunks/meteoThunk';
import { useAppSelector, useAppDispatch } from '../../../../hooks/redux';
import { User } from '../../../../@types/types';

interface MeteoProps {
  userData: User;
}
function MaMeteo({ userData }: MeteoProps) {
  const dispatch = useAppDispatch();
  const meteo = useAppSelector((state) => state.meteo);
  const { zip_code, city } = userData;

  useEffect(() => {

    if (zip_code || city) {
      const location: { zipCode?: string; cityName?: string } = {};
      if (zip_code) {
        location.zipCode = zip_code;
      } else if (city) {
        location.cityName = city;
      }
      dispatch(fetchMeteo(location));
    }
  }, [dispatch, zip_code, city]);


  return (
    <div className="rounded-lg shadow-lg border border-gray-200 p-4 md:w-3/4 bg-gray-200 ">
      {meteo && meteo.name ? (
        <div>
          <h2 className="font-bold text-center">Météo à {meteo.name}</h2>
          <div className="flex flex-wrap justify-around">
            {meteo.weatherForecast.map((dailyWeather) => (
              <div key={dailyWeather.date}>
                <p>{dailyWeather.date}</p>
                <p>{dailyWeather.temp}°C</p>
                <img
                  src={`http://openweathermap.org/img/w/${dailyWeather.icon}.png`}
                  alt="weather icon"
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>
          Veuillez renseigner un code postal ou une ville pour afficher les
          prévisions météorologiques !
        </p>
      )}
    </div>
  );
}

export default MaMeteo;
