import React from 'react';
import {IntlProvider} from 'react-intl';
import {QueryClient, QueryClientProvider} from 'react-query';
import {BrowserRouter} from 'react-router-dom';
import {RecoilRoot, useRecoilValue} from 'recoil'
import Routes from "./components/Routes";
import Sidebar from "./components/Sidebar/Sidebar";
import {localeMessages, localeState} from "./i18n";
import RecoilDebugObserver from "./RecoilDebugObserver"
import {themeState} from "./theme";

const queryClient = new QueryClient()

const Body = () => {
    // подписываю всё приложение на пересчёт значения по умолчанию при обновлении
    const theme = useRecoilValue(themeState)
    const locale = useRecoilValue(localeState)

    const messages = localeMessages[locale]

    return (
        <IntlProvider messages={messages} locale="en" defaultLocale="en">
            <BrowserRouter>
                <Sidebar />
                <div className="containerMain">
                    <Routes />
                </div>
            </BrowserRouter>
        </IntlProvider>
    )
}

function App() {
    const isDev = process.env.NODE_ENV === 'development'

    return (
        <div className="containerApp">
            <RecoilRoot>
                {isDev && <RecoilDebugObserver />}

                <QueryClientProvider client={queryClient} contextSharing >
                        <Body />
                </QueryClientProvider>
            </RecoilRoot>
        </div>
    );
}

export default App;
