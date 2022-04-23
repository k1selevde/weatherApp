import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from "./components/Routes";
import Sidebar from "./components/Sidebar/Sidebar";
import { RecoilRoot } from 'recoil'
import { QueryClientProvider, QueryClient } from 'react-query';


const queryClient = new QueryClient()

const Body = () => (
        <BrowserRouter>
            <Sidebar />
            <div className="containerMain" >
                <Routes />
            </div>
        </BrowserRouter>
)

function App() {
    return (
        <div className="containerApp">
            <RecoilRoot>
                <QueryClientProvider client={queryClient} contextSharing >
                        <Body />
                </QueryClientProvider>
            </RecoilRoot>
        </div>
    );
}

export default App;
