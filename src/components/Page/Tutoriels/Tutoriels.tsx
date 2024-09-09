import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/redux';
import { Tutorial } from '../../../@types/types';
import slugify from '../../../utils/utils';
import ErrorNotif from '../../ErrorNotif/ErrorNotif';

interface Tutoprops {
  tutorials: Tutorial[];
}

function Tutoriels({ tutorials }: Tutoprops) {
  const error = useAppSelector((state) => state.tutoriels.error);
  if (error) return <ErrorNotif error={error} />;

  return (
    <div className="flex mx-auto flex-col my-6">
      <h2 className="text-xl text-center font-bold p-2">Tutoriels</h2>
      <div>
        <ul className="flex flex-wrap md:flex-row -m-4">
          {tutorials.map((tutoriel) => (
            <li
              key={`tuto${tutoriel.id}`}
              className="mx-auto md:mx-0 w-5/6 md:w-1/3 p-4 mx-auto"
            >
              <div className="flex flex-col justify-normal flex-grow rounded-lg overflow-hidden shadow-lg border border-gray-200">
                <Link to={`/tutos/${slugify(tutoriel.title)}`}>
                  <img
                    src={`${import.meta.env.VITE_API_URL}${tutoriel.picture}`}
                    alt={tutoriel.title}
                    className="w-full h-48 object-cover mx-auto"
                  />
                </Link>

                <div className="flex flex-col p-6">
                  <h3 className="font-bold text-center">{tutoriel.title}</h3>
                  <p className="italic text-sm my-4">
                    {tutoriel.article
                      ? tutoriel.article.substring(0, 100)
                      : 'Pas de description'}
                    ...
                  </p>
                  <Link
                    to={`/tutos/${slugify(tutoriel.title)}`}
                    className="mx-auto py-4 px-6 text-white bg-[#F5780A] rounded-full hover:bg-black focus:ring-1 focus:ring-[#F6D50E]"
                  >
                    <button type="button">En savoir plus</button>
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

export default Tutoriels;
