import React from 'react';
import styles from './tag.module.scss';
import { useAppDispatch } from '../../redux/hooks';
import { deleteByTag } from '../../redux/productSlice';
import { useSearchParams } from 'react-router-dom';

interface TagProps {
  title: string | undefined;
  tag: string;
}

const Tag: React.FC<TagProps> = ({ title, tag }) => {
  const dispatch = useAppDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  const onClickHandler = (e: React.MouseEvent<SVGSVGElement>, tag: string) => {
    e.preventDefault();
    dispatch(deleteByTag(tag));
    if (tag === 'range price') {
      searchParams.delete('min');
      searchParams.delete('max');
    } else {
      searchParams.delete(tag);
    }
  };

  return (
    <div className={styles.main}>
      <svg
        className={styles.XMark}
        onClick={(e) => onClickHandler(e, tag)}
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M11.2296 2.06301L9.93705 0.770508L5.99997 4.70759L2.06289 0.770508L0.770386 2.06301L4.70747 6.00009L0.770386 9.93717L2.06289 11.2297L5.99997 7.29259L9.93705 11.2297L11.2296 9.93717L7.29247 6.00009L11.2296 2.06301Z"
          fill="#848484"
        />
      </svg>

      {title}
    </div>
  );
};

export default Tag;
