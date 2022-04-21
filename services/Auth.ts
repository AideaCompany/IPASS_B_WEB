import { gql } from '@apollo/client'
import { signUpClient } from '../graphql/Auth/mutations/signUpClient'
import { confirmSignUpClient } from '../graphql/Auth/mutations/confirmSignUpClient'
import client from '../graphql/config'

export const SignUpClientFn = async (input: any) => {
  return (await client.mutate({ mutation: gql(signUpClient), variables: { input } })).data.signUpClient
}

export const confirmClientFn = async (token: string) => {
  return (await client.mutate({ mutation: gql(confirmSignUpClient), variables: { token } })).data.signUpClient
}
