export const loginClient = /* GraphQL */` 
 mutation loginClient($token: String){
    loginClient(token: $token){
        response
        token
    }
}
`;
