import { Product } from '../../@types/types';
import slugify from '../../utils/utils';

export default function findProduct(
  products: Product[],
  searchedProduct: string | undefined
) {
  const foundProduct = products.find((product) => {
    return slugify(product.name) === searchedProduct;
  });
  return foundProduct;
}
