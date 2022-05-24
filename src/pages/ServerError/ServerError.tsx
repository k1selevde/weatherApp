import React from 'react';
import {useIntl} from "react-intl";
import styled from 'styled-components';
import useDocumentTitle from "../../shared/hooks/useDocumentTitle";
import serverError from "../../shared/assets/static/serverError.svg"
import { Link } from 'react-router-dom';

const ServerError = () => {
    const intl = useIntl()

    useDocumentTitle(intl.formatMessage({id: "tab.500"}))

    return (
        <Wrapper>
            <h4>Server Error... try after</h4>
            <Link to={"/"}>Back to "Main page"</Link>
            <img src={serverError} alt="server error"/>
        </Wrapper>
    );
};


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

export default ServerError;