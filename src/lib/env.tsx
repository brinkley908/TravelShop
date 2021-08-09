

export function GetEnv(){

    var env = process.env.REACT_APP_BRANCH_ENV;

    if(env === null || env === undefined) return "prod";

    return env;
}