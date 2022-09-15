import { useRef, useState, useEffect } from 'react';
import {FactoryParams} from '../types';
import { configureFactoryParams, Logger } from '../utils';


export interface UseUserFactoryParams extends FactoryParams {
    login: (context:any) => Promise<any>;
}

/**
 * Primary state - ready only
 * Supportive state - additional read-only state for values such as the status of the request or error
 * Methods - functions that update the primary and supportive state.
 */
export const useUserFactory = (factoryParams: UseUserFactoryParams) => function useUser() {

    const [user, setUser] = useState({
        value: {}
    });
    // const [loading, setLoading] = useState<any>({});
    // const [error, setError] = useState<any>({});

    // const user:any = {value:{}};
    const loading:any = {value:{}};
    const error:any = {};

    const _factoryParams = configureFactoryParams(
        factoryParams,
        { mainRef: user, alias: 'currentUser', loading, error }
    );

    const resetErrorValue = () => {
        error.value = null;
    }

    const login = async (params: any) => {
        Logger.debug('useUser.login');
        resetErrorValue();
        debugger;

        try {
            loading.value = true;
            // user.value = params;
            const rep = await _factoryParams.api.login({...params});
            // setUser({...user, value: {...rep}})
            error.value.login = null;
        } catch (err) {
            error.updateUser = err;
            Logger.error('useUser.login.error');
        } finally {
            loading.value = false;
        }
    }

    return {
        api: _factoryParams.api,
        // Primary state
        user,
        // Support state
        loading,
        error,
        //Method
        login
    }
}