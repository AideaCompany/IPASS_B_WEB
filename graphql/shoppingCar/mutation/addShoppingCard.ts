export const addShoppingCard = /* GraphQL */ `
  mutation addShoppingCard($client: String, $service: ShoppingServiceInput) {
    addShoppingCard(client: $client, service: $service) {
      _id
      status
      createdAt
      updatedAt
    }
  }
`
