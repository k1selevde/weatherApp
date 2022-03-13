import React from 'react';
import styled from "styled-components";

type Props = {
    className?: string
}

const Cover: React.FC<Props> = ({children, className = ''}) => {

    const Wrapper = styled.div.attrs({
        className: className
    })`
      padding: 6px;
      background-color: ${props => props.theme.default};
      transition: background-color ease-in .3s;
      width: fit-content;
      border-radius: 10px;
      
      &:hover {
        background-color: ${props => props.theme.active};
      }
    `

    return (
        <Wrapper>
            {children}
        </Wrapper>
    );
};

export default Cover;