import React, { useState, useEffect } from 'react';
import './Payment.css'
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct';
import { Link, useNavigate } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from './reducer';
import instance from './axios';

function Payment() {
  const navigate = useNavigate();
  const [{ basket, user }, dispatch] = useStateValue();
  const stripe = useStripe();
  const elements = useElements();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);

  useEffect(() => {
    const getClientSecret = async () => {
        try {
            const response = await instance.post("/payments/create", { 
                total: getBasketTotal(basket) * 100 // Convert dollars to cents
            });
            setClientSecret(response.data.clientSecret);
        } catch (error) {
            console.error("Error fetching client secret:", error);
        }
    };
    getClientSecret();
  }, [basket]);

  console.log("The client secret is >>> ", clientSecret);

  const handleSubmit = async event => {
    event.preventDefault();
    setProcessing(true);
    const payload = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
            card: elements.getElement(CardElement)
        }
    }).then(({ payment}) => {
        setSucceeded(true);
        setError(null);
        setProcessing(false);
        navigate('/orders', { replace: true });
    })
  };
  const handleChange = event => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  return (
    <div className='payment'>
      <div className='payment__container'>
        <h1>
            Checkout (<Link to="/checkout">{basket?.length} items</Link>)
        </h1>
        {/* Payment Section - Delivery Address */}
        <div className='payment__section'>
          <div className='payment__title'>
            <h3>Delivery Address</h3>
          </div>
          <div className='payment__address'>
            <p>{user?.email}</p>
            <p>123 React Lane</p>
            <p>Chicago, IL</p>
          </div>
        </div>
        {/* Payment Section - Review Items */}
        <div className='payment__section'>
          <div className='payment__title'>
            <h3>Review items and delivery</h3>
          </div>
          <div className='payment__items'>
            {basket.map(item => (
              <CheckoutProduct 
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>
        {/* Payment Section - Payment Method */}
        <div className='payment__section'>
          <div className='payment__title'>
            <h3>Payment Method</h3>
          </div>
          <div className='payment__details'>
            <form onSubmit={handleSubmit}>
                <CardElement onChange={handleChange}/>
                <div className='payment__priceContainer'>
                    <CurrencyFormat 
                        renderText={(value) => (
                            <h3>Order Total: {value}</h3>
                        )}
                        decimalScale={2}
                        value={getBasketTotal(basket)} 
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$"}
                    />
                    <button disabled={processing || disabled || succeeded}>
                        <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                    </button>
                </div>
                {error && <div>error</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment
