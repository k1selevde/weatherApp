import React from 'react';
import styled, {DefaultTheme} from "styled-components";
import Icon from "../../../../shared/ui-kit/Icon/Icon";

type Props = {
    theme: DefaultTheme
    primary?: boolean
}

const ColourTemplate: React.FC<Props> = ({theme, primary = false}) => {

    const BadgeWrapper = styled.div`
      display: flex;
      justify-content: center;
      margin-bottom: 30px;
    `
    const Badge = styled.div`
      width: 100px;
      height: 100px;
      border-radius: 50%;
    `

    const Moon = styled(Badge)`
      background-color: transparent;
      box-shadow: inset -32px 5px 0 3px #f3d076;
    `
    const Sun = styled(Badge)`
      background: blanchedalmond;
    `

    const Container = styled.div`
          width: 350px;
          height: 490px;
          background: ${theme.faded};
          border-radius: 10px;
          
          div {
            border-radius: 10px;
          }
    `;

    const BackgroundBlock = styled.div`
      background: ${theme.default};
    `

    const Content = styled.div`
      width: 80%;
      height: 100%;
      margin: 20px auto;
      background: transparent;
      padding: 30px 0;
      display: flex;
      flex-direction: column;
      gap: 30px;
      border-radius: 10px;
    `;

    const Header = styled(BackgroundBlock)`
      height: 4em;
    `;

    const BlocksWrapper = styled.div`
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-column-gap: 10px;
      height: 100%;
    `;

    const BlockRight = styled(BackgroundBlock)``

    const BlockLeft = styled.div`
      display: grid;
      grid-template-rows: 3fr 1fr;
      grid-row-gap: 10px;
    `

    const ApplyButton = styled.button`
      width: 100%;
      display: flex;
      justify-content: center;
      border-radius: 15px;
      background: ${theme.default};
      margin-top: 30px;
      padding: 4px 0;
      transition: background-color ease-in .4s;
      
      &:hover {
        background-color: ${theme.active};
      }
    `

    return (
        <div style={{marginTop: '50px'}}>
            <BadgeWrapper>
                {primary ? <Sun /> : <Moon />}
            </BadgeWrapper>

            <Container>
                <Content>
                    <Header />
                    <BlocksWrapper>
                        <BlockLeft>
                            <BackgroundBlock />
                            <BackgroundBlock />
                        </BlockLeft>
                        <BlockRight />
                    </BlocksWrapper>
                </Content>
            </Container>

            <ApplyButton>
                <Icon iconType="check" />
            </ApplyButton>
        </div>
    );
};

export default ColourTemplate;