import React from 'react';

interface Props {
  id: string;
  children: JSX.Element;
  onClick(id: string): void;
}

export const MyToggler = (props: Props) => {
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
