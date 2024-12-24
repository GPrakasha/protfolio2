import {
	Cloud,
	OrbitControls,
	Sky,
	Stars,
	Environment,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { Points, BufferGeometry, Material } from "three";
import { motion } from "framer-motion";
import { desc } from "framer-motion/client";

const AboutMeContainer = styled.section`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
	background-image: url("src/assets/sunset_bg.jpg");
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center;
`;

const TimeLineContainer = styled.div`
	display: flex;
	align-items: center;
	height: 100vh;
	overflow: scroll;
	width: 100%;
	z-index: 2;
`;

const TimeLine = styled.div`
	display: flex;
	align-items: center;
	height: 100%;
	width: 1px;
	background-color: white;
	position: absolute;
	z-index: 1;
`;

const ExpHeadingVariant = {
	hidden: {
		opacity: 0,
		x: -100,
	},
	visible: {
		opacity: 1,
		x: 0,
		transition: {
			duration: 1,
		},
	},
};

// Timeline item variant to be visible in the viewport on scroll & disappear when out of view on scroll
const TimeLineItemVariant = {
	hidden: {
		opacity: 0,
		x: -100,
	},
	visible: {
		opacity: 1,
		x: 0,
		transition: {
			duration: 1,
		},
	},
};

function RotatingStars() {
	const starRef = useRef<Points<
		BufferGeometry,
		Material | Material[]
	> | null>(null);

	useFrame(() => {
		if (starRef.current) {
			starRef.current.rotation.y += 0.0015;
		}
	});

	const onWheel = (event: WheelEvent) => {
		if (starRef.current) {
			const rotationChange = event.deltaY > 0 ? -0.01 : 0.01;
			starRef.current.rotation.y += rotationChange;
			starRef.current.rotation.x += rotationChange;
		}
	};

	useEffect(() => {
		window.addEventListener("wheel", onWheel);
		return () => {
			window.removeEventListener("wheel", onWheel);
		};
	}, []);

	return <Stars ref={starRef} saturation={0} speed={5} />;
}


const TimeLineCard = ({ company, role, duration, isOdd }: { company: string; role: string; duration: string, isOdd: boolean }) => {
    return (
        <motion.div
            className="flex flex-col items-center text-white"
            style={{
                width: "300px",
                padding: "10px",
                backgroundColor: "rgba(0,0,0,0.5)",
                borderRadius: "10px",
                margin: "10px",
            }}
            variants={TimeLineItemVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.5 }}
        >
            <h3 className="text-2xl">{company}</h3>
            <p>{role}</p>
            <p>{duration}</p>
            <div
				style={{
					position: "absolute",
					top: "50%",
					[isOdd ? "right" : "left"]: "-3px",
					transform: "translateY(-50%)",
					width: "0",
					height: "0",
					borderLeft: isOdd ? "none" : "15px solid transparent",
					borderRight: isOdd ? "15px solid transparent" : "none",
					borderTop: "10px solid white", // The arrow shape
				}}
			></div>
        </motion.div>
    );
}

// Parallax effect
export default function AboutMe({ id }: { id: string }) {

    const companies = [
        {
            company: "Company 1",
            role: "Frontend Developer",
            duration: "2019 - 2020",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec libero tincidunt fermentum. Nullam nec purus nec libero tincidunt fermentum."
        },
        {
            company: "Company 2",
            role: "Backend Developer",
            duration: "2020 - 2021",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec libero tincidunt fermentum. Nullam nec purus nec libero tincidunt fermentum."
        },
        {
            company: "Company 3",
            role: "Fullstack Developer",
            duration: "2021 - 2022",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec libero tincidunt fermentum. Nullam nec purus nec libero tincidunt fermentum."
        }
    ];

	return (
		<AboutMeContainer id={id} className="relative">
			{/* 
            This section is going to be to showcase the experience and companies I have worked with from 2019 in a timeline UI.
        */}

			<TimeLineContainer className="flex-col">
				<motion.h2
					className="text-4xl text-white"
					variants={ExpHeadingVariant}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: false, amount: 0.5 }}
				>
					My Work Experience
				</motion.h2>

				<TimeLine />
				
                {companies.map((company, index) => (
                    <TimeLineCard key={index} company={company.company} role={company.role} duration={company.duration} isOdd={index%2 === 0} />
                ))}

			</TimeLineContainer>

			<Canvas
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					zIndex: 1,
					clipPath: "polygon(100% 0px, 100% 24%, -74% 70%, 0px 0px)",
				}}
				camera={{ position: [0, 0, 5] }}
			>
				{/* <OrbitControls /> */}
				<ambientLight intensity={0.5} />
				<pointLight position={[10, 10, 10]} />

				<RotatingStars />
			</Canvas>
		</AboutMeContainer>
	);
}
