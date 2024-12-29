import React, { useEffect } from 'react';
import gsap from 'gsap';
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import IntroSection from './intro/IntroSection';
import Experience from './experience/Experience';
import { Projects } from './projects/Projects';
import Contact from './contact/Contact';
import Blog from './blogs/Blog';


function Home() {


    useEffect(() => {
        gsap.registerPlugin(MotionPathPlugin);
        gsap.set(".ball", { xPercent: -50, yPercent: -50, transformOrigin: "50%, 50%" });
        gsap.to(".ball", {
            duration: 2,
            motionPath: { path: "#path", align: "#path", autoRotate: true },
            ease: "power1.inOut",
            repeat: -1,
        });    
          
    },[]);

    return (
		<div className="scroll-snap-container hide-scrollbar">
			<IntroSection />
			<Experience />
            <Blog />
            <Projects />
			<Contact />
		</div>
	);
}

export default Home;