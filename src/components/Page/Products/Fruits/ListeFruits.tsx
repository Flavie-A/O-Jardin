import { Product } from '../../../../@types/types';
import { useAppSelector } from '../../../../hooks/redux';
import ErrorNotif from '../../../ErrorNotif/ErrorNotif';
import CardFruits from './CardFruits';

interface FruitsProps {
  allFavProducts: Product[];
  fruits: Product[];
  logged: boolean;
}

function Fruits({ logged, fruits, allFavProducts }: FruitsProps) {
  const { error } = useAppSelector((state) => state.products);
  if (error) return <ErrorNotif error={error} />;

  return (
    <div className="flex mx-auto flex-col my-6">
      <h2 className="text-xl text-center font-bold p-2">Fruits</h2>
      {error && <p className="text-red-600 text-center">Erreur : {error}</p>}
      <div>
        <ul className="flex flex-wrap md:flex-row -m-4 justify-stretch">
          {fruits.map((fruit) => (
            <CardFruits
              key={`cardFruit${fruit.id}`}
              fruit={fruit}
              allFavProducts={allFavProducts}
              logged={logged}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Fruits;
