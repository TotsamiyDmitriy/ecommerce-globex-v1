import React, { useState } from 'react';
import styles from './filter.module.scss';
import axios, { AxiosError } from 'axios';
import { AxiosErrorResponce } from '../../types/axios';

import FilterAccordion from '../FilterAccordion';
import { useParams, useSearchParams } from 'react-router-dom';
import { PriceRange, Tag } from '..';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  Sort,
  addTag,
  clearAll,
  deleteTag,
  setFiltersState,
  setPriceRange,
  setSortBy,
} from '../../redux/productSlice';

export type FilterType = {
  _id: string;
  count: number;
};

export interface FiltersType {
  [x: string]: FilterType[] | undefined;
  colors: FilterType[];
  sizes: FilterType[];
  brands: FilterType[];
  offers: FilterType[];
}

export type QueryType = {
  [x: string]: string[];
  colors: string[];
  sizes: string[];
  brandName: string[];
  offers: string[];
};

interface FilterProps {
  isActive: boolean;
}

const sortType: Sort[] = [
  { title: 'Popularity', request: 'toprated' },
  { title: 'Price - Low to High', request: 'lowest' },
  { title: 'Price - High to Low', request: 'highest' },
  { title: 'Price - Newest', request: 'newest' },
];

const Filter: React.FC<FilterProps> = ({ isActive }) => {
  const dispatch = useAppDispatch();
  const { filters, priceRange, tags, sortBy, search } = useAppSelector((state) => state.product);

  const [params, setParams] = useState<FiltersType>();

  const [price, setPrice] = useState<[number, number]>([0, 1000]);
  const [range, setRange] = useState<[number, number]>(price);
  const [tagsArray, setTagsArray] = useState<[string, string | undefined][]>([]);

  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const { id } = useParams();

  const onClickClearAll = () => {
    setSearchParams(undefined);
    dispatch(clearAll());
    setRange(price);
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>, title?: string) => {
    if (title && e.target.checked) {
      dispatch(setFiltersState({ ...filters, [title]: [...filters[title], e.target.value] }));
      dispatch(addTag(title));
    } else if (title && !e.target.checked) {
      dispatch(
        setFiltersState({
          ...filters,
          [title]: filters[title].filter((value) => e.target.value !== value),
        }),
      );
      dispatch(deleteTag(title));
    }
  };

  React.useEffect(() => {
    const sizes = searchParams.getAll('sizes');
    const brandName = searchParams.getAll('brandName');
    const offers = searchParams.getAll('offers');
    const colors = searchParams.getAll('colors');

    const minPrice = searchParams.get('min');
    const maxPrice = searchParams.get('max');

    const sort = searchParams.get('sort');

    if (sort) {
      sortType.forEach((value) => {
        if (value.request === sort) {
          dispatch(setSortBy(value));
        }
      });
    }

    if (minPrice !== null && maxPrice !== null && !loading) {
      dispatch(addTag('priceRange'));
      dispatch(setPriceRange([parseInt(minPrice), parseInt(maxPrice)]));
      setRange([parseInt(minPrice), parseInt(maxPrice)]);
    }

    if ((sizes || brandName || offers || colors) && !loading) {
      searchParams.forEach((val, key) => {
        if (val && key !== 'max' && key !== 'min') {
          dispatch(addTag(key));
        }
      });
      dispatch(
        setFiltersState({
          brandName,
          sizes,
          offers,
          colors,
        }),
      );
    }
  }, [searchParams, loading]);

  React.useEffect(() => {
    let params = {};

    params = { ...params, ...filters, sort: sortBy.request };

    if (search) {
      params = { ...params, search: search };
    }
    if (priceRange.length === 2) {
      params = { ...params, min: priceRange[0].toString(), max: priceRange[1].toString() };
    }

    setSearchParams({ ...params });
  }, [filters, priceRange, sortBy, search]);

  React.useEffect(() => {
    setTagsArray(
      Object.entries(tags).filter(
        (val) => typeof val[1] !== 'undefined' && val[0] !== 'sort' && val[0] !== 'search',
      ),
    );
  }, [tags]);

  React.useEffect(() => {
    const fetchParams = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get<{ filters: FiltersType; priceRange: [number, number] }>(
          `/api/product/filters/${id}`,
        );
        setParams(data.filters);
        setPrice(data.priceRange);

        setLoading(false);
        return data;
      } catch (error) {
        setLoading(false);
        if (axios.isAxiosError(error)) {
          const serverError = error as AxiosError<AxiosErrorResponce>;
          return serverError.response?.data.message ?? 'Internal Server Error';
        }
      }
    };
    fetchParams();
  }, [id]);

  return (
    <div className={`${styles.filter} ${isActive && styles.active}`}>
      <div className={styles.tagWrap}>
        <div className={styles.wrapper}>
          <h4 className={styles.title}>Filters</h4>
          <a className={styles.button} onClick={onClickClearAll}>
            Clear all
          </a>
        </div>
        <div className={styles.tags}>
          {tagsArray.map((Arr) => Arr && <Tag key={Arr[0]} tag={Arr[0]} title={Arr[1]} />)}
        </div>
      </div>

      <PriceRange
        range={range}
        price={price}
        setRange={setRange}
        SubmitDispatch={(params) => {
          dispatch(setPriceRange(params));
        }}
      />
      {params &&
        Object.keys(params).map((key) => {
          if (params[key]?.length) {
            return (
              <FilterAccordion
                filters={filters[key]}
                key={key}
                title={key}
                params={params[key]}
                onChangeHandler={onChangeHandler}
              />
            );
          }
        })}
    </div>
  );
};

export default Filter;
