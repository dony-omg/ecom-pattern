export interface IntegrationContext<CLIENT = any, CONFIG=any, API=any > {
    client: CLIENT,
    config: CONFIG,
    api:API,
    [x:string]:any;
}

export interface Context<CLIENT = any, CONFIG=any, API=any > {
    [x:string]: IntegrationContext<CLIENT,CONFIG,API> | any;
}

export interface FactoryParams {
    provide?: (context:any) => any;
    api?: string;
}