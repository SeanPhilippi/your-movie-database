import React from 'react';
import PropTypes from 'prop-types';

const withLoading = (Component, Skeleton) => {
  return function withLoadingComponent({ isLoading, ...props }) {
    if (!isLoading) return <Component {...props} />;
    return <Skeleton />;
  };
};

withLoading.propTypes = {
  Component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
};

export default withLoading;
