import React from 'react';
import TranslationPicker from "../TranslationPicker/TranslationPicker";
import IconLink from "../../shared/ui-kit/IconLink";
import styled from "styled-components";
import { useIntl } from 'react-intl';

type SidebarMenuLinkType = {
    id: string,
    iconType: string,
    link: string
}

const sidebarMenuLinks: Array<SidebarMenuLinkType> = [
    {
        id: 'main',
        iconType: "cloud",
        link: '/'
    },
    {
        id: 'map',
        iconType: 'map',
        link: '/map'
    },
    {
        id: 'favorites',
        iconType: 'heart',
        link: '/favorites'
    },
    {
        id: 'notifications',
        iconType: 'bell',
        link: '/notifications'
    },
    {
        id: 'theme',
        iconType: 'moon',
        link: '/theme'
    }
]

const Sidebar = () => {
    const intl = useIntl();


    const renderMenuLink = ({id, link, iconType}: SidebarMenuLinkType): React.ReactNode => (
        <li key={id}>
            <IconLink iconType={iconType} to={link} title={intl.formatMessage({id: `sidebar.${id}`})} />
        </li>
    )

    const renderMenuLinks = (links: SidebarMenuLinkType[]): React.ReactNode => (
        <List>
            {links.map(renderMenuLink)}
        </List>
    )

    return (
        <Container>
            <Wrapper>
                <Nav>
                    {renderMenuLinks(sidebarMenuLinks)}
                    <TranslationPicker />
                </Nav>
            </Wrapper>
        </Container>
    );
};


const Wrapper = styled.div`
    flex-direction: column;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: space-around;
    `

const Nav = styled.nav`
      display: flex;
      flex-direction: column;
      gap: 100px;
      align-items: center;
    `

const List = styled.ul`
      display: flex;
      flex-direction: column;
      gap: 30px;
    `

const Container  = styled.section`
      background: var(--selected-faded-color);
      width: 90px;
    `

export default Sidebar;