import React from 'react';
import { Link, useSearchParams } from "react-router-dom";

const Error404 = () => {
  return (
    <main className="error404">
      <div className="center">
        <h1 className="title">Meow...page was not found</h1>
        <Link to="/" className="btn link-button">Return to home</Link>
      </div>
    </main>
  );
};
// className="btn btn--orange"
export default Error404;

// Original filters to filter vans by type with use of Link:
/*
  <Link to="?type=simple" className="vans__filter-link">Simple</Link>
  <Link to="?type=rugged" className="vans__filter-link">Rugged</Link>
  <Link to="?type=luxury" className="vans__filter-link">Luxury</Link>
  <Link to="." className="vans__filter-link">Clear</Link>
*/

// onChange={(e) => setFilter(generateSearchParamString('type', 'simple'))}
