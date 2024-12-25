import React, { useEffect } from 'react';
import gsap from 'gsap';
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import IntroSection from './IntroSection';
import { NAV_ITEM_ID } from '../config';
import AboutMe from './AboutMe';


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
			<IntroSection id={NAV_ITEM_ID.INTRO} />
			<AboutMe id={NAV_ITEM_ID.ABOUT} />
			<section>Projects</section>
			<section>Blog</section>
			<section>Contact</section>
		</div>
	);
}

export default Home;