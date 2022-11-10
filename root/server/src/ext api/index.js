import * as dotenv from 'dotenv'
dotenv.config()

const fetchData = async () => { 
    const data = await fetch(`https://api.unsplash.com/search/photos?query=cat&client_id=&{process.env.API_KEY}`);
    const json = await data.json();
    return json;
}

export default fetchData;