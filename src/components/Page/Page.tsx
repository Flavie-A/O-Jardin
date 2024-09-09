import { Routes, Route, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import Home from './Home/Home';
import Fruits from './Products/Fruits/ListeFruits';
import Connexion from './ConnexionUser/Connexion';

import FruitDetail from './Products/Fruits/FruitDetail';
import Legumes from './Products/Legumes/ListeLegumes';
import LegumeDetail from './Products/Legumes/LegumeDetail';
import Tutoriels from './Tutoriels/Tutoriels';
import TutorielDetail from './Tutoriels/TutorielDetail';
import Inscription from './InscriptionUser/Inscription';
import MonJardin from './MonJardin/MonJardin';
import PotagerVirtuel from './MonJardin/PotagerVirtuel/PotagerVirtuel';
import GestionAlertes from './MonJardin/GestionAlertes/GestionAlertes';
import MentionsLegales from './MentionsLegales/MentionLegales';
import PolitiqueConfidentialite from './PolitiqueConfidentialite/PolitiqueConfidentialite';
import Contact from './Contact/Contact';

import { Product } from '../../@types/types';
import Modification from './ModificationUser/Modification';
import PageNotFound from '../PageNotFound/PageNotFound';
import SearchBar from '../SearchBar/SearchBar';

function Page() {
  const logged = useAppSelector((state) => state.user.logged);
  const location = useLocation();

  // const emailFormState = useAppSelector(
  //   (state) => state.user.credentials.email
  // );
  // const passFromState = useAppSelector(
  //   (state) => state.user.credentials.password
  // );

  const { tutorials } = useAppSelector((state) => state.tutoriels);
  const allProducts = useAppSelector((state) => state.products.allProducts);
  const allFavProducts = useAppSelector((state) => state.myGarden.favProducts);

  const sortedProducts = {
    fruits: [] as Product[],
    legumes: [] as Product[],
  };

  allProducts.forEach((product: Product) => {
    if (product.category_id === 1) {
      sortedProducts.fruits.push(product);
    } else {
      sortedProducts.legumes.push(product);
    }
    return sortedProducts;
  });

  return (
    <div>
      {location.pathname !== '/gestion_profil' &&
        location.pathname !== '/connexion' &&
        location.pathname !== '/contact' &&
        location.pathname !== '/confidentialite' &&
        location.pathname !== '/mentions_legales' &&
        location.pathname !== '/inscription' && <SearchBar />}
      <Routes>
        <Route path="*" element={<PageNotFound />} />

        <Route
          path="/"
          element={
            <Home
              tutorials={tutorials}
              legumes={sortedProducts.legumes}
              fruits={sortedProducts.fruits}
              logged={logged}
            />
          }
        />
        <Route
          path="/fruits"
          element={
            <Fruits
              fruits={sortedProducts.fruits}
              allFavProducts={allFavProducts}
              logged={logged}
            />
          }
        />
        <Route
          path="/fruits/:name"
          element={
            <FruitDetail allFavProducts={allFavProducts} logged={logged} />
          }
        />
        <Route
          path="/legumes"
          element={
            <Legumes
              legumes={sortedProducts.legumes}
              allFavProducts={allFavProducts}
              logged={logged}
            />
          }
        />
        <Route
          path="/legumes/:name"
          element={
            <LegumeDetail allFavProducts={allFavProducts} logged={logged} />
          }
        />
        <Route path="/tutos" element={<Tutoriels tutorials={tutorials} />} />
        <Route
          path="/tutos/:title"
          element={<TutorielDetail tutorials={tutorials} />}
        />
        <Route path="/connexion" element={<Connexion logged={logged} />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route
          path="/mon_jardin"
          element={
            logged && (
              <MonJardin logged={logged} allFavProducts={allFavProducts} />
            )
          }
        />

        <Route
          path="/mon_jardin/potager-virtuel"
          element={<PotagerVirtuel />}
        />
        <Route path="/gestion_profil" element={<Modification />} />
        <Route path="/gestion_profil/alertes" element={<GestionAlertes />} />
        <Route path="/mentions_legales" element={<MentionsLegales />} />
        <Route path="/confidentialite" element={<PolitiqueConfidentialite />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}

export default Page;
