import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './SubDetails.css';

function SubDetails() {
  const id = useParams().id;
  const [subscription, setSubscription] = useState();

  useEffect(() => {
    fetch(`http://localhost:3000/api/v1/subscriptions/${id}`)
      .then((response) => response.json())
      .then((data) => setSubscription(data.data))
      .catch((error) => console.log('error message: ', error.message));
  }, [id]);

  const toggleCanceled = () => {
    fetch(`http://localhost:3000/api/v1/subscriptions/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        subscription: {
          canceled: !subscription.attributes.canceled,
        },
      }),
    })
      .then((response) => response.json())
      .then((data) => setSubscription(data.data))
      .catch((error) => console.log('error message: ', error.message));
  };

  if (!subscription) {
    return <h2>Loading...</h2>;
  }

  return (
    <section className="sub-details">
      <h2>{subscription.attributes.title}</h2>
      <p>Price: ${subscription.attributes.price}</p>
      <p>Frequency: {subscription.attributes.frequency}</p>
      <p>Status: {subscription.attributes.canceled ? 'Canceled' : 'Active'}</p>
      <p>Customers: {subscription.relationships.customers.data.map(customer => customer.id).join(", ")}</p>
      
      <div className="diods">
        <div className="diod diod__active"></div>
      </div>

      <div className="btns">
        <button className="btn btn__primary" onClick={toggleCanceled}>
          {subscription.attributes.canceled ? 'Activate' : 'Cancel'}
        </button>
      </div>
    </section>
  );
}

export default SubDetails;