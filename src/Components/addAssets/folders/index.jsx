import React from "react";
import { SelectDefault } from "../../common/select";

const SelectFolderType = ({
  handleSelectedFoldersType,
  value,
  loadMoreFolderType,
}) => {
  return (
    <SelectDefault
      // placeholder="Select Folder"
      selectLabel="Select Folder"
      value={value}
      handleValueUpdate={handleSelectedFoldersType}
      isClearable={true}
      isSearchable={true}
      isDisabled={false}
      isMulti={true}
      noOptionsMessage="Select StackType First"
      loadMoreOptions={loadMoreFolderType}
    />
  );
};

export default SelectFolderType;
