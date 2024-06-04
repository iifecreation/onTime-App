import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function CustomSvg(props) {
  return (
    <Svg
      width={18}
      height={15}
      viewBox="0 0 18 15"
      fill="none"
      {...props}
    >
      <Path
        d="M1 7.66667L7.15385 13L17 1"
        stroke="white"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export default CustomSvg;
