import React from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';

// Autenticacion con la API
axios.post('/api/authenticate', {
  password: 'admin',
  rememberMe: false,
  username: 'admin'
})
.then(function (response) {
  const apiToken = response.data.id_token;
})

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export const Product = (props) => {
  const classes = useStyles();

  const [productList, setProductList] = React.useState([])

  React.useEffect(() => {

    
    const products = "http://localhost:9000/api/products"
    const sales = "http://localhost:9000/api/sales"
    
    const productsRequest = axios.get(products);
    const salesRequest = axios.get(sales);
    
    axios.all([productsRequest, salesRequest]).then(axios.spread((...responses) => {
      const pReq = responses[0]
      const sReq = responses[1]
      
      
       // Filtro el tipo de producto segun solicite el usuario en la tab
       const filteredData = sReq.data.filter(row => row.state === props.list)
       setProductList(filteredData)
    })) 
  }, [])

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="center">Producto</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productList.map(product => (
            <TableRow key={product.id}>
              <TableCell component="th" scope="row">
              {product.id}
              </TableCell>
              <TableCell align="center">Product Name</TableCell>
              <TableCell align="right">
              {props.list === 'IN_CHARGE' ? (
                  <Button variant="outlined" color="primary" /* onClick={updateProducts} */>Enviar</Button>
                  ) : props.list === 'SHIPPED' ? (
                  <Button variant="outlined" color="primary">Entregar</Button>
                  ) : (
                   <div>
                  <Button variant="outlined" color="primary" disabled><CheckIcon/></Button>
                  </div>
                    )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
