import { SelectDefault } from "../../common/select/index";

const SelectEnviroment = ({
  handleSelectedEnviroment,
  value,
  loadMoreEnviromet,
}) => {
  return (
    <>
      <SelectDefault
        selectLabel="Select Enviroment"
        value={value}
        handleValueUpdate={handleSelectedEnviroment}
        isClearable={true}
        isSearchable={true}
        isDisabled={false}
        isMulti={false}
        loadMoreOptions={loadMoreEnviromet}
        noOptionsMessage="Select ContentType First"
      />
    </>
  );
};

export default SelectEnviroment;
