import axios from "axios";

const getSquidexApiToken = async () => {
  const client_id = process.env.CMS_CLIENT_ID;
  const client_secret = process.env.CMS_CLIENT_SECRET;
  const api_url = `${process.env.CMS_API_URL}identity-server/connect/token`;
  const api_scope = process.env.CMS_API_SCOPE;
  
  try {
    const params = new URLSearchParams();
    params.append("client_id", client_id);
    params.append("client_secret", client_secret);
    params.append("grant_type", "client_credentials");
    params.append("scope", api_scope);
    const { status, data } = await axios.post(api_url, params);
    
    if (data.access_token) {
      return data.access_token;
    } else return null;
  } catch (error) {
    console.log("getApiToken", error);
    return null;
  }
};

export default getSquidexApiToken;