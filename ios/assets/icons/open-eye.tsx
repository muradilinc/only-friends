import * as React from "react"
import Svg, {G, Path} from "react-native-svg"

const OpenEyeIcon = () => (
    <Svg
        fill="none"
        viewBox="0 0 24 24"
        width={24}
        height={24}
    >
        <G
            stroke="#b7bdd2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
        >
            <Path d="M2 12s3.636-7 10-7 10 7 10 7-3.636 7-10 7-10-7-10-7Z"/>
            <Path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
        </G>
    </Svg>
)
export default OpenEyeIcon;
