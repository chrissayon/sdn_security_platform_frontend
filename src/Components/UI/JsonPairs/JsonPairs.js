import React from 'react'
import JsonPair from './JsonPair'
import Box from '@material-ui/core/Box';

const jsonPairs = (props) => {

    return(
        Object.keys(props.jsonList).map((header, index) => (
            <Box width={2/3} flexWrap="nowrap" display="flex" flexDirection="row" border={1}>
                <JsonPair
                    key = { index }
                    header = { header }
                    value = { props.jsonList[header] }
                >
                </JsonPair>
            </Box>
        ))
    )
}

export default jsonPairs;