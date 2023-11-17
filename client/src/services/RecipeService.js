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
}

export default new RecipeService();
