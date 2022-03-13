import React from 'react';
import TranslationPicker from "../TranslationPicker/TranslationPicker";
import IconLink from "../../shared/ui-kit/IconLink/IconLink";
import styled from "styled-components";

type SidebarMenuLinkType = {
    title: string,
    iconType: string,
    ddd?: number,
    link: string
}

const sidebarMenuLinks = [
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

const Sidebar: React.FC = () => {

    const List = styled.ul`
      display: flex;
      flex-direction: column;
      gap: 30px;
    `

    const Container  = styled.section`
      height: 100vh;
      background: #FFFCE4;
      width: 90px;
    `
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

    const renderMenuLink = ({title, link, iconType}: SidebarMenuLinkType): React.ReactNode => (
        <li title={title}>
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
                    <TranslationPicker/>
                </Nav>
            </Wrapper>
        </Container>
    );
};

export default Sidebar;