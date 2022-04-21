export const confirmSignUpClient = /* GraphQL */` 
 mutation confirmSignUpClient($token: String){
    confirmSignUpClient(token: $token){
        response
        token
    }
}
`;
