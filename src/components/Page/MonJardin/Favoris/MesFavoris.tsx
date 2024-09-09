import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../../../@types/types';
import BtnSupprFavoris from './BtnSupprFavoris';
import slugify from '../../../../utils/utils';

interface FavorisProps {
  allFavProducts: Product[];
}
function MesFavoris({ allFavProducts }: FavorisProps) {
  const sortedFavProducts = {
    favFruits: [] as Product[],
    favLegumes: [] as Product[],
  };

  allFavProducts.forEach((favProduct: Product) => {
    if (favProduct.category_id === 1) {
      sortedFavProducts.favFruits.push(favProduct);
    } else {
      sortedFavProducts.favLegumes.push(favProduct);
    }
  });
  return (
    <>
      <h2 className="text-2xl text-center font-[800] p-2 pt-6">Mes favoris</h2>
      <div className="flex flex-col md:flex-row gap-2 md:gap-6">
        <div className="w-full py-4">
          <h2 className="text-xl text-center font-bold p-2">Fruits </h2>
          <div className="flex flex-col rounded-lg overflow-hidden shadow-lg border border-gray-200 px-2">
            <ul className="flex flex-wrap justify-start rounded-lg min-h-40">
              {sortedFavProducts.favFruits.map((fruit) => (
                <li
                  className="mx-auto md:mx-0 w-5/6 md:w-1/3 px-2 pt-4"
                  key={`favFruit-${fruit.name}`}
                >
                  <Link to={`/fruits/${slugify(fruit.name)}`}>
                    <div className="flex flex-col flex-grow ">
                      <div className="relative">
                        <img
                          src={`${import.meta.env.VITE_API_URL}/${
                            fruit.picture
                          }`}
                          alt={fruit.name}
                          className="w-full h-32 object-cover mx-auto rounded-t-lg"
                        />
                        <div className="flex flex-row justify-end absolute top-1 right-1">
                          <BtnSupprFavoris
                            product={fruit}
                            allFavProducts={allFavProducts}
                          />
                        </div>
                      </div>
                      <h3 className="font-bold text-center my-2">
                        {fruit.name}
                      </h3>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="w-full py-4">
          <h2 className="text-xl text-center font-bold p-2">Légumes </h2>
          <div className="flex flex-col rounded-lg overflow-hidden shadow-lg border border-gray-200 px-2">
            <ul className="flex flex-wrap justify-start rounded-lg min-h-40">
              {sortedFavProducts.favLegumes.map((legume) => (
                <li
                  className="mx-auto md:mx-0 w-5/6 md:w-1/3 p-2 pt-4"
                  key={`favLegume-${legume.name}`}
                >
                  <Link to={`/legumes/${slugify(legume.name)}`}>
                    <div className="flex flex-col flex-grow">
                      <div className="relative">
                        <img
                          src={`${import.meta.env.VITE_API_URL}/${
                            legume.picture
                          }`}
                          alt={legume.name}
                          className="w-full h-32 object-cover mx-auto rounded-t-lg"
                        />
                        <div className="flex flex-row justify-end absolute top-1 right-1">
                          <BtnSupprFavoris
                            allFavProducts={allFavProducts}
                            product={legume}
                          />
                        </div>
                      </div>
                      <h3 className="font-bold text-center my-2">
                        {legume.name}
                      </h3>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default MesFavoris;
