import Http from './api';
const BaseUrl = `http://localhost:8000/api/recipe`;

class RecipeService {
    getLastest = async (fromDate = null, toDate = null) => {
        try {
            let url = `${BaseUrl}/lastest`;
         
            return await Http.get(url);
        } catch (e) {
            console.log('login error', e);
            return null;
        }
    };
    getAll= async ()=>{
        try {
            let url = `${BaseUrl}/`;
         
            return await Http.get(url);
        } catch (e) {
            console.log('login error', e);
            return null;
        }
    }
    createRecipe= async (data)=>{
        try {
            let url = `${BaseUrl}/`;
         
            return await Http.upload(url, data);
        } catch (e) {
            console.log('login error', e);
            return null;
        }
    }
    updateRecipe= async (recipe_id,data)=>{
        try {
            let url = `${BaseUrl}/${recipe_id}`;
         
            return await Http.upload(url, data);
        } catch (e) {
            console.log('login error', e);
            return null;
        }
    }

    deleteRecipe= async (recipe_id)=>{
        try {
            let url = `${BaseUrl}/${recipe_id}`;
         
            return await Http.delete(url);
        } catch (e) {
            console.log('login error', e);
            return null;
        }
    }
}

export default new RecipeService();
