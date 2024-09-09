import React, { useState, ChangeEvent, FormEvent } from 'react';
import { User, Lock, XCircle } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import userAction from '../../../store/thunks/userThunk';

interface FormData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
  address?: string;
  zip_code?: string;
  city?: string;
}

interface Errors {
  firstname?: string;
  lastname?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  zip_code?: string;
  apiError?: string;
}

function Inscription() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const goBack = () => {
    navigate(-1);
  };

  const [formData, setFormData] = useState<FormData>({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    zip_code: '',
    city: '',
  });

  const [errors, setErrors] = useState<Errors>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = (): Errors => {
    const newErrors: Errors = {};
    if (!formData.firstname) newErrors.firstname = 'Prénom est requis';
    if (!formData.lastname) newErrors.lastname = 'Nom est requis';
    if (!formData.email) {
      newErrors.email = 'Email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }
    if (!formData.password) {
      newErrors.password = 'Mot de passe est requis';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Mot de passe doit contenir au moins 8 caractères';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe doivent correspondre';
    }
    if (
      formData.zip_code &&
      !/^0[1-9]\d{3}$|^[1-8]\d{4}$|^9[0-5]\d{3}$|^97[0-5]\d{2}$|^98[6-8]\d{2}$|^98000$/.test(
        formData.zip_code
      )
    ) {
      newErrors.zip_code = 'Code postal invalide';
    }
    return newErrors;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      const emailExist = await dispatch(userAction.actionVerifyEmailExist(formData.email as string) as any);

      if ((emailExist.payload) === true) {
        setErrors({ email: 'Cet email est déjà utilisé' });
        return;
      }

      const { confirmPassword, ...dataToSend } = formData;
      const filteredDataToSend = Object.fromEntries(
        Object.entries(dataToSend).filter(([_, value]) => value)
      );

      dispatch(userAction.actionNewUser(filteredDataToSend as unknown as FormData) as any);
      navigate('/connexion');

    } catch (error) {
      console.error('Erreur lors de la modification de l\'utilisateur :', error);
    }
  };

  return (
    <div className="flex flex-col justify-center rounded-lg items-center ">
      <button type="button" className="self-end pr-10" onClick={goBack}>
        <XCircle size="40" />
      </button>
      <div className="w-5/6 md:w-3/5 shadow-3xl ">
        <div className="text-center font-bold text-3xl mb-2">
          Créer un compte
        </div>

        <form className="p-8 md:p-8" autoComplete="off" onSubmit={handleSubmit}>
          <label
            htmlFor="firstname"
            className="block mb-2 text-sm font-medium text-gray-900  "
          >
            Votre prénom et nom :
          </label>
          <div className="flex flex-col md:flex-row justify-between mb-2 gap-4 md:mb-8 md:gap-4">
            <input
              required
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              placeholder="Prénom"
              className="bg-white text-gray-900 border-1 border-black text-sm rounded-full focus:ring-[#F6D50E] w-full ps-6 p-4 border border-black "
            />
            <input
              required
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              placeholder="Nom"
              className="bg-white text-gray-900 border-1 border-black text-sm rounded-full focus:ring-[#F6D50E] w-full ps-6 p-4 border border-black"
            />
          </div>
          {errors.firstname && (
            <p className="text-red-500 text-xs">{errors.firstname}</p>
          )}
          {errors.lastname && (
            <p className="text-red-500 text-xs">{errors.lastname}</p>
          )}

          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900  "
          >
            Votre email :
          </label>
          <div className="flex items-center mb-4 md:mb-8">
            <User className="absolute ml-3 " />
            <input
              required
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="bg-white text-gray-900 border-1 border-black text-sm rounded-full focus:ring-[#F6D50E] w-full ps-12 p-4 border border-black "
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email}</p>
          )}

          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900  "
          >
            Votre mot de passe :
          </label>
          <div className="flex items-center mb-2 md:mb-4">
            <Lock className="absolute ml-3" />
            <input
              required
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Mot de passe"
              className="bg-white text-gray-900 border-1 border-black text-sm rounded-full focus:ring-[#F6D50E] w-full ps-12 p-4 border border-black"
            />
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password}</p>
          )}

          <label
            htmlFor="confirmPassword"
            className="block mb-2 text-sm font-medium text-gray-900  "
          >
            Confirmer votre mot de passe :
          </label>
          <div className="flex items-center mb-4 md:mb-8">
            <Lock className="absolute ml-3" />
            <input
              required
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirmer le mot de passe"
              className="bg-white text-gray-900 border-1 border-black text-sm rounded-full focus:ring-[#F6D50E] w-full ps-12 p-4 border border-black"
            />
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs">{errors.confirmPassword}</p>
          )}

          <div className="items-center text-center md:rounded-full  font-bold text-lg mb-2">
            <span className="mr-2 self-center">Adresse postale</span>
            <span className="rounded-full bg-[#16A1AF] uppercase px-4 py-1 text-xs mr-3 text-white">
              Facultatif
            </span>
          </div>

          <label
            htmlFor="address1"
            className="block mb-2 text-sm font-medium text-gray-900  "
          >
            Votre adresse :
          </label>
          <div className="flex items-center mb-2 md:mb-4 ">
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Adresse - Champ 1"
              className="bg-white text-gray-900 border-1 border-black text-sm rounded-full focus:ring-[#F6D50E] w-full ps-6 p-4 border border-black "
            />
          </div>

          <div className="flex flex-col md:flex-row justify-between mb-2 gap-2 md:mb-8 md:gap-4">
            <input
              name="zip_code"
              value={formData.zip_code}
              onChange={handleChange}
              placeholder="Code postal"
              className="bg-white text-gray-900 border-1 border-black text-sm rounded-full focus:ring-[#F6D50E] w-full ps-6 p-4 border border-black "
            />
            <input
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Ville"
              className="bg-white text-gray-900 border-1 border-black text-sm rounded-full focus:ring-[#F6D50E] w-full ps-6 p-4 border border-black"
            />
          </div>
          {errors.zip_code && (
            <p className="text-red-500 text-xs">{errors.zip_code}</p>
          )}
          {errors.apiError && (
            <p className="text-red-500 text-xs">{errors.apiError}</p>
          )}

          <button
            type="submit"
            className="w-full px-6 py-3 rounded-full text-white bg-[#16A1AF] hover:text-white hover:bg-black focus:outline-none focus:ring-2 focus:ring-[#F6D50E] focus:ring-offset-2 mb-2 md:mb-4"
          >
            Continuer
          </button>
          <button
            type="button"
            onClick={goBack}
            className="w-full px-6 py-3 rounded-full bg-[#F6D50E] hover:text-white hover:bg-black focus:outline-none focus:ring-2 focus:ring-[#F6D50E] focus:ring-offset-2"
          >
            Annuler
          </button>
        </form>
      </div>
    </div>
  );
}

export default Inscription;
