export const listStoresByGenere = /* GraphQL */ `
  query listStoresByGenere($genere: String, $filters: locationFilters) {
    listStoresByGenere(genere: $genere, filters: $filters) {
      _id
      name
      address
      generes
      schedule {
        _id
        name
        start
        end
        days
        abbreviation
        createdAt
        updatedAt
      }
      location {
        lat
        lng
      }
      department
      city
      zone
      phone
      contact
    }
  }
`
