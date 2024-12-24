import { style } from 'framer-motion/client';
import React from 'react';
import styled from 'styled-components';
import { styles } from '../styles';

const SocialIconImg = styled.img`
    height: 30px;
    margin-right: 10px;
`;

const NavBarContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    z-index: 10;
    height: 80px;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.1);
`;

const SocialIcon = ({ icon, link }) => {
    return (
        <a href={link}
            target='_blank'
            rel='noreferrer'
        >
            <SocialIconImg src={icon} alt='icon' />
        </a>
    )
}

export default function NavBar() {

    const socialIcons = [
        { icon: 'src/assets/icons/linkedIn.webp', link: 'https://www.linkedin.com/in/gprakasha/' },
        { icon: 'src/assets/icons/github.webp', link: 'https://github.com/GPrakasha' },
    ];

  return (
    <NavBarContainer className='relative navbar'>
        <div className='absolute nav-sidebar'>
            <nav className='flex justify-between items-center w-full py-5 px-10'>
                <ul
                    className='flex justify-between items-center'
                >
                    <li>Home</li>
                    <li>About</li>
                    <li>Skills</li>
                    <li>Projects</li>
                    <li>Experience</li>
                    <li>Blog</li>
                    <li>Contact</li>
                </ul>
            </nav>
        </div>

        <div className={`${styles.paddingX} wrapper w-fullwrapper w-full justify-between flex`}>
            <span>
                G Prakasha
            </span>
            <div className='social flex'>
                {
                    socialIcons.map((icon, index) => (
                        <SocialIcon key={index} icon={icon.icon} link={icon.link} />
                    ))
                }
            </div>
        </div>
    </NavBarContainer>
  )
}
