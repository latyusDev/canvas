import React from 'react'
import Text from './Text'

const DisplayProperty = ({objectType,textProperty}) => {

    switch(objectType){
        case 'text':
            return <Text textProperty={textProperty}/>
        case 'square':
            return '<Text/>'
        case 'Triangle':
            return '<Text/>'
        default:
            return '<Text/>'
    }
}

export default DisplayProperty