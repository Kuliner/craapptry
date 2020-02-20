import fetch from 'isomorphic-unfetch'
import React, { useEffect, useState } from "react";
import styles from "./StarWarsCast.module.css";

const StarWarsCast = () => {

  const [data, setData] = useState({ hits: [] });
  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/people/');
      const data = await res.json();
      setData(data);
    }

    fetchData();
  }, []);

  return <div className={styles.container}>
    {
      data?.results?.map(item => {
        return <div className={styles.tile} key={item.name + 'key'}>
          <p className={styles.tileParagraph}>Name: {item.name}</p>
          <p className={styles.tileParagraph}>Height: {item.height}</p>
          <p className={styles.tileParagraph}>Mass: {item.mass}</p>
          <p className={styles.tileParagraph}>Birth year: {item.birth_year}</p>
          <p className={styles.tileParagraph}>Gender: {item.gender}</p>
        </div>
      })
    }
  </div>
}

export default StarWarsCast;