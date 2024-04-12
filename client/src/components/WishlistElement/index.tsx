import React from 'react';
import styles from './wishlistElement.module.scss';
import { ProductType } from '../../types/mainTypes';
import SearchElement from '../SearchElement';
import { NavLink } from 'react-router-dom';

interface WishlistI {
  title: string;
  description: string;
  products?: ProductType[] | null;
  createNew?: boolean;
}

const WishlistElement: React.FC<WishlistI> = ({
  title,
  description,
  products,
  createNew = false,
}) => {
  return createNew ? (
    <div className={`${styles.main} ${styles.new}`}>
      <h3 className={`${styles.title} ${styles.new}`}>{title}</h3>
      <p className={`${styles.description} ${styles.new}`}>{description}</p>
      <div className={`${styles.list} ${styles.new}`}>
        <div className={styles.addNew}>
          <svg
            version="1.1"
            id="plus"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="122px"
            height="122px"
            viewBox="0 0 122 122"
            enableBackground="new 0 0 122 122">
            <g>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M108.993,47.079c7.683-0.059,13.898,6.12,13.882,13.805 c-0.018,7.683-6.26,13.959-13.942,14.019L75.24,75.138l-0.235,33.73c-0.063,7.619-6.338,13.789-14.014,13.78 c-7.678-0.01-13.848-6.197-13.785-13.818l0.233-33.497l-33.558,0.235C6.2,75.628-0.016,69.448,0,61.764 c0.018-7.683,6.261-13.959,13.943-14.018l33.692-0.236l0.236-33.73C47.935,6.161,54.209-0.009,61.885,0 c7.678,0.009,13.848,6.197,13.784,13.818l-0.233,33.497L108.993,47.079L108.993,47.079z"
              />
            </g>
          </svg>
        </div>
      </div>
    </div>
  ) : (
    <div className={styles.main}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      <div className={styles.list}>
        {products ? (
          products.map((product) => <SearchElement element={product} />)
        ) : (
          <p className={styles.noOne}>There are no elements, add something.</p>
        )}
      </div>
      <div className={styles.control}>
        {products ? (
          <NavLink to={'/cart'}>
            <button className={styles.button}>To cart</button>
          </NavLink>
        ) : (
          <NavLink to={'/catalog'}>
            <button className={styles.button}>To catalog</button>
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default WishlistElement;
