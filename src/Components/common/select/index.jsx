import React from "react";
import { AsyncSelect, Select } from "@contentstack/venus-components";

export const SelectDefault = ({
  options,
  placeholder,
  handleValueUpdate,
  value,
  isClearable,
  isDisabled = false,
  isMulti,
  isSearchable,
  hideSelectedOptions = false,
  loadMoreOptions,
  defaultOptions = false,
  noOptionsMessage = "No lables created yet",
  width = "250px",
  selectLabel = "label",
}) => {
  return (
    <>
      {loadMoreOptions ? (
        <AsyncSelect
          value={value}
          selectLabel={selectLabel}
          onChange={handleValueUpdate}
          isMulti={isMulti}
          placeholder={placeholder}
          loadMoreOptions={loadMoreOptions}
          defaultOptions={defaultOptions}
          limit={10}
          isClearable={isClearable}
          isSearchable={isSearchable}
          menuShouldScrollIntoView={false}
          width={width}
          maxMenuHeight={"400px"}
          debounceTimeout={0}
          initialOptions={null}
        />
      ) : (
        <Select
          value={value}
          selectLabel={selectLabel}
          onChange={handleValueUpdate}
          isMulti={isMulti}
          options={options}
          placeholder={placeholder}
          isClearable={isClearable}
          isSearchable={isSearchable}
          isDisabled={isDisabled}
          hideSelectedOptions={hideSelectedOptions}
          multiDisplayLimit={isMulti ? 3 : 0}
          width={width}
          maxMenuHeight={"400px"}
          noOptionsMessage={() => noOptionsMessage}
        />
      )}
    </>
  );
};
