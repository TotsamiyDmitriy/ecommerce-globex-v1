import React from 'react';
import styles from './miniCard.module.scss';
import { ProductType } from '../../types/mainTypes';
import { NavLink } from 'react-router-dom';
interface MiniCardType {
  product: ProductType;
}

const MiniCard: React.FC<MiniCardType> = ({ product }) => {
  const productPrice = product.offers.length
    ? Math.max(...product.offers.map((elem) => parseInt(elem)))
    : false;

  return (
    <NavLink to={`/product/${product._id}`} className={styles.wrapper}>
      <div className={styles.root}>
        <div className={styles.containerProduct}>
          <img className={styles.imageProduct} src={product.photos[0]} alt="" />
          <h3 className={styles.name}>{product.name}</h3>
          <div>
            <span className={styles.brandName}>{product.brandName}</span>
            <span className={styles.rating}>
              {product.rating}
              <svg
                width="18"
                height="17"
                viewBox="0 0 18 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9.00065 0L11.8332 5.73833L18.1673 6.66417L13.584 11.1283L14.6657 17.435L9.00065 14.4558L3.33565 17.435L4.41732 11.1283L-0.166016 6.66417L6.16815 5.73833L9.00065 0Z"
                  fill="#848484"
                />
              </svg>
            </span>
            <div className={styles.priceBlock}>
              <span className={styles.currentPrice}>{`Rs. ${product.price}`}</span>
              {productPrice && <span className={styles.oldPrice}>{`Rs. ${product.price}`}</span>}
              {productPrice && <span className={styles.offer}>{`(${product.offers}% off)`}</span>}
            </div>
          </div>
        </div>
      </div>
    </NavLink>
  );
};

export default MiniCard;
