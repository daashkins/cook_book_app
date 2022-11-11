import * as dotenv from 'dotenv'
dotenv.config()
import fetch from 'node-fetch';

// const fetchData = async (keyWords) => { 
//     const data = await fetch(`https://api.unsplash.com/search/photos?query=${keyWords}&page=1&client_id=${process.env.ACCESS_KEY}`);
//     const json = await data.json();
//     const result = json.results;
//     if (result.length >= 1){
//        const image = result[0].urls.regular;;
//     return image; 
//     } else {
//     return null
//     }
// }

// const fetchData = async (keyWords) => { 
//     const data = await fetch(`www.themealdb.com/api/json/v1/1/search.php?s=${keyWords}`);
//     const json = await data.json();
//     const result = json.meals;
//     if (result.length >= 1){
//        const image = result[0].urls.regular;;
//     return image; 
//     } else {
//     return null
//     }
// }
const fetchData = async (keyWords) => { 
        const queries = keyWords.split(' ');
      
        const data = await fetch(`https://pixabay.com/api/?key=${process.env.API_KEY}&q=${queries[0]}+${queries[1]}&image_type=photo`);
        const json = await data.json();
        const result = json.hits;
        if (result.length >= 1){
            const image = result[0].webformatURL;
            return image; 
        } else {
            return null
        }
        
}


export default fetchData;