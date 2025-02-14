import axios, { AxiosRequestConfig } from 'axios'

import { API_URL } from '../config/env'

export const apiInstance = axios.create({
  baseURL: API_URL,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  },
})

export const GET = async <T = any>(
  url: string,
  config?: AxiosRequestConfig<any> | undefined
) => apiInstance.get<T>(url, config).then((res) => res.data)
