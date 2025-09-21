import React from 'react';
import { Helmet } from 'react-helmet-async';

const Meta = ({ title, description, children }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {children}
    </Helmet>
  );
};

export default Meta;
