import React from 'react';
import Icon from "../Icon/Icon";
import {NavLink, NavLinkProps, useMatch} from "react-router-dom";
import styled from 'styled-components';

type Props = {
    iconType: string
    to: string
    title?: string
}

const IconLink = ({iconType, to, title}: Props) => {

    const isActive = useMatch(to)

    return (
        <div>
            <StyledNavLink
                end
                isActive={!!isActive}
                title={title || 'link'}
                to={to}
            >
                <Icon iconType={iconType}/>
            </StyledNavLink>
        </div>
        );
};

const StyledNavLink = styled(NavLink)<NavLinkProps & {isActive: boolean}>`
      border-radius: 10px;
      padding: 10px;
      transition: background-color ease-in .4s;
      display: flex;
      justify-content: center;
      align-items: center;
      background: ${({isActive}) => isActive ? `var(--selected-active-color)` : `var(--selected-default-color)`};
      &:hover {
        background: var(--selected-active-color)
      }
    `

export default IconLink;