import React, { useState } from 'react';
import styled from 'styled-components';
import { HamBurgerButton } from './HamBurgerButton';
import { motion, AnimatePresence } from "framer-motion"; // Import AnimatePresence
import { NAV_ITEM_ID } from '../config';

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
  z-index: 9;
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
  z-index: 10;
`;

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", link: NAV_ITEM_ID.INTRO },
    { name: "About", link: NAV_ITEM_ID.EXPERIENCE },
    { name: "Blog", link: NAV_ITEM_ID.BLOG },
    { name: "Projects", link: NAV_ITEM_ID.PROJECTS },
    { name: "Contact", link: NAV_ITEM_ID.CONTACT },
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

      <div className='back-drop'
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 8,
          display: isOpen ? 'block' : 'none',
        }}
        onClick={() => setIsOpen(false)}
      ></div>
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
                  <motion.a
                    className='cursor-pointer'
                    key={index}
                    variants={navItemsVariants}
                    whileHover={{ scale: 1.5 }}
                    whileTap={{ scale: 0.9 }}
                    href={`#${link.link}`}
                  >
                    {link.name}
                  </motion.a>
                ))
              }
            </motion.div>
          </StyledSideBarContainer>
        )}
      </AnimatePresence>
    </>
  );
}
