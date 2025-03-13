import './SubsContainer.css';
import SubPoster from '../SubPoster/SubPoster.jsx';


function Subscriptions({ subscriptions }) {
  if (!subscriptions) {
    return <h2>Loading...</h2>;
  }
  const SubscriptionCards = subscriptions.map(subscription => {
    return (
      < SubPoster
        key       = { subscription.id }
        id        = { subscription.id }
        title     = { subscription.attributes.title }
        price     = { subscription.attributes.price }
        canceled  = { subscription.attributes.canceled }
        frequency = { subscription.attributes.frequency }
      />
    );
  });

  return (
    <section className="subs-container" data-cy="subscriptions-container">
      {SubscriptionCards}
    </section>
  )
}

export default Subscriptions;
