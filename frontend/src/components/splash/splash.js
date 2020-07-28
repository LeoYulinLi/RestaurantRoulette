import React, { useEffect } from 'react'
import Modal from '../modal/modal'
import Roulette from '../roulette/roulette'

import './splash.scss'
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../actions/modal_actions";

const Splash = () => {

  const roomIdSelector = (state) => {
    return state.join.roomId;
  }

  const roomId = useSelector(roomIdSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    if (roomId) dispatch(openModal("login"));
  }, [roomId])

  return (
    <div id="splash-container">
      <Modal />

      <div id="splash-info">
        <h2 className="splash-info-header">
          Decide on where to eat by using Restaurant Roulette.
        </h2>

        <div className="splash-info-row-container">
          <div className="splash-info-icon restaurant"></div>
          <span className="splash-info-row">
              <span className="splash-info-row-header">
                Discover new restaurants
              </span>
              <> with our random generator.</>
            </span>
        </div>

        <div className="splash-info-row-container">
          <div className="splash-info-icon salad"></div>
          <span className="splash-info-row">
              <span className="splash-info-row-header">
                Satisfy your cravings
              </span>
              <> by selecting a category.</>
            </span>
        </div>

        <div className="splash-info-row-container">
          <div className="splash-info-icon agree"></div>
          <span className="splash-info-row">
              <span className="splash-info-row-header">
                Agree on a restaurant
              </span>
              <> with the click of a button.</>
            </span>
        </div>
      </div>

      <div className="roulette-container">
        <Roulette style={'splash-inner-wheel'} />
      </div>
    </div>
  );
}

export default Splash
