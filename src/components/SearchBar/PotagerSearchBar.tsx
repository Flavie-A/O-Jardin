import React, { useRef, useState } from 'react';
import { Search } from 'react-feather';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import fetchAllProducts from '../../store/thunks/productThunks';
import { Product } from '../../@types/types';

interface PotagerSearchBarProps {
  products: Product[];
  addToGarden: (product: Product) => void;
}

function PotagerSearchBar({ addToGarden }: PotagerSearchBarProps) {
  const refSubmitSearchbar = useRef<null | HTMLFormElement>(null);
  const refInputSearchbar = useRef<null | HTMLInputElement>(null);
  const refListeSearchbar = useRef<null | HTMLDivElement>(null);

  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.allProducts);

  const [inputValue, setInputValue] = useState('');
  const [isFilterVisible, setIsFilterVisible] = useState(true);

  const handleBlur = () => {
    setTimeout(() => {
      if (
        refInputSearchbar.current &&
        refListeSearchbar.current &&
        refSubmitSearchbar.current &&
        !refInputSearchbar.current.contains(document.activeElement) &&
        !refListeSearchbar.current.contains(document.activeElement) &&
        !refSubmitSearchbar.current.contains(document.activeElement)
      ) {
        setIsFilterVisible(false);
        setInputValue('');
      }
    }, 0);
  };

  const filteredProducts = products.filter((product) => {
    const productNameToLower = product.name.toLowerCase();
    const searchStringLower = inputValue.toLowerCase();
    return productNameToLower.includes(searchStringLower);
  });

  return (
    <div className="w-full  py-4">
      <form
        ref={refSubmitSearchbar}
        className="flex w-full md:w-2/3 items-center mx-auto pl-8"
        onSubmit={(event) => {
          event.preventDefault();
          setInputValue('');
        }}
      >
        <div className="relative w-full">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <Search />
          </div>
          <input
            ref={refInputSearchbar}
            type="text"
            className="bg-white text-gray-900 text-sm rounded-full focus:ring-[#7AC808] block w-full ps-10 py-4  shadow-lg border border-gray-200"
            placeholder="Ajouter un fruit ou un légume..."
            value={inputValue}
            onBlur={handleBlur}
            onFocus={() => {
              setIsFilterVisible(true);
            }}
            onChange={(event) => {
              setInputValue(event.target.value);
              dispatch(fetchAllProducts());
            }}
          />
        </div>
        <button
          type="submit"
          className="py-4 px-6 -translate-x-10 text-sm font-medium text-white bg-[#7AC808] rounded-full hover:bg-black focus:ring-1 focus:ring-[#7AC808]"
        >
          Rechercher
        </button>
      </form>
      <div
        className="w-full md:w-2/3 mx-auto pl-14 pr-36 rounded-lg"
        ref={refListeSearchbar}
      >
        {isFilterVisible && (
          <ul className="mt-1 bg-white z-10 divide-y divide-[#7AC808]">
            {inputValue &&
              filteredProducts.map((product) => (
                <li
                  key={product.id}
                  className="hover:bg-[#7AC808] text-black hover:text-white py-2 px-4 flex w-full"
                >
                  <button
                    type="button"
                    className="w-full text-left"
                    onClick={() => {
                      addToGarden(product);
                      setInputValue('');
                    }}
                  >
                    {product.name}
                  </button>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default PotagerSearchBar;
