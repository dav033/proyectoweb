import React from 'react';

import { useEffect } from 'react';

import useChange from "../../components/hooks/useChange.jsx";


function Descubrir() {

    useChange("descubrir");
    return (
        <div>
            <h1>Esta es la pestaña de descubrir</h1>
        </div>
    );
}

export default Descubrir;