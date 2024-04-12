import React from 'react';
import styles from './wishlist.module.scss';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useAppSelector } from '../../redux/hooks';
import WishlistElement from '../../components/WishlistElement';
import { ProductType } from '../../types/mainTypes';

const Wishlist: React.FC = () => {
  const [localList] = useLocalStorage<null | ProductType[]>(null, 'local_wishlist');

  const { currentUser } = useAppSelector(({ auth }) => auth);

  React.useEffect(() => {}, []);

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          My <span>Wishlist</span>
        </h2>
        <div className={styles.grid}>
          <WishlistElement title="Favourites" description="" products={localList} />
          <WishlistElement title="Add new..." description="" createNew />
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
