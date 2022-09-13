import {Context, useUserFactory} from '../../core';

 const params:any = {
    logIn:async (context:Context, {username, password}:any) => {
        console.log('Mock: user.logIn');
        return{};
    }
 }

export const useUser = useUserFactory(params);