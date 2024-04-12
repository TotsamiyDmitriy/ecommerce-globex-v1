import React, { useState } from 'react';
import styles from './header.module.scss';

import { NavLink, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setSearch } from '../../redux/productSlice';
import axios, { AxiosError } from 'axios';
import { ProductType } from '../../types/mainTypes';
import { AxiosErrorResponce } from '../../types/axios';
import { SearchElement, SignModal } from '..';
import { setSignModal } from '../../redux/authSlice';
import Account from '../Account';

const categories: string[] = ['Men', 'Women', 'Kids'];

const Header: React.FC = () => {
  const [searchAll, setSearchAll] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const [searchProducts, setSearchProducts] = useState<ProductType[]>();

  const { currentUser, search } = useAppSelector((state) => ({
    currentUser: state.auth.currentUser,
    search: state.product.search,
  }));

  const dispatch = useAppDispatch();
  const location = useLocation();

  React.useEffect(() => {
    const fetchSearchProducts = async () => {
      try {
        const { data } = await axios.get<ProductType[]>(
          `/api/product/get/undefined/?search=${searchAll}`,
        );
        setError('');
        setLoading(false);
        setSearchProducts(data);
      } catch (error) {
        setLoading(false);
        setSearchProducts([]);
        if (axios.isAxiosError(error)) {
          const serverError = error as AxiosError<AxiosErrorResponce>;
          setError(serverError.response?.data.message ?? 'Internal Server Error');
        }
      }
    };

    fetchSearchProducts();
    console.log(searchProducts);
  }, [searchAll]);

  const itemHandler = () => {
    setSearchAll('');
    dispatch(setSearch(''));
  };

  return (
    <div className={styles.header}>
      <SignModal />
      <div className={styles.container}>
        <nav className={styles.navigation}>
          <NavLink className={styles.logo} to={'/'}>
            <svg
              width="57"
              height="48"
              viewBox="0 0 57 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M38.5503 37.831L56.9942 48L57 22.6542L38.5503 12.0146V37.831ZM18.8805 0L39.0257 9.2483L20.0776 22.6534L20.071 48L0 38.6318V13.507L18.8805 0Z"
                fill="#002482"
              />
            </svg>
          </NavLink>
          <div className={styles.burger}>
            <span></span>
          </div>
          <ul className={styles.categories}>
            {categories.map((el: string, id) => {
              return (
                <NavLink className={styles.link} key={`${el}__${id}`} to={`/catalog/${id}`}>
                  {el}
                </NavLink>
              );
            })}
            <NavLink to={`/catalog/`} className={styles.link}>
              Shop
            </NavLink>
            <NavLink to={`/about/`} className={styles.link}>
              Contact us
            </NavLink>
          </ul>
          <form className={styles.search}>
            {location.pathname.includes('catalog') ? (
              <>
                <input
                  className={styles.searchArea}
                  type="text"
                  value={search}
                  onChange={(e) => {
                    dispatch(setSearch(e.target.value));
                  }}
                  placeholder="Search..."
                  autoFocus
                />
                <a className={styles.searchLogo}>
                  {search === '' ? (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_1_6141)">
                        <path
                          d="M22.4813 18.7367L18.6804 14.9359L15.7569 13.728C16.7304 12.3437 17.2519 10.6923 17.25 9C17.25 4.45092 13.5491 0.75 9 0.75C4.45092 0.75 0.75 4.45092 0.75 9C0.75 13.5491 4.45092 17.25 9 17.25C10.707 17.2519 12.3721 16.7214 13.7634 15.7323L14.9681 18.648L18.7687 22.449C19.0125 22.6927 19.3019 22.8861 19.6204 23.018C19.9388 23.15 20.2802 23.2179 20.6249 23.2179C20.9696 23.2179 21.311 23.15 21.6295 23.0181C21.948 22.8862 22.2374 22.6928 22.4811 22.4491C22.7249 22.2053 22.9183 21.9159 23.0502 21.5975C23.1821 21.279 23.25 20.9376 23.2501 20.5929C23.2501 20.2482 23.1822 19.9068 23.0503 19.5883C22.9184 19.2698 22.725 18.9805 22.4813 18.7367ZM2.25 9C2.25 5.27812 5.27812 2.25 9 2.25C12.7219 2.25 15.75 5.27812 15.75 9C15.75 12.7219 12.7219 15.75 9 15.75C5.27812 15.75 2.25 12.7219 2.25 9ZM21.4205 21.3883C21.2094 21.599 20.9233 21.7173 20.625 21.7173C20.3267 21.7173 20.0406 21.599 19.8295 21.3883L16.2402 17.799L15.1201 15.088L17.8312 16.208L21.4206 19.7973C21.6313 20.0085 21.7495 20.2946 21.7495 20.5928C21.7495 20.8911 21.6312 21.1772 21.4205 21.3883Z"
                          fill="#272727"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1_6141">
                          <rect width="24" height="24" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  ) : (
                    <svg
                      onClick={() => dispatch(setSearch(''))}
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      viewBox="0 -960 960 960"
                      width="24">
                      <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                    </svg>
                  )}
                </a>
              </>
            ) : (
              <>
                <input
                  className={styles.searchArea}
                  type="text"
                  value={searchAll}
                  onChange={(e) => {
                    setSearchAll(e.target.value);
                  }}
                  placeholder="Search..."
                  autoFocus
                />
                {searchAll && !loading && searchProducts && (
                  <>
                    {error && <div className="">{error}</div>}
                    <ul className={styles.search_list}>
                      {searchProducts?.map((el: ProductType, index: number) => {
                        return (
                          <li
                            key={`${el.name}__${index}`}
                            className={styles.search_list__item}
                            id={`${index}`}>
                            {
                              <NavLink to={`/product/${el.id}`}>
                                <SearchElement
                                  element={el}
                                  itemHandler={itemHandler}></SearchElement>
                              </NavLink>
                            }
                          </li>
                        );
                      })}
                    </ul>
                  </>
                )}
                <a className={styles.searchLogo}>
                  {search === '' ? (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_1_6141)">
                        <path
                          d="M22.4813 18.7367L18.6804 14.9359L15.7569 13.728C16.7304 12.3437 17.2519 10.6923 17.25 9C17.25 4.45092 13.5491 0.75 9 0.75C4.45092 0.75 0.75 4.45092 0.75 9C0.75 13.5491 4.45092 17.25 9 17.25C10.707 17.2519 12.3721 16.7214 13.7634 15.7323L14.9681 18.648L18.7687 22.449C19.0125 22.6927 19.3019 22.8861 19.6204 23.018C19.9388 23.15 20.2802 23.2179 20.6249 23.2179C20.9696 23.2179 21.311 23.15 21.6295 23.0181C21.948 22.8862 22.2374 22.6928 22.4811 22.4491C22.7249 22.2053 22.9183 21.9159 23.0502 21.5975C23.1821 21.279 23.25 20.9376 23.2501 20.5929C23.2501 20.2482 23.1822 19.9068 23.0503 19.5883C22.9184 19.2698 22.725 18.9805 22.4813 18.7367ZM2.25 9C2.25 5.27812 5.27812 2.25 9 2.25C12.7219 2.25 15.75 5.27812 15.75 9C15.75 12.7219 12.7219 15.75 9 15.75C5.27812 15.75 2.25 12.7219 2.25 9ZM21.4205 21.3883C21.2094 21.599 20.9233 21.7173 20.625 21.7173C20.3267 21.7173 20.0406 21.599 19.8295 21.3883L16.2402 17.799L15.1201 15.088L17.8312 16.208L21.4206 19.7973C21.6313 20.0085 21.7495 20.2946 21.7495 20.5928C21.7495 20.8911 21.6312 21.1772 21.4205 21.3883Z"
                          fill="#272727"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1_6141">
                          <rect width="24" height="24" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  ) : (
                    <svg
                      onClick={() => setSearchAll('')}
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      viewBox="0 -960 960 960"
                      width="24">
                      <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                    </svg>
                  )}
                </a>
              </>
            )}
          </form>

          <div className={styles.profile}>
            <ul className={styles.controller}>
              <NavLink to={'/wishlist'} className={styles.favourite}>
                <svg
                  width="29"
                  height="29"
                  viewBox="0 0 29 29"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M26.9698 8.66361C26.8236 8.0912 26.5978 7.54212 26.2992 7.03236C26.0123 6.50208 25.6455 6.01912 25.2117 5.60049C24.5827 4.9736 23.8378 4.47498 23.0186 4.13236C21.3695 3.45555 19.5202 3.45555 17.8711 4.13236C17.0967 4.46013 16.3853 4.92011 15.7686 5.49174L15.6779 5.60049L14.4998 6.77861L13.3217 5.60049L13.2311 5.49174C12.6144 4.92011 11.9029 4.46013 11.1286 4.13236C9.47947 3.45555 7.63016 3.45555 5.98106 4.13236C5.16179 4.47498 4.41693 4.9736 3.78794 5.60049C2.92766 6.43755 2.31868 7.49857 2.02982 8.66361C1.87614 9.25525 1.80298 9.86491 1.81232 10.4761C1.81232 11.0507 1.88482 11.6234 2.02982 12.1799C2.18176 12.7418 2.40084 13.2834 2.68232 13.793C2.9863 14.3168 3.35805 14.7983 3.78794 15.2249L14.4998 25.9367L25.2117 15.2249C25.6412 14.8025 26.0092 14.3186 26.2992 13.793C26.8879 12.7872 27.1947 11.6415 27.1873 10.4761C27.1967 9.86491 27.1236 9.25524 26.9698 8.66361ZM25.1573 11.618C24.9402 12.4462 24.5089 13.2026 23.9067 13.8111L14.4636 23.2361L5.02044 13.8111C4.71272 13.5012 4.44482 13.1542 4.22294 12.778C4.01415 12.4058 3.8499 12.0104 3.73357 11.5999C3.64069 11.1894 3.59208 10.7701 3.58857 10.3492C3.59102 9.91634 3.63963 9.48495 3.73357 9.06236C3.84649 8.65063 4.01091 8.2548 4.22294 7.88424C4.44044 7.50361 4.70869 7.15924 5.02044 6.85111C5.48606 6.39172 6.03308 6.02295 6.63356 5.76361C7.84361 5.27953 9.19352 5.27953 10.4036 5.76361C11.0017 6.01192 11.5418 6.37624 11.9986 6.83299L14.4636 9.31611L16.9286 6.83299C17.385 6.37543 17.9269 6.01208 18.5236 5.76361C19.7336 5.27953 21.0835 5.27953 22.2936 5.76361C22.8935 6.0228 23.4409 6.39255 23.9067 6.85111C24.2221 7.15017 24.4867 7.49817 24.6861 7.88424C25.1059 8.62457 25.3246 9.46191 25.3204 10.313C25.3451 10.7509 25.3085 11.1902 25.2117 11.618H25.1573Z"
                    fill="black"
                  />
                </svg>
              </NavLink>
              <NavLink to={'/cart'} className={styles.cart}>
                <svg
                  width="29"
                  height="29"
                  viewBox="0 0 29 29"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M10.7383 25.7778C11.7393 25.7778 12.5508 24.9663 12.5508 23.9653C12.5508 22.9643 11.7393 22.1528 10.7383 22.1528C9.73727 22.1528 8.92578 22.9643 8.92578 23.9653C8.92578 24.9663 9.73727 25.7778 10.7383 25.7778Z"
                    fill="#272727"
                  />
                  <path
                    d="M21.75 25.7778C22.751 25.7778 23.5625 24.9663 23.5625 23.9653C23.5625 22.9643 22.751 22.1528 21.75 22.1528C20.749 22.1528 19.9375 22.9643 19.9375 23.9653C19.9375 24.9663 20.749 25.7778 21.75 25.7778Z"
                    fill="#272727"
                  />
                  <path
                    d="M26.648 4.32592C26.573 4.23351 26.4785 4.15886 26.3713 4.10732C26.264 4.05579 26.1467 4.02865 26.0277 4.02786H9.25605L9.77967 5.63897H24.9724L22.8216 15.3056H10.7383L7.05689 3.64925C7.01707 3.52557 6.94792 3.41335 6.85534 3.32217C6.76276 3.23099 6.6495 3.16357 6.52522 3.12564L3.22244 2.11064C3.12089 2.07943 3.01418 2.06853 2.90841 2.07857C2.80264 2.0886 2.69989 2.11936 2.60601 2.16911C2.41642 2.26957 2.2745 2.44123 2.21147 2.64633C2.14845 2.85144 2.16948 3.07317 2.26994 3.26277C2.3704 3.45236 2.54207 3.59428 2.74717 3.65731L5.63911 4.54342L9.33661 16.224L8.0155 17.3034L7.91078 17.4081C7.58399 17.7847 7.39877 18.2635 7.387 18.762C7.37524 19.2604 7.53768 19.7474 7.84633 20.139C8.06589 20.406 8.3449 20.6179 8.66102 20.7578C8.97715 20.8977 9.32162 20.9616 9.66689 20.9445H23.1116C23.3253 20.9445 23.5302 20.8597 23.6812 20.7086C23.8323 20.5575 23.9172 20.3526 23.9172 20.139C23.9172 19.9253 23.8323 19.7204 23.6812 19.5694C23.5302 19.4183 23.3253 19.3334 23.1116 19.3334H9.538C9.44524 19.3302 9.35486 19.3032 9.2756 19.2549C9.19633 19.2066 9.13086 19.1387 9.08551 19.0577C9.04016 18.9767 9.01646 18.8854 9.0167 18.7926C9.01694 18.6998 9.04112 18.6086 9.08689 18.5279L11.0283 16.9167H23.4661C23.6523 16.9213 23.8343 16.8612 23.9812 16.7466C24.1281 16.6321 24.2307 16.4701 24.2716 16.2884L26.8252 5.01064C26.8497 4.89055 26.8465 4.76645 26.8158 4.64779C26.7851 4.52913 26.7277 4.41905 26.648 4.32592Z"
                    fill="#272727"
                  />
                </svg>
              </NavLink>
            </ul>
            {currentUser ? (
              <Account />
            ) : (
              <div
                className={styles.signIn}
                onClick={() => {
                  dispatch(setSignModal(true));
                }}>
                <span>Sign In</span>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
