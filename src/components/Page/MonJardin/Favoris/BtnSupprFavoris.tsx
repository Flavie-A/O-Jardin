import { X } from 'react-feather';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchDeleteFav } from '../../../../store/thunks/favoritesThunks';
import { Product } from '../../../../@types/types';
import { useAppDispatch } from '../../../../hooks/redux';
import {fetchUserData} from '../../../../store/thunks/myGardenThunks';

interface BtnSupprFavorisProps {
  allFavProducts: Product[];
  product: Product;
}

function BtnSupprFavoris({ product, allFavProducts }: BtnSupprFavorisProps) {
  const dispatch = useAppDispatch();

  return (
    <div>
      <button
        type="button"
        className="mr-2 mt-2 text-white rounded-full bg-[#16A1AF]"
        onClick={async (event) => {
          event.preventDefault();
          await dispatch(fetchDeleteFav(product.id));
          dispatch(fetchUserData());
        }}
      >
        <X size="35" className="rounded-full p-2" />
      </button>
    </div>
  );
}

export default BtnSupprFavoris;
