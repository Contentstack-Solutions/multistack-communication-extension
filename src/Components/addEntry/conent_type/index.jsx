import React from "react";
import { SelectDefault } from "../../common/select/index";

const SelectContentType = ({
  contentType,
  handleSelectedContentType,
  value,
  loadMoreContentType,
  isDisabled = false,
}) => {
  return (
    <SelectDefault
      selectLabel={"Select ContentType"}
      value={value}
      handleValueUpdate={handleSelectedContentType}
      isClearable={true}
      isSearchable={true}
      isDisabled={isDisabled}
      isMulti={false}
      noOptionsMessage="Select StackType First"
      loadMoreOptions={loadMoreContentType}
    />
  );
};

export default SelectContentType;
