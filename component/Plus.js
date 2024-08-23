import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgComponent = ({props, color}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeWidth={3}
      d="M10 2v16M2 10h16"
    />
  </Svg>
)
export default SvgComponent
