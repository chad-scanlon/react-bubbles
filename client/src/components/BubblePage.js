import React, { useState, useEffect } from "react";
import axios from "axios";
import axiosWithAuth from "../utils/axiosWithAuth";
import { Route } from "react-router-dom";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = (props) => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
  useEffect(() => {
    axiosWithAuth()
      .get("/colors")
      .then((res) => {
        // console.log(res);
        setColorList(res.data);
      })
      .catch((err) => console.error(err.message));
  }, []);
  return (
    <>
      {/* <Route
        path="/item-list/:id"
        render={props => <Item {...props} items={items} setItems={setItems} />}
      />
      <Route path="/item-form" component={ItemForm} /> */}
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
