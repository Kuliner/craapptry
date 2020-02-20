import fetch from 'isomorphic-unfetch'
import React, { useEffect, useState } from "react";
import styles from "./StarWarsCast.module.css";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/core";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const StarWarsCast = () => {
  async function fetchLastPage(setData) {
    let res = await fetch("/people/");
    let data = await res.json();
    do {
      res = await fetch(data.next);
      data = await res.json();
    } while (data.next);
    setData(data);
  }

  async function fetchData(url) {
    setData(null);
    setLoading(true);
    if (url === "/last/") {
      await fetchLastPage(setData);
      setLoading(false);
      return;
    }

    if (url) {
      const res = await fetch(url);
      const data = await res.json();
      setData(data);
      setLoading(false);
    }
  }

  const [data, setData] = useState({ hits: [] });
  const [loading, setLoading] = useState({ hits: [] });

  useEffect(() => {
    fetchData("/people/");
  }, []);

  return <>
    <ClipLoader
      css={override}
      color={"#123abc"}
      loading={loading}
    />

    {data && data.results ?

      <div className={styles.container}>
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
        <Grid className={styles.tile}>
          <Button variant="contained" onClick={() => {
            fetchData(data?.previous);
          }}>
            Previous
      </Button>
          <Button variant="contained" onClick={() => {
            fetchData(data?.next);
          }}>
            Next
      </Button>
          <Button variant="contained" onClick={() => {
            fetchData("/people/");
          }}>
            First
      </Button>
          <Button variant="contained" onClick={() => {
            fetchData("/last/");
          }}>
            Last
      </Button>
        </Grid>
      </div>
      : <></>
    }
  </>
}

export default StarWarsCast;
