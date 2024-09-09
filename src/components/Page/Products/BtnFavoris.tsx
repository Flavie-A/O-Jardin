import { Heart } from 'react-feather';
import { useEffect, useState } from 'react';
import {
  fetchAddProductToFav,
  fetchDeleteFav,
} from '../../../store/thunks/favoritesThunks';
import { Product } from '../../../@types/types';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import fetchAllProducts from '../../../store/thunks/productThunks';

interface BtnFavorisProps {
  allFavProducts: Product[];
  product: Product;
  logged: boolean;
  
}

function BtnFavoris({ logged, product, allFavProducts }: BtnFavorisProps) {
  const dispatch = useAppDispatch();

  const [isFav, setIsFav] = useState(false);

  const checkIsFav = (productId: number) => {
    const isFruitFav = allFavProducts.some(
      (favProduct) => favProduct.id === productId
    );
    setIsFav(isFruitFav);
    return setIsFav(isFruitFav);
  };
  useEffect(() => {
    checkIsFav(product.id);
  }, [allFavProducts, product.id]);

  return (
    <div>
      {!isFav ? (
        <button
          type="button"
          className="mr-4 mt-4 text-black rounded-full bg-white"
          onClick={(event) => {
            event.preventDefault();
            dispatch(fetchAddProductToFav(product.id));
            setIsFav(true);
          }}
        >
          <Heart size="35" className="rounded-full p-2" />
        </button>
      ) : (
        <button
          type="button"
          className="mr-4 mt-4 text-white rounded-full bg-[#16A1AF]"
          onClick={(event) => {
            event.preventDefault();
            dispatch(fetchDeleteFav(product.id));
            setIsFav(false);
          }}
        >
          <Heart size="35" className="rounded-full p-2" />
        </button>
      )}
    </div>
  );
}

export default BtnFavoris;
