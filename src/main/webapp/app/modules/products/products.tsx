import React from 'react';

// Componentes de Material UI
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
// Imports para modificar la paleta de colores
import { createMuiTheme } from '@material-ui/core/styles';
import { makeStyles, Theme, ThemeProvider } from '@material-ui/core/styles';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export const Products = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  // Cambios a la paleta de colores
  const tema = createMuiTheme({
    palette: {
      primary: {
        main: '#2a699d',
      },
    },
  });

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

 return <ThemeProvider theme={tema}>
   <div id="products" className={classes.root}>
 <AppBar position="static" color="default">
   <Tabs
     value={value}
     onChange={handleChange}
     variant="scrollable"
     scrollButtons="on"
     indicatorColor="primary"
     textColor="primary"
     aria-label="scrollable force tabs example"
   >
     <Tab label="Encargado" icon={<ShoppingBasket />} {...a11yProps(0)} />
     <Tab label="Enviado" icon={<ArrowUpwardIcon />} {...a11yProps(1)} />
     <Tab label="Entregado" icon={<CheckCircleIcon />} {...a11yProps(2)} />
   </Tabs>
 </AppBar>
 <TabPanel value={value} index={0}>
   Pedidos encargados
 </TabPanel>
 <TabPanel value={value} index={1}>
   Pedidos enviados
 </TabPanel>
 <TabPanel value={value} index={2}>
   Pedidos entregados
 </TabPanel>
</div>
</ThemeProvider>
}

export default Products;