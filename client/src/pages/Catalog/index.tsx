import React, { useState } from 'react';
import styles from './catalog.module.scss';
import { ProductType } from '../../types/mainTypes';
import axios, { AxiosError } from 'axios';
import MiniCard from '../../components/MiniCard';
import { AxiosErrorResponce } from '../../types/axios';

import { LinearProgress } from '@mui/material/';
import { Filter } from '../../components';
import { useParams, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Sort, setSortBy } from '../../redux/productSlice';

const sortType: Sort[] = [
  { title: 'Popularity', request: 'toprated' },
  { title: 'Price - Low to High', request: 'lowest' },
  { title: 'Price - High to Low', request: 'highest' },
  { title: 'Price - Newest', request: 'newest' },
];

const Catalog = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const [filterIsActive, setFilterIsActive] = useState(false);
  const [sortIsActive, setSortIsActive] = useState(false);

  const [searchParams, _setSearchParams] = useSearchParams();
  const { id } = useParams();

  const { sortBy } = useAppSelector((state) => state.product);

  const dispatch = useAppDispatch();

  const popupSortByHandler: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setSortIsActive(!sortIsActive);
  };

  const filterHandler: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setFilterIsActive(!filterIsActive);
  };

  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get<ProductType[]>(
          `/api/product/get/${id}/?${searchParams.toString()}`,
        );
        setError('');
        setLoading(false);
        setProducts(data);
      } catch (error) {
        setLoading(false);
        setProducts([]);
        if (axios.isAxiosError(error)) {
          const serverError = error as AxiosError<AxiosErrorResponce>;
          setError(serverError.response?.data.message ?? 'Internal Server Error');
        }
      }
    };
    fetchProducts();
  }, [location, searchParams]);

  return (
    <div className={styles.main}>
      {loading && <LinearProgress className={styles.linearBar} />}
      <div className={styles.container}>
        <Filter isActive={filterIsActive} />

        <div className={styles.catalog}>
          <div className={styles.controller}>
            <button
              className={`${styles.sort} ${sortIsActive && styles.active}`}
              onClick={popupSortByHandler}>
              SortBy
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7.5 11.25L15 18.75L22.5 11.25"
                  stroke="#272727"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className={`${styles.sortBlock} ${sortIsActive && styles.active}`}>
                <ul className={styles.Sortlist}>
                  {sortType.map((item) => {
                    return (
                      <li
                        key={item.title}
                        className={`${styles.sortType} ${
                          sortBy.title === item.title && `${styles.active}`
                        }`}
                        onClick={() => {
                          dispatch(setSortBy(item));
                        }}>
                        {item.title}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </button>
            <button
              className={`${styles.filterBtn} ${filterIsActive && styles.active}`}
              onClick={filterHandler}>
              Filters
              <svg width="20" height="24" viewBox="0 0 20 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.25 3.24989C5.91848 3.24989 5.60054 3.38159 5.36612 3.61601C5.1317 3.85043 5 4.16837 5 4.49989C5 4.83141 5.1317 5.14935 5.36612 5.38377C5.60054 5.61819 5.91848 5.74989 6.25 5.74989C6.58152 5.74989 6.89946 5.61819 7.13388 5.38377C7.3683 5.14935 7.5 4.83141 7.5 4.49989C7.5 4.16837 7.3683 3.85043 7.13388 3.61601C6.89946 3.38159 6.58152 3.24989 6.25 3.24989ZM2.7125 3.24989C2.97075 2.51797 3.44967 1.88418 4.08325 1.43588C4.71683 0.987571 5.47386 0.746826 6.25 0.746826C7.02614 0.746826 7.78317 0.987571 8.41675 1.43588C9.05033 1.88418 9.52925 2.51797 9.7875 3.24989H18.75C19.0815 3.24989 19.3995 3.38159 19.6339 3.61601C19.8683 3.85043 20 4.16837 20 4.49989C20 4.83141 19.8683 5.14935 19.6339 5.38377C19.3995 5.61819 19.0815 5.74989 18.75 5.74989H9.7875C9.52925 6.48181 9.05033 7.1156 8.41675 7.5639C7.78317 8.01221 7.02614 8.25295 6.25 8.25295C5.47386 8.25295 4.71683 8.01221 4.08325 7.5639C3.44967 7.1156 2.97075 6.48181 2.7125 5.74989H1.25C0.918479 5.74989 0.600537 5.61819 0.366117 5.38377C0.131696 5.14935 0 4.83141 0 4.49989C0 4.16837 0.131696 3.85043 0.366117 3.61601C0.600537 3.38159 0.918479 3.24989 1.25 3.24989H2.7125ZM13.75 10.7499C13.4185 10.7499 13.1005 10.8816 12.8661 11.116C12.6317 11.3504 12.5 11.6684 12.5 11.9999C12.5 12.3314 12.6317 12.6494 12.8661 12.8838C13.1005 13.1182 13.4185 13.2499 13.75 13.2499C14.0815 13.2499 14.3995 13.1182 14.6339 12.8838C14.8683 12.6494 15 12.3314 15 11.9999C15 11.6684 14.8683 11.3504 14.6339 11.116C14.3995 10.8816 14.0815 10.7499 13.75 10.7499ZM10.2125 10.7499C10.4708 10.018 10.9497 9.38418 11.5833 8.93588C12.2168 8.48757 12.9739 8.24683 13.75 8.24683C14.5261 8.24683 15.2832 8.48757 15.9167 8.93588C16.5503 9.38418 17.0292 10.018 17.2875 10.7499H18.75C19.0815 10.7499 19.3995 10.8816 19.6339 11.116C19.8683 11.3504 20 11.6684 20 11.9999C20 12.3314 19.8683 12.6494 19.6339 12.8838C19.3995 13.1182 19.0815 13.2499 18.75 13.2499H17.2875C17.0292 13.9818 16.5503 14.6156 15.9167 15.0639C15.2832 15.5122 14.5261 15.753 13.75 15.753C12.9739 15.753 12.2168 15.5122 11.5833 15.0639C10.9497 14.6156 10.4708 13.9818 10.2125 13.2499H1.25C0.918479 13.2499 0.600537 13.1182 0.366117 12.8838C0.131696 12.6494 0 12.3314 0 11.9999C0 11.6684 0.131696 11.3504 0.366117 11.116C0.600537 10.8816 0.918479 10.7499 1.25 10.7499H10.2125ZM6.25 18.2499C5.91848 18.2499 5.60054 18.3816 5.36612 18.616C5.1317 18.8504 5 19.1684 5 19.4999C5 19.8314 5.1317 20.1494 5.36612 20.3838C5.60054 20.6182 5.91848 20.7499 6.25 20.7499C6.58152 20.7499 6.89946 20.6182 7.13388 20.3838C7.3683 20.1494 7.5 19.8314 7.5 19.4999C7.5 19.1684 7.3683 18.8504 7.13388 18.616C6.89946 18.3816 6.58152 18.2499 6.25 18.2499ZM2.7125 18.2499C2.97075 17.518 3.44967 16.8842 4.08325 16.4359C4.71683 15.9876 5.47386 15.7468 6.25 15.7468C7.02614 15.7468 7.78317 15.9876 8.41675 16.4359C9.05033 16.8842 9.52925 17.518 9.7875 18.2499H18.75C19.0815 18.2499 19.3995 18.3816 19.6339 18.616C19.8683 18.8504 20 19.1684 20 19.4999C20 19.8314 19.8683 20.1494 19.6339 20.3838C19.3995 20.6182 19.0815 20.7499 18.75 20.7499H9.7875C9.52925 21.4818 9.05033 22.1156 8.41675 22.5639C7.78317 23.0122 7.02614 23.253 6.25 23.253C5.47386 23.253 4.71683 23.0122 4.08325 22.5639C3.44967 22.1156 2.97075 21.4818 2.7125 20.7499H1.25C0.918479 20.7499 0.600537 20.6182 0.366117 20.3838C0.131696 20.1494 0 19.8314 0 19.4999C0 19.1684 0.131696 18.8504 0.366117 18.616C0.600537 18.3816 0.918479 18.2499 1.25 18.2499H2.7125Z" />
              </svg>
            </button>
          </div>
          <div className={styles.list}>
            {error && <div className="">{error}</div>}
            {products.map((val) => (
              <MiniCard key={val._id} product={val} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalog;
