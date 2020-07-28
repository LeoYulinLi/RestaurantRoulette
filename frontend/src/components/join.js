import { useDispatch } from "react-redux";
import { joinRoom } from "../actions/join_actions";
import { Redirect, useRouteMatch } from "react-router-dom";
import React from "react";

const { useEffect } = require("react");

const Join = () => {

  const dispatch = useDispatch();

  const matches = useRouteMatch();
  const { id } = matches.params;

  useEffect(() => {
    dispatch(joinRoom(id));
  }, []);

  return <Redirect to="/main" />

}

export default Join;
