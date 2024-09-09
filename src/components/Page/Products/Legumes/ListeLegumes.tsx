import { Product } from '../../../../@types/types';
import { useAppSelector } from '../../../../hooks/redux';
import ErrorNotif from '../../../ErrorNotif/ErrorNotif';
import CardLegumes from './CardLegumes';

interface LegumesProps {
  allFavProducts: Product[];
  legumes: Product[];
  logged: boolean;
}

function Legumes({ logged, legumes, allFavProducts }: LegumesProps) {
  const { error } = useAppSelector((state) => state.products);
  if (error) return <ErrorNotif error={error} />;

  return (
    <div className="flex mx-auto flex-col my-6">
      <h2 className="text-xl text-center font-bold p-2">Legumes</h2>
      {error && <p className="text-red-600 text-center">Erreur : {error}</p>}
      <div>
        <ul className="flex flex-wrap md:flex-row -m-4 justify-stretch">
          {legumes.map((legume) => (
            <CardLegumes
              key={`cardFruit${legume.id}`}
              legume={legume}
              allFavProducts={allFavProducts}
              logged={logged}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Legumes;
