/* tslint:disable */
/* eslint-disable */
/**
 * FastAPI
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import { Configuration } from './configuration';
import globalAxios, { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from './common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from './base';

/**
 * 
 * @export
 * @interface Address
 */
export interface Address {
    /**
     * 
     * @type {string}
     * @memberof Address
     */
    'zipCode'?: string;
    /**
     * 
     * @type {string}
     * @memberof Address
     */
    'streetName'?: string;
    /**
     * 
     * @type {string}
     * @memberof Address
     */
    'streetNumber'?: string;
}
/**
 * 
 * @export
 * @interface HTTPValidationError
 */
export interface HTTPValidationError {
    /**
     * 
     * @type {Array<ValidationError>}
     * @memberof HTTPValidationError
     */
    'detail'?: Array<ValidationError>;
}
/**
 * 
 * @export
 * @interface LocationInner
 */
export interface LocationInner {
}
/**
 * 
 * @export
 * @interface LoginResponse
 */
export interface LoginResponse {
    /**
     * 
     * @type {string}
     * @memberof LoginResponse
     */
    'access_token': string;
    /**
     * 
     * @type {string}
     * @memberof LoginResponse
     */
    'refresh_token': string;
}
/**
 * 
 * @export
 * @interface Profile
 */
export interface Profile {
    /**
     * 
     * @type {number}
     * @memberof Profile
     */
    'id': number;
    /**
     * 
     * @type {ProfileType}
     * @memberof Profile
     */
    'type': ProfileType;
    /**
     * 
     * @type {string}
     * @memberof Profile
     */
    'name'?: string;
    /**
     * 
     * @type {Address}
     * @memberof Profile
     */
    'address'?: Address;
    /**
     * 
     * @type {string}
     * @memberof Profile
     */
    'telephone'?: string;
    /**
     * 
     * @type {string}
     * @memberof Profile
     */
    'email'?: string;
}
/**
 * An enumeration.
 * @export
 * @enum {string}
 */

export const ProfileType = {
    Admin: 'admin',
    User: 'user'
} as const;

export type ProfileType = typeof ProfileType[keyof typeof ProfileType];


/**
 * 
 * @export
 * @interface User
 */
export interface User {
    /**
     * 
     * @type {string}
     * @memberof User
     */
    'email': string;
    /**
     * 
     * @type {boolean}
     * @memberof User
     */
    'isActive': boolean;
    /**
     * 
     * @type {Profile}
     * @memberof User
     */
    'profile': Profile;
    /**
     * 
     * @type {number}
     * @memberof User
     */
    'id': number;
}
/**
 * 
 * @export
 * @interface UserCreate
 */
export interface UserCreate {
    /**
     * 
     * @type {string}
     * @memberof UserCreate
     */
    'email': string;
    /**
     * 
     * @type {string}
     * @memberof UserCreate
     */
    'password': string;
    /**
     * 
     * @type {ProfileType}
     * @memberof UserCreate
     */
    'profileType': ProfileType;
}
/**
 * 
 * @export
 * @interface ValidationError
 */
export interface ValidationError {
    /**
     * 
     * @type {Array<LocationInner>}
     * @memberof ValidationError
     */
    'loc': Array<LocationInner>;
    /**
     * 
     * @type {string}
     * @memberof ValidationError
     */
    'msg': string;
    /**
     * 
     * @type {string}
     * @memberof ValidationError
     */
    'type': string;
}

/**
 * SecurityApi - axios parameter creator
 * @export
 */
export const SecurityApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Login
         * @param {string} username 
         * @param {string} password 
         * @param {string} [grantType] 
         * @param {string} [scope] 
         * @param {string} [clientId] 
         * @param {string} [clientSecret] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        loginLoginPost: async (username: string, password: string, grantType?: string, scope?: string, clientId?: string, clientSecret?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'username' is not null or undefined
            assertParamExists('loginLoginPost', 'username', username)
            // verify required parameter 'password' is not null or undefined
            assertParamExists('loginLoginPost', 'password', password)
            const localVarPath = `/login`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;
            const localVarFormParams = new URLSearchParams();


            if (grantType !== undefined) { 
                localVarFormParams.set('grant_type', grantType as any);
            }
    
            if (username !== undefined) { 
                localVarFormParams.set('username', username as any);
            }
    
            if (password !== undefined) { 
                localVarFormParams.set('password', password as any);
            }
    
            if (scope !== undefined) { 
                localVarFormParams.set('scope', scope as any);
            }
    
            if (clientId !== undefined) { 
                localVarFormParams.set('client_id', clientId as any);
            }
    
            if (clientSecret !== undefined) { 
                localVarFormParams.set('client_secret', clientSecret as any);
            }
    
    
            localVarHeaderParameter['Content-Type'] = 'application/x-www-form-urlencoded';
    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = localVarFormParams.toString();

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * The jwt_refresh_token_required() function insures a valid refresh token is present in the request before running any code below that function. we can use the get_jwt_subject() function to get the subject of the refresh token, and use the create_access_token() function again to make a new access token
         * @summary Refresh
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        refreshRefreshPost: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/refresh`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * SecurityApi - functional programming interface
 * @export
 */
export const SecurityApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = SecurityApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary Login
         * @param {string} username 
         * @param {string} password 
         * @param {string} [grantType] 
         * @param {string} [scope] 
         * @param {string} [clientId] 
         * @param {string} [clientSecret] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async loginLoginPost(username: string, password: string, grantType?: string, scope?: string, clientId?: string, clientSecret?: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<LoginResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.loginLoginPost(username, password, grantType, scope, clientId, clientSecret, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * The jwt_refresh_token_required() function insures a valid refresh token is present in the request before running any code below that function. we can use the get_jwt_subject() function to get the subject of the refresh token, and use the create_access_token() function again to make a new access token
         * @summary Refresh
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async refreshRefreshPost(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<any>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.refreshRefreshPost(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * SecurityApi - factory interface
 * @export
 */
export const SecurityApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = SecurityApiFp(configuration)
    return {
        /**
         * 
         * @summary Login
         * @param {string} username 
         * @param {string} password 
         * @param {string} [grantType] 
         * @param {string} [scope] 
         * @param {string} [clientId] 
         * @param {string} [clientSecret] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        loginLoginPost(username: string, password: string, grantType?: string, scope?: string, clientId?: string, clientSecret?: string, options?: any): AxiosPromise<LoginResponse> {
            return localVarFp.loginLoginPost(username, password, grantType, scope, clientId, clientSecret, options).then((request) => request(axios, basePath));
        },
        /**
         * The jwt_refresh_token_required() function insures a valid refresh token is present in the request before running any code below that function. we can use the get_jwt_subject() function to get the subject of the refresh token, and use the create_access_token() function again to make a new access token
         * @summary Refresh
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        refreshRefreshPost(options?: any): AxiosPromise<any> {
            return localVarFp.refreshRefreshPost(options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * SecurityApi - object-oriented interface
 * @export
 * @class SecurityApi
 * @extends {BaseAPI}
 */
export class SecurityApi extends BaseAPI {
    /**
     * 
     * @summary Login
     * @param {string} username 
     * @param {string} password 
     * @param {string} [grantType] 
     * @param {string} [scope] 
     * @param {string} [clientId] 
     * @param {string} [clientSecret] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SecurityApi
     */
    public loginLoginPost(username: string, password: string, grantType?: string, scope?: string, clientId?: string, clientSecret?: string, options?: AxiosRequestConfig) {
        return SecurityApiFp(this.configuration).loginLoginPost(username, password, grantType, scope, clientId, clientSecret, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * The jwt_refresh_token_required() function insures a valid refresh token is present in the request before running any code below that function. we can use the get_jwt_subject() function to get the subject of the refresh token, and use the create_access_token() function again to make a new access token
     * @summary Refresh
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SecurityApi
     */
    public refreshRefreshPost(options?: AxiosRequestConfig) {
        return SecurityApiFp(this.configuration).refreshRefreshPost(options).then((request) => request(this.axios, this.basePath));
    }
}


/**
 * UserApi - axios parameter creator
 * @export
 */
export const UserApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Activate User
         * @param {string} token 
         * @param {string} email 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        activateUser: async (token: string, email: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'token' is not null or undefined
            assertParamExists('activateUser', 'token', token)
            // verify required parameter 'email' is not null or undefined
            assertParamExists('activateUser', 'email', email)
            const localVarPath = `/users/{email}/activate/{token}`
                .replace(`{${"token"}}`, encodeURIComponent(String(token)))
                .replace(`{${"email"}}`, encodeURIComponent(String(email)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Create User
         * @param {UserCreate} userCreate 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createUser: async (userCreate: UserCreate, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'userCreate' is not null or undefined
            assertParamExists('createUser', 'userCreate', userCreate)
            const localVarPath = `/users`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(userCreate, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Delete User
         * @param {string} email 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteUser: async (email: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'email' is not null or undefined
            assertParamExists('deleteUser', 'email', email)
            const localVarPath = `/users/{email}`
                .replace(`{${"email"}}`, encodeURIComponent(String(email)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication OAuth2PasswordBearer required
            // oauth required
            await setOAuthToObject(localVarHeaderParameter, "OAuth2PasswordBearer", [], configuration)


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Get Current User
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getCurrentUser: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/users/me`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication OAuth2PasswordBearer required
            // oauth required
            await setOAuthToObject(localVarHeaderParameter, "OAuth2PasswordBearer", [], configuration)


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Get User
         * @param {string} email 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getUser: async (email: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'email' is not null or undefined
            assertParamExists('getUser', 'email', email)
            const localVarPath = `/users/{email}`
                .replace(`{${"email"}}`, encodeURIComponent(String(email)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Get Users
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getUsers: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/users`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary Patch User
         * @param {string} email 
         * @param {object} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateUser: async (email: string, body: object, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'email' is not null or undefined
            assertParamExists('updateUser', 'email', email)
            // verify required parameter 'body' is not null or undefined
            assertParamExists('updateUser', 'body', body)
            const localVarPath = `/users/{email}`
                .replace(`{${"email"}}`, encodeURIComponent(String(email)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'PATCH', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication OAuth2PasswordBearer required
            // oauth required
            await setOAuthToObject(localVarHeaderParameter, "OAuth2PasswordBearer", [], configuration)


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(body, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * UserApi - functional programming interface
 * @export
 */
export const UserApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = UserApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary Activate User
         * @param {string} token 
         * @param {string} email 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async activateUser(token: string, email: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<any>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.activateUser(token, email, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Create User
         * @param {UserCreate} userCreate 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createUser(userCreate: UserCreate, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<User>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.createUser(userCreate, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Delete User
         * @param {string} email 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deleteUser(email: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<User>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.deleteUser(email, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Get Current User
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getCurrentUser(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<User>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getCurrentUser(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Get User
         * @param {string} email 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getUser(email: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<User>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getUser(email, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Get Users
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getUsers(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<User>>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getUsers(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @summary Patch User
         * @param {string} email 
         * @param {object} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updateUser(email: string, body: object, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<User>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.updateUser(email, body, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * UserApi - factory interface
 * @export
 */
export const UserApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = UserApiFp(configuration)
    return {
        /**
         * 
         * @summary Activate User
         * @param {string} token 
         * @param {string} email 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        activateUser(token: string, email: string, options?: any): AxiosPromise<any> {
            return localVarFp.activateUser(token, email, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Create User
         * @param {UserCreate} userCreate 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createUser(userCreate: UserCreate, options?: any): AxiosPromise<User> {
            return localVarFp.createUser(userCreate, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Delete User
         * @param {string} email 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteUser(email: string, options?: any): AxiosPromise<User> {
            return localVarFp.deleteUser(email, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Get Current User
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getCurrentUser(options?: any): AxiosPromise<User> {
            return localVarFp.getCurrentUser(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Get User
         * @param {string} email 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getUser(email: string, options?: any): AxiosPromise<User> {
            return localVarFp.getUser(email, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Get Users
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getUsers(options?: any): AxiosPromise<Array<User>> {
            return localVarFp.getUsers(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Patch User
         * @param {string} email 
         * @param {object} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateUser(email: string, body: object, options?: any): AxiosPromise<User> {
            return localVarFp.updateUser(email, body, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * UserApi - object-oriented interface
 * @export
 * @class UserApi
 * @extends {BaseAPI}
 */
export class UserApi extends BaseAPI {
    /**
     * 
     * @summary Activate User
     * @param {string} token 
     * @param {string} email 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserApi
     */
    public activateUser(token: string, email: string, options?: AxiosRequestConfig) {
        return UserApiFp(this.configuration).activateUser(token, email, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Create User
     * @param {UserCreate} userCreate 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserApi
     */
    public createUser(userCreate: UserCreate, options?: AxiosRequestConfig) {
        return UserApiFp(this.configuration).createUser(userCreate, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Delete User
     * @param {string} email 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserApi
     */
    public deleteUser(email: string, options?: AxiosRequestConfig) {
        return UserApiFp(this.configuration).deleteUser(email, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Get Current User
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserApi
     */
    public getCurrentUser(options?: AxiosRequestConfig) {
        return UserApiFp(this.configuration).getCurrentUser(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Get User
     * @param {string} email 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserApi
     */
    public getUser(email: string, options?: AxiosRequestConfig) {
        return UserApiFp(this.configuration).getUser(email, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Get Users
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserApi
     */
    public getUsers(options?: AxiosRequestConfig) {
        return UserApiFp(this.configuration).getUsers(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @summary Patch User
     * @param {string} email 
     * @param {object} body 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserApi
     */
    public updateUser(email: string, body: object, options?: AxiosRequestConfig) {
        return UserApiFp(this.configuration).updateUser(email, body, options).then((request) => request(this.axios, this.basePath));
    }
}


