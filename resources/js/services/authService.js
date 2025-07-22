import axios from "axios";
export const TOKEN_NAME = "BaoNailAccessToken";
const TOKEN_EXPIRED_NAME = "BaoNailTokenExpired";
class authService {
    login(username, password) {
        return axios
            .post(`/api/v1/public/authenticate`, {
                username,
                password,
            })
            .then((response) => {
                return response.data;
            })
            .then((response) => {
                if (response.data.access_token) {
                    localStorage.setItem(
                        TOKEN_NAME,
                        response.data.access_token
                    );
                    localStorage.setItem(
                        TOKEN_EXPIRED_NAME,
                        response.data.expires_at
                    );
                }
                return response.data;
            });
    }

    logout() {
        return axios
            .get(`/api/v1/logout`)
            .then((response) => {
                return response.data;
            })
            .then((response) => {
                if (response) {
                    localStorage.removeItem(TOKEN_NAME);
                    localStorage.removeItem(TOKEN_EXPIRED_NAME);
                }
                return response;
            });
    }

    getUser() {
        return JSON.parse(localStorage.getItem(TOKEN_NAME));
    }

    isAuthenticated() {
        const accessToken = localStorage.getItem(TOKEN_NAME);
        const tokenExpired = localStorage.getItem(TOKEN_EXPIRED_NAME);
        if (!!accessToken && new Date(Date.now()) < new Date(tokenExpired)) {
            axios.defaults.headers["Authorization"] = "Bearer " + accessToken;

            return true;
        }
        return false;
    }
}

export default new authService();