import React from 'react';

const Header = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
      {props.sub && <h4>{props.sub}</h4>}
    </div>
  );
};

Header.defaultProps = {
  title: 'Indecision'
};

export default Header;