import React, { useState } from "react";
import "./App.css";

const NewField = (props) => {
  const { updateShowAddFieldModal, items, updateItems } = props;
  const [internalFieldName, updateInternalFieldName] = useState("");
  const [internalFieldType, updateInternalFieldType] = useState("text");
  const [internalFieldOptions, updateInternalFieldOptions] = useState([]);
  const [internalIsFieldRequired, updateInternalIsFieldRequired] = useState(
    false
  );
  const [internalFieldHalfWidth, updateInternalFieldHalfWidth] = useState(
    false
  );
  const typeOptions = [
    { name: "Text Field", type: "text" },
    { name: "Email", type: "email" },
    { name: "Date", type: "date" },
    { name: "Text Area", type: "text-area" },
    { name: "Radio", type: "radio" },
    { name: "Checkbox", type: "checkbox" },
    { name: "Select", type: "select" },
    { name: "State", type: "state" }
  ];

  return (
    <div className="modal-background">
      <div className="create-input-options">
        <label>
          Name
          <input
            type="text"
            onChange={(e) => updateInternalFieldName(e.target.value)}
          />
        </label>
        <label>
          Type
          <select onChange={(e) => updateInternalFieldType(e.target.value)}>
            {typeOptions.map((t, index) => (
              <option value={t.type} key={index}>
                {t.name}
              </option>
            ))}
          </select>
        </label>
        {internalFieldType === "select" || internalFieldType === "radio" ? (
          <label>
            Options (separated by a comma)
            <input
              type="email"
              multiple
              onChange={(e) =>
                updateInternalFieldOptions(e.target.value.split(","))
              }
            />
          </label>
        ) : null}
        <label className="flex-row">
          <input
            type="checkbox"
            checked={internalIsFieldRequired}
            onChange={(e) =>
              updateInternalIsFieldRequired(!internalIsFieldRequired)
            }
          />
          Required
        </label>
        <label className="flex-row">
          <input
            type="checkbox"
            checked={internalFieldHalfWidth}
            onChange={(e) =>
              updateInternalFieldHalfWidth(!internalFieldHalfWidth)
            }
          />
          Half width
        </label>
        <div className="modal-button-group">
          <div
            className="add-field-cancel"
            onClick={() => updateShowAddFieldModal(false)}
          >
            Cancel
          </div>
          <div
            className="add-field-submit"
            onClick={() => {
              updateShowAddFieldModal(false);
              updateItems([
                ...items,
                {
                  ordinality: items.length,
                  name: internalFieldName,
                  type: internalFieldType,
                  options: internalFieldOptions,
                  element: internalFieldType === "select" ? "select" : "input",
                  required: internalIsFieldRequired,
                  isHalfWidth: internalFieldHalfWidth
                }
              ]);
            }}
          >
            Add
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewField;
