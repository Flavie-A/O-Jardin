import React from 'react';
import { CloudDrizzle, CloudLightning, Sun } from 'react-feather';

interface AlerteProps {
  isForecastAlertActive: boolean;
  rain: boolean;
  hot: boolean;
  thunderstorm: boolean;
}

function Alerte({ isForecastAlertActive, rain, hot, thunderstorm }: AlerteProps) {
  return (
    <div>
      {isForecastAlertActive && rain && (
        <div className="alert alert-warning text-center my-6">
          <CloudDrizzle className="m-auto" />
          Pluies attendues aujourd'hui
        </div>
      )}
      {isForecastAlertActive && hot && (
        <div className="alert alert-warning text-center my-6">
          <Sun className="m-auto" />
          Fortes chaleurs attendues aujourd'hui
        </div>
      )}
      {isForecastAlertActive && thunderstorm && (
        <div className="alert alert-warning text-center my-6">
          <CloudLightning className="m-auto" />
          Orages attendus aujourd'hui
        </div>
      )}
    </div>
  );
}

export default Alerte;
