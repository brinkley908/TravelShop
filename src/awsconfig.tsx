
import aws from './aws-exports'

export function AwsConfig(): any {

    const dev = {
        identityPoolId: aws.aws_cognito_identity_pool_id,
        region: aws.aws_cognito_region,
        identityPoolRegion: aws.aws_project_region,
        userPoolId: aws.aws_user_pools_id,
        userPoolWebClientId: aws.aws_user_pools_web_client_id,
        oauth: {}
    }

    return {

        Auth: dev

    }

}
