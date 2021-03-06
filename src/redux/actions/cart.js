import {
  ADD_TO_CART,
  REMOVE_ITEM,
  SUB_QUANTITY,
  ADD_QUANTITY,
  GET_ITEM,
  FIND_ONE,
  CHECK_OUT,
  GET_DOG_ITEM
} from "./cart-type";
import axios from "axios";

export const addToCart = id => {
  return {
    type: ADD_TO_CART,
    id
  };
};

//remove item action
export const removeItem = id => {
  return {
    type: REMOVE_ITEM,
    id
  };
};
//subtract qt action
export const subtractQuantity = id => {
  return {
    type: SUB_QUANTITY,
    id
  };
};
//add qt action
export const addQuantity = id => {
  return {
    type: ADD_QUANTITY,
    id
  };
};

export const getItem = () => dispatch => {
  return axios.get(`${process.env.REACT_APP_API_URL}/shop/shop`).then(res => {
    dispatch({
      type: GET_ITEM,
      payload: res
    });
  });
};

export const getDogItem = () => dispatch => {
  return axios
    .get(`${process.env.REACT_APP_API_URL}/shop/dog-shop`)
    .then(res => {
      dispatch({
        type: GET_DOG_ITEM,
        payload: res
      });
    });
};

export const findOne = id => dispatch => {
  // const { id } = this.props.match.params;
  return axios
    .get(`${process.env.REACT_APP_API_URL}/shop/find/${id}`)
    .then(res => {
      dispatch({
        type: FIND_ONE,
        payload: res
      });
    });
};

export const checkOut = id => dispatch => {
  return axios
    .get(`${process.env.REACT_APP_API_URL}/shop/checkout/${id}`)
    .then(res => {
      dispatch({
        type: CHECK_OUT,
        payload: res
      });
    });
};
