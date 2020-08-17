import React from 'react';
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

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export const Product = (props) => {
  const classes = useStyles();

  // Data 
  function fetchProduct(id:number) {
    const productData = [
        {
        "id": 1,
        "name": "Generic Steel Tuna"
        }
    ]
    return productData.map((pData) => (pData.name))
}

let productData = [
  {
  "id": 1,
  "name": "Generic Steel Tuna"
  }]

let salesData = [
        {
          "id": 2,
          "state": "SHIPPED",
          "product": null
        },
        {
          "id": 3,
          "state": "DELIVERED",
          "product": null
        },
        {
          "id": 4,
          "state": "SHIPPED",
          "product": null
        },
        {
          "id": 5,
          "state": "IN_CHARGE",
          "product": null
        }
        
]

  // Filtro el tipo de producto segun solicite el usuario en la tab
  salesData = salesData.filter(row => row.state === props.list)

  const data:any = {productData,salesData}

  // Guardo los datos ya filtrados en el estado del componente
  const [product, setProduct] = React.useState(data);

  // Funcion que actualiza el estado del componente
  function updateProducts() {
    productData = [
      {
      "id": 1,
      "name": "Generic Steel Tuna"
      }]
    salesData = [
        {
          "id": 2,
          "state": "SHIPPED",
          "product": null
        },
        {
          "id": 3,
          "state": "DELIVERED",
          "product": null
        },
        {
          "id": 4,
          "state": "SHIPPED",
          "product": null
        },
        {
          "id": 5,
          "state": "SHIPPED",
          "product": null
        },
        {
          "id": 6,
          "state": "IN_CHARGE",
          "product": null
        },
        {
          "id": 7,
          "state": "SHIPPED",
          "product": null
        },
        {
          "id": 8,
          "state": "IN_CHARGE",
          "product": null
        },
        {
          "id": 9,
          "state": "IN_CHARGE",
          "product": null
        },
        {
          "id": 10,
          "state": "IN_CHARGE",
          "product": null
        },
        {
          "id": 1,
          "state": "SHIPPED",
          "product": null
        }
]
    const newData = {productData,salesData}
    setProduct(newData)
  } 

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
          {product.salesData.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
              {row.id}
              </TableCell>
              <TableCell align="center">{fetchProduct(row.id)}</TableCell>
              <TableCell align="right">
              {props.list === 'IN_CHARGE' ? (
                  <Button variant="outlined" color="primary" onClick={updateProducts}>Enviar</Button>
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
