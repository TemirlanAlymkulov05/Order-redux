import React from 'react'
import './OrderBasket.css'
import { data } from '../../store/data'
import { useSelector, useDispatch } from 'react-redux'
import {  add_order, delete_order } from '../../store/actions'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import Tooltip from '@material-ui/core/Tooltip'
import Skeleton from '@material-ui/lab/Skeleton';
import DeleteIcon from '@material-ui/icons/Delete';
// alert
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { createMuiTheme } from '@material-ui/core'
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export const OrderBasket = () => {

    const orders = useSelector( state => state.orders)
    const dispatch = useDispatch()

    // alert
    const [open, setOpen] = React.useState(false);
    const handleClick = () => {
        setOpen(true);
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    const [openDel, setOpenDel] = React.useState(false);
    const deleteClick = () => {
        setOpenDel(true);
      };
    
      const deleteClick2 = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpenDel(false);
      };
    return <div style={styles.orderContainer}>
        <div style={styles.menuContainer}
            className="Menu">
        {/* <Button variant="outlined" onClick={handleClick}>
            Open success snackbar
  </Button> */}
            <h1>Menu</h1>
            <MenuList>
                {
                    data.map((el, id) => {
                        // биякта оnclick деген событие кошуп диспатч менен сторго объект жонотосунор
                        return <Tooltip title="Добавить в заказы">
                            <MenuItem
                                onClick={ (e) => {dispatch(add_order(el)); handleClick(e) }} 
                                // onClick={handleClick}
                                style={{ cursor: 'pointer' }} 
                                key={id} >
                                <span style={{marginLeft: "25px"}}>
                                    {el.title} 
                            <b>: {el.price}</b>
                                </span>
                            
                        </MenuItem>
                        </Tooltip>
                        
                    })
                }
            </MenuList>
        </div>
        <div style={styles.basketContainer}>
            <h1>Orders</h1>
            <MenuList>
                {
                orders.length ? orders.map((el, id) => {
                    return <MenuItem key={id}>
                        <span  style={{marginLeft: "25px"}}>
                        {el.title}:
                        
                        <b>{el.price} * {el.count}</b>
                        <b>={el.sum}</b></span>
                        <span 
                        onClick={(e) => {dispatch(delete_order(el)); deleteClick(e)}}
                        >
                        <DeleteIcon/>
                        </span>

                    </MenuItem>
                }): <div>
                <Skeleton/>
                <Skeleton animation={false}/>
                <Skeleton animation="wave"/>
            </div>
                }
                <Snackbar open={open} autoHideDuration={1200} onClose={handleClose}>
    <Alert onClose={handleClose} severity="success">
        Заказ успешно добавлен!
</Alert>
</Snackbar>
        <Snackbar open={openDel} autoHideDuration={1200} onClose={deleteClick2}>
            <Alert severity="info">Заказ успешно удален!</Alert>
    </Snackbar>
            </MenuList>
        </div>
    </div>
}

const styles = {
    orderContainer: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    menuContainer: {
        width: '50%',
    },
    basketContainer: {
        width: '50%'
    }
}
