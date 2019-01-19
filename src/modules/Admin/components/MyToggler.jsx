import React from 'react';

export const MyToggler = props => {
  const handleButtonClick = () => {
    const { onClick, id } = props;
    onClick(id);
  };

  return (
    <div>
      <div onClick={handleButtonClick}>{props.children}</div>
    </div>
  );
};
