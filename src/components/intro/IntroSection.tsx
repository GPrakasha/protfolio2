const IntroSectionContainer = styled(motion.section)`
    height: 100vh;
    display: flex;  
    justify-content: center;
    align-items: center;
    font-size: 3rem;
    background-image: url('src/assets/avatar1.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position-y: -100px;
    background-position-x: 25vw;

    @media (max-width: 768px) {
        background-image: none;
    }
`;

const IntroContent = styled(motion.div)`
    box-shadow: inset 5px 5px 10px var(--dark-secondary),
            inset -5px -5px 10px var(--light-secondary);
    border-radius: 10px;
    padding: 20px;
    margin-left: 10%;
    max-width: 37vw;
    margin-bottom: 10%;
    margin-right: auto;

    @media (max-width: 768px) {
        margin: auto auto 55% auto;
        max-width: unset;
        background-image: url(src/assets/avatar1.png);
        height: 50vh;
        background-size: 90vw;
        background-repeat: no-repeat;
        background-position-x: 60px;
        background-position-y: -30px;
        margin-top: 10vh;
    }
`;

const textVariants = {
    initial: {
        x: -500,
        opacity: 0
    },
    animate: {
        x: 0,
        opacity: 1,
        transition: {
            duration: .5,
            staggerChildren: 0.1
        }
    },
    exit: {
        x: 500,
        opacity: 0
    }
}

const SlidingText = styled.h1`
    font-size: 36vh;
    white-space: nowrap;
    color: rgba(255, 255, 255, 0.1);
    animation: infiniteSlide 10s linear infinite;

    @keyframes infiniteSlide {
        0% {
            transform: translateX(0);
        }
        100% {
            transform: translateX(-100%);
        }
    }
`;

const SliderContainer = styled.div`
    overflow: hidden;
    position: absolute;
    z-index: -1;
    width: 100%;
    bottom: -100px;
`;

import { motion } from 'framer-motion';
import React from 'react'
import styled from 'styled-components';
import { styles } from '../../styles';
import Button from '../Button';
import { NAV_ITEM_ID } from '../../config';

export default function IntroSection() {
  return (
		<IntroSectionContainer id={NAV_ITEM_ID.INTRO} className={`relative ${styles.paddingX}`}>
			<IntroContent
				className="gap-y-6 flex flex-col"
				variants={textVariants}
				initial="initial"
				animate="animate"
			>
				<motion.h3
					variants={textVariants}
					className="text-primary-color text-xl md:m-0 mx-0 my-auto"
				>
					Who am i ?
				</motion.h3>
                <motion.h3
					variants={textVariants}
					className="text-primary-color text-xl"
				>
					I'm,
				</motion.h3>
				<motion.h1
					variants={textVariants}
					className="text-4xl md:text-6xl text-tertiary-color"
				>
					G Prakasha
				</motion.h1>
				<motion.p
					variants={textVariants}
					className="text-2xl text-primary-color"
				>
					Web Developer | Building Intuitive, User-Centered Web
					Experiences
				</motion.p>
				<motion.div className="flex justify-between">
					<Button buttonVariant="secondary" className='md:text-2xl text-sm' onClick={() => {}}>
						See the latest Works
					</Button>

					<Button buttonVariant="primary" className='md:text-2xl text-sm' onClick={() => {}}>
						Contact me
					</Button>
				</motion.div>
			</IntroContent>
			<SliderContainer className="flex">
				<SlidingText>Frontend Developer</SlidingText>
				<SlidingText>Frontend Developer</SlidingText>
			</SliderContainer>
		</IntroSectionContainer>
  );
}
