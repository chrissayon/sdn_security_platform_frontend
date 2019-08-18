import React from 'react'
import Box from '@material-ui/core/Box';

const jsonPair = (props) => {
    return(
        <React.Fragment>
            <Box display="flex" flexDirection="row" width={1/3}>
                {props.header + ":"}
            </Box>
            <Box display="flex" flexDirection="row" width="50%">
                {props.value}
            </Box>
        </React.Fragment>
    )
}

export default jsonPair;