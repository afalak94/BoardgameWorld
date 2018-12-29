import React from 'react';
import styles from './notFound.module.css';

const Notfound = () => {
  return (
    <div className={styles.notFound}>
      <h1>404 Not Found</h1>
      <p>No route matches, please enter valid URL address</p>
    </div>
  );
};

export default Notfound;
