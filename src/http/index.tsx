import axios from 'axios';
import { IEpisode } from '../interfaces/episode';
import { UserRole } from '../interfaces/user';
import Generator from '../utils/Generator';
import { Database } from './Database';



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

    async getEpisodes<T>(access_token: string) {

        try {
            const config = { headers: { Authorization: `Bearer ${access_token}` } };
            let { data: response, status } = await axios.get(`${this.host_name}/api/v2/accounts/episodes`, config);
            return response.data.episodes as T[];
        } catch (error) {
            this._logError(error);
        }
    },

    async getEpisode<T>(access_token: string, episodeId: number) {

        try {
            const config = { headers: { Authorization: `Bearer ${access_token}` } };
            let { data: response, status } = await axios.get(`${this.host_name}/api/v2/accounts/episodes/${episodeId}`, config);
            return response.data.episodes as T;
        } catch (error) {
            this._logError(error);
        }
    },

    async getUser<T>(access_token: string, userId: number) {
        try {
            const config = { headers: { Authorization: `Bearer ${access_token}` } };
            let { data: response, status } = await axios.get(`${this.host_name}/api/v2/accounts/${userId}`, config);
            return response.data as T;
        } catch (error) {
            this._logError(error);
        }
    },

    async getAppointments<T>(access_token: string, userId: number) {
        try {
            const config = { headers: { Authorization: `Bearer ${access_token}` } };
            let { data: response, status } = await axios.get(`${this.host_name}/api/v2/accounts/${userId}/appointments`, config);
            return response.data as T[];
        } catch (error) {
            this._logError(error);
        }
    },

    async getDoctors<T>(access_token: string, groupId: number) {
        try {
            const config = { headers: { Authorization: `Bearer ${access_token}` } };
            let { data: response, status } = await axios.get(`${this.host_name}/api/v2/groups/${groupId}/doctors?page=1`, config);
            return response.data as T[];
        } catch (error) {
            this._logError(error);
        }
    },

    async getDoctorTimeslots<T>(access_token: string, groupId: number, doctorId: number) {
        try {
            const config = { headers: { Authorization: `Bearer ${access_token}` } };
            let { data: response, status } = await axios.get(`${this.host_name}/api/v2/groups/${groupId}/rostered?accountId=${doctorId}&slots=true`, config);
            return response.data as T[];
        } catch (error) {
            this._logError(error);
        }
    },

    async getEarliestTimeslots<T>(access_token: string, groupId: number) {
        try {
            const config = { headers: { Authorization: `Bearer ${access_token}` } };
            let { data: response, status } = await axios.get(`${this.host_name}/api/v2/groups/${groupId}/availableProfessional`, config);
            return response.data as T[];
        } catch (error) {
            this._logError(error);
        }
    },
}

export default http;
