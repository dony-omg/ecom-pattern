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
    const [loading, setLoading] = useState<any>({});
    const [error, setError] = useState<any>({});

    const _factoryParams = configureFactoryParams(
        factoryParams,
        // { mainRef: user, alias: 'currentUser', loading, error }
    );



    const login = async (params: any) => {
        Logger.debug('useUser.login');
        setError(null);
        try {
            setLoading(true);
            const res = await _factoryParams.login({...params});
            setUser({...user, value: res});
            setError({...error, value: null});
        } catch (err) {
            setError({...error, value: {login: err}});
            Logger.error('useUser.login.error');
            setLoading(false);
        } finally {
            setLoading(false);
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