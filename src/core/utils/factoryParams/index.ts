

// create platform method
const createPlatformMethod = (context: any, refs: any, functionObject: any) => async (params: any) => {
    const { mainRef, loading, error, alias } = refs;
    try {
        loading.value = true;
        mainRef.value = await functionObject.fn(
            context,
            { ...params, [alias]: mainRef.value }
        )
        loading.value = false;
    } catch (err) {
        error.value[functionObject] = err;
    } finally {
        loading.value = false;
    }
}

const createFactoryParamsReducer = (context: any, refs: any): any => (prev:any, [fnName, fn]: any): any => ({
    ...prev,
    [fnName]: createPlatformMethod(context, refs, { fnName, fn }),
})

const createPlatformMethods = (apiSection: any, context: any, refs: any) => {
    console.log('createPlatformMethods', context);
    return Object.entries(apiSection).reduce(createFactoryParamsReducer(context, refs), {})
}


// config factory params
const configureFactoryParams = (factoryParams: any, refs?: any): any => {
    const context = {};
    const { api, ...method } = factoryParams;
    //login: f(),
    //login: f(),
    console.log('configureFactoryParams -->',factoryParams);

    //TODO: - FIX function 
    //const platformMethods = createPlatformMethods(api || {}, context, refs);
    const platformMethods = {}
    return { api: platformMethods }
}

export { configureFactoryParams }