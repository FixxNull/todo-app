import { jwtDecode } from 'jwt-decode';

export const validateToken = (accessToken) => {
    const now = Math.round(new Date().getTime() / 1000);
    const decodedToken = jwtDecode(accessToken);
    return decodedToken && now < decodedToken.exp;
};