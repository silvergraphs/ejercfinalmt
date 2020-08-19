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
  rememberMe: true,
  username: 'admin'
})

// Uso de estilos
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export const Product = (props) => {
  const classes = useStyles();

  const [productList, setProductList] = React.useState([[],[]])

  React.useEffect(() => {
    // URL de las API
    const products = "http://localhost:9000/api/products"
    const sales = "http://localhost:9000/api/sales"
    
    // Se realiza la peticion GET
    const productsRequest = axios.get(products);
    const salesRequest = axios.get(sales);
    
    axios.all([productsRequest, salesRequest]).then(axios.spread((...responses) => {
      const pReq = responses[0]
      const sReq = responses[1]

       // Se filtra el tipo de producto en un array segun solicite el usuario en el TabMenu
       const filteredSales = sReq.data.filter(row => row.state === props.list)

       // Se crea el array para la lista con los nombres de los productos
       const filteredProducts = []
        filteredSales.map((salesData) => {
          const prodId = salesData.id
          pReq.data.map((productData) => {
            if (prodId === productData.id) {
               filteredProducts.push(productData) 
               // Se agregan los productos que coincidan con los datos filtrados en filteredSales a este nuevo array
            }
          })
       })  
      
       const filteredData = [filteredSales,filteredProducts]
       setProductList(filteredData) // Se envia toda la informacion filtrada al estado del componente
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
          {productList[1].map(product => (
            <TableRow key={product.id}>
              <TableCell component="th" scope="row">
              {product.id}
              </TableCell>
          <TableCell align="center">{product.name}</TableCell>
              <TableCell align="right">
              {props.list === 'IN_CHARGE' ? (
                  <Button variant="outlined" color="primary">Enviar</Button>
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
