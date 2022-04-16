import React from 'react';
import styled from "styled-components";
import Icon from "../../../../shared/ui-kit/Icon/Icon";
import {ThemeStateType} from "../../../../theme";

type Props = {
    disabledButton?: boolean
    theme: ThemeStateType
    primary?: boolean
    onClick: () => void
}

const ColourTemplate = ({onClick, primary = false, disabledButton= true}: Props) => {
    return (
        <div style={{marginTop: '50px'}}>
            <BadgeWrapper>
                {primary ? <Sun /> : <Moon />}
            </BadgeWrapper>

            <Container primary={primary}>
                <Content>
                    <Header primary={primary}/>
                    <BlocksWrapper>
                        <BlockLeft>
                            <BackgroundBlock primary={primary}/>
                            <BackgroundBlock primary={primary}/>
                        </BlockLeft>
                        <BlockRight primary={primary}/>
                    </BlocksWrapper>
                </Content>
            </Container>

            <ApplyButton primary={primary} onClick={onClick} disabled={disabledButton}>
                <Icon iconType="check" />
            </ApplyButton>
        </div>
    );
};


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

const Container = styled.div<{primary: boolean}>`
          width: 350px;
          height: 490px;
          background: ${({primary}) => primary ? `var(--light-faded-color)` : `var(--dark-faded-color)`};
          border-radius: 10px;
          
          div {
            border-radius: 10px;
          }
    `;

const BackgroundBlock = styled.div<{primary: boolean}>`
      background: ${({primary}) => primary ? `var(--light-default-color)` : `var(--dark-default-color)`};
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

const ApplyButton = styled.button<{primary: boolean}>`
      width: 100%;
      display: flex;
      justify-content: center;
      border-radius: 15px;
      background: ${({primary}) => primary ? `var(--light-default-color)` : `var(--dark-default-color)`};
      margin-top: 30px;
      padding: 4px 0;
      transition: background-color ease-in .4s;
      
      &:hover {
        background: ${({primary}) => primary ? `var(--light-active-color)` : `var(--dark-active-color)`};
      }
      
      &:disabled {
        opacity: .3;
        pointer-events: none;
      }
    `

export default ColourTemplate;