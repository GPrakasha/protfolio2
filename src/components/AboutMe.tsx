import {
  Cloud,
  OrbitControls,
  Sky,
  Stars,
  Environment,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Points, BufferGeometry, Material } from "three";
import { motion } from "framer-motion";
import { s } from "framer-motion/client";

const AboutMeContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url("src/assets/sunset_bg.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  padding: 15px 0;

  @media(max-width: 768px) {
    flex-direction: column;
  }
`;

const TimeLineContainerVariant = {
  open: {
    transition: {
      staggerChildren: 0.2, // Stagger for opening
    },
  },
  closed: {
    transition: {
      staggerChildren: 0.05, // Quick close
      staggerDirection: -1,
    },
  },
};

const TimeLineContainer = styled(motion.div)`
  display: flex;
  height: 75vh;
  width: 40%;
  z-index: 2;
  position: relative;
  padding-left: 40px;
  align-items: start;

  @media(max-width: 768px) {
    width: 100%;
  }
`;

const TimeLine = styled(motion.div)`
  display: flex;
  align-items: center;
  height: 100%;
  width: 1px;
  top: 10%;
  background-color: white;
  position: absolute;
  z-index: 1;
  left: 50px;

  @media(max-width: 768px) {
    left: 50px;
  }
`;

const TimeLineVariant = {
  hidden: {
    opacity: 0,
    height: 0,
    transition: {
      staggerChildren: 0.2,
    },
  },
  visible: {
    opacity: 1,
    height: "80%",
    transition: {
      duration: 1,
    },
  },
};

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

// TimelineCardDot styles
const TimeLineCardDotContainer = ({
  isSelected,
  delay,
  company,
}: {
  isSelected: boolean;
  delay: number;
  company: Company;
}) => {
  return (
    <TimeLineCardDot>
      {isSelected && <TimeLineCard company={company} />}
    </TimeLineCardDot>
  );
};
const TimeLineCardDot = styled(motion.div)<{ isOdd?: boolean }>`
  width: 20px;
  height: 20px;
  background-color: white;
  border-radius: 50%;
  position: relative;
  margin: auto;
`;

interface Company {
  isCurrent?: boolean;
  name: string;
  role: string;
  duration: string;
  description: string;
}

const TimeLineCard = ({ company }: { company: Company }) => {
  return (
    <motion.div
      className="flex flex-col items-center text-white"
      style={{
        width: "300px",
        padding: "10px",
        backgroundColor: "rgba(0,0,0,0.5)",
        borderRadius: "10px",
        position: "absolute",
        top: "0",
        transform: "translateY(-50%)",
        left: "36px",
      }}
    >
      <h3 className="text-2xl">{company.name}</h3>
      <p>{company.role}</p>
      <p>{company.duration}</p>
      <p>{company.description}</p>
      <div
        style={{
          position: "absolute",
          top: "50%",
          width: "0",
          height: "0",
          border: "8px solid rgba(0, 0, 0, 0.5)",
          clipPath: "polygon(100% 0%, 0% 50%, 100% 100%)",
          left: "-16px",
        }}
      ></div>
    </motion.div>
  );
};

// RotatingStars component remains unchanged
function RotatingStars() {
  const starRef = useRef<Points<BufferGeometry, Material | Material[]> | null>(
    null
  );

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

const HeadingVariant = {
    hidden: {
        opacity: 0,
      },
    visible: {
        opacity: 1,
    },

}

const wordAnimation = (words) => {
    return words.split(" ").map((el, i) => (
        <motion.span
          className="md:text-7xl text-4xl"
          key={i}
          variants={HeadingVariant}
          transition={{
            duration: 0.25,
            delay: i * 0.08,
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
        >
          {el}{" "}
        </motion.span>
      ))
}

// Main AboutMe component
export default function AboutMe({ id }: { id: string }) {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const companies: Company[] = [
    {
      isCurrent: true,
      name: "Razorpay",
      role: "Senior Frontend Engineer",
      duration: "06/2022 - Present",
      description:
        "Developed custom journey modules that reduced client onboarding time by 50%, enhancing operational efficiency across 8+ client systems.",
    },
    {
      isCurrent: false,
      name: "Poshvine",
      role: "Software Engineer",
      duration: "Nov 2021 – Sep 2022",
      description:
        "Acquired proficiency in Angular and StencilJS that improved project delivery timelines by 30%.",
    },
    {
      isCurrent: false,
      name: "Akrity Computing",
      role: "Software Engineer",
      duration: "Jul 2019 – Nov 2021",
      description:
        "Facilitated team upskilling initiatives that improved overall team performance and productivity.",
    },
    {
      isCurrent: false,
      name: "Akrity Computing",
      role: "Intern",
      duration: "Jun 2019 - Jul 2019",
      description:
        "Developed a project using Ruby on Rails & React that successfully met internship objectives.",
    },
    {
      isCurrent: false,
      name: "Zwayam",
      role: "Intern",
      duration: "Jul 2018 - Aug 2018",
      description:
        "Built a responsive UI that improved user experience and engagement for a candidate assessment platform.",
    },
  ];

  return (
    <AboutMeContainer id={id} className="relative">
      <motion.h2
        className="text-white m-auto md:w-2/5 text-center"
        variants={ExpHeadingVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.5 }}
      >
        {wordAnimation("My Work Experience")}
      </motion.h2>

      <TimeLineContainer
        className="flex-col relative m-auto"
        variants={TimeLineContainerVariant}
        initial="closed"
        animate="open"
      >
        <TimeLine
          variants={TimeLineVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
        />

        {companies.map((company, index) => (
          <motion.div
            key={index}
            onMouseEnter={() => setSelectedIndex(index)}
            className="me-auto my-auto"
          >
            <TimeLineCardDotContainer
              company={company}
              isSelected={index === selectedIndex}
              delay={index * 0.4}
            />
          </motion.div>
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
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <RotatingStars />
      </Canvas>
    </AboutMeContainer>
  );
}
