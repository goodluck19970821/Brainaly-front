import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import Page from 'src/components/Page';
import { getClassList } from 'src/utils/Api';
import Toolbar from './Toolbar';
import ProductCard from './ProductCard';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  productCard: {
    height: '100%',
    '&:hover': {
      animation: '0.25s ease 0s 1 normal none running'
    }
  }
}));
const ClassView = () => {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function getList() {
      const user = JSON.parse(localStorage.getItem('brainaly_user'));
      await getClassList({ userid: user.userId }).then((res) => {
        console.log(res);
        const productsArray = [];
        for (let i = 0; i < res.result.length; i++) {
          const createDate = new Date(res.result[i].cl_createdAt);
          const students = JSON.parse(res.result[i].cl_students);
          const newData = {
            title: res.result[i].cl_name,
            media: res.result[i].cl_cover === '' ? '/static/collection.png' : `http://localhost:3001/upload/${res.result[i].cl_cover}`,
            description: res.result[i].cl_description,
            id: res.result[i].cl_uid,
            studentNum: students.length,
            created: `${createDate.getFullYear()}-${createDate.getMonth() + 1}-${createDate.getDate()}`
          };
          productsArray.push(newData);
          console.log(res.result[i]);
        }
        setProducts(productsArray);
      });
    }
    getList();
  }, []);
  return (
    <Page
      className={classes.root}
      title="Questions"
    >
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Grid
            container
            spacing={3}
          >
            {products.map((product) => (
              <Grid
                item
                key={product.id}
                lg={12}
                md={12}
                xs={12}
              >
                <ProductCard
                  className={classes.productCard}
                  product={product}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box
          mt={3}
          display="flex"
          justifyContent="center"
        >
          <Pagination
            color="primary"
            count={3}
            size="small"
          />
        </Box>
      </Container>
    </Page>
  );
};

export default ClassView;
