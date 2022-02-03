import React from "react";
import { SelectDefault } from "../../common/select";

const SelectAssetType = ({
  handleSelectedAssetsType,
  value,
  loadMoreAsstesType,
  type,
}) => {
  const getOptions = (type) => {
    return type.map((item) => {
      return {
        label: item,
        value: item,
      };
    });
  };

  return (
    <SelectDefault
      options={getOptions(type)}
      selectLabel="Select AssetType"
      value={value}
      handleValueUpdate={handleSelectedAssetsType}
      isSearchable={true}
      isDisabled={false}
      isClearable={true}
      isMulti={true}
      noOptionsMessage="Select ContentType First"
      // loadMoreOptions={loadMoreAsstesType}
    />
  );
};

export default SelectAssetType;
