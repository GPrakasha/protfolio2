import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import StackIcon from 'tech-stack-icons';
import protfolio from '../../assets/protfolio.png';
import notes from '../../assets/collaborate.svg';
import { NAV_ITEM_ID } from '../../config';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import Button from '../Button';

interface Project {
  name: string;
  tech: string[];
  githubLink: string;
  image: string;
}

const ProjectCardContainer = styled(motion.div)`
  min-width: 300px;
  height: 58vh;
  background: linear-gradient(145deg, #1b1844, #201d50);
  box-shadow:  20px 20px 60px #1a1740,
              -20px -20px 60px #231f56;

  @media (max-width: 768px) {
    height: 60vh;
  }
`;

const handleNavToGitHub = (link: string) => {
  window.open(link, '_blank');
};

const NeumorphismButton = styled(Button)`
  box-shadow:
    2px 3px 10px var(--dark-secondary),
    -5px -5px 10px var(--light-secondary);
`;

const IconContainer = styled.div`
  width: 60px;
  height: 60px;
  background: #1e1b4b;
  box-shadow: inset 20px 20px 60px #141231,
            inset -20px -20px 60px #292465;

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
  }

  svg {
    width: 80%;
    height: 80%;
    padding: 5px;

    path {
      stroke: var(--tertiary);
    }
  }
`;

const ProjectImage = styled.img`
  width: 300px;
  height: 180px;
  overflow: hidden;
  object-fit: cover;
  border: 1px solid var(--tertiary);
`;

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <ProjectCardContainer
      className="w-80 h-96 m-4 rounded-xl flex flex-col items-center justify-center p-4 cursor-pointer transition-all duration-300 ease-in-out"
      initial={{ scale: 1 }}
      whileHover={{
        scale: 1.05,
      }}
    >
      <ProjectImage
        src={project.image}
        alt={project.name}
        className="object-cover rounded-lg mb-4"
      />
      <h3 className="text-xl text-tertiary-color mt-1 mb-4">{project.name}</h3>
      <div className="flex md:flex-wrap gap-2">
        {project.tech.map((techSkill) => (
          <IconContainer
            key={techSkill}
            className="rounded-full flex items-center justify-center"
          >
            <StackIcon
              name={techSkill}
              style={{
                width: '80%',
                height: '80%',
                borderRadius: '50%',
              }}
            />
          </IconContainer>
        ))}
      </div>
      <NeumorphismButton
        buttonVariant='primary'
        className="p-3 rounded-xl text-primary-color mt-auto"
        onClick={() => handleNavToGitHub(project.githubLink)}
      >
        View on GitHub
      </NeumorphismButton>
    </ProjectCardContainer>
  );
};

const Stars = () => {
  const sphere = new Float32Array(1000).map(() => (Math.random() - 0.5) * 10);
  const ref = useRef<any>();

  useFrame((state, delta) => {
    if (ref.current?.rotation) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#ffa0e0"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

export const Projects = () => {
  const projects: Project[] = [
    {
      name: 'Protfolio',
      tech: ['reactjs', 'typescript', 'framer', 'threejs'],
      githubLink: 'https://github.com/GPrakasha/protfolio2',
      image: protfolio,
    },
    {
      name: 'NotesApp',
      tech: ['reactjs', 'firebase'],
      githubLink: 'https://github.com/GPrakasha/noteMaster',
      image: notes,
    },
  ];

  return (
    <motion.section
      whileInView="animate"
      id={NAV_ITEM_ID.PROJECTS}
      style={{
        zIndex: 1,
      }}
      className="flex flex-col justify-center items-center relative bg-indigo-950 h-full md:py-20 py-10"
    >
      <h1 className="text-3xl md:text-5xl text-center justify-center mx-auto 6 text-primary-color">
        Crafting with Code
      </h1>
      <div className="flex md:justify-center items-center w-full overflow-x-scroll hide-scrollbar h-full">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
      <Canvas
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: -1,
        }}
        camera={{ position: [0, 0, 5] }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Stars />
      </Canvas>
    </motion.section>
  );
};
