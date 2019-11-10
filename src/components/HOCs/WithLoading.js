import React from 'react';
import PropTypes from 'prop-types';
import Spinner from '../Spinner';

const withLoading = Component => {
  return function withLoadingComponent({ isLoading, ...props }) {
    if (!isLoading) return <Component {...props} />;
    return <Spinner />
  };
};

withLoading.propTypes = {
  Component: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func
  ]),
};

export default withLoading;