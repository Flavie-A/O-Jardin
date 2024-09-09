import { Facebook, Instagram } from 'react-feather';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

function Footer() {
  return (
    <footer className="">
      <div className="bg-[#F6D50E]">
        <img
          src={logo}
          className="w-1/4 mx-auto md:w-40 pt-6"
          alt="logo O'Jardin"
        />
        <Link to="/contact">
          <button
            type="button"
            className="mx-auto py-4 px-6 flex m-4 text-white bg-[#F5780A] rounded-full hover:bg-black focus:ring-1 focus:ring-[#F6D50E]"
          >
            Contactez-nous
          </button>
        </Link>
        <div className="flex flex-row justify-center gap-4 pb-4">
          <Link to="/#">
            <Facebook />
          </Link>
          <Link to="/#">
            <Instagram />
          </Link>
        </div>
      </div>

      <div className="bg-black text-white items-center flex flex-col md:flex-row justify-center p-4 md:divide-x divide-white ">
        <Link to="/mentions_legales" className="px-4 hover:underline">
          Mentions légales
        </Link>
        <Link to="/confidentialite" className="px-4 hover:underline">
          Confidentialité
        </Link>
        <p className="px-4">©2024</p>
      </div>
    </footer>
  );
}

export default Footer;
