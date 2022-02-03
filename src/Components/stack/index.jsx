import React from "react";
import { SelectDefault } from "../common/select";

const SelectStack = ({ stackType, handleSelectedStackType, value }) => {
  const getOptions = (StackType) => {
    let options = Object.keys(StackType).map((item, index) => {
      return { label: item, value: item };
    });
    return options;
  };

  return (
    <SelectDefault
      options={getOptions(stackType)}
      selectLabel="Select Stack"
      value={value}
      handleValueUpdate={handleSelectedStackType}
      isClearable={true}
      isSearchable={true}
      isDisabled={false}
      isMulti={false}
    />
  );
};

export default SelectStack;
