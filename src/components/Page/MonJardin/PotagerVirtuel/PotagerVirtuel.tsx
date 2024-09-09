import React, { useState, useEffect } from 'react';
import { X } from 'react-feather';
import { useAppSelector, useAppDispatch } from '../../../../hooks/redux';
import { setHorizontal, setVertical } from '../../../../store/reducers/potager';
import {
  updateProductPosition,
  fetchAllProductsInVirtualGarden,
  fetchMatchingProducts,
  removeProductFromVirtualGarden,
} from '../../../../store/thunks/virtualGardenThunks';
import {
  addToGarden,
  addToVirtualGarden,
} from '../../../../store/reducers/virtualGardenReducer';
import { Product } from '../../../../@types/types';
import PotagerSearchBar from '../../../SearchBar/PotagerSearchBar';

function PotagerVirtuel() {
  const dispatch = useAppDispatch();
  const { horizontal, vertical } = useAppSelector((state) => state.potager);
  const products = useAppSelector((state) => state.virtualGarden.products);
  const garden = useAppSelector((state) => state.virtualGarden.garden);
  const favProducts = useAppSelector((state) => state.myGarden.favProducts);
  let productsToDisplay = garden.concat(favProducts);
  const matchingProducts = useAppSelector(
    (state) => state.virtualGarden.matchingProducts
  );

  const [draggedProduct, setDraggedProduct] = useState<Product | null>(null);

  useEffect(() => {
    dispatch(fetchAllProductsInVirtualGarden()).then(() => {
      dispatch(fetchMatchingProducts());
    });

    dispatch(setHorizontal(8));
    dispatch(setVertical(5));
  }, [dispatch]);

  const handleDragStart = (product: Product) => {
    console.log('drag start', product);
    setDraggedProduct(product);
  };

  const handleDrop = async (position: string) => {
    if (draggedProduct) {
      console.log('type', typeof draggedProduct.position)
      if (typeof draggedProduct.position === 'string' && draggedProduct.position !== '') {
        handleRemoveFromGarden(draggedProduct.id, draggedProduct.position)
        };
      await dispatch(
        updateProductPosition({ product_id: draggedProduct.id, position })
      );
      await dispatch(
        addToVirtualGarden({
          product_id: draggedProduct.id,
          position,
          quantity: 1,
        })
      );
      productsToDisplay = productsToDisplay.filter(
        (p) => p.id !== draggedProduct.id
      );
      await dispatch(fetchAllProductsInVirtualGarden());
      await dispatch(fetchMatchingProducts());

      setDraggedProduct(null);
    }
  };

  const handleAddToGarden = (product: Product) => {
    const productInGarden = productsToDisplay.find((p) => p.id === product.id);
    if (productInGarden) {
      return;
    }
    dispatch(addToGarden({ ...product, position: '' }));
  };

  const handleRemoveFromGarden = async (product_id: number, position: string) => {
    await dispatch(removeProductFromVirtualGarden({product_id, position}));
    await dispatch(fetchAllProductsInVirtualGarden());
    await dispatch(fetchMatchingProducts());
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const renderGrid = () => {
    const rows = [];
    for (let row = 0; row < vertical; row += 1) {
      const cols = [];
      for (let col = 0; col < horizontal; col += 1) {
        const position = `{${row},${col}}`;
        const product = matchingProducts.find((p) => {
          const regex = /\{(\d+), (\d+)\}/;
          const match = p.position && p.position.match(regex);
          if (match) {
            const positionObj = {
              row: parseInt(match[1], 10),
              col: parseInt(match[2], 10),
            };
            return positionObj.row === row && positionObj.col === col;
          }
          return false;
        });

        cols.push(
          <div
            key={`${row}-${col}`}
            onDrop={() => handleDrop(position)}
            onDragOver={handleDragOver}
            className="rounded-lg w-24 h-24 flex items-center justify-center bg-[#7AC808] bg-opacity-30 mx-0.5"
          >
            {product && (
              <div
                className="relative flex flex-col items-center rounded-lg overflow-hidden shadow-lg"
                draggable
                onDragStart={() => handleDragStart(product)}
              >
                <img
                  src={`${import.meta.env.VITE_API_URL}${product.picture}`}
                  alt={product.name}
                  className="w-24 h-24 object-cover mx-auto"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveFromGarden(product.id, position)}
                  className="absolute text-white top-1 right-1 bg-[#16A1AF] text-white rounded-full"
                >
                  <X size="28" className="rounded-full p-1" />
                </button>
              </div>
            )}
          </div>
        );
      }
      rows.push(
        <div key={row} className="flex">
          {cols}
        </div>
      );
    }
    return rows;
  };

  const handleHorizontalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(0, Math.min(15, Number(e.target.value)));
    dispatch(setHorizontal(value));
  };

  const handleVerticalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(0, Math.min(20, Number(e.target.value)));
    dispatch(setVertical(value));
  };

  return (
    <div className="flex flex-col items-center bg-[#7AC808] bg-opacity-30 p-6 my-4 rounded-lg ">
      <h2 className="text-center text-xl font-bold">Mon potager virtuel</h2>

      <PotagerSearchBar products={products} addToGarden={handleAddToGarden} />
      <div className="w-full rounded-lg ">
        <ul className="flex flex-col w-full rounded-lg  py-4">
          <div className="flex flex-wrap justify-center rounded-lg gap-4">
            {productsToDisplay.map((product) => (
              <li
                key={`garden-${product.id}`}
                className="bg-white rounded-lg mx-auto md:mx-0 w-1/3 md:w-1/6"
              >
                <div className="rounded-lg overflow-hidden shadow-lg ">
                  <img
                    src={`${import.meta.env.VITE_API_URL}${product.picture}`}
                    alt={product.name}
                    className="w-full h-32 object-cover mx-auto"
                    draggable
                    onDragStart={() => handleDragStart(product)}
                  />
                  <div className="text-center my-2  font-semibold">
                    {product.name}
                  </div>
                </div>
              </li>
            ))}
          </div>
        </ul>
      </div>
      <div className="m-4 p-4 bg-white shadow-xl rounded-lg text-center">
        <h1 className="text-2xl font-bold mb-4">Potager Virtuel</h1>
        <p className="mb-4">Planifiez et visualisez votre potager virtuel.</p>
        <div className="flex justify-center mb-4">
          <label className="mr-4">
            Horizontal:
            <input
              type="number"
              value={horizontal}
              onChange={handleHorizontalChange}
              className="ml-2 border rounded px-2 py-1 w-16 text-center"
              min="0"
              max="15"
            />
          </label>
          <label>
            Vertical:
            <input
              type="number"
              value={vertical}
              onChange={handleVerticalChange}
              className="ml-2 border rounded px-2 py-1 w-16 text-center"
              min="0"
              max="20"
            />
          </label>
        </div>
        <div className="grid gap-1">{renderGrid()}</div>
      </div>
    </div>
  );
}

export default PotagerVirtuel;
