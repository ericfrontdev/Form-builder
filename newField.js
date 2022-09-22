import React, { useState } from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import "./App.css";

const NewField = (props) => {
  const { updateShowAddFieldModal, items, updateItems } = props;
  const [internalFieldName, updateInternalFieldName] = useState("");
  const [internalFieldType, updateInternalFieldType] = useState("text");
  const [internalFieldOptions, updateInternalFieldOptions] = useState([]);
  const [internalFieldPattern, updateInternalFieldPattern] = useState(null);
  const [internalIsFieldRequired, updateInternalIsFieldRequired] = useState(
    false
  );
  const [internalFieldWidth, updateInternalFieldWidth] = useState(false);
  const typeOptions = [
    { name: "Text Field", type: "text" },
    { name: "Text Area", type: "text-area" },
    { name: "Radio", type: "radio" },
    { name: "Checkbox", type: "checkbox" },
    { name: "Select", type: "select" }
  ];
  const inputPatterns = [
    "text",
    "date",
    "search",
    "url",
    "tel",
    "email",
    "password"
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
        {internalFieldType === "select" ? (
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
        {internalFieldType === "text" ? (
          <label>
            Pattern Validation
            <select
              onChange={(e) => updateInternalFieldPattern(e.target.value)}
            >
              {inputPatterns.map((p, index) => (
                <option value={p} key={index}>
                  {p}
                </option>
              ))}
            </select>
          </label>
        ) : null}
        <label className="checkbox-field">
          <input
            type="checkbox"
            checked={internalIsFieldRequired}
            onChange={(e) =>
              updateInternalIsFieldRequired(!internalIsFieldRequired)
            }
          />
          Required
        </label>
        <label className="checkbox-field">
          <input
            type="checkbox"
            checked={internalFieldWidth}
            onChange={(e) => updateInternalFieldWidth(!internalFieldWidth)}
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
                  width: internalFieldWidth,
                  pattern: internalFieldPattern
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
