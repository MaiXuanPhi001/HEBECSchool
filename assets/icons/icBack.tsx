import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { memo } from "react"

const SvgComponent = () => (
  <Svg width={15} height={24} fill="none" >
    <Path
      d="m4.888 12.005 8.978-8.979c.248-.246.384-.576.384-.928 0-.351-.136-.681-.384-.928L13.08.384A1.302 1.302 0 0 0 12.15 0c-.351 0-.68.136-.928.384L.533 11.074a1.302 1.302 0 0 0-.383.93c0 .354.135.685.383.933l10.68 10.68c.247.247.577.383.929.383.351 0 .68-.136.928-.384l.787-.786a1.314 1.314 0 0 0 0-1.856l-8.969-8.969Z"
      fill="#fff"
    />
  </Svg>
)
const Back = memo(SvgComponent)
export { Back }
