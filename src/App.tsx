import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from "./components/Routes";
import Sidebar from "./components/Sidebar/Sidebar";
import { RecoilRoot } from 'recoil'
import { QueryClientProvider, QueryClient } from 'react-query';
import {ThemeProvider} from 'styled-components';
import { themeLight } from './theme';

const queryClient = new QueryClient()




function App() {
    return (
        <div className="containerApp" >
            <RecoilRoot>
                <QueryClientProvider client={queryClient} contextSharing >
                    <BrowserRouter>
                        <ThemeProvider theme={themeLight}>
                            <Sidebar />
                            <div className="containerMain" >
                                <Routes />
                            </div>
                        </ThemeProvider>
                    </BrowserRouter>
                </QueryClientProvider>
            </RecoilRoot>
        </div>
    );
}

export default App;
