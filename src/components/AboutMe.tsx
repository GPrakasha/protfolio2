import { Cloud, OrbitControls, Sky, Stars, Environment } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react'
import styled from 'styled-components';
import { Points, BufferGeometry, Material } from 'three';


const AboutMeContainer = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-image: url('src/assets/sunset_bg.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
`;

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

// Parallax effect
export default function AboutMe({id}: {id: string}) {

  return (
    <AboutMeContainer id={id} className='relative'>
        <h1>About me</h1>

        <Canvas
            style={{ position: 'absolute', top: 0, left: 0, zIndex: 1,
                clipPath: 'polygon(100% 0px, 100% 24%, -74% 70%, 0px 0px)'
             }}
            camera={{ position: [0, 0, 5] }}
        >
            {/* <OrbitControls /> */}
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            
            <RotatingStars />

        </Canvas>

    </AboutMeContainer>
  )
}
