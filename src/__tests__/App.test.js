import React from 'react';
import Root from '../Root';
import App from '../App';

let wrapped;

beforeEach(() => {
  wrapped = shallow(
    <Root>
      <App />
    </Root>
  );
  // console.log(wrapped.dive().dive().dive().dive().dive().debug())
});

it('shows ', () => {

});