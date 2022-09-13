

// create platform method
const createPlatformMethod = (context, refs, functionObject) => async (params:any) => {
    const {mainRef, loading, error, alias} = refs;
    try {
        loading.value = true;
        mainRef.value = await functionObject.fn(
            context,
            {...params, [alias]: mainRef.value}
        )
        loading.value = false;
    } catch(err) {
        error.value[functionObject] = err;
    } finally {
        loading.value = false;
    }
}

const createFactoryParamsReducer = (context,refs):any => (prev, [fnName, fn]:any):any => ({
    ...prev,
    [fnName]: createPlatformMethod(context, refs, {fnName, fn}),
})

const createPlatformMethods = (apiSection, context, refs) => Object.entries(apiSection).reduce(createFactoryParamsReducer(context, refs),{}) 


// config factory params
const configureFactoryParams = (factoryParams, refs = null):any => {
    const context = {};
    const { api, ...method} = factoryParams;
    //TODO: - FIX function 
    const platformMethods = refs ? createPlatformMethods(api || {}, context, refs) : {};
    return {api: platformMethods}
}

export { configureFactoryParams}