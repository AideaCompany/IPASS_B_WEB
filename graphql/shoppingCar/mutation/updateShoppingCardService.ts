export const updateShoppingCardService = /* GraphQL */ `
  mutation updateShoppingCardService($client: ID, $service: ID, $input: ShoppingServiceInput) {
    updateShoppingCardService(client: $client, service: $service, input: $input) {
      _id
      status
      createdAt
      updatedAt
    }
  }
`
