import * as dotenv from 'dotenv'
dotenv.config()
import fetch from 'node-fetch';

const fetchData = async (keyWords) => { 
    const data = await fetch(`https://api.unsplash.com/search/photos?query=${keyWords}&page=1&client_id=${process.env.ACCESS_KEY}`);
    const json = await data.json();
    const result = json.results;
    const image = result[0].urls.regular;
    return image;
}


export default fetchData;