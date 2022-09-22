import React, { useState } from "react";
import "./App.css";

const EditField = (props) => {
  const {
    updateShowEditFieldModal,
    items,
    updateItems,
    activeItem,
    updateActiveItem
  } = props;
  const [internalFieldName, updateInternalFieldName] = useState("");
  const [internalFieldType, updateInternalFieldType] = useState(
    activeItem.type
  );
  const [internalFieldOptions, updateInternalFieldOptions] = useState(
    activeItem.options
  );
  const [internalIsFieldRequired, updateInternalIsFieldRequired] = useState(
    activeItem.required
  );
  const [internalFieldHalfWidth, updateInternalFieldHalfWidth] = useState(
    activeItem.isHalfWidth
  );
  const typeOptions = [
    { name: "Text Field", type: "text" },
    { name: "Email", type: "email" },
    { name: "Phone", type: "phone" },
    { name: "Date", type: "date" },
    { name: "Text Area", type: "text-area" },
    { name: "Radio", type: "radio" },
    { name: "Checkbox", type: "checkbox" },
    { name: "Select", type: "select" },
    { name: "State", type: "state" }
  ];
  console.log(internalFieldType);
  return (
    <div className="modal-background">
      <div className="create-input-options">
        <label>
          Name
          <input
            type="text"
            value={internalFieldName ? internalFieldName : activeItem.name}
            onChange={(e) => updateInternalFieldName(e.target.value)}
          />
        </label>
        <label>
          Type
          <select
            onChange={(e) => {
              console.log(e.target.value);
              updateInternalFieldType(e.target.value);
            }}
            defaultValue={internalFieldType}
          >
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
              value={
                internalFieldOptions ? internalFieldOptions : activeItem.options
              }
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
            onClick={() => {
              updateShowEditFieldModal(false);
              updateActiveItem({});
            }}
          >
            Cancel
          </div>
          <div
            className="add-field-submit"
            onClick={() => {
              updateShowEditFieldModal(false);
              updateActiveItem({});
              updateItems(
                items.map((i) => {
                  if (i.name === activeItem.name)
                    return {
                      ordinality: activeItem.ordinality,
                      name: internalFieldName
                        ? internalFieldName
                        : activeItem.name,
                      type: internalFieldType
                        ? internalFieldType
                        : activeItem.type,
                      options: internalFieldOptions
                        ? internalFieldOptions
                        : activeItem.options,
                      element:
                        (internalFieldType
                          ? internalFieldType
                          : activeItem.type) === "select"
                          ? "select"
                          : "input",
                      required: internalIsFieldRequired,
                      isHalfWidth: internalFieldHalfWidth
                    };
                  else return i;
                })
              );
            }}
          >
            Save
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditField;
