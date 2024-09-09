import { useAppSelector, useAppDispatch } from '../../../../hooks/redux';
import { updateAlert } from '../../../../store/thunks/myGardenThunks';

function GestionAlertes() {
  const dispatch = useAppDispatch();
  const { userData } = useAppSelector((state) => state.myGarden);

  const changeForecastAlert = async () => {
    const newForecastAlert = !userData.forecastAlert;
    await dispatch(
      updateAlert({ ...userData, forecastAlert: newForecastAlert })
    );
  };

  const changeWateringAlert = async () => {
    const newWateringAlert = !userData.wateringAlert;
    await dispatch(
      updateAlert({ ...userData, wateringAlert: newWateringAlert })
    );
  };

  return (
    <div className="p-4">
      {/* <div className="flex flex-col items-center text-white mb-4">
        <button
          type="button"
          onClick={() => changeForecastAlert()}
          className="flex flex-row items-center justify-center bg-white text-xs text-black py-2 px-4 rounded-full"
        >
          <input
            checked={userData.forecastAlert}
            onChange={changeForecastAlert}
            id="forecast-alert-checkbox"
            type="checkbox"
            className="w-4 h-4 mr-2 bg-gray-100 border-gray-300 rounded focus:ring-[#16A1AF] focus:ring-2"
          />
          <div>
            Alerte météo {userData.forecastAlert ? 'activée' : 'désactivée'}
          </div>
        </button>
      </div> */}

      {/* <button
        type="button"
        onClick={() => changeWateringAlert()}
        className="flex flex-row items-center justify-center bg-white text-xs text-black py-2 px-4 rounded-full"
      >
        <input
          checked={userData.wateringAlert}
          onChange={changeWateringAlert}
          id="watering-alert-checkbox"
          type="checkbox"
          className="w-4 h-4 mr-2 bg-gray-100 border-gray-300 rounded focus:ring-[#16A1AF] focus:ring-2"
        />
        <div>
          Alerte arrosage {userData.wateringAlert ? 'activée' : 'désactivée'}
        </div>
      </button> */}
      <div className="w-full flex flex-col text-white mt-4">
        <button
          type="button"
          className="flex flex-col items-center bg-white text-xs text-black py-1 px-4 rounded-lg"
          onClick={() => {
            changeForecastAlert();
          }}
        >
          Alerte météo {userData.forecastAlert ? 'activée' : 'désactivée'}
          <div
            aria-hidden="true"
            className={`md:w-16 md:h-8 w-14 h-7 flex items-center rounded-full p-1 m-1 cursor-pointer ${
              !userData.forecastAlert ? 'bg-gray-200' : 'bg-[#16A1AF]'
            }`}
          >
            <div
              className={`md:w-6 bg-white md:h-6 h-5 w-5 rounded-full shadow-md transform ${
                userData.forecastAlert ? 'translate-x-7' : ''
              }`}
            />
          </div>
        </button>
      </div>
      <div className="w-full flex flex-col text-white mt-4">
        <button
          type="button"
          className="flex flex-col items-center bg-white text-xs text-black py-1 px-4 rounded-lg"
          onClick={() => {
            changeWateringAlert();
          }}
        >
          Alerte arrosage {userData.wateringAlert ? 'activée' : 'désactivée'}
          <div
            aria-hidden="true"
            className={`md:w-16 md:h-8 w-14 h-7 flex items-center rounded-full p-1 m-1 cursor-pointer ${
              !userData.wateringAlert ? 'bg-gray-200' : 'bg-[#16A1AF]'
            }`}
          >
            <div
              className={`md:w-6 bg-white md:h-6 h-5 w-5 rounded-full shadow-md transform ${
                userData.wateringAlert ? 'translate-x-7' : ''
              }`}
            />
          </div>
        </button>
      </div>
    </div>
  );
}

export default GestionAlertes;
