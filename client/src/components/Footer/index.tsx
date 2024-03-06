import React from 'react';
import styles from './footer.module.scss';

const pp: Array<Array<string>> = [
  ['Women', 'All Women', 'Skirts', 'T-shirts', 'Tops', 'Jackets'],
  ['Men', 'All Men', 'Shirts', 'T-shirts', 'Shorts', 'Jackets'],
  ['Kids', 'All Kids', 'Shirts', 'T-shirts', 'Shorts', 'Jackets'],
  ['Shopping', 'Your cart', 'Your orders', 'Compared items', 'Wishlist', 'Shipping Details'],
  ['More links', 'Blogs', 'Gift center', 'Buying guides', 'New arrivals', 'Clearance'],
];

const Footer: React.FC = () => {
  return (
    <div className={styles.root}>
      <div className={styles.logo}>
        <svg
          className={styles.svg}
          viewBox="0 0 76 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M51.4005 50.4413L75.9923 64L76 30.2056L51.4005 16.0194V50.4413ZM25.1741 0L52.0343 12.3311L26.7702 30.2045L26.7614 64L0 51.509V18.0093L25.1741 0Z"
            fill="white"
          />
        </svg>
        Globex
      </div>
      <div className={styles.container}>
        <div className={styles.navigation}>
          {pp.map((val: Array<string>, id: number) => {
            return (
              <ul key={`${id}`} className={styles.list}>
                {val.map((val: string, id: number) => {
                  return (
                    <li key={`${val}__${id}`} className={styles.element}>
                      {val}
                    </li>
                  );
                })}
              </ul>
            );
          })}
        </div>
        <div className={styles.contact}>
          <h4 className={styles.contactTitle}>Stay In Touch</h4>
          <p className={styles.contactDescription}>
            Stay in touch to get special offers, free giveaways and once in a lifetime deals
          </p>
          <div className={styles.contactInput}>
            <button className={styles.button}>
              <svg
                width="22"
                height="18"
                viewBox="0 0 22 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M3 1H19C20.1 1 21 1.9 21 3V15C21 16.1 20.1 17 19 17H3C1.9 17 1 16.1 1 15V3C1 1.9 1.9 1 3 1Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21 3L11 10L1 3"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <input className={styles.input} type="text" placeholder="Enter your email" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
