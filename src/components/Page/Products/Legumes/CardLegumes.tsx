import { Link } from 'react-router-dom';
import { Product } from '../../../../@types/types';

import slugify from '../../../../utils/utils';
import BtnFavoris from '../BtnFavoris';
import { useAppSelector } from '../../../../hooks/redux';
import ErrorNotif from '../../../ErrorNotif/ErrorNotif';

interface CardLegumesProps {
  allFavProducts: Product[];
  legume: Product;
  logged: boolean;
}

function CardLegumes({ logged, legume, allFavProducts }: CardLegumesProps) {
  const { error } = useAppSelector((state) => state.products);
  if (error) return <ErrorNotif error={error} />;

  return (
    <li
      key={`legumes${legume.id}`}
      className="mx-auto md:mx-0 w-5/6 md:w-1/3 p-4 mx-auto"
    >
      <div className="flex flex-col rounded-lg overflow-hidden shadow-lg border border-gray-200">
        <Link to={`/legumes/${slugify(legume.name)}`}>
          <img
            className="w-full h-48 object-cover mx-auto"
            src={`${import.meta.env.VITE_API_URL}/${legume.picture}`}
            alt={legume.name}
          />
        </Link>
        <div className="flex flex-row justify-end">
          {logged && (
            <BtnFavoris
              logged={logged}
              product={legume}
              allFavProducts={allFavProducts}
            />
          )}
        </div>
        <div className="flex flex-col p-6 ">
          <h3 className="font-bold text-center mb-2">{legume.name}</h3>
          <span className="italic text-center text-xs mb-2">
            {legume.latin_name}
          </span>
          <p className="italic text-sm my-4">
            {legume.description.slice(0, 100)}...
          </p>
          <Link
            to={`/legumes/${slugify(legume.name)}`}
            className="mx-auto py-4 px-6 text-white bg-[#F5780A] rounded-full hover:bg-black focus:ring-1 focus:ring-[#F6D50E]"
          >
            <button type="button">En savoir plus</button>
          </Link>
        </div>
      </div>
    </li>
  );
}

export default CardLegumes;
