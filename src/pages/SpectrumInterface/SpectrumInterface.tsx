import React from 'react';
import ColourTemplate from "./components/ColourTemplate/ColourTemplate";
import styled from "styled-components";
import { themeDark, themeLight } from '../../theme';

const SpectrumInterface = () => {
    const Wrapper = styled.section`
      width: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
    `

    const Content = styled.div`
      display: flex;
      gap: 90px;
    `

    return (
        <Wrapper>
            <Content>
                <ColourTemplate theme={themeLight} primary/>
                <ColourTemplate theme={themeDark} />
            </Content>
        </Wrapper>
    );
};

export default SpectrumInterface;