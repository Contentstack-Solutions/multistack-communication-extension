import { client } from "@contentstack/management";

export const fetchSdkData = async ({
  type,
  api_key,
  management_token,
  access_token,
  query,
  contentType,
  folder,
  baseUrl,
}) => {
  const contentstackClient = client({
    authtoken: management_token,
    host: baseUrl,
  });
  switch (type) {
    case "/content_types":
      return await contentstackClient
        .stack({
          api_key: api_key,
          management_token: management_token,
        })
        .contentType()
        .query(query)
        .find();

    case "/entry":
      return await contentstackClient
        .stack({
          api_key: api_key,
          management_token: management_token,
        })
        .contentType(contentType)
        .entry()
        .query(query)
        .find();

    case "/locale":
      return await contentstackClient
        .stack({
          api_key: api_key,
          management_token: management_token,
        })
        .locale()
        .query(query)
        .find();

    case "/assets":
      if (folder) {
        return await contentstackClient
          .stack({
            api_key: api_key,
            management_token: management_token,
          })
          .asset()
          .folder(folder)
          .fetch();
      }
      return await contentstackClient
        .stack({
          api_key: api_key,
          management_token: management_token,
        })
        .asset()
        .query(query)
        .find();

    case "/environment":
      return await contentstackClient
        .stack({
          api_key: api_key,
          management_token: management_token,
        })
        .environment()
        .query(query)
        .find();

    default:
      return {};
  }
};
