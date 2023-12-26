import Http from './api';
const BaseUrl = `http://localhost:8000/api/auth`;

class AuthService {
    login = async (user) => {
        try {
            const url= `${BaseUrl}/login`
            return await Http.post(url, user);
        } catch (e) {
            console.log('login error', e);
            return null;
        }
    };

    signup = async (user) => {
        try {
            const url= `${BaseUrl}/signup`
            return await Http.post(url, user);
        } catch (e) {
            console.log('login error', e);
            return null;
        }
    };
    getAllUser = async () => {
        try {
            const url= `${BaseUrl}/users`
            return await Http.get(url);
        } catch (e) {
            console.log('get all user error', e);
            return null;
        }
    };
}


export default  new AuthService()