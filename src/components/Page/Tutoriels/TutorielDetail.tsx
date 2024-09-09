import { useParams } from 'react-router-dom';
import { Tutorial } from '../../../@types/types';
import findTuto from '../../../store/selectors/tutos';
import slugify from '../../../utils/utils';
import { useAppSelector } from '../../../hooks/redux';
import ErrorNotif from '../../ErrorNotif/ErrorNotif';
import PageNotFound from '../../PageNotFound/PageNotFound';

interface TutoDetailProps {
  tutorials: Tutorial[];
}

function TutorielDetail({ tutorials }: TutoDetailProps) {
  const params = useParams();
  const tutorial = findTuto(tutorials, slugify(params.title));

  const { error } = useAppSelector((state) => state.tutoriels);

  if (error) return <ErrorNotif error={error} />;
  if (!tutorial) return <PageNotFound />;

  return (
    <div className="container mx-auto px-4 py-8">
      <div>
        <div className="text-center font-bold text-3xl mb-4">
          {tutorial.title}
        </div>
        <img
          src={`${import.meta.env.VITE_API_URL}${tutorial.picture}`}
          alt={tutorial.title}
          className="mx-auto w-full max-w-xl h-auto object-cover rounded-lg shadow-lg"
        />
        <p className="text-gray-700 mt-4 text-lg leading-relaxed">
          {tutorial.article}
        </p>
      </div>
    </div>
  );
}
export default TutorielDetail;
