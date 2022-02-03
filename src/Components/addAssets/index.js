import { useCallback, useEffect, useState } from "react";
import { DeleteSvg } from "../../assets/delete";
import { DocSvg } from "../../assets/doc";
import { FileSvg } from "../../assets/file";
import { JsonSvg } from "../../assets/json";
import { PdfSvg } from "../../assets/pdf";
import { fetchData } from "../../services";
import SelectStack from "../stack";
import SelectAssetType from "./fileType";
import SelectFolderType from "./folders";
import SelectAssets from "./assets";

const AsstesSelector = ({
  stack,
  createAssets,
  folderArray,
  asstesData,
  index,
  removeAsstesComponent,
}) => {
  const [selectedStack, setSelectedStack] = useState(null);
  const [stackType, setStackType] = useState([]);
  const [showFolder, setShowFolder] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [selectedAsstesType, setSelectedAsstesType] = useState(null);
  const [selectedImages, setSelectedImages] = useState(null);

  const getAssetsFolder = useCallback(
    async ({ search, skip, limit }) => {
      try {
        const res = await fetchData({
          url: `https://${stackType[0].baseUrl}/v3/assets?include_folders=true&query={"$and":[{"is_dir":true},{"name":{"$regex":"^${search}","$options":"i"}}]}&include_count=true&limit=${limit}&skip=${skip}`,
          api_key: stackType[0].api_key,
          management_token: stackType[0].management_token,
        });

        if (folderArray?.length > 0) {
          let array = [];
          let folder = folderArray?.map((i) => i?.folder);
          folder?.forEach((i) => {
            i?.forEach((v) => {
              array.push(v.name);
            });
          });
          return {
            assets: res.assets.filter((item) => !array.includes(item.name)),
            count: res.count,
          };
        } else {
          return res;
        }
      } catch (err) {
        console.log(err);
        return {
          assets: [],
          count: 0,
        };
      }
    },
    [stackType, folderArray]
  );

  const getAssets = useCallback(
    async ({ search, skip, limit }) => {
      try {
        let folder_uid = selectedFolder?.map((v) => `"${v.value}"`) ?? [];
        let content_type =
          selectedAsstesType?.map((v) =>
            v.value === "image/svg+xml" ? `"image/svg%2Bxml"` : `"${v.value}"`
          ) ?? [];

        if (selectedFolder?.length > 0) {
          const res = await fetchData({
            url: `https://${stackType[0].baseUrl}/v3/assets?include_count=true&limit=${limit}&skip=${skip}&query={
               "$and":[
                 {
                   "parent_uid":{
                     "$in":[
                       ${folder_uid}]
                   }
                 },
                 {
                   "$and":[
                     {
                       "content_type":{
                         "$in":[
                           ${content_type}
                         ]
                       }
                     },
                      {
                         "filename": {
                         "$regex": "^${search}", "$options": "i" 
                      }
                    }
                   ]
                 }
               ]
              }`,
            api_key: stackType[0].api_key,
            management_token: stackType[0].management_token,
          });
          return res;
        } else {
          const res = await fetchData({
            url: `https://${stackType[0].baseUrl}/v3/assets?include_count=true&limit=${limit}&skip=${skip}&query={
               "$and":[
                 {
                     "filename":{"$regex":"^${search}","$options":"i"}
                 },
                 {
                   "$and":[
                     {
                       "content_type":{
                         "$in":[
                           ${content_type}
                         ]
                       }
                     }
                   ]
                 }
               ]
              }`,
            api_key: stackType[0].api_key,
            management_token: stackType[0].management_token,
          });
          return res;
        }
      } catch (err) {
        console.log(err);
        return {
          assets: [],
          count: 0,
        };
      }
    },
    [selectedFolder, stackType, selectedAsstesType]
  );

  useEffect(() => {
    if (Object.keys(asstesData).length > 0) {
      setSelectedStack({
        label: asstesData.stack_name,
        value: asstesData.stack_name,
      });
      setStackType([
        {
          api_key: asstesData.api_key,
          management_token: asstesData.management_token,
          environment: asstesData.environment,
          baseUrl: asstesData.baseUrl,
          access_token: asstesData.access_token,
          assetsType: asstesData.assetsType,
        },
      ]);
      if (asstesData.folder !== undefined) {
        setShowFolder(true);
        setSelectedFolder(
          asstesData.folder.map((item) => {
            return {
              label: item.name,
              value: item.uid,
            };
          })
        );
      } else {
        setShowFolder(false);
        setSelectedFolder(null);
      }
      setSelectedAsstesType(
        asstesData?.content_type?.map((item) => {
          return {
            label: item,
            value: item,
          };
        })
      );
      setSelectedImages(
        asstesData.assets.map((item) => {
          switch (item.content_type) {
            case "application/json":
              return {
                label: (
                  <span
                    className="flex-v-center col-gap-10"
                    style={{
                      fontWeight: 400,
                    }}
                  >
                    <JsonSvg width="18px" height="18px" />
                    {item.title}
                  </span>
                ),
                value: item.uid,
                url: item.url,
                content_type: item.content_type,
              };

            case "application/pdf":
              return {
                label: (
                  <span
                    className="flex-v-center col-gap-10"
                    style={{
                      fontWeight: 400,
                    }}
                  >
                    <PdfSvg width="18px" height="18px" />
                    {item.title}
                  </span>
                ),
                value: item.uid,
                url: item.url,
                content_type: item.content_type,
              };
            case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
              return {
                label: (
                  <span
                    className="flex-v-center col-gap-10"
                    style={{
                      fontWeight: 400,
                    }}
                  >
                    <DocSvg width="18px" height="18px" />
                    {item.title}
                  </span>
                ),
                value: item.uid,
                url: item.url,
                content_type: item.content_type,
              };

            case "video/webm":
            case "video/quicktime":
              return {
                label: (
                  <span
                    className="flex-v-center col-gap-10"
                    style={{
                      fontWeight: 400,
                    }}
                  >
                    <video autoPlay loop muted width="18px" height="18px">
                      <source src={item.url} type="video/mp4" />
                    </video>
                    {item.title}
                  </span>
                ),
                value: item.uid,
                url: item.url,
                content_type: item.content_type,
              };

            case "image/svg+xml":
            case "image/gif":
            case "image/png":
            case "image/jpeg":
              return {
                label: (
                  <span className="flex-v-center col-gap-10">
                    <img
                      src={item.url}
                      alt={item.title}
                      width="18px"
                      height="18px"
                    />
                    {item.title}
                  </span>
                ),
                value: item.uid,
                url: item.url,
                content_type: item.content_type,
              };

            default:
              return {
                label: (
                  <span
                    className="flex-v-center col-gap-10"
                    style={{
                      fontWeight: 400,
                    }}
                  >
                    <FileSvg width="18px" height="18px" />
                    {item.title}
                  </span>
                ),
                value: item.uid,
                url: item.url,
                content_type: item.content_type,
              };
          }
        })
      );
    }
  }, [asstesData]);

  const loadMoreFolderType = async ({ search, skip, limit }) => {
    let data = await getAssetsFolder({
      search: search,
      skip: skip,
      limit: limit,
    });
    let newData = data?.assets?.map((item) => {
      return { label: item.name, value: item.uid };
    });
    return {
      options: newData ?? [],
      hasMore: data.count > skip + limit,
    };
  };

  const loadMoreAssets = async ({ search, skip, limit }) => {
    let data = await getAssets({
      search: search,
      skip: skip,
      limit: limit,
    });

    let newData = data?.assets?.map((item) => {
      switch (item.content_type) {
        case "application/json":
          return {
            label: (
              <span
                className="flex-v-center col-gap-10"
                style={{
                  fontWeight: 400,
                }}
              >
                <JsonSvg />
                {item.filename}
              </span>
            ),
            value: item.uid,
            url: item.url,
            content_type: item.content_type,
          };

        case "application/pdf":
          return {
            label: (
              <span
                className="flex-v-center col-gap-10"
                style={{
                  fontWeight: 400,
                }}
              >
                <PdfSvg />
                {item.filename}
              </span>
            ),
            value: item.uid,
            url: item.url,
            content_type: item.content_type,
          };

        case "video/webm":
        case "video/quicktime":
          return {
            label: (
              <span
                className="flex-v-center col-gap-10"
                style={{
                  fontWeight: 400,
                }}
              >
                <video autoPlay loop muted width="30px" height="30px">
                  <source src={item.url} type="video/mp4" />
                </video>
                {item.filename}
              </span>
            ),
            value: item.uid,
            url: item.url,
            content_type: item.content_type,
          };

        case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
          return {
            label: (
              <span
                className="flex-v-center col-gap-10"
                style={{
                  fontWeight: 400,
                }}
              >
                <DocSvg />
                {item.filename}
              </span>
            ),
            value: item.uid,
            url: item.url,
            content_type: item.content_type,
          };

        case "image/svg+xml":
        case "image/gif":
        case "image/png":
        case "image/jpeg":
          return {
            label: (
              <span
                className="flex-v-center col-gap-10"
                style={{
                  fontWeight: 400,
                }}
              >
                <img
                  src={item.url}
                  alt={item.filename}
                  width="30px"
                  height="30px"
                />
                {item.filename}
              </span>
            ),
            value: item.uid,
            url: item.url,
            content_type: item.content_type,
          };

        default:
          return {
            label: (
              <span
                className="flex-v-center col-gap-10"
                style={{
                  fontWeight: 400,
                }}
              >
                <FileSvg />
                {item.filename}
              </span>
            ),
            value: item.uid,
            url: item.url,
            content_type: item.content_type,
          };
      }
    });
    return {
      options: newData ?? [],
      hasMore: data.count > skip + limit,
    };
  };

  const handleSelectedStackType = async (data) => {
    setSelectedFolder(null);
    setSelectedAsstesType(null);
    setSelectedImages(null);
    setShowFolder(false);
    setSelectedStack(data);
    if (data) {
      setStackType(stack[data.value]);
      const { assets } = await fetchData({
        url: `https://${
          stack[data.value][0].baseUrl
        }/v3/assets?include_folders=true&count=true&query={"is_dir": true}`,
        api_key: stack[data.value][0].api_key,
        management_token: stack[data.value][0].management_token,
      });
      assets > 0 ? setShowFolder(true) : setShowFolder(false);
    }
  };

  const handleSelectedFoldersType = (data) => {
    setSelectedAsstesType(null);
    setSelectedImages(null);
    setSelectedFolder(data);
  };
  const handleSelectedAssetsType = (data) => {
    setSelectedImages(null);
    setSelectedAsstesType(data);
  };

  const handleSelectedImages = (data) => {
    setSelectedImages(data);
    if (data) {
      let finalStack = {
        stack_name: selectedStack.value,
        access_token: stack[selectedStack.value][0].access_token,
        api_key: stack[selectedStack.value][0].api_key,
        environment: stack[selectedStack.value][0].environment,
        management_token: stack[selectedStack.value][0].management_token,
        baseUrl: stack[selectedStack.value][0].baseUrl,
        assetsType: stack[selectedStack.value][0].assetsType,
        folder: selectedFolder?.map((v) => {
          return {
            uid: v.value,
            name: v.label,
          };
        }),
        content_type: selectedAsstesType?.map((item) => item.value),
        assets: data.map((item) => {
          switch (item.content_type) {
            case "application/json":
              return {
                title: item?.label?.props?.children[1],
                uid: item.value,
                url: item.url,
                content_type: item.content_type,
              };

            case "application/pdf":
              return {
                title: item?.label?.props?.children[1],
                uid: item.value,
                url: item.url,
                content_type: item.content_type,
              };

            case "video/webm":
            case "video/quicktime":
              return {
                title: item?.label?.props?.children[1],
                url: item.url,
                uid: item.value,
                content_type: item.content_type,
              };

            case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
              return {
                title: item?.label?.props?.children[1],
                uid: item.value,
                url: item.url,
                content_type: item.content_type,
              };
            case "image/svg+xml":
            case "image/gif":
            case "image/png":
            case "image/jpeg":
              return {
                title: item?.label?.props?.children[1],
                url: item.url,
                uid: item.value,
                content_type: item.content_type,
              };

            default:
              return {
                title: item?.label?.props?.children[1],
                url: item.url,
                uid: item.value,
                content_type: item.content_type,
              };
          }
        }),
      };
      if (selectedFolder?.length < 0) {
        delete finalStack.folder;
      }
      createAssets(finalStack, index);
    }
  };

  return (
    <div className="container">
      <div className="wrappper">
        <div className="component-container">
          <SelectStack
            stackType={stack}
            handleSelectedStackType={handleSelectedStackType}
            value={selectedStack}
          />
        </div>
        {showFolder ? (
          <>
            <div className="component-container">
              <SelectFolderType
                handleSelectedFoldersType={handleSelectedFoldersType}
                value={selectedFolder}
                loadMoreFolderType={loadMoreFolderType}
              />
            </div>
            <div className="component-container">
              {selectedStack && (
                <SelectAssetType
                  handleSelectedAssetsType={handleSelectedAssetsType}
                  value={selectedAsstesType}
                  type={stackType[0]?.assetsType}
                />
              )}
            </div>
          </>
        ) : (
          <div className="component-container">
            {selectedStack && (
              <SelectAssetType
                handleSelectedAssetsType={handleSelectedAssetsType}
                value={selectedAsstesType}
                type={stackType[0]?.assetsType}
              />
            )}
          </div>
        )}
      </div>
      <div className="wp-asstes-container">
        <div className="asstes-container">
          {selectedAsstesType?.length > 0 && (
            <SelectAssets
              handleSelectedImages={handleSelectedImages}
              value={selectedImages}
              loadMoreAssets={loadMoreAssets}
            />
          )}
        </div>
        <div>
          <DeleteSvg
            from="assets"
            id={
              showFolder
                ? selectedFolder && selectedFolder[0]?.value
                : selectedImages && selectedImages[0]?.value
            }
            isFolder={showFolder}
            removeComponent={removeAsstesComponent}
          />
        </div>
      </div>
    </div>
  );
};

export default AsstesSelector;
