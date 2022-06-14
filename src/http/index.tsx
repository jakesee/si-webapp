import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { format } from 'date-fns';
import { Database } from './Database';


interface IsValidResponse {
    isValid: boolean,
    value?: string,
}

const cache = {
    SEPARATOR: '//**//',
    CACHE_INTERVAL: 0.2 * 60 * 1000,
    whiteList: ['weather'],

    isValid(key: string): IsValidResponse {
        const value = localStorage.getItem(key);
        if (value === null) {
            return {
                isValid: false,
            };
        }
        const values = value.split(this.SEPARATOR);
        const timestamp = Number(values[1]);
        if (Number.isNaN(timestamp)) {
            return {
                isValid: false,
            };
        }
        const date = new Date(timestamp);
        if (date.toString() === 'Invalid Date') {
            return {
                isValid: false,
            };
        }
        if ((Date.now() - date.getTime()) < this.CACHE_INTERVAL) {
            return {
                isValid: true,
                value: values[0],
            };
        }
        localStorage.removeItem(key);
        return {
            isValid: false,
        };
    },

    store(key: string, value: string) {
        const finalValue = `${value}${this.SEPARATOR}${Date.now().toString()}`;
        localStorage.setItem(key, finalValue);
    },

    isURLInWhiteList(url: string) {
        return this.whiteList.includes(url.split('/')[1]);
    },
}

const interceptor = {

    responseHandler(response: AxiosResponse<any>): AxiosResponse<any> {
        if (response.config.method === 'GET' || 'get') {
            if (response.config.url && !cache.isURLInWhiteList(response.config.url)) {
                cache.store(response.config.url, JSON.stringify(response.data));
            }
        }
        return response;
    },

    errorHandler(error: any) {
        if (error.headers.cached === true) {
            return Promise.resolve(error);
        }
        return Promise.reject(error);
    },

    requestHandler(request: AxiosRequestConfig) {
        if (request.method === 'GET' || 'get') {
            const checkIsValidResponse = cache.isValid(request.url || '');
            if (checkIsValidResponse.isValid) {
                request.headers!.cached = true; // this interceptor adds this cache flag
                request.data = JSON.parse(checkIsValidResponse.value || '{}');
                return Promise.reject(request);
            }
        }
        return request;
    }
}

// use a custom axios client
axios.interceptors.request.use((request) => interceptor.requestHandler(request));
axios.interceptors.response.use(
    (response) => interceptor.responseHandler(response),
    (error) => interceptor.errorHandler(error),
);


class HttpResponse<T> {
    code!: number;
    success!: boolean;
    message!: string;
    timestamp!: string;
    next_page_url?: string;
    data!: T;

    constructor(response: any) {

        let code = parseInt(response.code)
        let timestamp = new Date(response.timestamp);

        Object.assign(this, {
            ...response,
            code, timestamp
        })
    }

    OK() {
        return this.code === 200
    }
}

const http = {

    host_name: process.env.REACT_APP_MYDOC_API_HOST,

    _logError(error: any) {
        if (axios.isAxiosError(error)) {
            console.log('error message: ', error.message);
            return error.message;
        } else {
            console.log('unexpected error: ', error);
            return 'An unexpected error occurred';
        }
    },

    async signIn<T>(username: string, password: string) {
        return Database.users.find(u => u.id === 64329);
    },

    async signOut() {
        console.log(this.host_name);
    },

    async createEpisode<T>(access_token: string, groupId:number, participantIds: number[]) {
        try
        {
            const config = { headers: { Authorization: `Bearer ${access_token}` } };
            const formData: FormData = new FormData();
            formData.append('subject', 'MyFriend: Patient/Doctor Episode');
            formData.append('type', 'diary');
            formData.append('group_id', `${groupId}`);
            participantIds.forEach(id => formData.append('participants[]', `${id}`));
            let { data: response } = await axios.post(`${this.host_name}/api/v2/accounts/episodes`, formData, config);
            return new HttpResponse<T>(response);
        } catch (error) {
            this._logError(error);
        }
    },

    async createAppointment<T>(access_token: string, episodeId: number, userId:number, doctorId: number, start: Date, duration: number) {
        try {
            const config = { headers: { Authorization: `Bearer ${access_token}` } };
            let start_at = format(start, "yyyy-MM-dd'T'HH:mm:00'Z'")
            console.log(start_at);
            const formData: FormData = new FormData();
            formData.append('type', 'clinic');
            formData.append('start_at', start_at);
            formData.append('duration', duration as any);
            formData.append('timezone', 'UTC');
            formData.append('patient_account_id', userId as any);
            formData.append('status', 'pending');
            formData.append('episode_id', episodeId as any);
            let { data: response } = await axios.post(`${this.host_name}/api/v2/doctors/${doctorId}/appointments`, formData, config);
            return new HttpResponse<T>(response);
        } catch (error) {
            this._logError(error);
        }
    },

    async getEpisodes<T>(access_token: string) {

        try {
            const config = { headers: { Authorization: `Bearer ${access_token}` } };
            let { data: response } = await axios.get(`${this.host_name}/api/v2/accounts/episodes`, config);
            return new HttpResponse<T[]>({
                ...response,
                code: parseInt(response.code),
                data: response.data.episodes
            });
        } catch (error) {
            this._logError(error);
        }
    },

    async getEpisode<T>(access_token: string, episodeId: number) {

        try {
            const config = { headers: { Authorization: `Bearer ${access_token}` } };
            let { data: response } = await axios.get(`${this.host_name}/api/v2/accounts/episodes/${episodeId}`, config);
            return new HttpResponse<T>({
                ...response,
                code: parseInt(response.code),
                data: response.data.episodes
            });
        } catch (error) {
            this._logError(error);
        }
    },

    async getUser<T>(access_token: string, userId: number) {
        try {
            const config = { headers: { Authorization: `Bearer ${access_token}` } };
            let { data: response } = await axios.get(`${this.host_name}/api/v2/accounts/${userId}`, config);
            return response.data as T;
        } catch (error) {
            this._logError(error);
        }
    },

    async getAppointments<T>(access_token: string, userId: number) {
        try {
            const config = { headers: { Authorization: `Bearer ${access_token}` } };
            let { data: response } = await axios.get(`${this.host_name}/api/v2/accounts/${userId}/appointments`, config);
            return new HttpResponse<T[]>(response);
        } catch (error) {
            this._logError(error);
        }
    },

    async getAppointment<T>(access_token: string, userId: number, appointmentId: number) {
        try {
            const config = { headers: { Authorization: `Bearer ${access_token}` } };
            let { data: response } = await axios.get(`${this.host_name}/api/v2/accounts/${userId}/appointments/${appointmentId}`, config);
            return new HttpResponse<T>(response);
        } catch (error) {
            this._logError(error);
        }
    },

    async getDoctors<T>(access_token: string, groupId: number) {
        try {
            const config = { headers: { Authorization: `Bearer ${access_token}` } };
            let { data: response } = await axios.get(`${this.host_name}/api/v2/groups/${groupId}/doctors?page=1`, config);
            return response.data as T[];
        } catch (error) {
            this._logError(error);
        }
    },

    async getDoctorTimeslots<T>(access_token: string, groupId: number, doctorId: number) {
        try {
            const config = { headers: { Authorization: `Bearer ${access_token}` } };
            let { data: response } = await axios.get(`${this.host_name}/api/v2/groups/${groupId}/rostered?accountId=${doctorId}&slots=true`, config);
            return response.data.length > 0 ? response.data[0].slots as T[] : undefined;
        } catch (error) {
            this._logError(error);
        }
    },

    async getEarliestTimeslots<T>(access_token: string, groupId: number) {
        try {
            const config = { headers: { Authorization: `Bearer ${access_token}` } };
            let { data: response } = await axios.get(`${this.host_name}/api/v2/groups/${groupId}/availableProfessional`, config);
            return response.data as T[];
        } catch (error) {
            this._logError(error);
        }
    },

    async getGroup<T>(access_token: string, groupId: number) {
        try {
            const config = { headers: { Authorization: `Bearer ${access_token}` } };
            let { data: response } = await axios.get(`${this.host_name}/api/v2/groups/${groupId}`, config);
            return response.data as T;
        } catch (error) {
            this._logError(error);
        }
    },

    async getMessages<T>(access_token: string, episodeId: number, next_page_url?: string) {
        try {
            const config = { headers: { Authorization: `Bearer ${access_token}` } };
            let endpoint = `${this.host_name}/api/v2/accounts/episodes/${episodeId}/messages`;
            endpoint = next_page_url ? next_page_url : endpoint;

            let { data: response } = await axios.get(endpoint, config);
            return new HttpResponse<T[]>(response);
        } catch (error) {
            this._logError(error);
        }
    }
}

export default http;
