import React from 'react';
import styled from "styled-components";

const HamburgerIconContainer = styled.div`
	  height: 100%;
	  width: 100%;
	  display: flex;
	  flex-direction: column;
	  justify-content: space-between;
	  align-items: center;
	  
	  .line-1, .line-2, .line-3 {
	  	width: 85%; 
		height: 2px;
		background-color: black;
		transition: transform .5s ease, opacity .5s ease;
	  }

	  &.cross {
	 	.line-1 {
			transform: translateY(7px) rotate(45deg);
		}
		.line-2 {
			opacity: 0;
		}
		.line-3 {
			transform: translateY(-7px) rotate(-45deg);
		}
	  }
`;

export const HamBurgerButton = ({isOpen}: {isOpen?: boolean}) => {
	return (
		<HamburgerIconContainer className={isOpen ? 'cross' : ''}>
			<div className="line-1"></div>
			<div className="line-2"></div>
			<div className="line-3"></div>
		</HamburgerIconContainer>
	);
};
