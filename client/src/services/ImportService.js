import Http from './api';
const BaseUrl = `http://localhost:8000/api/import`;

class ImportService {
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
    createImportIngredient = async (data) => {
        try {
            return await Http.post(BaseUrl,data);
        } catch (e) {
            console.log('login error', e);
            return null;
        }
    };
    takeImportIngredient = async (data) => {
        try {
            let url = `${BaseUrl}/take`;
            return await Http.post(url,data);
        } catch (e) {
            console.log('login error', e);
            return null;
        }
    };
    throwImportIngredient = async (import_id) => {
        try {
            let url = `${BaseUrl}/${import_id}/throw`;
            return await Http.delete(url);
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

export default new ImportService();
