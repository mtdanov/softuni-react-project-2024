import * as request from "../lib/request";

let baseUrl = "http://localhost:3010";

export const register = (name, lastName, email, password, rePass, country, city, street, streetNumber) => {
    try {
        const result = request.post(`${baseUrl}/register`, {
            name,
            lastName,
            email,
            password,
            rePass,
            country,
            city,
            street,
            streetNumber
        });
        return result;
    } catch (error) {
        throw error;
    }
};

export const login = (email, password) => {
    try {
        const result = request.post(`${baseUrl}/login`, { email, password });
        return result;
    } catch (error) {
        throw error;
    }
};

export const logout = (accessToken) =>
    request.post(`${baseUrl}/logout`, undefined, accessToken);
