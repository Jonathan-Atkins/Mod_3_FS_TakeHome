import React, { useState } from "react";
import "./Homepage.css";
import SubPoster from "../SubPoster/SubPoster.jsx";

function Homepage({ subscriptions }) {
  if (!subscriptions) {
    return <h2>Loading...</h2>;
  }

  const [filter, setFilter] = useState("all");

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredSubscriptions = subscriptions.filter((subscription) => {
    switch (filter) {
      case "canceled_true":
        return subscription.attributes.canceled === true;
      case "canceled_false":
        return subscription.attributes.canceled === false;
      case "no_customers":
        return subscription.relationships.customers.data.length === 0;
      case "customers_present":
        return subscription.relationships.customers.data.length > 0;
      case "price_low_to_high":
        return true; 
      default:
        return true;
    }
  });

  const sortedSubscriptions = filter === "price_low_to_high"
    ? [...filteredSubscriptions].sort((a, b) => a.attributes.price - b.attributes.price)
    : filteredSubscriptions;

  const SubscriptionCards = sortedSubscriptions.map((subscription) => {
    return (
      <SubPoster
        key={subscription.id}
        id={subscription.id}
        title={subscription.attributes.title}
        price={subscription.attributes.price}
        canceled={subscription.attributes.canceled}
        frequency={subscription.attributes.frequency}
      />
    );
  });

  return (
    <section className="SubsContainer">
      <div className="filter">
        <bold><label htmlFor="filter">Filter Subscriptions : </label></bold>
        <select id="filter" value={filter} onChange={handleFilterChange}>
          <option value="all">All</option>
          <option value="canceled_true">Canceled (True)</option>
          <option value="canceled_false">Canceled (False)</option>
          <option value="no_customers">No Customers</option>
          <option value="customers_present">Customers Present</option>
          <option value="price_low_to_high">Price: Low to High</option>
        </select>
      </div>
      {SubscriptionCards}
    </section>
  );
}

export default Homepage;