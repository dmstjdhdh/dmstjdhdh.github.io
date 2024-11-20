import axios from 'axios';

// eslint-disable-next-line no-undef
const notionApiKey = process.env.REACT_APP_NOTION_API_KEY;
// eslint-disable-next-line no-undef
const databaseId = process.env.REACT_APP_NOTION_DATABASE_ID;

export const fetchNotionData = async () => {
  const response = await axios.post(
    `https://api.notion.com/v1/databases/${databaseId}/query`,
    {},
    {
      headers: {
        Authorization: `Bearer ${notionApiKey}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2021-05-13',
      },
    }
  );

  return response.data.results;
};
