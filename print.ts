const dbUrl = process.env.DB_ID || '';
const dbIdMatch = dbUrl.match(/\/p\/([a-zA-Z0-9]+)/);
const dbId = dbIdMatch ? dbIdMatch[1] : dbUrl;

async function run() {
    const res = await fetch(`https://api.notion.com/v1/databases/${dbId}/query`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.NOTION_API}`,
            'Notion-Version': '2022-06-28',
            'Content-Type': 'application/json'
        }
    });
    const data = await res.json();
    console.log(Object.keys(data.results[0].properties));
}
run();
