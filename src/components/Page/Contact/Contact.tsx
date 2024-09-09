import React, { useState } from 'react';
import { User, XCircle } from 'react-feather';

interface Errors {
  email?: string;
}

function Contact() {
  const [successMessage, setSuccessMessage] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Errors>({});

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSuccessMessage(true);
    setEmail('');
    setMessage('');
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setErrors({}); 
  };

  const validateForm = (): Errors => {
    const newErrors: Errors = {};
    if (!email) {
      newErrors.email = 'Email est requis';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email invalide';
    }
    return newErrors;
  };

  return (
    <div>
      <h2 className="text-xl text-center p-2">Formulaire de contact</h2>
      <form
        className="px-2 md:p-2 md:mx-20"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900  "
        >
          Votre email :
        </label>

        <div className="flex items-center mb-4 md:mb-8">
          <User className="absolute ml-3" />
          <input
            required
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="Email"
            className={`bg-white text-gray-900 border-1 text-sm rounded-full focus:ring-[#F6D50E] w-full ps-12 p-4 border ${
              errors.email && 'border-red-500'
            }`}
          />
        </div>
        {errors.email && (
          <p className="text-red-500 text-xs">{errors.email}</p>
        )}

        <label
          htmlFor="contact"
          className="block mb-2 text-sm font-medium text-gray-900  "
        >
          Votre demande
        </label>

        <div className="flex items-center md:mb-5 ">
          <textarea
            required
            name="contact"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Écrivez votre message"
            rows={8}
            className="bg-white text-gray-900 border-1 border-black text-sm rounded focus:ring-[#F6D50E] w-full p-4 border"
          />
        </div>

        <button
          type="submit"
          className="mx-auto flex px-20 py-3 my-6 rounded-full bg-[#F6D50E] hover:text-white hover:bg-black focus:outline-none focus:ring-2 focus:ring-[#F6D50E] focus:ring-offset-2"
        >
          Envoyer
        </button>
      </form>
      {successMessage && (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <div className="font-bold">Envoyé avec succès! </div>
          <div className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <XCircle onClick={() => setSuccessMessage(false)} />
          </div>
        </div>
      )}
      <h2 className="text-xl text-center p-2 font-bold">FAQ</h2>
      <div className="md:mx-20 mx-2 text-sm md:text-m">
        <div className="flex flex-col rounded-lg overflow-hidden shadow-lg border border-gray-200 p-6 m-4">
          <p className="text-center italic font-semibold pb-2">
            Comment faire pour ajouter un produit en favoris ?
          </p>
          <p className="py-1 text-justify">
            Pour ajouter un produit en favoris, vous avez la possibilité de vous
            rendre sur la fiche produit et de l'enregistrer en appuyant sur le
            petit cœur en haut à droite de la fiche. Il est important de ne pas
            oublier d'être connecté, sinon cela sera impossible.{' '}
          </p>
        </div>

        <div className="flex flex-col rounded-lg overflow-hidden shadow-lg border border-gray-200 p-6 m-4">
          <p className="text-center italic font-semibold pb-2">
            Est-il possible d'enregistrer des favoris sans être inscrit ?
          </p>
          <p className="py-1 text-justify">
            Nous vous informons que si vous souhaitez enregistrer des produits
            en favoris, il faudra obligatoirement créer un compte.
          </p>
        </div>

        <div className="flex flex-col rounded-lg overflow-hidden shadow-lg border border-gray-200 p-6 m-4">
          <p className="text-center italic font-semibold pb-2">
            Comment faire pour ajouter un produit que l'on ne trouve pas?
          </p>
          <p className="py-1 text-justify">
            Si vous souhaitez ajouter un produit qui n'existe pas dans notre
            bibliothèque de fruits et légumes, vous avez la possibilité de faire
            une demande d'ajout de produit via le formulaire de contact. Nous
            ferons en sorte de l'ajouter rapidement avec toutes les informations
            nécessaires au bon déroulement de votre plantation.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Contact;