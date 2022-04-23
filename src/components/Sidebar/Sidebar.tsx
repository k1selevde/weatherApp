import React from 'react';
import TranslationPicker from "../TranslationPicker/TranslationPicker";
import IconLink from "../../shared/ui-kit/IconLink/IconLink";
import styled from "styled-components";

type SidebarMenuLinkType = {
    title: string,
    iconType: string,
    link: string
}

const sidebarMenuLinks: Array<SidebarMenuLinkType> = [
    {
        title: 'Main',
        iconType: "cloud",
        link: '/'
    },
    {
        title: 'Map',
        iconType: 'map',
        link: '/map'
    },
    {
        title: 'Favorites',
        iconType: 'heart',
        link: '/favorites'
    },
    {
        title: 'Notifications',
        iconType: 'bell',
        link: '/notifications'
    },
    {
        title: 'Theme',
        iconType: 'moon',
        link: '/theme'
    }
]

const Sidebar = () => {
    const renderMenuLink = ({title, link, iconType}: SidebarMenuLinkType): React.ReactNode => (
        <li title={title} key={link}>
            <IconLink iconType={iconType} to={link} title={title}/>
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