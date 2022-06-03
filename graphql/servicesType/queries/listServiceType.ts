export const listServiceTypeByStore = /* GraphQL */ `
  query listServiceTypeByStore($_id: String) {
    listServiceTypeByStore(_id: $_id) {
      _id
      name
      logo {
        filename
        key
      }
    }
  }
`
