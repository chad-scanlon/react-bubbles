import React, { useState, useEffect } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
import { useParams } from "react-router-dom";

const initialColor = {
  color: "",
  code: { hex: "" },
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);

  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  // const [changedColor, setChangedColor] = useState([]);
  const [color, setColor] = useState(initialColor);
  const [createdColor, setCreatedColor] = useState(initialColor);
  const { id } = useParams;

  // useEffect(() => {
  //   axiosWithAuth()
  //     .get("/colors/")
  //     .then(
  //       (res) => console.log(res.data)
  //       // setChangedColor(res.data)
  //     )
  //     .catch((err) => console.log("get color id", err.message, err.response));
  // }, []);

  const editColor = (color) => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = (e) => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is it saved right now?
    axiosWithAuth()
      .put(`/colors/${colorToEdit.id}`, colorToEdit)
      .then((res) => {
        // console.log(res);
        const NewColor = colors.map((col) => {
          if (col.id === color.id) {
            return color;
          }
          return col;
        });
        setColor(NewColor);
      })

      .catch((err) =>
        console.error(
          "UpdateForm.js: handleSubmit: ",
          err.message,
          err.response
        )
      );
  };

  const deleteColor = (color) => {
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`/colors/${color.id}`)
      .then((res) => {
        setColorToEdit(res.data);
        // push("/");
        // props.getMovieList();
      })
      .catch((err) => console.log("delete error", err.message, err.response));
  };

  // const addColor = (event) => {
  //   event.preventDefault();
  //   axiosWithAuth()
  //     .post("/colors", createdColor)
  //     .then((res) => {
  //       console.log(res);
  //       setCreatedColor(res.data);
  //     });
  // };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map((color) => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className="delete"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteColor(color);
                }}
              >
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={(e) =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={(e) =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value },
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
