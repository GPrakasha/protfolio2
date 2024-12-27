import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import Button from './Button';
import { style } from 'framer-motion/client';

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

const handleNavToGitHub = (link) => {
    window.open(link, '_blank');
}

const NeumorphismButton = styled(motion.button)`
    box-shadow: 5px 5px 10px var(--dark-secondary), -5px -5px 10px var(--light-secondary);
`;

const Chip = ({ label }: { label: string }) => {
    return (
      <div className="rounded-md py-1 p-2 text-tertiary-color text-sm"
        style={{
            boxShadow: "inset 5px 5px 10px var(--dark-secondary), inset -5px -5px 10px var(--light-secondary)"
        }}
      >
        {label}
      </div>
    );
  };

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <ProjectCardContainer
      className="w-80 h-96 m-4 rounded-xl flex flex-col items-center justify-center p-4 cursor-pointer transition-all duration-300 ease-in-out"
      initial={{ scale: 1 }}
      whileHover={{
        scale: 1.05,
      }}
    >
      <img
        src={project.image}
        alt={project.name}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h3 className="text-xl text-tertiary-color">{project.name}</h3>
      <div className="flex flex-wrap">
        {
            project.tech.map((techSkill) => (
                <Chip label={techSkill} />
            ))
        }
        </div>
      <p className="text-sm text-primary-color">{project.tech.join(', ')}</p>
      <NeumorphismButton className="p-3 rounded-xl text-primary-color mt-3" onClick={() => handleNavToGitHub(project.githubLink)}>
      View on GitHub
    </NeumorphismButton>
    </ProjectCardContainer>
  );
};

export const Projects = ({ id }: { id: string }) => {
  const projects: Project[] = [
    {
      name: 'Project 1',
      tech: ['React', 'TypeScript', 'Tailwind'],
      githubLink: 'https://github.com',
      image: 'https://via.placeholder.com/300',
    },
    {
      name: 'Project 2',
      tech: ['Next.js', 'Node.js'],
      githubLink: 'https://github.com',
      image: 'https://via.placeholder.com/300',
    },
    // Add more projects as needed
  ];

  return (
    <section id={id} className="flex flex-col justify-center items-center py-16">
      <h1 className="md:text-5xl text-4xl font-bold mb-12">My Works</h1>
      <div className="flex flex-wrap justify-center">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </section>
  );
};
