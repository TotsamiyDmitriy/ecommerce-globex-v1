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

import { Profile } from '../../pages';

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
            {currentUser ? (
              <Profile />
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
