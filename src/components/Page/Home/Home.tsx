import { Link } from 'react-router-dom';
import { Product, Tutorial } from '../../../@types/types';
import slugify from '../../../utils/utils';
import ErrorNotif from '../../ErrorNotif/ErrorNotif';
import { useAppSelector } from '../../../hooks/redux';

interface HomeProps {
  tutorials: Tutorial[];
  legumes: Product[];
  fruits: Product[];
  logged: boolean;
}
function Home({ tutorials, legumes, fruits }: HomeProps) {
  const getRandomTutos = () => {
    if (tutorials.length <= 2) return tutorials;
    const twoTutoOnHome = [...tutorials].sort(() => 0.5 - Math.random());
    return twoTutoOnHome.slice(0, 3);
  };

  const getRandomFruits = () => {
    if (fruits.length <= 2) return fruits;
    const fruitsOnHome = [...fruits].sort(() => 0.5 - Math.random());
    return fruitsOnHome.slice(0, 4);
  };
  const getRandomLegumes = () => {
    if (legumes.length <= 2) return legumes;
    const legumeOnHome = [...legumes].sort(() => 0.5 - Math.random());
    return legumeOnHome.slice(0, 4);
  };

  const randomTutos = getRandomTutos();
  const randomLegumes = getRandomLegumes();
  const randomFruits = getRandomFruits();

  const error = useAppSelector((state) => state.products.error);

  return (
    <div>
      <div className="bg-white text-center py-2 text-sm italic">
        <p>Bienvenue sur notre site web dédié au jardinage!</p>
      </div>
      {error && <ErrorNotif error={error} />}

      <div className="flex flex-col md:flex-row gap-2 md:gap-6">
        <div className="w-full py-4">
          <h2 className="text-xl text-center font-bold p-2">Fruits </h2>
          <div className="flex flex-col rounded-lg overflow-hidden shadow-lg border border-gray-200 p-2">
            <ul className="flex flex-wrap justify-around rounded-lg">
              {randomFruits.map((fruit) => (
                <li
                  className="mx-auto w-5/6 md:w-1/2 p-4"
                  key={`{fruit${fruit.id}`}
                >
                  <Link to={`/fruits/${slugify(fruit.name)}`}>
                    <div className="flex flex-col flex-grow">
                      <div className="relative">
                        <img
                          src={`${import.meta.env.VITE_API_URL}${
                            fruit.picture
                          }`}
                          alt={fruit.name}
                          className="w-full h-48 object-cover mx-auto rounded-t-lg"
                        />
                      </div>
                      <h3 className="font-bold text-center my-2">
                        {fruit.name}
                      </h3>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              to="/fruits"
              className="mx-auto mb-6 py-4 px-6 text-white bg-[#F5780A] rounded-full hover:bg-black focus:ring-1 focus:ring-[#F6D50E]"
            >
              <button type="button">Voir plus de fruits</button>
            </Link>
          </div>
        </div>
        <div className="w-full py-4">
          <h2 className="text-xl text-center font-bold p-2">Légumes </h2>
          <div className="flex flex-col rounded-lg overflow-hidden shadow-lg border border-gray-200 p-2">
            <ul className="flex flex-wrap justify-around rounded-lg">
              {randomLegumes.map((legume) => (
                <li
                  className="mx-auto w-5/6 md:w-1/2 p-4"
                  key={`{legume${legume.id}`}
                >
                  <Link to={`/legumes/${slugify(legume.name)}`}>
                    <div className="flex flex-col flex-grow">
                      <div className="relative">
                        <img
                          src={`${import.meta.env.VITE_API_URL}${
                            legume.picture
                          }`}
                          alt={legume.name}
                          className="w-full h-48 object-cover mx-auto rounded-t-lg"
                        />
                        {/* <div className="flex flex-row justify-end absolute top-1 right-1">
                          {logged && (
                            <BtnFavoris
                              logged={logged}
                              product={legume}
                              allFavProducts={allFavProducts}
                            />
                          )}
                        </div> */}
                      </div>
                      <h3 className="font-bold text-center my-2">
                        {legume.name}
                      </h3>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              to="/legumes"
              className="mx-auto mb-6 py-4 px-6 text-white bg-[#F5780A] rounded-full hover:bg-black focus:ring-1 focus:ring-[#F6D50E]"
            >
              <button type="button">Voir plus de légumes</button>
            </Link>
          </div>
        </div>
      </div>
      <div className=" flex flex-col rounded py-6">
        <h2 className="text-xl text-center font-bold p-4">Tutos jardinage</h2>
        <ul className="flex flex-wrap md:flex-row -m-4">
          {randomTutos.map((tutoriel) => (
            <li
              className="mx-auto w-5/6 md:w-1/3 p-4"
              key={`{tutoriel${tutoriel.id}`}
            >
              <div className="flex flex-col flex-grow rounded-lg overflow-hidden shadow-lg border border-gray-200">
                <Link to={`/tutos/${slugify(tutoriel.title)}`}>
                  <img
                    src={`${import.meta.env.VITE_API_URL}${tutoriel.picture}`}
                    alt={`Tuto de ${tutoriel.title}`}
                    className="w-full h-48 object-cover mx-auto"
                  />
                </Link>
                <div className="flex flex-col p-6">
                  <h3 className="font-bold text-center mb-6">
                    {tutoriel.title}
                  </h3>

                  <Link
                    to={`/tutos/${slugify(tutoriel.title)}`}
                    className="mx-auto py-4 px-6 text-white bg-[#F5780A] rounded-full hover:bg-black focus:ring-1 focus:ring-[#F6D50E]"
                  >
                    <button type="button">Lire la suite</button>
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default Home;
