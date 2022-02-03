import { SelectDefault } from "../../common/select/index";

const SelectLocal = ({ handleSelectedLocal, value, loadMoreLocal }) => {
  return (
    <>
      <SelectDefault
        selectLabel="Select Locale"
        value={value}
        handleValueUpdate={handleSelectedLocal}
        isClearable={true}
        isSearchable={true}
        isDisabled={false}
        isMulti={false}
        loadMoreOptions={loadMoreLocal}
        noOptionsMessage="Select ContentType First"
      />
    </>
  );
};

export default SelectLocal;
