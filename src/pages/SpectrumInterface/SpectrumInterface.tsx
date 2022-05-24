import React from 'react';
import {useIntl} from "react-intl";
import {useRecoilState} from "recoil";
import styled from "styled-components";
import useDocumentTitle from "../../shared/hooks/useDocumentTitle";
import {themeState, ThemeStateType} from '../../theme';
import ColourTemplate from "./components/ColourTemplate";

const SpectrumInterface = () => {
    const intl = useIntl()

    useDocumentTitle(intl.formatMessage({id: "tab.theme"}))

    const [theme, setTheme] = useRecoilState(themeState)

    const isEqualToTheme = (templateTheme: ThemeStateType): boolean => templateTheme === theme;

    return (
        <Wrapper>
            <Content>
                <ColourTemplate
                    disabledButton={isEqualToTheme('light')}
                    onClick={() => setTheme('light')}
                    theme={'light'}
                    primary
                />
                <ColourTemplate
                    disabledButton={isEqualToTheme('dark')}
                    onClick={() => setTheme('dark')}
                    theme={'dark'}
                />
            </Content>
        </Wrapper>
    );
};


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

export default SpectrumInterface;