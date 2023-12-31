import { AxiosError } from 'axios';
import { STORAGE_KEYS } from '../consts/app-keys.const';
import { IErrorResponse, IHttpClient, IHttpConfig, IMap, IResponse } from '../types';

export class HttpService implements IHttpClient {
  constructor(private fetchingService: IHttpClient, private baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL) {}

  public createQueryLink(base: string, args: IMap) {
    let url = `${base}?`;
    Object.keys(args).forEach((parameter, index) => {
      if (args[parameter]) {
        url += `${index > 0 ? '&' : ''}${parameter}=${args[parameter]}`;
      }
    });
    return url;
  }

  public async get<T>(url: string, config?: IHttpConfig) {
    return this.fetchingService
      .get<IResponse<T>>(this.getFullApiUrl(url), {
        ...config,
        headers: {
          ...config?.headers,
          ...this.populateContentTypeHeaderConfig()
        }
      })
      .then((result) => {
        if (result) {
          this.checkResponseStatus(result);
          return result.data;
        }
      })
      .catch(this.errorHandler);
  }

  public async post<T, D>(url: string, data: D, config?: IHttpConfig) {
    return this.fetchingService
      .post<IResponse<T>, D>(this.getFullApiUrl(url), data, {
        ...config,
        headers: {
          ...config?.headers,
          ...this.populateContentTypeHeaderConfig()
        }
      })
      .then((result) => {
        if (result) {
          this.checkResponseStatus(result);
          return result.data;
        }
      })
      .catch(this.errorHandler);
  }

  public put<T, D>(url: string, data: D, config?: IHttpConfig) {
    return this.fetchingService
      .put<IResponse<T>, D>(this.getFullApiUrl(url), data, config)
      .then((result) => {
        if (result) {
          this.checkResponseStatus(result);
          return result.data;
        }
      })
      .catch(this.errorHandler);
  }

  public patch<T, D>(url: string, data: D, config?: IHttpConfig) {
    return this.fetchingService
      .patch<IResponse<T>, D>(this.getFullApiUrl(url), data, config)
      .then((result) => {
        if (result) {
          this.checkResponseStatus(result);
          return result.data;
        }
      })
      .catch(this.errorHandler);
  }

  public delete<T>(url: string, config?: IHttpConfig) {
    return this.fetchingService
      .delete<IResponse<T>>(this.getFullApiUrl(url), config)
      .then((result) => {
        if (result) {
          this.checkResponseStatus(result);
          return result.data;
        }
      })
      .catch(this.errorHandler);
  }

  public eventSource(url: string, params?: Record<string, any>) {
    return new EventSource(this.getFullApiUrl(url) + this.objectToQueryString(params));
  }

  public objectToQueryString(params?: Record<string, any>): string {
    if (!params) return '';
    const queryParts: string[] = [];

    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        const value = params[key];
        if (value !== null && value !== undefined) {
          queryParts.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
        }
      }
    }

    return `${queryParts.length ? '?' : ''}${queryParts.join('&')}`;
  }

  public populateContentTypeHeaderConfig() {
    return {
      'Content-Type': 'application/json'
    };
  }

  private getFullApiUrl(url: string) {
    return `${this.baseUrl}/${url}`;
  }

  private errorHandler(error: AxiosError<IErrorResponse>) {
    const errorResponse = error.response;

    const errorData: IErrorResponse = {
      statusCode: errorResponse?.data?.statusCode || 404,
      message: errorResponse?.data?.message || 'Oops, something went wrong!'
    };

    const event = new CustomEvent('http-error', { detail: errorData });
    document.dispatchEvent(event);

    if (errorData.statusCode === 403) {
      localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    }

    throw error;
  }

  private checkResponseStatus<T>(result: IResponse<T>) {
    if (result.status >= 400 && result.status < 600) {
      const errorData = {
        response: {
          status: result.status,
          data: result.data
        }
      };

      throw new Error(JSON.stringify(errorData));
    }
  }
}
