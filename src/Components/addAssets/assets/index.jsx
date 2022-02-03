import React from "react";
import { SelectDefault } from "../../common/select";

const SelectAssets = ({ handleSelectedImages, value, loadMoreAssets }) => {
  return (
    <SelectDefault
      // placeholder="Select Asstes"
      selectLabel="Select Assets"
      value={value}
      handleValueUpdate={handleSelectedImages}
      isSearchable={true}
      isDisabled={false}
      isMulti={true}
      noOptionsMessage="Select ContentType First"
      loadMoreOptions={loadMoreAssets}
      width={"700px"}
    />
  );
};

export default SelectAssets;
