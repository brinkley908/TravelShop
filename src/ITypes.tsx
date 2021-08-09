export interface IAppSettings {
  authUser: IAuthUser | null | undefined
}

export interface IAuthUser {
    username: string
    email: string
    idToken: string
    accessToken: string
    tag: string
  }
  
  export interface IAPIResults
  {
      response: any
      error: any
  }
  
  
  export interface IAPIOptions {
    schema?: string
    headers?: any,
    Authorise?: boolean
  }