import Http from './api';
const BaseUrl = `http://localhost:8000/api/import`;

class IngredientService {
    getSoonExpiredImportIngredient = async (fromDate = null, toDate = null) => {
        try {
            let url = `${BaseUrl}/exprire-soon?`;
            if (fromDate) url += `fromDate="${fromDate}&`;
            if (toDate) url += `toDate="${toDate}`;
         
            return await Http.get(url);
        } catch (e) {
            console.log('login error', e);
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
}

export default new IngredientService();
