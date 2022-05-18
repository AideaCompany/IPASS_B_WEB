export const validateShoppingCard = /* GraphQL */ `
  mutation validateShoppingCard($client: ID) {
    validateShoppingCard(client: $client) {
      _id
      status
      createdAt
      updatedAt
    }
  }
`
