import Http from './api';
const BaseUrl = `http://localhost:8000/api/ingredient`;

class IngredientService {
    getAll = async (fromDate = null, toDate = null) => {
        try {
           
            return await Http.get(BaseUrl);
        } catch (e) {
            console.log('IngredientService get all error', e);
            return null;
        }
    };
    getAllImportIngredient = async () => {
        try {
            return await Http.get(BaseUrl);
        } catch (e) {
            console.log('login error', e);
            return null;
        }
    };

    statisticImportIngredient= async()=>{
        try {
            let url = `${BaseUrl}/statistic`;
            return await Http.get(url);
        } catch (e) {
            console.log('statisticImportIngredient error', e);
            return null;
        }
    }
    getAllIngredient= async()=>{
        try {
            let url = `http://localhost:8000/api/ingredient/`;
            return await Http.get(url);
        } catch (e) {
            console.log('statisticImportIngredient error', e);
            return null;
        }
    }

    getLogs=async()=>{
        try {
            let url = `http://localhost:8000/api/ingredient/`;
            return await Http.get(url);
        } catch (e) {
            console.log('statisticImportIngredient error', e);
            return null;
        }
    }
}

export default new IngredientService();
