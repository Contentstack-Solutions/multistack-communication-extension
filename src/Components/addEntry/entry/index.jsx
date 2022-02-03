import { SelectDefault } from "../../common/select";

const SelectEntries = ({
  handleSelectedEntries,
  value,
  entry,
  loadMoreEntry,
}) => {
  return (
    <>
      <SelectDefault
        selectLabel="Select Entry"
        value={value}
        handleValueUpdate={handleSelectedEntries}
        isClearable={true}
        isSearchable={true}
        isDisabled={false}
        isMulti={true}
        noOptionsMessage="Select ContentType First"
        loadMoreOptions={loadMoreEntry}
        width={"400px"}
      />
    </>
  );
};

export default SelectEntries;
