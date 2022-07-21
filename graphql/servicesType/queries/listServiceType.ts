export const listServiceTypeByStore = /* GraphQL */ `
  query listServiceTypeByStore($_id: String) {
    listServiceTypeByStore(_id: $_id) {
      _id
      description
      name
      logo {
        filename
        key
      }
    }
  }
`
