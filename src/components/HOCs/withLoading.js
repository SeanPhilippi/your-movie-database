import React from 'react';
import PropTypes from 'prop-types';
import Spinner from '../Spinner';

const withLoading = (Component, Skeleton) => {
  return function withLoadingComponent({ isLoading, ...props }) {
    if (!isLoading) return <Component {...props} />;
    return Skeleton ? <Skeleton /> : <Spinner />;
  };
};

withLoading.propTypes = {
  Component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
};

export default withLoading;
