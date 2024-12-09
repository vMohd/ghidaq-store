import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumbs = ({ items }) => {
  if (!items || items.length === 0) {
    items = [{ label: 'Home', link: '/', active: false }];
  }

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb mb-4">
        {items.map((item, index) => (
          <li
            key={index}
            className={`breadcrumb-item ${item.active ? 'active' : ''}`}
            aria-current={item.active ? 'page' : undefined}
          >
            {item.active ? (
              item.label
            ) : (
              <Link to={item.link}>{item.label}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
