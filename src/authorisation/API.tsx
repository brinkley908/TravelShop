import axios, { AxiosResponse } from 'axios';

import { IAPIResults, IAPIOptions } from '../ITypes'

const env = require('../lib/env');
const API = TravelShopApiUrl()
const Auth = require('./Auth');

export function TravelShopApiUrl() {
    switch (env.GetEnv()) {
        case "dev":
            return "https://localhost:44301/api"
        case "test":
            return "https://hru9tcrmsa.execute-api.eu-west-2.amazonaws.com/test/api"
        default: return "https://80s42f39b1.execute-api.eu-west-2.amazonaws.com/Prod/api"
    }
}

export async function PostAsync(method: string, request?: any, options?: IAPIOptions): Promise<IAPIResults> {

    var results: IAPIResults = { response: null, error: null };

    try {

        var headers = !options?.headers ? {} : options.headers;
        var authHeaders = await getHeaders(options?.schema);
        var mixedHeaders = { ...headers, ...authHeaders };
        var response = await axios.post(`${API}/${method}`, request, {
            headers: mixedHeaders
        });

        results.response = response;

    }
    catch (error) {
        results.error = error;
    }

    return results;

}

export function Post(method: string, request?: any, options?: IAPIOptions): Promise<AxiosResponse<any>> {
    return new Promise((resolve, reject) => {

        getHeaders(options?.schema).then(authHeaders => {

            var authorise = options?.Authorise === null || options?.Authorise === undefined ? true : options?.Authorise;
            var headers = !options?.headers ? {} : options.headers;
            var mixedHeaders = authorise ? { ...headers, ...authHeaders } : headers;

            axios
                .post(`${API}/${method}`, request, { headers: mixedHeaders })
                .then(response => {
                    resolve(response)
                })
                .catch(err => reject(err))
        });

    });
}

export function Put(method: string, request?: any, options?: IAPIOptions): Promise<AxiosResponse<any>> {
    return new Promise((resolve, reject) => {

        getHeaders(options?.schema).then(authHeaders => {

            var authorise = options?.Authorise === null || options?.Authorise === undefined ? true : options?.Authorise;
            var headers = !options?.headers ? {} : options.headers;
            var mixedHeaders = authorise ? { ...headers, ...authHeaders } : headers;

            axios
                .put(`${API}/${method}`, request, { headers: mixedHeaders })
                .then(response => {
                    resolve(response)
                })
                .catch(err => reject(err))
        });

    });
}

export async function PutAsync(method: string, request?: any, options?: IAPIOptions): Promise<IAPIResults> {

    var results: IAPIResults = { response: null, error: null };

    try {

        var headers = !options?.headers ? {} : options.headers;
        var authHeaders = await getHeaders(options?.schema);
        var mixedHeaders = { ...headers, ...authHeaders };
        var response = await axios.put(`${API}/${method}`, request, {
            headers: mixedHeaders
        });

        results.response = response;

    }
    catch (error) {
        results.error = error;
    }

    return results;

}

export async function GetAsync(method: string, options?: IAPIOptions): Promise<IAPIResults> {

    var results: IAPIResults = { response: null, error: null };

    try {

        var authorise = options?.Authorise === null || options?.Authorise === undefined ? true : options?.Authorise;
        var headers = !options?.headers ? {} : options.headers;
        var authHeaders = await getHeaders(options?.schema)
        var mixedHeaders = authorise ? { ...headers, ...authHeaders } : headers;
        var response = await axios.get(`${API}/${method}`, {
            headers: mixedHeaders
        });

        results.response = response;

    }
    catch (error) {
        results.error = error;
    }

    return results;

}

export function Get(method: string, options?: IAPIOptions): Promise<AxiosResponse<any>> {
    return new Promise((resolve, reject) => {

        getHeaders(options?.schema).then(authHeaders => {

            var authorise = options?.Authorise === null || options?.Authorise === undefined ? true : options?.Authorise;
            var headers = !options?.headers ? {} : options.headers;
            var mixedHeaders = authorise ? { ...headers, ...authHeaders } : headers

            axios
                .get(`${API}/${method}`, { headers: mixedHeaders })
                .then(response => { resolve(response) })
                .catch(err => reject(err))
        });

    });
}



async function getHeaders(schema?: string) {
    const token = await Auth.getIdToken();
    const useSchema = schema ? `${schema} ` : "";

    return { Authorization: useSchema + token }
}