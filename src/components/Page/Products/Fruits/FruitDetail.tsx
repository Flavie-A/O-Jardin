import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../../hooks/redux';
import findProduct from '../../../../store/selectors/products';
import slugify from '../../../../utils/utils';
import BtnFavoris from '../BtnFavoris';
import { Product } from '../../../../@types/types';
import Loader from '../../../Loader/Loader';
import ErrorNotif from '../../../ErrorNotif/ErrorNotif';
import PageNotFound from '../../../PageNotFound/PageNotFound';

export const months = [
  'Janvier',
  'Février',
  'Mars',
  'Avril',
  'Mai',
  'Juin',
  'Juillet',
  'Août',
  'Septembre',
  'Octobre',
  'Novembre',
  'Décembre',
];

interface FruitDetailProps {
  allFavProducts: Product[];
  logged: boolean;
}

function FruitDetail({ logged, allFavProducts }: FruitDetailProps) {
  const params = useParams();

  const fruit = useAppSelector((state) =>
    findProduct(state.products.allProducts, slugify(params.name))
  );

  const { error } = useAppSelector((state) => state.products);
  if (error) return <ErrorNotif error={error} />;

  if (!fruit) return <PageNotFound />;

  const imageUrl = `${import.meta.env.VITE_API_URL}/${fruit.picture}`;

  // .replace() : Change the {} with nothing
  const plantationDates = fruit.plantation_date.replace(/[{}]/g, '');

  // .split() : split a string into an ordered list
  const monthIndices = plantationDates.split(',').map(Number);

  const harvestDates = fruit.harvest_date.replace(/[{}]/g, '');
  const monthHarvest = harvestDates.split(',').map(Number);

  const plantationMonths = (index: number) => monthIndices.includes(index + 1);
  const harvestMonth = (index: number) => monthHarvest.includes(index + 1);

  return (
    <div className="mx-auto w-full mt-5 mb-5 p-5 rounded-lg shadow-lg ">
      <div className="flex flex-row justify-end">
        {logged && (
          <BtnFavoris
            logged={logged}
            product={fruit}
            allFavProducts={allFavProducts}
          />
        )}
      </div>
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-1">{fruit.name}</h1>
        <p className="italic mb-3">Nom Latin : {fruit.latin_name}</p>
      </div>
      <div className="flex flex-col md:flex-row md:gap-4 items-start">
        <img
          src={imageUrl}
          alt={fruit.name}
          className="w-full md:w-1/2 mx-auto rounded-lg shadow-lg md:my-4 mt-4"
        />
        <p className="w-full md:w-1/2 my-4">{fruit.description}</p>
      </div>
      <div className="bg-[#16A1AF] rounded-lg p-4 pb-6">
        <h2 className="pb-2 font-bold text-center">Périodes de plantation </h2>

        <div className=" grid grid-cols-4 md:grid-cols-12 gap-1.5 md:gap-2 bg-white rounded p-2 text-black">
          {months.map((month, index) => (
            <div
              key={`plantationFruit${month}`}
              className="text-center text-xs font-semibold"
            >
              {month}
              <div
                className={`h-8 ${
                  plantationMonths(index) ? 'bg-[#F6D50E]' : 'bg-gray-300'
                }`}
              />
            </div>
          ))}
        </div>

        <h2 className="pt-3 pb-2 font-bold text-center"> Période de récolte</h2>

        <div className="grid grid-cols-4 md:grid-cols-12 gap-1.5 md:gap-2 bg-white rounded p-2 text-black">
          {months.map((month, index) => (
            <div
              key={`harvestlegume${month}`}
              className="text-center text-xs font-semibold"
            >
              {month}
              <div
                className={`h-8 ${
                  harvestMonth(index) ? 'bg-[#F6D50E]' : 'bg-gray-300'
                }`}
              />
            </div>
          ))}
        </div>

        <h2 className="pt-2 font-bold text-center">Conseils d'arrosage</h2>

        <p className="pt-2 text-center"> {fruit.watering_frequency}</p>
      </div>
    </div>
  );
}

export default FruitDetail;
