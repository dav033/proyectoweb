import React from 'react';
import Navigation from '../navigation/Navigation.jsx';

function Layout({children}) {
    return (
        <>
            <Navigation></Navigation>
            {children}
        </>
    );
}

export default Layout;