import React from 'react';
import helmetAsync from 'react-helmet-async';
const { Helmet } = helmetAsync;

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
