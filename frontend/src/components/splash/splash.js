import React from 'react'
import Roulette from '../roulette/roulette'
import Modal from '../modal/modal'

class Splash extends React.Component {
    

    render() {
        return(
            <>
            <Modal />
            <Roulette style={'splash-inner-wheel'} /> 
            </>
        )
    }
}

export default Splash