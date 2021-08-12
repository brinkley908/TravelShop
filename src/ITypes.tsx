export enum AppStatus {
  loading,
  success,
  failure
}

export interface IAppConfig {
  status: AppStatus
  authUser: IAuthUser | null | undefined
  userSettings: IUserSettings | null | undefined
  appSettings: IAppSettings | null | undefined
  progressMessage: string
}

export interface IAppSettings {
  environment: string
  inMaintanence: boolean
}

export interface IAuthUser {
  username: string
  email: string
  idToken: string
  accessToken: string
  tag: string
}

export interface IUserSettings {
  guest: boolean
  username: string
  email: string
  roles: string[]
}

export interface IAPIResults {
  response: any
  error: any
}

export interface IAPIOptions {
  schema?: string
  headers?: any,
  Authorise?: boolean
}