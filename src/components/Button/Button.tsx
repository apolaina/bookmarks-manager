import React, { ReactNode } from 'react';
import { Button as AntButton } from 'antd';
import { ButtonProps } from 'antd/lib/button/button';

import './Button.less';

interface Props extends ButtonProps {
  children: ReactNode;
  transparent?: boolean;
}

const Button: React.FC<Props> = ({ transparent = false, ...props }: Props) => {
  return (
    <AntButton
      className={`button ${transparent && 'transparent'}`}
      shape="round"
      icon={props.icon}
      size="large"
      {...props}>
      {props.children}
    </AntButton>
  );
};

export default Button;
