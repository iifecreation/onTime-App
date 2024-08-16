import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgComponent = ({props, color}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill={color}
      fillRule="evenodd"
      d="M22.5 12a.75.75 0 0 0-.75-.75H4.06l4.721-4.719a.75.75 0 0 0-1.062-1.062l-6 6a.75.75 0 0 0 0 1.062l6 6A.752.752 0 0 0 9.001 18a.751.751 0 0 0-.22-.531l-4.72-4.719H21.75a.75.75 0 0 0 .75-.75Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default SvgComponent
