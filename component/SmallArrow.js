import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={5}
    height={10}
    fill="none"
    {...props}
  >
    <Path
      fill="#828282"
      d="M.667 9.667a.667.667 0 0 1-.514-1.094L3.14 5 .26 1.42a.667.667 0 0 1 .1-.94.667.667 0 0 1 .973.1l3.22 4a.667.667 0 0 1 0 .847l-3.333 4a.667.667 0 0 1-.553.24Z"
    />
  </Svg>
)
export default SvgComponent
