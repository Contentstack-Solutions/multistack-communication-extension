import "./App.css";
import React, { useState, useEffect } from "react";
import ContentstackUIExtension from "@contentstack/ui-extensions-sdk";
import Selector from "./Components/addEntry";
import { Button } from "@contentstack/venus-components";
import { useCallback } from "react";
import AsstesSelector from "./Components/addAssets";
import { MuiThemeProvider, Tab, Tabs } from "@material-ui/core";
import { theme } from "./utils/theme";

function App() {
  const [stack, setStack] = useState();
  const [entryData, setEntryData] = useState([]);
  const [extensionField, setExtensionField] = useState();
  const [componentList, setComponentList] = useState([]);
  const [asstesComponent, setAsstesComponents] = useState([]);
  const [asstesData, setAsstesData] = useState([]);
  const [value, setValue] = useState(0);

  useEffect(() => {
    ContentstackUIExtension.init().then((extension) => {
      let extensionField = extension;
      extensionField.window.enableAutoResizing();
      let data = extensionField.field.getData();
      if (data?.entry?.length > 0) setEntryData(data.entry);
      if (data?.assets?.length > 0) setAsstesData(data.assets);
      setExtensionField(extension);
      setStack(extensionField.config);
    });
  }, []);

  const setData = useCallback(async () => {
    if (extensionField) {
      await extensionField.field.setData({
        entry: entryData,
        assets: asstesData,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entryData, asstesData]);

  useEffect(() => {
    setData();
  }, [setData]);

  const createStackObject = (finalStack, index) => {
    setComponentList([]);
    setEntryData((prevState) => {
      if (prevState.length > 0) {
        let previndex = prevState.findIndex(
          (item) => item.content_types.uid === index
        );
        if (previndex >= 0) {
          prevState.splice(previndex, 1, finalStack);
          return [...prevState];
        } else {
          let prev = prevState?.filter((v) => v.content_types.uid !== index);
          if (index === undefined) {
            return [...prev, finalStack];
          }
          return [...prev];
        }
      } else {
        return [finalStack];
      }
    });
  };

  const createAssets = (finalStack, index) => {
    setAsstesComponents([]);
    setAsstesData((prevState) => {
      if (prevState.length > 0) {
        if (finalStack?.folder?.uid === undefined) {
          if (
            prevState.map((v) => v.stack_name).includes(finalStack.stack_name)
          ) {
            let previndex;
            if (index !== undefined) {
              previndex = prevState.findIndex(
                (item) => item.content_type === index
              );
            }
            if (previndex >= 0) {
              prevState.splice(previndex, 1, finalStack);
              return [...prevState];
            } else {
              let prev = prevState?.filter((v) => v?.content_type !== index);
              if (index === undefined) {
                return [...prev, finalStack];
              }
              return [...prev];
            }
          } else {
            let previndex;
            if (index !== undefined) {
              previndex = prevState.findIndex(
                (item) => item.content_type === index
              );
            }
            if (previndex >= 0) {
              prevState.splice(previndex, 1, finalStack);
              return [...prevState];
            } else {
              let prev = prevState?.filter((v) => v?.content_type !== index);
              if (index === undefined) {
                return [...prev, finalStack];
              }
              return [...prev];
            }
          }
        } else {
          let prevIndex;
          if (index !== undefined) {
            prevIndex = prevState.findIndex(
              (item) => item?.folder?.uid === index
            );
          }
          if (prevIndex >= 0) {
            prevState.splice(prevIndex, 1, finalStack);
            return [...prevState];
          } else {
            let prev = prevState?.filter((v) =>
              v?.folder?.uid === undefined ? v : v?.folder?.uid !== index
            );
            if (index === undefined) {
              return [...prev, finalStack];
            }
            return [...prev];
          }
        }
      } else {
        return [finalStack];
      }
    });
  };

  const onAddBtnClick = (event) => {
    let comp = [...componentList];
    comp.push(
      <Selector
        stack={stack}
        createStackObject={createStackObject}
        entryData={{}}
        removeComponent={removeComponent}
        contentArray={entryData}
        locale={extensionField.entry.locale}
      />
    );
    setComponentList(comp);
  };

  const onAddAssteClick = (event) => {
    let comp = [...asstesComponent];
    comp.push(
      <AsstesSelector
        stack={stack}
        createAssets={createAssets}
        removeAsstesComponent={removeAsstesComponent}
        asstesData={{}}
        folderArray={asstesData}
      />
    );
    setAsstesComponents(comp);
  };

  const removeComponent = (id, env) => {
    if (id) {
      setEntryData(
        entryData.filter((v) =>
          v.content_types.environment === env ? v.content_types.uid !== id : v
        )
      );
    } else {
      setComponentList([]);
    }
  };

  const removeAsstesComponent = (id, isFolder) => {
    if (id) {
      if (isFolder) {
        setAsstesData(
          asstesData.filter((item) =>
            item?.folder?.length > 0 ? item?.folder[0]?.uid !== id : item
          )
        );
      } else {
        setAsstesData(
          asstesData.filter((item) =>
            item?.folder?.length > 0
              ? item
              : !item?.assets.map((v) => v?.uid).includes(id)
          )
        );
      }
    } else {
      setAsstesComponents([]);
    }
  };

  return (
    <>
      {stack && Object.keys(stack).length > 0 && (
        <div>
          <MuiThemeProvider theme={theme}>
            <Tabs
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              textColor="primary"
              indicatorColor="primary"
              TabIndicatorProps={{
                style: {
                  height: "1px",
                  transition: "none",
                },
              }}
              className="tab"
            >
              <Tab value={0} label="Entries" />
              <Tab value={1} label="Assets" />
            </Tabs>
          </MuiThemeProvider>
          {value === 0 && (
            <div className="main-container">
              {entryData.length > 0 ? (
                <>
                  {componentList}
                  {entryData
                    .map((item, index) => {
                      return (
                        <Selector
                          key={index}
                          index={item.content_types.uid}
                          stack={stack}
                          createStackObject={createStackObject}
                          entryData={item}
                          removeComponent={removeComponent}
                          contentArray={entryData}
                          locale={extensionField.entry.locale}
                        />
                      );
                    })
                    .reverse()}
                </>
              ) : (
                <>
                  <Selector
                    stack={stack}
                    createStackObject={createStackObject}
                    entryData={{}}
                    removeComponent={removeComponent}
                    contentArray={entryData}
                    locale={extensionField.entry.locale}
                  />
                </>
              )}
              <div>
                <Button
                  onClick={onAddBtnClick}
                  buttonType={"control"}
                  className="add-btn"
                >
                  Entry
                </Button>
              </div>
            </div>
          )}
          {value === 1 && (
            <div className="main-container">
              {asstesData.length > 0 ? (
                <>
                  {asstesComponent}
                  {asstesData
                    .map((item, index) => (
                      <AsstesSelector
                        key={index}
                        index={
                          item?.folder?.uid !== undefined
                            ? item?.folder?.uid
                            : item?.content_type
                        }
                        stack={stack}
                        asstesData={item}
                        createAssets={createAssets}
                        removeAsstesComponent={removeAsstesComponent}
                        folderArray={asstesData}
                      />
                    ))
                    .reverse()}
                </>
              ) : (
                <AsstesSelector
                  stack={stack}
                  createAssets={createAssets}
                  removeAsstesComponent={removeAsstesComponent}
                  asstesData={{}}
                  folderArray={asstesData}
                />
              )}
              <div>
                <Button
                  buttonType={"control"}
                  onClick={onAddAssteClick}
                  className="add-btn"
                >
                  Asset
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default App;
