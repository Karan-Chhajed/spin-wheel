import { motion } from 'framer-motion';
import type { FC } from 'react';

interface ShowPrizeProperties {
	prize: number;
	prizeType: string;
}

const prizeVariant = {
	visible: {
		opacity: 1,
		scale: 1,
		transition: {
			type: 'linear'
		}
	},
	hidden: {
		opacity: 0.3,
		scale: 0,
		transition: {
			type: 'linear'
		}
	}
};

export const ShowPrize: FC<ShowPrizeProperties> = ({ prize, prizeType }) => (
	<motion.div
		className='flex h-72 w-72 flex-col items-center justify-center space-y-2 rounded-full bg-wheelFeedback bg-cover bg-center bg-no-repeat xs:h-64 xs:w-64'
		variants={prizeVariant}
		initial='hidden'
		animate='visible'
		exit='hidden'
	>
		<div className='relative text-center font-nunito text-lg font-light text-white'>
			YOU WON
		</div>
		<div className='md:leading-normal relative text-center font-nunito text-6xl font-black leading-normal text-white'>
			{prize}
		</div>
		<div className='relative text-center font-nunito text-lg font-bold uppercase text-white xs:text-base'>
			{prizeType === 'runs' ? (prize === 1 ? 'Run' : 'Runs') : null}
			{prizeType.split(' ').join('').toLowerCase() === 'powerplaycards'
				? prize === 1
					? 'Powerplay Card'
					: 'Powerplay Cards'
				: null}
			{prizeType !== 'runs' &&
			prizeType.split(' ').join('').toLowerCase() !== 'powerplaycards'
				? prizeType
				: null}
		</div>
	</motion.div>
);
