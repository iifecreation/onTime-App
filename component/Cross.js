import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function CrossIcon({props, color}) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Path
        d="M17.6569 6.34314L6.34315 17.6568"
        stroke={color}
        strokeWidth={3}
        strokeLinecap="round"
      />
      <Path
        d="M6.34314 6.34314L17.6568 17.6568"
        stroke={color}
        strokeWidth={3}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export default CrossIcon;
