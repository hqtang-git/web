import {
  createAxiosInstance,
  useBusinessCodeInterceptor,
  useFlatResponseDataInterceptor,
  useUnauthorizedRedirectInterceptor,
} from '@byted-slime/starter-kit/utils';
import { Toast } from '@douyinfe/semi-ui';
import { getCurrentResourceKey } from 'shared-components';

const useResourceHeaderInterceptor = (instance) => {
  const id = instance.interceptors.request.use((config) => {
    const resource_key = getCurrentResourceKey();

    if (resource_key && config?.headers) {
      config.headers['X-Resource-Key'] = resource_key;
    }

    return config;
  });

  return () => {
    instance.interceptors.request.eject(id);
  };
};

/**
 * 被动提示错误消息Toast(如无特殊情况, 请放到拦截器的最后一个位置, 捕获前面流程中的错误并发出toast提示)
 *
 * @example 如需关闭请在 ajax 请求方法的第二个参数中配置 `{ toastErrorMessage: false }`
 *
 * ajax(req, { toastErrorMessage: false })
 */
export const useToastErrorMessageInterceptor = (instance) => {
  const id = instance.interceptors.response.use(void 0, (error) => {
    if (error.config?.toastErrorMessage !== false) {
      Toast.error(error.message);
    }

    return Promise.reject(error);
  });

  return () => {
    instance.interceptors.request.eject(id);
  };
};

const globalUniqueAxiosRequest = createAxiosInstance({ withCredentials: true, timeout: 10000 }, [
  useUnauthorizedRedirectInterceptor,
  useBusinessCodeInterceptor,
  useFlatResponseDataInterceptor,
  useResourceHeaderInterceptor,
  useToastErrorMessageInterceptor,
]);

export const request: any = (config, option = {}) => globalUniqueAxiosRequest({ ...config, ...option });
