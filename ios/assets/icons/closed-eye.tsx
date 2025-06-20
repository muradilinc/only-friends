import * as React from "react";
import Svg, {Path} from "react-native-svg";

const ClosedEyeIcon = () => (
    <Svg
        fill="none"
        viewBox="0 0 24 24"
        width={24}
        height={24}
    >
        <Path
            stroke="#a6adc5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9.764 5.295A8.618 8.618 0 0 1 12 5c6.364 0 10 7 10 7s-.829 1.596-2.388 3.264M4.349 8.777C2.815 10.431 2 12 2 12s3.636 7 10 7a8.62 8.62 0 0 0 2.274-.306M11.5 14.96A3.004 3.004 0 0 1 9.17 13m3.33-3.959a3.002 3.002 0 0 1 2.459 2.459M3 3l18 18"
        />
    </Svg>
)
export default ClosedEyeIcon;
