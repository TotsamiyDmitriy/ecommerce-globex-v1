import React from 'react';

import styles from './searchElement.module.scss';
import { ProductType } from '../../types/mainTypes';
interface ISearchEl {
  element: ProductType;
  itemHandler?: () => void;
}

const SearchElement: React.FC<ISearchEl> = ({ element, itemHandler }) => {
  const price =
    element.offers.length > 0 ? (element.price % 100) * parseInt(element.offers[0]) : element.price;

  return (
    <div className={styles.main} onClick={itemHandler}>
      <div className={styles.info}>
        <img className={styles.photo} src={element.photos[0]} alt="photo" />
        <div className={styles.infoText}>
          <h4 className={styles.title}>{element.name}</h4>
          <p className={styles.brand}>{element.brandName}</p>
        </div>
      </div>
      <div className={styles.infoPrice}>
        <span className={styles.price}>{` Rs. ${price}`}</span>
      </div>
    </div>
  );
};

export default SearchElement;
