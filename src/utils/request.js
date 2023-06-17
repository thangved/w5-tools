import axios from 'axios';
import { AppConfigs } from '~/configs/AppConfigs';

const request = axios.create({
	baseURL: AppConfigs.APIURL,
});

export default request;
