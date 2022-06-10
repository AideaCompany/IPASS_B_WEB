export const listStoresByGenere = /* GraphQL */ `
  query listStoresByGenere($genere: String) {
    listStoresByGenere(genere: $genere) {
      _id
      name
      address
      schedule {
        _id
        name
      }
    }
  }
`
