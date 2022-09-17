import React from 'react';
import styles from './spinner.module.css';

const Spinner = () => {
  return (
    <div className={styles.centerbody}>
      <div className= {styles.loadercircle18}></div>
    </div>
  );
};

export default Spinner;
