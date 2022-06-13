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

    signIn(username: string, password: string) {
        return Generator.any(Database.users.filter(u => u.role === UserRole.patient), 1)[0]
    },

    signOut() {
        console.log(this.host_name);
    },

    async getEpisodes(access_token: string) {

        try {
            let { data: response, status } = await axios.get(`${this.host_name}/api/v2/accounts/episodes`, {
                headers: { Authorization: `Bearer ${access_token}` }
            });
            return response.data.episodes as IEpisode[];
        } catch (error) {
            this._logError(error);
        }
    },


    getUserProfile() { }
}

export default http;
