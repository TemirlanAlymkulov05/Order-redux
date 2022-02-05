import { ADD_ORDER, DELETE_ORDER } from "../actions";

const defaultState = {
  orders: [],
  totalPrice: 0,
  totalCount: 0,
};

export const rootReducer = (state = defaultState, action) => {

  function removeOrder(arr, value) { 
    let index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
    }
    return arr;
}

  switch (action.type) {
    case ADD_ORDER:
      // findIndex
      let is_chosen = state.orders.findIndex(
        (item) => item.title === action.payload.title
      );
      if(is_chosen !== -1) {
        // стордун orders  ключтун копиясы
        let arr = [...state.orders];
        const price =  arr[is_chosen].price
        // тут мы перезаписываем count элемента, найдя его по индексу.
        arr[is_chosen].count = arr[is_chosen].count +1;
        arr[is_chosen].sum = arr[is_chosen].sum + price;
        return {
          ...state,
          orders: arr,
        };
      }else{
        return {
        ...state,
        orders: [
          ...state.orders,
          {
            title: action.payload.title,
            id: 1,
            price: action.payload.price,
            count: 1,
            sum: action.payload.price
          },
        ],
      };
      }
      
    case DELETE_ORDER:
       // findIndex
      let is_chosen2 = state.orders.findIndex(
        (item) => item.title === action.payload.title
      );
      let arr = [...state.orders];
      const price =  arr[is_chosen2].price
      if(action.payload.count <2) {
        // стордун orders  ключтун копиясы
        console.log(state.orders[is_chosen2])
        removeOrder(state.orders, state.orders[is_chosen2])
        return {
          ...state,
          orders: [
            ...state.orders,
          ],
        };
      }else{
        // тут мы перезаписываем count элемента, найдя его по индексу.
        arr[is_chosen2].count = arr[is_chosen2].count -1;
        arr[is_chosen2].sum = arr[is_chosen2].sum - price;
        return {
          ...state,
          orders: arr,
        };
      }
    default:
      return state;
  }
};
