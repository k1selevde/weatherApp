import React from 'react';
import Icon from "../Icon/Icon";
import {NavLink, NavLinkProps, useMatch} from "react-router-dom";
import styled from 'styled-components';

type Props = {
    iconType: string
    to: string
    title?: string
}

const IconLink: React.FC<Props> = ({iconType, to, title}) => {

    const isActive = useMatch(to)

    const StyledNavLink = styled(NavLink)<NavLinkProps>`
      border-radius: 10px;
      padding: 10px;
      transition: background-color ease-in .4s;
      display: flex;
      justify-content: center;
      align-items: center;
      background: ${({theme}) => isActive ? theme.active : theme.default};
      &:hover {
        background: ${props => props.theme.active}
      }
    `

    return (
        <div>
            <StyledNavLink
                end
                title={title || 'link'}
                to={to}
            >
                <Icon iconType={iconType}/>
            </StyledNavLink>
        </div>
        );
};

export default IconLink;