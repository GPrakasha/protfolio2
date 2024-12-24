import React, { useState } from 'react';
import styled from 'styled-components';
import { HamBurgerButton } from './HamBurgerButton';
import { motion, AnimatePresence } from "framer-motion"; // Import AnimatePresence

const StyledSideBarContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  color: #000000;
  position: fixed;
  top: 0;
  left: 0;
  width: 25vw;
  height: 100vh;
  overflow: hidden;
  z-index: 1;
`;

const MenuButtonContainer = styled.div`
  display: flex;
  height: 3rem;
  width: 3rem;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: #ffffff;
  border-radius: 50%;
  padding: 1rem .5rem;
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 2;
`;

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", link: "#" },
    { name: "About", link: "#" },
    { name: "Skills", link: "#" },
    { name: "Projects", link: "#" },
    { name: "Experience", link: "#" },
    { name: "Blog", link: "#" },
    { name: "Contact", link: "#" },
  ];

  const navItemVariants = {
    open: {
      transition: {
        staggerChildren: .1,
      },
    },
    closed: {
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const navItemsVariants = {
    open: {
      opacity: 1,
      y: 0,
    },
    closed: {
      opacity: 0,
      y: 100,
    },
  }

  return (
    <>
      <MenuButtonContainer onClick={() => setIsOpen(!isOpen)}>
        <HamBurgerButton isOpen={isOpen} />
      </MenuButtonContainer>

      {/* Wrap Sidebar with AnimatePresence */}
      <AnimatePresence>
        {isOpen && (
          <StyledSideBarContainer
            initial="closed"
            animate="open"
            exit="closed"
            variants={{
              open: {
                clipPath: 'circle(110vh at 40px 40px)',
                transition: {
                  type: 'spring',
                  stiffness: 50,
                },
              },
              closed: {
                clipPath: 'circle(0px at 40px 40px)',
                transition: {
                  type: 'spring',
                  stiffness: 400,
                  damping: 50,
                },
              },
            }}
          >
            <motion.div className={`flex flex-col justify-center items-center w-full py-5 px-10 h-full gap-y-2`} variants={navItemVariants}>
              {
                navLinks.map((link, index) => (
                  <motion.div
                    className='cursor-pointer'
                    key={index}
                    variants={navItemsVariants}
                    whileHover={{ scale: 1.5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {link.name}
                  </motion.div>
                ))
              }
            </motion.div>
          </StyledSideBarContainer>
        )}
      </AnimatePresence>
    </>
  );
}
