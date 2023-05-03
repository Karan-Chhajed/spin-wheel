/* eslint-disable @typescript-eslint/no-empty-function */
import { fetchWheelImages } from './lib/wheel';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { RoundedButton } from './utils/Buttons';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import { ShowPrize } from './ShowPrize';


interface WheelRenderProperties {
	segments: Record<string, string>[];
	segmentColors: string[];
	size: number;
	canvasSize: number;
    images: string[];
    rotationAngle: number;
    mutation: () => void
}

// Whoever sees this after me, I know there are a lot of numbers going around, I know its bothersome.
// canvas size was selected on the basis of lowest device size
// All the adjustments you see regarding locations, it was because we had only segment length as the dependable variable but couldnt depend
// on it, as lower segment size drew images closer to center, so we took a constant value that works for both sizes
// All images are 3x to avoid pixeling and clipping, hence adjustments to the sizes, I know it looks messy
// deal is our fallback icon, if we cant find the type we show deal
// Not my best work, but if you come to this and I am around lets work on making this better! Cheers!

let img: HTMLImageElement[] = [];


export const initCanvas = (
	segments: Record<string, string>[],
	segmentColors: string[],
	size: number,
	canvasSize: number,
    images: string[]
): void => {
	const canvas = document.querySelector('canvas') as HTMLCanvasElement;
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const context = canvas.getContext('2d')!;
	context.clearRect(0, 0, 400, 400);
	context.textAlign = 'center';

	// draw segments on the wheel

	const drawSegment = (key: number, lastAngle: number, angle: number): void => {
		context.save();
		context.beginPath();
		const xpath = canvasSize >= 333 ? 180 : 184; // This is to figure out the x and y coordinates as and when div size and canvas size changes
		const ypath = canvasSize >= 333 ? 165 : 149;
		context.moveTo(xpath, ypath);
		context.arc(xpath, ypath, size, lastAngle, angle, false);
		context.lineTo(xpath, ypath);
		context.closePath();
		context.fillStyle = segmentColors[key];
		context.fill();
		context.stroke();
		context.save();
		context.translate(xpath, ypath); // decides the position of the wheel on the canvas
		context.rotate(lastAngle + (angle - lastAngle) / 2); // common rotation for all the text and image elements
		context.imageSmoothingEnabled = true;
		context.imageSmoothingQuality = 'high';
		// the drawing begins
		const imageLoc = canvasSize >= 333 ? 88 : 80;
		if (segments[key].displayType.toLowerCase().includes('runs')) {
			context.fillStyle = 'white';
			context.font = '900 0.7em Arial'; // properties of the text on the wheel
			const value = `${segments[key].displayValue}`;

			if (value === '1') {
				context.drawImage(
					img[3],
					imageLoc + 3,
					-8 * 3,
					img[0].width * 0.3,
					img[0].height * 0.35
				); // the values for dx and dy for images are the numeric adjustments values, the calculation earlier was made according to
				// the segemnt length, later it was observed that the images gre closer to center, so since we knew that maax segment length will be 8, we hardcoded the value coordinates
			} else {
				context.drawImage(
					img[2],
					imageLoc - 2.5,
					-8 * 3,
					img[0].width * 0.38,
					img[0].height * 0.35
				);
			}

			context.fillText(value.slice(0, 21), size / 2 + 34, -9);
		}
		if (segments[key].displayType.toLowerCase().includes('power')) {
			context.drawImage(
				img[0],
				imageLoc,
				-(8 * 2),
				img[0].width * 0.25,
				img[0].height * 0.25
			);
		}
		if (segments[key].displayType.toLowerCase().includes('discount')) {
			context.drawImage(
				img[5],
				imageLoc - 28,
				-(8 * 3),
				img[0].width * 0.55,
				img[0].height * 0.33
			);
		}
		if (segments[key].displayType.toLowerCase().includes('voucher')) {
			context.drawImage(
				img[4],
				imageLoc - 28,
				-(8 * 3),
				img[0].width * 0.55,
				img[0].height * 0.33
			);
		}
		if (
			!segments[key].displayType.toLowerCase().includes('runs') &&
			!segments[key].displayType.toLowerCase().includes('power') &&
			!segments[key].displayType.toLowerCase().includes('voucher') &&
			!segments[key].displayType.toLowerCase().includes('discount')
		) {
			context.drawImage(
				img[1],
				imageLoc,
				-(8 * 3),
				img[0].width * 0.3,
				img[0].height * 0.4
			);
		}

		context.restore();
	};

	// draws wheel and then calls the function that draws segment

	const drawWheel = (): void => {
		let lastAngle = 0;
		const { length } = segments;
		const PI2 = Math.PI * 2;
		context.lineWidth = 1;
		context.strokeStyle = 'transparent'; // decides the edges of the wheel
		context.textBaseline = 'middle';
		context.textAlign = 'center';
		// eslint-disable-next-line no-plusplus
		for (let index = 1; index <= length; index++) {
			const angle = PI2 * (index / length) + 0;
			drawSegment(index - 1, lastAngle, angle);
			lastAngle = angle;
		}
	};
	fetchWheelImages(images)
		.then(response => {
			img = response;
			requestAnimationFrame(() => {
				drawWheel();
			});
		})
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		.catch(() => {});
};

export const Wheel: FC<WheelRenderProperties> = ({
	segments,
	segmentColors,
	size,
	canvasSize,
    images,
    rotationAngle,
    mutation
}) => {
	useEffect(() => {
		initCanvas(segments, segmentColors, size, canvasSize, images);
	}, [segments, segmentColors, size, canvasSize, images]);

    const rotatorControl = useAnimation()
    const [showPrize, setShowPrize] = useState(false)

	return (
        <div className='absolute top-1/2 left-24'>
		<motion.div
        animate={rotatorControl}
			id='wheel'
			className={`${
				canvasSize >= 333 ? 'h-80 w-80' : 'h-72 w-72' // This is basically responsible for the outline of the wheel, hence this changes according to canvas and wheel size
			} rounded-full border-8  border-black border-opacity-40  `}
		>
			<canvas
				id='canvas'
				className='-ml-3 -rotate-[90deg]'
				height={canvasSize}
				width={canvasSize}
			/>

		</motion.div>
        <div className=' z-10 relative -mt-52 active:scale-90'>
        <RoundedButton color='bg-transparent'  onClick={async () => {
        mutation
          await rotatorControl.start({
            rotate: [0, rotationAngle],
            transition: {
              type: 'tween',
              duration: 4.32,
              ease: [0.5, 0.1, 0.15, 1]
            }
          })
            setShowPrize(true)
            setTimeout(() => {
                setShowPrize(false)
            }, 3000)
            await rotatorControl.start({
                rotate: [rotationAngle, 0],
                transition: {
                  type: 'tween',
                  duration: 2,
                  ease: [0.5, 0.1, 0.15, 1]
                }
              })
          }}>
           
		<div className=' flex flex-col items-center w-20 overflow-visible align-middle'>
			<img src='/images/spinner_icon.svg'/>
		</div>

        </RoundedButton>
        
        </div>
        <AnimatePresence>
					{showPrize ? (
						<motion.div className='relative -top-48 -mt-2 ml-4 z-30'>
							<ShowPrize
								prize={1}
								prizeType='powerplayCards'
							/>
						</motion.div>
					) : null}
				</AnimatePresence>
        </div>
	);
};
