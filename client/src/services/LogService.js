import Http from './api';
const BaseUrl = `http://localhost:8000/api/log`;

class LogService {
  
    getLogs=async()=>{
        try {
            let url = `${BaseUrl}`;
            return await Http.get(url);
        } catch (e) {
            console.log('statisticImportIngredient error', e);
            return null;
        }
    }
}

export default new LogService();
