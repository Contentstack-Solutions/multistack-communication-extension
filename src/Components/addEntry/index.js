import React, { useState, useEffect, useCallback } from "react";
import { DeleteSvg } from "../../assets/delete";
import { fetchSdkData } from "../../services/sdk";
import SelectContentType from "./conent_type";
import SelectEntries from "./entry";
import SelectEnviroment from "./environment";
import SelectLocal from "./local";
import SelectStack from "../stack";

function Selector({
  stack,
  entryData,
  createStackObject,
  removeComponent,
  contentArray,
  index,
  locale,
}) {
  const [stackType, setStackType] = useState();
  const [selectedStack, setSelectedStack] = useState(null);
  const [selectedLocal, setSelectedLocal] = useState(null);
  const [selectedContentType, setSelectedContentType] = useState(null);
  const [selectedEntries, setSelectedEntries] = useState(null);
  const [selectedEnviroment, setSeletedEnviroment] = useState(null);

  const getContentType = useCallback(
    async ({ search, skip, limit }) => {
      try {
        const res = await fetchSdkData({
          api_key: stackType[0].api_key,
          management_token: stackType[0].management_token,
          baseUrl: stackType[0].baseUrl,
          query: {
            limit: limit,
            skip: skip,
            query: { title: { $regex: `^${search}`, $options: "i" } },
            include_count: true,
            include_global_field_schema: false,
          },
          type: "/content_types",
        });
        return res;
      } catch (err) {
        console.log(err);
        return {
          items: [],
          count: 0,
        };
      }
    },
    [stackType]
  );

  const getEnviroment = useCallback(
    async ({ search, skip, limit }) => {
      try {
        const res = await fetchSdkData({
          api_key: stackType[0].api_key,
          management_token: stackType[0].management_token,
          baseUrl: stackType[0].baseUrl,
          query: {
            limit: limit,
            skip: skip,
            query: { name: { $regex: `^${search}`, $options: "i" } },
            include_count: true,
            include_global_field_schema: false,
          },
          type: "/environment",
        });
        if (contentArray?.length > 0) {
          let content = contentArray.filter(
            (i) => i?.content_types.uid === selectedContentType?.value
          );
          if (content.length > 0) {
            return {
              items: res.items.filter(
                (item) =>
                  !content
                    .map((i) => i?.content_types?.environment)
                    .includes(item.name)
              ),
              count: res.count,
            };
          } else {
            return res;
          }
        } else {
          return res;
        }
      } catch (err) {
        console.log(err);
        return {
          items: [],
          conut: 0,
        };
      }
    },
    [stackType, contentArray, selectedContentType]
  );

  const getEntry = useCallback(
    async ({ contentType, skip, limit, search }) => {
      try {
        const res = await fetchSdkData({
          api_key: stackType[0].api_key,
          management_token: stackType[0].management_token,
          baseUrl: stackType[0].baseUrl,
          query: {
            limit: limit,
            skip: skip,
            query: { title: { $regex: `^${search}`, $options: "i" } },
            include_count: true,
            locale: selectedLocal?.value,
            environment: selectedEnviroment.value,
          },
          type: "/entry",
          contentType: contentType,
        });
        return res;
      } catch (err) {
        console.log(err);
        return {
          items: [],
          count: 0,
        };
      }
    },

    [stackType, selectedLocal, selectedEnviroment]
  );

  const getLocals = useCallback(
    async ({ skip, limit, search }) => {
      try {
        const res = fetchSdkData({
          api_key: stackType[0].api_key,
          management_token: stackType[0].management_token,
          baseUrl: stackType[0].baseUrl,
          query: {
            limit: limit,
            skip: skip,
            query: { code: { $regex: `^${search}`, $options: "i" } },
            include_count: true,
          },
          type: "/locale",
        });
        return res;
      } catch (err) {
        console.log(err);
        return {
          items: [],
          conut: 0,
        };
      }
    },
    [stackType]
  );

  useEffect(() => {
    if (Object.keys(entryData).length > 0) {
      setSelectedStack({
        label: entryData.stack_name,
        value: entryData.stack_name,
      });
      setStackType([
        {
          api_key: entryData.api_key,
          management_token: stack[entryData.stack_name][0].management_token,
          baseUrl: entryData.baseUrl,
          access_token: stack[entryData.stack_name][0].access_token,
        },
      ]);
      setSelectedContentType({
        label: entryData.content_types.title,
        value: entryData.content_types.uid,
      });
      setSeletedEnviroment({
        label: entryData.content_types.environment,
        value: entryData.content_types.environment,
      });
      setSelectedLocal({
        label: entryData.content_types.locale,
        value: entryData.content_types.locale,
      });
      setSelectedEntries(
        entryData.content_types.entries.map((item) => {
          return { label: item.title, value: item.uid, url: item.url };
        })
      );
    }
  }, [entryData, stack]);

  const handleSelectedStackType = (data) => {
    setSelectedContentType(null);
    setSelectedEntries(null);
    setSelectedLocal(null);
    setSeletedEnviroment(null);
    setSelectedStack(data);
    if (data) {
      setStackType(stack[data.value]);
    }
  };

  const handleSelectedContentType = (data) => {
    setSelectedEntries(null);
    setSelectedLocal(null);
    setSeletedEnviroment(null);
    setSelectedContentType(data);
  };

  const handleSelectedEnviroment = (data) => {
    setSelectedLocal(null);
    setSeletedEnviroment(data);
    if (data && locale) {
      setSelectedLocal({ label: locale, value: locale });
    }
  };

  const handleSelectedLocal = (data) => {
    setSelectedEntries(null);
    setSelectedLocal(data);
  };

  const handleSelectedEntries = async (data) => {
    setSelectedEntries(data);
    if (data) {
      let finalStack = {
        stack_name: selectedStack.value,
        // access_token: stack[selectedStack.value][0].access_token,
        api_key: stack[selectedStack.value][0].api_key,
        // management_token: stack[selectedStack.value][0].management_token,
        baseUrl: stack[selectedStack.value][0].baseUrl,
        content_types: {
          entries: data.map((item) => {
            return {
              title: item.label,
              uid: item.value,
              url: item.url,
            };
          }),
          environment: selectedEnviroment.value,
          locale: selectedLocal.value,
          uid: selectedContentType.value,
          title: selectedContentType.label,
        },
      };
      createStackObject(finalStack, index);
    }
  };

  const loadMoreContentType = async ({ search, skip, limit }) => {
    let data = await getContentType({
      search: search,
      skip: skip,
      limit: limit,
    });
    let newData = data?.items?.map((item) => {
      return { label: item.title, value: item.uid };
    });
    return {
      options: newData ?? [],
      hasMore: data.count > skip + limit,
    };
  };

  const loadMoreEnviromet = async ({ search, skip, limit }) => {
    let data = await getEnviroment({ search, skip, limit });
    let newData = data?.items?.map((item) => {
      return {
        label: item.name,
        value: item.name,
      };
    });
    return {
      options: newData ?? [],
      hasMore: data.count > skip + limit,
    };
  };

  const loadMoreLocal = async ({ search, skip, limit }) => {
    let data = await getLocals({ search, limit, skip });
    let newData = data?.items?.map((item) => {
      return { label: item.code, value: item.code };
    });
    return {
      options: newData ?? [],
      hasMore: data.count > skip + limit,
    };
  };

  const loadMoreEntry = async ({ search, skip, limit }) => {
    let data = await getEntry({
      contentType: selectedContentType.value,
      search: search,
      skip: skip,
      limit: limit,
    });
    let newData = data?.items?.map((item) => {
      return { label: item.title, value: item.uid, url: item.url };
    });
    return {
      options: newData ?? [],
      hasMore: data.count > skip + limit,
    };
  };

  return (
    <div className="container">
      <div className="wrappper">
        <div className="component-container">
          <SelectStack
            handleSelectedStackType={handleSelectedStackType}
            stackType={stack}
            value={selectedStack}
          />
        </div>
        <div className="component-container">
          {selectedStack && (
            <SelectContentType
              value={selectedContentType}
              handleSelectedContentType={handleSelectedContentType}
              loadMoreContentType={loadMoreContentType}
            />
          )}
        </div>
        <div className="component-container ">
          {selectedContentType && (
            <SelectEnviroment
              handleSelectedEnviroment={handleSelectedEnviroment}
              value={selectedEnviroment}
              loadMoreEnviromet={loadMoreEnviromet}
            />
          )}
        </div>
      </div>
      <div className="localize-container">
        <div className="component-container ">
          {selectedEnviroment && (
            <SelectLocal
              handleSelectedLocal={handleSelectedLocal}
              value={selectedLocal}
              loadMoreLocal={loadMoreLocal}
            />
          )}
        </div>
        <div className="entry-container">
          {selectedLocal && (
            <SelectEntries
              handleSelectedEntries={handleSelectedEntries}
              value={selectedEntries}
              loadMoreEntry={loadMoreEntry}
            />
          )}
        </div>
        <div>
          <DeleteSvg
            from="entry"
            id={selectedContentType?.value}
            env={selectedEnviroment?.value}
            removeComponent={removeComponent}
          />
        </div>
      </div>
    </div>
  );
}

export default Selector;
