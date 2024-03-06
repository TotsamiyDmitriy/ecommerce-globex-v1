import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Checkbox } from '@mui/material';
import styles from './filterAccordion.module.scss';
import { FilterType } from '../Filter';

interface AccardionType {
  filters: string[];
  title: string;
  params: FilterType[] | undefined;
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>, title?: string) => void;
}

const FilterAccordion: React.FC<AccardionType> = ({ title, filters, params, onChangeHandler }) => {
  return (
    <Accordion className={styles.accordion}>
      <AccordionSummary>
        <div className={styles.summary}>
          <h4>{[title[0].toUpperCase(), ...title.slice(1)]}</h4>
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
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <ul>
          {params &&
            params.map((param) => {
              return (
                <div key={`${param._id}_div`} className="">
                  <Checkbox
                    key={`${param._id}_checkbox`}
                    onChange={(e) => onChangeHandler(e, title)}
                    value={param._id}
                    checked={filters.includes(param._id)}
                    id={param._id}
                  />
                  <span key={`${param._id}_${param.count}`}>
                    {param._id}
                    {` (${param.count})`}
                  </span>
                </div>
              );
            })}
        </ul>
      </AccordionDetails>
    </Accordion>
  );
};

export default FilterAccordion;
