import * as React from "react"
import Svg, {
  G,
  Path,
  Defs,
  LinearGradient,
  Stop,
  ClipPath,
} from "react-native-svg"
import { memo } from "react"

const SvgComponent = () => (
  <Svg width={24} height={24} fill="none">
    <G clipPath="url(#a)">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.997 6.546a.187.187 0 0 0-.187-.173H3.191a.187.187 0 0 0-.186.173L1.693 23.79a.187.187 0 0 0 .186.202h9.283l1.04.008.007-.008h9.913a.188.188 0 0 0 .187-.202L20.997 6.546Zm-8.788 17.446c.27-.31.532-.62.775-.914.966-1.164 5.044-7.74 5.044-7.74s-.52.568-4.061 5.025c-1.28 1.611-2.301 2.78-3.098 3.626l.293.003h1.047ZM7.34 11.425a1.68 1.68 0 1 0 0-3.358 1.68 1.68 0 0 0 0 3.358ZM18.41 9.746a1.68 1.68 0 1 1-3.359 0 1.68 1.68 0 0 1 3.36 0ZM5.715 20.11c-.557.87-.916 2.296-1.137 3.88h1.809c.2-1.464.526-2.786 1.044-3.59 1.639-2.54 4.022-3.29 5.043-3.612l.21-.067c.86-.284 5.398-1.549 5.398-1.549s.615 4.09-.019 7.467c-.085.46-.184.911-.298 1.351h.58c.12-.47.224-.947.315-1.435.693-3.689.02-8.161.02-8.161s-6.28 1.382-7.222 1.692c-.067.023-.144.047-.23.074-1.117.352-3.72 1.174-5.513 3.95Z"
        fill="#fff"
      />
      <Path
        d="m15.954 9.761-.018-4.299a3.903 3.903 0 0 0-7.805 0l-.028 4.3a.766.766 0 0 1-1.531-.004V5.462a5.462 5.462 0 0 1 10.924 0v4.296a.77.77 0 0 1-1.542.003Z"
        fill="url(#b)"
      />
    </G>
    <Defs>
      <LinearGradient
        id="b"
        x1={12.034}
        y1={0}
        x2={12.034}
        y2={10.529}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#B1FF5F" />
        <Stop offset={0.318} stopColor="#83C94C" />
        <Stop offset={1} stopColor="#88CD4E" />
      </LinearGradient>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)

const Cart = memo(SvgComponent)
export  { Cart }
