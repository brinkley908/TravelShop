import Auth from '@aws-amplify/auth';
import { IAuthUser } from '../ITypes';

export async function getCurrentUser() {
    var user = await Auth.currentAuthenticatedUser();
    return user;
}

export async function getUserInfo(user: any = null) {
    if (!user) {
        user = await getCurrentUser();
    }

    if (user) {
        return await Auth.currentUserInfo();
    }

}

export async function getIdToken(user: any = null) {
    if (!user) {
        user = await getCurrentUser();
    }

    if (user) {
        return user.signInUserSession.idToken.jwtToken;
    }
}

export async function getAccessToken(user: any = null) {
    if (!user) {
        user = await getCurrentUser();
    }

    if (user) {
        return user.signInUserSession.accessToken.jwtToken;
    }
}


export async function getUser(): Promise<IAuthUser | null> {

    var user = await Auth.currentAuthenticatedUser();

    if (user) 
    {
      return {
            username: user.username,
            email: user.attributes.email,
            idToken: user.signInUserSession.idToken.jwtToken,
            accessToken: user.signInUserSession.accessToken.jwtToken,
            tag: ''
        }
    }

    return Promise.resolve(null);
}
