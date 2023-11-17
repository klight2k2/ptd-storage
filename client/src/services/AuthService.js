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
}


export default  new AuthService()