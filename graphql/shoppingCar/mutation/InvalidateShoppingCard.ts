export const InvalidateShoppingCard = /* GraphQL */ `
  mutation InvalidateShoppingCard($client: ID) {
    InvalidateShoppingCard(client: $client) {
      _id
    }
  }
`
