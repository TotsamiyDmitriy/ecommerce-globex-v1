import React from 'react';
import ReactSlider from 'react-slider';
import styles from './priceRange.module.scss';
import './rangeSlider.scss';

interface PriceRangeProps {
  price: [number, number];
  range: [number, number];
  setRange: React.Dispatch<[number, number]>;
  SubmitDispatch: (params: [number, number]) => void;
}

const PriceRange: React.FC<PriceRangeProps> = ({ price, range, setRange, SubmitDispatch }) => {
  React.useEffect(() => {
    setRange(price);
  }, [price]);

  return (
    <div className={styles.main}>
      <div className={styles.title}>Price</div>
      <div className={styles.wrapper}>
        <ReactSlider
          className={styles.slider}
          thumbClassName={styles.thumb}
          trackClassName={'track'}
          value={range}
          ariaLabel={['Leftmost thumb', 'Rightmost thumb']}
          renderThumb={(props) => <div {...props}></div>}
          minDistance={100}
          max={price[1]}
          min={price[0]}
          onAfterChange={(value, index) => {
            if (index === 0) {
              setRange([value[0], range[1]]);
            } else {
              setRange([range[0], value[1]]);
            }
          }}
        />
        <button className={styles.button} onClick={() => SubmitDispatch(range)}>
          Submit
        </button>
      </div>
      <div className={styles.minMax}>
        <div className={styles.min}>
          <span className={styles.titleMin}>Min</span>
          <div className={styles.inputMin}>
            Rs.
            <span>{range[0]}</span>
          </div>
        </div>
        <div className={styles.max}>
          <span className={styles.titleMax}>Max</span>
          <div className={styles.inputMax}>
            Rs.
            <span>{range[1]}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceRange;
