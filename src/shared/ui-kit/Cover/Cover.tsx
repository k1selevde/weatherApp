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
      background-color: var(--selected-default-color);
      transition: background-color ease-in .3s;
      border-radius: 10px;
      
      &:hover {
        background-color: var(--selected-active-color);
      }
    `

    return (
        <Wrapper>
            {children}
        </Wrapper>
    );
};

export default Cover;