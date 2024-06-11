import React, { useEffect, useState } from 'react';
import { useWindowWidth } from '@react-hook/window-size';
import classNames from 'classnames';
import InvestmentInfo from './InvestmentInfo';
import Header from './Header';
import Body from './Body';

const ActiveInvestments = () => {
    const [showAppInfo, setShowAppInfo] = useState(true);
    const [showSidebar, setShowSidebar] = useState(true);
    const vpWidth = useWindowWidth();

    useEffect(() => {
        if (vpWidth < 1199) {
            setShowAppInfo(false);
        }
    }, [vpWidth])

    return (
        <div className="hk-pg-body py-0">
            <div
                className={classNames("todoapp-wrap", { "todoapp-info-active": showAppInfo }, { "todoapp-sidebar-toggle": showSidebar })}
            >
                <div style={{ left: 0 }} className="todoapp-content">
                    <div className="todoapp-detail-wrap">
                        <Header
                            toggleSidebar={() => setShowSidebar(!showSidebar)}
                            showSidebar={showSidebar}
                        />
                        <Body showInfo={() => setShowAppInfo(true)} />
                        <InvestmentInfo close={() => setShowAppInfo(!showAppInfo)} />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ActiveInvestments
