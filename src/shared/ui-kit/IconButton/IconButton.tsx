import React, {ButtonHTMLAttributes} from 'react';
import Icon from "../Icon/Icon";
import styled from "styled-components";


interface IIconButton extends ButtonHTMLAttributes<HTMLButtonElement> {
    title?: string
    iconType: string
}


const IconButton = ({title, iconType, onClick, disabled}: IIconButton) => {
    const props = {
        title,
        onClick,
        disabled
    }

    return (
        <Wrapper {...props}>
            <Icon iconType={iconType} />
        </Wrapper>
    );
};


const Wrapper = styled.button`
      background: var(--selected-default-color);
      border-radius: 10px;
      padding: 10px;
      transition: background-color ease-in .4s;
      &:hover {
        background: var(--selected-active-color)
      }
    `

export default IconButton;