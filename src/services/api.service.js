import { apiConfigs } from "../constants";

export class ApiService {
    static async callBackend(method, domain, body) {
        const response = await fetch(
            `http://${apiConfigs.REACT_APP_BACKEND_HOST}:${apiConfigs.REACT_APP_BACKEND_PORT}/${domain}`,
            {
                method,
                ...(body && {
                    body: JSON.stringify(body),
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        return await response.json();
    }
}
