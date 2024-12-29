import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const Button = ({ buttonVariant, children, onClick, type }: {
    buttonVariant: string;
    children: React.ReactNode;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
}) => {
    return (
        <StyledButton
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClick}
            buttonVariant={buttonVariant}
            type={type}
        >
            {children}
        </StyledButton>
    );
};

const StyledButton = styled(motion.button)<{
    buttonVariant: string;
}>`
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;

    ${(props) => {
        switch (props.buttonVariant) {
            case 'primary':
                return `
                    background-color: var(--primary);
                    color: var(--secondary);
                `;
            case 'secondary':
                return `
                    background-color: var(--secondary);
                    color: var(--primary);
                    border: 1px solid var(--primary);
                `;
            case 'success':
                return `
                    background-color: #28a745;
                    color: #fff;
                `;
            case 'danger':
                return `
                    background-color: #dc3545;
                    color: #fff;
                `;
            default:
                return `
                    background-color: #007bff;
                    color: #fff;
                `;
        }
    }}
`;

export default Button;