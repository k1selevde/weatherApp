import { Component, ErrorInfo, ReactNode } from 'react';
import styled from 'styled-components';
import serverError from '../../shared/assets/static/serverError.svg'

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
    state: State = {
        hasError: false,
    };

    static getDerivedStateFromError(_: Error): State {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <Wrapper>
                <h1>Sorry.. there was a server error [Error Boundary]</h1>
                <img src={serverError} alt="server error"/>
            </Wrapper>
        }

        return this.props.children;
    }
}


const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 55px;
  align-items: center;
  height: 100vh
`

export default ErrorBoundary