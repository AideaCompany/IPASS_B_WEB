export const makePaymentShoppingCard = /* GraphQL */` 
 mutation makePaymentShoppingCard($client: ID, $selectedCard: String){
    makePaymentShoppingCard(client: $client, selectedCard: $selectedCard){
        idTransaction
        status
    }
}
`;
