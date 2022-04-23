import React from 'react';
import styled from "styled-components";

const Cover: React.FC = ({children}) => {
    return (
        <Wrapper>
            {children}
        </Wrapper>
    );
};


const Wrapper = styled.div`
      padding: 6px;
      background-color: var(--selected-default-color);
      transition: background-color ease-in .3s;
      border-radius: 10px;
      
      &:hover {
        background-color: var(--selected-active-color);
      }
`

export default Cover;