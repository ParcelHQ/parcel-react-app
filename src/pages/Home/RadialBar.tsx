import React from 'react';
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar';
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap';
import 'react-circular-progressbar/dist/styles.css';

// export default function CustomCircularProgressBar({
//   children,
//   ...otherProps
// }: any) {
//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Current Streams</CardTitle>
//       </CardHeader>
//       <CardBody>
//         <CircularProgressbar value={66} text={`${66}%`} />
//       </CardBody>
//     </Card>
//   );
// }

// <div>
//           <div
//             style={{
//               width: '100%',
//               height: '100%',
//               position: 'absolute',
//             }}
//           >

//             <CircularProgressbar value={66} text={`${66}%`} />
//           </div>
//           <div
//             style={{
//               height: '100%',
//               width: '100%',
//               alignItems: 'center',
//               display: 'flex',
//               flexDirection: 'column',
//               justifyContent: 'center',
//               position: 'absolute',
//             }}
//           >
//             {children}
//           </div>
//         </div>

export default function CustomCircularProgressBar({
  startColor,
  endColor,
  idCSS,
  rotation,
}: any) {
  let gradientTransform = `rotate(${rotation})`;

  return (
    <svg style={{ height: 0 }}>
      <defs>
        <linearGradient id={idCSS} gradientTransform={gradientTransform}>
          <stop offset="0%" stopColor={startColor} />
          <stop offset="100%" stopColor={endColor} />
        </linearGradient>
      </defs>
    </svg>
  );
}
