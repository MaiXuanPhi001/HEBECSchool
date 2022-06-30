import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { memo } from "react"

const SvgComponent = () => (
  <Svg width={20} height={20} fill="none">
    <Path
      d="m19.361 18.217-4.76-4.95a8.049 8.049 0 0 0 1.894-5.192C16.495 3.623 12.873 0 8.42 0 3.968 0 .345 3.623.345 8.075c0 4.453 3.623 8.075 8.075 8.075a7.989 7.989 0 0 0 4.627-1.461l4.796 4.988c.2.208.47.323.759.323a1.054 1.054 0 0 0 .759-1.783ZM8.421 2.107a5.975 5.975 0 0 1 5.968 5.968 5.975 5.975 0 0 1-5.969 5.969 5.975 5.975 0 0 1-5.968-5.969A5.975 5.975 0 0 1 8.42 2.107Z"
      fill="#231F20"
    />
  </Svg>
)

const SearchIc = memo(SvgComponent)
export {SearchIc}
