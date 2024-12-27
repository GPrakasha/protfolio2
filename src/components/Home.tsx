import React, { useEffect } from 'react';
import gsap from 'gsap';
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import IntroSection from './intro/IntroSection';
import { NAV_ITEM_ID } from '../config';
import Experience from './experience/Experience';
import { Projects } from './projects/Projects';


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
			<Experience id={NAV_ITEM_ID.EXPERIENCE} />
            <Projects id={NAV_ITEM_ID.PROJECTS} />
			<section>Blog</section>
			<section>Contact</section>
		</div>
	);
}

export default Home;