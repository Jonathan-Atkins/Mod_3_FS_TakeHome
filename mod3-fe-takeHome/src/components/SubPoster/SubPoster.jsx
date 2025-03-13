import React from 'react';
import './SubPoster.css';
import { Link } from 'react-router-dom';

function SubPoster({ id, title }) {
  return (
    <Link to={`/${id}`}>
      <section className="sub-poster">
        <h3> 🍵 { title }</h3>
    </section>
    </Link>
  );
}

export default SubPoster;