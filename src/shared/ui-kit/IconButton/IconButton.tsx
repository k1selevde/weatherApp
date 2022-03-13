import React, {ButtonHTMLAttributes} from 'react';
import Icon from "../Icon/Icon";
import styled from "styled-components";


interface IIconButton extends ButtonHTMLAttributes<HTMLButtonElement> {
    title?: string
    iconType: string
    className?: string
}



const IconButton: React.FC<IIconButton> = ({title, iconType, className, onClick, disabled}) => {
    const Wrapper = styled.button.attrs({
        className: className
    })`
      background: ${props => props.theme.default};
      border-radius: 10px;
      padding: 10px;
      transition: background-color ease-in .4s;
      &:hover {
        background: ${props => props.theme.active}
      }
    `

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

export default IconButton;