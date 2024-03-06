import React, { useState } from 'react';
import { ProductType } from '../../types/mainTypes';
import { useParams } from 'react-router-dom';

import styles from './product.module.scss';
import axios from 'axios';

const Product: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [singleProduct, setSingleProduct] = useState<ProductType>();

  const { id } = useParams();

  React.useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get<ProductType>(`/api/product/get-one/${id}`);
        setSingleProduct(data);
        console.log(singleProduct);

        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
  }, []);

  return <div id="root"></div>;
};

export default Product;
