import React from 'react';

class Footer extends React.Component {

  render() {
    return (
      <footer style={{ paddingTop: "20px" }}>
        <img src="https://www.themoviedb.org/assets/1/v4/logos/408x161-powered-by-rectangle-blue-10d3d41d2a0af9ebcb85f7fb62ffb6671c15ae8ea9bc82a2c6941f223143409e.png"
          alt=""
          style={{ width: "130px", height: "auto" }} />
      </footer>
    )
  }
}

export default Footer;