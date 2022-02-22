import React from 'react';
import { Input as AntInput } from 'antd';
import { InputProps } from 'antd/lib/input/Input';

import './Input.less';

interface Props extends InputProps {}

const Input: React.FC<Props> = (props: Props) => {
  return <AntInput className="input" {...props} size="large" />;
};

export default Input;
