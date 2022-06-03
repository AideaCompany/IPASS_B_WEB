export const deleteShoppingCardService = /* GraphQL */ `
  mutation deleteShoppingCardService($client: ID, $service: ID) {
    deleteShoppingCardService(client: $client, service: $service) {
      _id
      status
      createdAt
      updatedAt
    }
  }
`
