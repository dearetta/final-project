import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import jwt from "jsonwebtoken";
//import { addShipping } from './actions/cartActions'

class Recipe extends Component {
  componentDidMount() {
    console.log("ini dari recipe", this.props);
    const decoded = jwt.decode(localStorage.getItem("token"));
    console.log(decoded);
  }

  componentWillUnmount() {
    if (this.refs.shipping.checked) this.props.substractShipping();
  }

  handleChecked = e => {
    if (e.target.checked) {
      this.props.addShipping();
    } else {
      this.props.substractShipping();
    }
  };
  handleSubmit = event => {
    event.preventDefault();
    console.log("Submitted!");
    this.props.items.forEach(item => {
      axios.post(`${process.env.REACT_APP_API_URL}/checkout`, {
        totalPrice: this.props.total,
        totalQte: item.quantity,
        userId: decoded.id
      });
    });
  };

  render() {
    return (
      <div className="container">
        <div className="collection">
          <li className="collection-item">
            <label>
              <input
                type="checkbox"
                ref="shipping"
                onChange={this.handleChecked}
              />
              <span>Shipping(+6$)</span>
            </label>
          </li>
          <li className="collection-item">
            <b>Total: Rp {this.props.total} </b>
          </li>
        </div>
        <div className="checkout">
          <button
            onClick={this.handleSubmit}
            className="waves-effect waves-light btn"
          >
            Checkout
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    addedItems: state.cart.addedItems,
    total: state.cart.total
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addShipping: () => {
      dispatch({ type: "ADD_SHIPPING" });
    },
    substractShipping: () => {
      dispatch({ type: "SUB_SHIPPING" });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Recipe);
