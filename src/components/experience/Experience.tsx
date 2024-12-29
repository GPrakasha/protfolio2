import {
  Cloud,
  OrbitControls,
  Sky,
  Stars,
  Environment,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import { Points, BufferGeometry, Material } from "three";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { ExpContentType } from "./experience.types";
import { NAV_ITEM_ID } from "../../config";

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

  @media (max-width: 768px) {
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
  width: 30%;
  z-index: 2;
  position: relative;
  padding-left: 40px;
  align-items: start;

  @media (max-width: 768px) {
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
  left: 50px;

  @media (max-width: 768px) {
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
  delay,
  company,
  isOdd,
}: {
  delay: number;
  company: Company;
  isOdd: boolean;
}) => {
  return (
    <TimeLineCardDot index={company.id}>
      <TimeLineCard isOdd={isOdd} company={company} />
    </TimeLineCardDot>
  );
};

const TimeLineCardDot = styled(motion.div)<{ isOdd?: boolean, index: number }>`
  width: 20px;
  height: 20px;
  background-color: var(--dark-secondary);
  border-radius: 50%;
  position: relative;
  margin: auto;
  border: 4px solid white;
  z-index: ${({index}) => 6 - index} ;
`;

interface Company {
  id: number;
  isCurrent?: boolean;
  name: string;
  role: string;
  duration: string;
  description: string;
  skills: string[];
}

const Chip = ({ label }: { label: string }) => {
  return (
    <div className="rounded-md px-2 py-1 text-tertiary-color border-amber-200/50 border-2 text-sm bg-indigo-950">
      {label}
    </div>
  );
};

const TimeLineStyledCard = styled(motion.div)<{ isOdd?: boolean }>`
  width: 300px;
  background-color: var(--secondary);
  border-radius: 10px;
  position: absolute;
  top: 0;
  transform: translateY(-50%);
  border: 1px solid white;

  ${({ isOdd }) => (isOdd ? "left" : "right")}: 36px;
`;

const TimeLineCardArrow = styled.div<{ isOdd?: boolean }>`
  position: absolute;
  top: 50%;
  width: 0;
  height: 0;
  border: 8px solid white;
  clip-path: ${({ isOdd }) =>
    isOdd
      ? "polygon(100% 0%, 0% 50%, 100% 100%)"
      : "polygon(0% 0%, 100% 50%, 0% 100%)"};
  ${({ isOdd }) => (isOdd ? "left" : "right")}: -16px;
`;

const DescriptionVariant = {
  hidden: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.5,
    },
  },
  visible: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.5,
    },
  },
};

const TimeLineCard = ({
  company,
  isOdd,
}: {
  company: Company;
  isOdd: boolean;
}) => {
  const { selectedId, setSelectedId } = useContext<ExpContentType>(ExpContext);
  return (
    <TimeLineStyledCard
      isOdd={isOdd}
      className="flex flex-col items-center text-white p-3"
    >
      <div
        className="flex w-full items-center cursor-pointer"
        onClick={() =>
          setSelectedId(selectedId === company.id ? -1 : company.id)
        }
      >
        <div className="flex flex-col w-full justify-start">
          <div className="flex items-center justify-start">
            <h3 className="text-xl">{company.name}</h3>
            <span className="text-sm ml-2 pt-1">( {company.role} )</span>
          </div>
          <p className="text-sm text-white/50">{company.duration}</p>
        </div>

        <ChevronDownIcon className="size-4 ms-auto" />
      </div>
      <AnimatePresence>
        {selectedId === company.id && (
          <motion.span
            initial="hidden"
            whileInView="visible"
            exit="hidden"
            variants={DescriptionVariant}
            className="text-sm mb-1"
          >
            {wordAnimation(company.description, "text-sm text-white/80")}
          </motion.span>
        )}
      </AnimatePresence>
      <TimeLineCardArrow isOdd={isOdd} />
      <div className="flex flex-wrap gap-2 mt-2">
        {company.skills.map((skill) => (
          <Chip label={skill} />
        ))}
      </div>
    </TimeLineStyledCard>
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
};

const wordAnimation = (words: string, textClasses: string) => {
  return words.split(" ").map((el, i) => (
    <motion.span
      className={textClasses}
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
  ));
};

const ExpContext = createContext<ExpContentType>({
  selectedId: 0,
  setSelectedId: () => {},
});

export default function Experience() {
  const [selectedId, setSelectedId] = useState<number>(0);
  const companies: Company[] = [
    {
      id: 0,
      isCurrent: true,
      name: "Razorpay",
      role: "Senior Frontend Engineer",
      duration: "06/2022 - Present",
      description:
        "Developed custom journey modules that reduced client onboarding time by 50%, enhancing operational efficiency across 8+ client systems.",
      skills: ["Javascript", "Typescript", "React", "Angular", "Jest"],
    },
    {
      id: 1,
      isCurrent: false,
      name: "Poshvine",
      role: "Software Engineer",
      duration: "Nov 2021 – Sep 2022",
      description:
        "Acquired proficiency in Angular and StencilJS that improved project delivery timelines by 30%.",
      skills: ["StencilJs", "Angular", "Javascript", "SCSS"],
    },
    {
      id: 2,
      isCurrent: false,
      name: "Akrity Computing",
      role: "Software Engineer",
      duration: "Jul 2019 – Nov 2021",
      description:
        "Facilitated team upskilling initiatives that improved overall team performance and productivity.",
      skills: ["HTML", "React", "Bootstrap", "Ruby on Rails"],
    },
    {
      id: 3,
      isCurrent: false,
      name: "Akrity Computing",
      role: "Intern",
      duration: "Jun 2019 - Jul 2019",
      description:
        "Developed a project using Ruby on Rails & React that successfully met internship objectives.",
      skills: ["HTML5", "React", "CSS", "Ruby on Rails"],
    },
    {
      id: 4,
      isCurrent: false,
      name: "Zwayam",
      role: "Intern",
      duration: "Jul 2018 - Aug 2018",
      description:
        "Built a responsive UI that improved user experience and engagement for a candidate assessment platform.",
      skills: ["Java", "HTML", "CSS"],
    },
  ];

  const isMobile = window.innerWidth < 768;

  return (
    <AboutMeContainer id={NAV_ITEM_ID.EXPERIENCE} className="relative">
      <motion.h2
        className="text-white m-auto md:w-2/5 text-center"
        variants={ExpHeadingVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.5 }}
      >
        {wordAnimation("My Work Experience", "md:text-7xl text-4xl")}
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
        <ExpContext.Provider
          value={{
            selectedId,
            setSelectedId,
          }}
        >
          {companies.map((company, index) => (
            <motion.div key={index} className="me-auto my-auto">
              <TimeLineCardDotContainer
                company={company}
                isOdd={isMobile ? true : index % 2 === 0}
                delay={index * 0.4}
              />
            </motion.div>
          ))}
        </ExpContext.Provider>
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
