import { Link } from 'react-router-dom';
import { Product } from '../../../../@types/types';

import slugify from '../../../../utils/utils';
import BtnFavoris from '../BtnFavoris';
import { useAppSelector } from '../../../../hooks/redux';
import ErrorNotif from '../../../ErrorNotif/ErrorNotif';

interface CardFruitsProps {
  allFavProducts: Product[];
  fruit: Product;
  logged: boolean;
}

function CardFruits({ logged, fruit, allFavProducts }: CardFruitsProps) {
  const { error } = useAppSelector((state) => state.products);
  if (error) return <ErrorNotif error={error} />;

  return (
    <li
      key={`fruitDetail${fruit.id}`}
      className="mx-auto md:mx-0 w-5/6 md:w-1/3 p-4 mx-auto"
    >
      <div className="flex flex-col rounded-lg overflow-hidden shadow-lg border border-gray-200">
        <Link to={`/fruits/${slugify(fruit.name)}`}>
          <img
            className="w-full h-48 object-cover mx-auto"
            src={`${import.meta.env.VITE_API_URL}/${fruit.picture}`}
            alt={fruit.name}
          />
        </Link>
        <div className="flex flex-row justify-end">
          {logged && (
            <BtnFavoris
              logged={logged}
              product={fruit}
              allFavProducts={allFavProducts}
            />
          )}
        </div>
        <div className="flex flex-col p-6 ">
          <h3 className="font-bold text-center mb-2">{fruit.name}</h3>
          <span className="italic text-center text-xs mb-2">
            {fruit.latin_name}
          </span>
          <p className="italic text-sm my-4">
            {fruit.description.slice(0, 100)}...
          </p>
          <Link
            to={`/fruits/${slugify(fruit.name)}`}
            className="mx-auto py-4 px-6 text-white bg-[#F5780A] rounded-full hover:bg-black focus:ring-1 focus:ring-[#F6D50E]"
          >
            <button type="button">En savoir plus</button>
          </Link>
        </div>
      </div>
    </li>
  );
}

export default CardFruits;
