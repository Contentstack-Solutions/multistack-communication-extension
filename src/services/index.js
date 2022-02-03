export const fetchData = async ({
  url,
  api_key,
  management_token,
  access_token,
}) => {
  let headers = {
    "Content-Type": "application/json",
    api_key: api_key,
  };

  if (management_token) {
    headers.authorization = management_token;
  } else {
    headers.access_token = access_token;
  }

  const response = await fetch(`${url}`, {
    method: "GET",
    headers,
  });

  return await response.json();
};
