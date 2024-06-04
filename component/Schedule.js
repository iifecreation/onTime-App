import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function CustomSvg(props) {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <Path
        d="M0 6.11111V16.3889C0 17.3466 0.380455 18.2651 1.05767 18.9423C1.73488 19.6195 2.65338 20 3.61111 20H16.3889C17.3466 20 18.2651 19.6195 18.9423 18.9423C19.6195 18.2651 20 17.3466 20 16.3889V6.11111H0ZM15.2778 13.3333C15.6461 13.3333 15.9994 13.4797 16.2599 13.7401C16.5203 14.0006 16.6667 14.3539 16.6667 14.7222C16.6667 15.0906 16.5203 15.4438 16.2599 15.7043C15.9994 15.9648 15.6461 16.1111 15.2778 16.1111C14.9094 16.1111 14.5562 15.9648 14.2957 15.7043C14.0352 15.4438 13.8889 15.0906 13.8889 14.7222C13.8889 14.3539 14.0352 14.0006 14.2957 13.7401C14.5562 13.4797 14.9094 13.3333 15.2778 13.3333ZM10 13.3333C10.3684 13.3333 10.7216 13.4797 10.9821 13.7401C11.2426 14.0006 11.3889 14.3539 11.3889 14.7222C11.3889 15.0906 11.2426 15.4438 10.9821 15.7043C10.7216 15.9648 10.3684 16.1111 10 16.1111C9.63164 16.1111 9.27837 15.9648 9.01791 15.7043C8.75744 15.4438 8.61111 15.0906 8.61111 14.7222C8.61111 14.3539 8.75744 14.0006 9.01791 13.7401C9.27837 13.4797 9.63164 13.3333 10 13.3333V13.3333ZM15.2778 8.33333C15.6461 8.33333 15.9994 8.47966 16.2599 8.74013C16.5203 9.0006 16.6667 9.35387 16.6667 9.72222C16.6667 10.0906 16.5203 10.4438 16.2599 10.7043C15.9994 10.9648 15.6461 11.1111 15.2778 11.1111C14.9094 11.1111 14.5562 10.9648 14.2957 10.7043C14.0352 10.4438 13.8889 10.0906 13.8889 9.72222C13.8889 9.35387 14.0352 9.0006 14.2957 8.74013C14.5562 8.47966 14.9094 8.33333 15.2778 8.33333ZM10 8.33333C10.3684 8.33333 10.7216 8.47966 10.9821 8.74013C11.2426 9.0006 11.3889 9.35387 11.3889 9.72222C11.3889 10.0906 11.2426 10.4438 10.9821 10.7043C10.7216 10.9648 10.3684 11.1111 10 11.1111C9.63164 11.1111 9.27837 10.9648 9.01791 10.7043C8.75744 10.4438 8.61111 10.0906 8.61111 9.72222C8.61111 9.35387 8.75744 9.0006 9.01791 8.74013C9.27837 8.47966 9.63164 8.33333 10 8.33333V8.33333ZM4.72222 8.33333C5.09058 8.33333 5.44385 8.47966 5.70432 8.74013C5.96478 9.0006 6.11111 9.35387 6.11111 9.72222C6.11111 10.0906 5.96478 10.4438 5.70432 10.7043C5.44385 10.9648 5.09058 11.1111 4.72222 11.1111C4.35387 11.1111 4.0006 10.9648 3.74013 10.7043C3.47966 10.4438 3.33333 10.0906 3.33333 9.72222C3.33333 9.35387 3.47966 9.0006 3.74013 8.74013C4.0006 8.47966 4.35387 8.33333 4.72222 8.33333ZM3.61111 0C2.65338 0 1.73488 0.380455 1.05767 1.05767C0.380455 1.73488 0 2.65338 0 3.61111V4.44444H20V3.61111C20 2.65338 19.6195 1.73488 18.9423 1.05767C18.2651 0.380455 17.3466 0 16.3889 0H3.61111Z"
        fill="white"
      />
    </Svg>
  );
}

export default CustomSvg;