import React from "react";
import ReactDOM from "react-dom";
import scriptLoader from "react-async-script-loader";
import Car from "../img/1.png";
import Spinner from "./Spinner";
import Hero from './Hero';

const CLIENT = {
  sandbox:"your sandbox id",
  production:"your client id"
};

const CLIENT_ID = "AW2JtjZyA-gnD9iXZM5TGuIjl31t6oOEJlAPdXNJTiRG_kZxu5_lrZxcHmVnsnaf6OClOblRdFIXSR7m";

let PayPalButton = null;
class PaypalButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showButtons: false,
      loading: true,
      paid: false
    };
    window.React = React;
    window.ReactDOM = ReactDOM;
    
  }

  componentDidMount() {
    const { isScriptLoaded, isScriptLoadSucceed } = this.props;
    if (isScriptLoaded && isScriptLoadSucceed) {
      PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });
      this.setState({ loading: false, showButtons: true });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { isScriptLoaded, isScriptLoadSucceed } = nextProps;

    const scriptJustLoaded =
      !this.state.showButtons && !this.props.isScriptLoaded && isScriptLoaded;

    if (scriptJustLoaded) {
      if (isScriptLoadSucceed) {
        PayPalButton = window.paypal.Buttons.driver("react", {
          React,
          ReactDOM
        });
        this.setState({ loading: false, showButtons: true });
      }
    }
  }

  createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          description: +"bbbb",
          amount: {
            currency_code: "USD",
            value: `${this.props.totalPrice}`
          }
        }
      ]
    });
  };

  onApprove = (data, actions) => {
    actions.order.capture().then(details => {
      const paymentData = {
        payerID: data.payerID,
        orderID: data.orderID
      };
      console.log("Payment Approved: ", paymentData);
      this.setState({ showButtons: false, paid: true });
    });
  };

  render() {
    const { showButtons, loading, paid } = this.state;
    return (
      <div className="paypelApp">
      
        {loading && <Spinner />}

        {showButtons && (
          <div>
          <i className="fa fa-arrow-right" style={{fontSize:36}} onClick={ ()=>{ this.setState({ showButtons: false}); window.location.reload(false);} }></i>
            <div>
              <h1 className="title">Payment</h1>
              <hr/>
              <h2>Total price: ${this.props.totalPrice}</h2>
            </div>
            <div className="main">
            <PayPalButton
              createOrder={(data, actions) => this.createOrder(data, actions)}
              onApprove={(data, actions) => this.onApprove(data, actions)}
            />
          </div>
         
          </div>
        )}

        {paid && (
          <div className="main">
            <h2>
              Congrats! you just paid for that picture. Work a little harder and
              you'll be able to afford the car itself{" "}
              <span role="img" aria-label="emoji">
                {" "}
                😉
              </span>
            </h2>
          </div>
        )}
      </div>
  
    );
  }
}

export default scriptLoader(`https://www.paypal.com/sdk/js?client-id=${CLIENT_ID}`)(PaypalButton);
