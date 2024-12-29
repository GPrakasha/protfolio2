import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import StackIcon from 'tech-stack-icons';
import protfolio from '../../assets/protfolio.png';
import notes from '../../assets/collaborate.svg';
import { NAV_ITEM_ID } from '../../config';

interface Project {
  name: string;
  tech: string[];
  githubLink: string;
  image: string;
}

const ProjectCardContainer = styled(motion.div)`
    box-shadow: inset 5px 5px 10px var(--dark-secondary),
            inset -5px -5px 10px var(--light-secondary);

`;

const handleNavToGitHub = (link: string) => {
    window.open(link, '_blank');
}

const NeumorphismButton = styled(motion.button)`
    box-shadow: 5px 5px 10px var(--dark-secondary), -5px -5px 10px var(--light-secondary);
`;

const IconContainer = styled.div`
  width: 40px;
  height: 40px;
  background-color: var(--dark-secondary);

  svg {
    width: 80%;
    height: 80%;
    padding: 5px;
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
      <h3 className="text-xl text-tertiary-color">{project.name}</h3>
      <div className="flex flex-wrap gap-2">
        {
            project.tech.map((techSkill) => (
              <IconContainer key={techSkill} className='rounded-full flex items-center justify-center'>
                <StackIcon name={techSkill} style={
                  {
                    width: '80%',
                    height: '80%',
                    borderRadius: '50%',
                  }
                } />
              </IconContainer>
            ))
        }
        </div>
      <NeumorphismButton className="p-3 rounded-xl text-primary-color mt-3" onClick={() => handleNavToGitHub(project.githubLink)}>
      View on GitHub
    </NeumorphismButton>
    </ProjectCardContainer>
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
    <section id={NAV_ITEM_ID.PROJECTS} className="flex flex-col justify-center items-center py-16">
      <h1 className="md:text-5xl text-4xl mb-12 text-primary-color">Crafting with Code</h1>
      <div className="flex flex-wrap justify-center">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </section>
  );
};
