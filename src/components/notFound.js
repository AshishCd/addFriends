import React, {Fragment} from 'react';


const NotFound = ({text}) => {
    return(
        <Fragment>
            <div className="not-found" data-testid="not-found">{text}</div>
        </Fragment>
    );
};

export default NotFound;