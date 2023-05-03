/* eslint-disable @typescript-eslint/no-empty-function */
import { motion, useAnimation } from "framer-motion";
import "./App.css";
import { Wheel } from "./Wheel";

function App() {
  const segments = [
    { bucketName: "B5_2_0", displayValue: "3", displayType: "powerplayCard" },
    {
      bucketName: "B2_2_0",
      displayValue: "20",
      displayType: "runs",
    },
    {
      bucketName: "B8_2_0",
      displayValue: "20",
      displayType: "runs",
    },
    { bucketName: "B7_2_0", displayValue: "4", displayType: "powerplayCard" },
    {
      bucketName: "B6_2_0",
      displayValue: "20",
      displayType: "runs",
    },
    { bucketName: "B1_2_0", displayValue: "1", displayType: "runs" },
    { bucketName: "B4_2_0", displayValue: "22", displayType: "runs" },
    { bucketName: "B3_2_0", displayValue: "2", displayType: "powerplayCard" },
  ];

  const segColors = [
    "#0058d4",
    "#8627d9",
    "#ca0bcb",
    "#e91c6b",
    "#74b233",
    "#0892c0",
    "#e71530",
    "#f9672b",
  ];

  const images = [
    'images/powerplay3x.png',
		'images/deal3x.png',
		'images/runs3x.png',
		'images/run3x.png',
		'images/fcv3xv.png',
		'images/fcd3xv.png'
  ];

  const rotatorControl = useAnimation()

  return (
    <div className="text-2xl font-bold">
      <motion.div animate={rotatorControl}>
      <Wheel
        mutation={() => {}}
        segments={segments}
        images={images}
        segmentColors={segColors}
        size={152}
        canvasSize={333}
        rotationAngle={3600 + 22}
      />
      </motion.div>
    </div>
  );
}

export default App;
