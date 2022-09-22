import React, { useState } from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import DatePicker from "react-date-picker";
import SelectUSState from "react-select-us-states";
import PhoneInput from "react-phone-input-2";
import arrayMove from "array-move";
import "./App.css";
import SVG from "react-inlinesvg";
import drag from "./drag.svg";
import close from "./close.svg";
import edit from "./edit.svg";
import plus from "./plus.svg";
import NewField from "./newField";
import EditField from "./editField";

const SortableItem = SortableElement(
  ({
    value,
    currentIndex,
    items,
    updateItems,
    updateShowEditFieldModal,
    activeItem,
    updateActiveItem
  }) => {
    return (
      <div data-index={currentIndex} className="layout-field">
        <div className="flex-row">
          <div className="drag-icon-container">
            <SVG src={drag} alt="draggable" className="draggable" />
          </div>
          <span>
            {value.name}
            {value.required ? "*" : ""}
          </span>
        </div>
        <div className="flex-row">
          <span
            onClick={() => {
              updateShowEditFieldModal(true);
              updateActiveItem(value);
            }}
          >
            <SVG src={edit} alt="edit" className="field-action" />
          </span>
          <span
            onClick={() =>
              updateItems(items.filter((i) => i.name !== value.name))
            }
          >
            <SVG src={close} alt="remove" className="field-action" />
          </span>
        </div>
      </div>
    );
  }
);

const SortableList = SortableContainer(
  ({
    items,
    updateItems,
    updateShowEditFieldModal,
    activeItem,
    updateActiveItem
  }) => {
    return (
      <div>
        {items.map((value, index) => (
          <SortableItem
            key={`item-${value.name}`}
            index={index}
            value={value}
            items={items}
            updateItems={updateItems}
            updateShowEditFieldModal={updateShowEditFieldModal}
            activeItem={activeItem}
            updateActiveItem={updateActiveItem}
          />
        ))}
      </div>
    );
  }
);

const SortableComponent = () => {
  const [items, updateItems] = useState([
    {
      name: "First Name",
      element: "input",
      type: "text",
      required: true,
      ordinality: 0
    },
    {
      name: "Last Name",
      element: "input",
      type: "text",
      required: true,
      ordinality: 1
    }
  ]);
  const [showAddFieldModal, updateShowAddFieldModal] = useState(false);
  const [showEditFieldModal, updateShowEditFieldModal] = useState(false);
  const [formData, updateFormData] = useState({});
  const [activeItem, updateActiveItem] = useState({});
  const [dateValue, updateDateValue] = useState(new Date());

  const onSortEnd = ({ oldIndex, newIndex }) => {
    console.log(items);
    updateItems(arrayMove(items, oldIndex, newIndex));
  };

  const sendData = () => {
    console.log(formData);
  };
  return (
    <div className="App">
      {showAddFieldModal ? (
        <NewField
          items={items}
          updateItems={updateItems}
          updateShowAddFieldModal={updateShowAddFieldModal}
        />
      ) : null}
      {showEditFieldModal ? (
        <EditField
          items={items}
          updateItems={updateItems}
          updateShowEditFieldModal={updateShowEditFieldModal}
          activeItem={activeItem}
          updateActiveItem={updateActiveItem}
        />
      ) : null}
      <h1>Form Builder</h1>
      <h2>Fields</h2>
      <div className="divider-line"></div>
      <SortableList
        activeItem={activeItem}
        updateActiveItem={updateActiveItem}
        updateShowEditFieldModal={updateShowEditFieldModal}
        updateItems={updateItems}
        items={items}
        onSortEnd={onSortEnd}
        onSortStart={() => {
          document.body.style.cursor = "grabbing";
        }}
        distance={1}
      />
      <div className="add-field" onClick={() => updateShowAddFieldModal(true)}>
        <SVG src={plus} alt="add-field" />
        Add new field
      </div>
      <h2>Preview</h2>
      <div className="divider-line"></div>
      <form id="form" onSubmit={() => sendData()}>
        <div className="form-container">
          {items.map((i, index) => {
            if (i.element === "input") {
              if (i.type === "radio") {
                return (
                  <div key={i.ordinality}>
                    {i.name}
                    <div className="flex-row">
                      {i.options.map((opt, index) => (
                        <label
                          key={index}
                          className={
                            i.isHalfWidth ? "label-radio-half" : "label-radio"
                          }
                        >
                          <input
                            type="radio"
                            name={i.name}
                            value={opt}
                            onChange={(e) =>
                              updateFormData({
                                ...formData,
                                ...{ [i.name]: e.target.value }
                              })
                            }
                          />
                          {opt}
                        </label>
                      ))}
                    </div>
                  </div>
                );
              } else if (i.type === "checkbox") {
                return (
                  <label
                    key={i.ordinality}
                    className={
                      i.isHalfWidth ? "label-radio-half" : "label-radio"
                    }
                  >
                    <input
                      type="checkbox"
                      onChange={(e) =>
                        updateFormData({
                          ...formData,
                          ...{ [i.name]: e.target.checked }
                        })
                      }
                    />
                    {i.name}
                  </label>
                );
              } else if (i.type === "date") {
                return (
                  <label
                    key={i.ordinality}
                    className={i.isHalfWidth ? "label-half" : "label-full"}
                  >
                    {i.name}
                    <div className="date-field">
                      <DatePicker
                        onChange={(value) => {
                          updateDateValue(value);
                          updateFormData({
                            ...formData,
                            ...{ [i.name]: value }
                          });
                        }}
                        value={dateValue}
                      />
                    </div>
                  </label>
                );
              } else if (i.type === "phone") {
                return (
                  <label
                    key={i.ordinality}
                    className={i.isHalfWidth ? "label-half" : "label-full"}
                  >
                    {i.name}
                    <div>
                      <PhoneInput
                        country={"us"}
                        value={i.phone}
                        onChange={(value) =>
                          updateFormData({
                            ...formData,
                            ...{ [i.name]: value }
                          })
                        }
                      />
                    </div>
                  </label>
                );
              } else if (i.type === "state") {
                return (
                  <label
                    key={i.ordinality}
                    className={i.isHalfWidth ? "label-half" : "label-full"}
                  >
                    {i.name}
                    <div>
                      <SelectUSState
                        onChange={(value) =>
                          updateFormData({
                            ...formData,
                            ...{ [i.name]: value }
                          })
                        }
                      />
                    </div>
                  </label>
                );
              } else {
                return (
                  <label
                    key={i.ordinality}
                    className={i.isHalfWidth ? "label-half" : "label-full"}
                  >
                    {i.name}
                    <input
                      onChange={(e) =>
                        updateFormData({
                          ...formData,
                          ...{ [i.name]: e.target.value }
                        })
                      }
                      type={i.type}
                      required={i.required}
                    />
                  </label>
                );
              }
            } else if (i.element === "select") {
              return (
                <label
                  key={i.ordinality}
                  className={i.isHalfWidth ? "label-half" : "label-full"}
                >
                  {i.name}
                  <select
                    onChange={(e) =>
                      updateFormData({
                        ...formData,
                        ...{ [i.name]: e.target.value }
                      })
                    }
                    required={i.required}
                  >
                    {i.options.map((opt, index) => (
                      <option value={opt} key={index}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </label>
              );
            }
          })}
        </div>
        <input type="submit" />
      </form>
    </div>
  );
};

export default SortableComponent;
