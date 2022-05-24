export const getClientCurrentShoppingCard = /* GraphQL */ `
  query getClientCurrentShoppingCard($client: String) {
    getClientCurrentShoppingCard(client: $client) {
      _id
      status
      services {
        _id
        service {
          _id
          plus
          name
          abbreviation
          eta
          price
          cost
          serviceFee
          taxes
          discounts
          serviceTime
          sex
          returnTime
          createdAt
          updatedAt
        }
        staff {
          _id
          name
          name1
          name2
          lastName
          lastName1
          lastName2
          address
          phone
          phone1
          email
          specialty
          AET
          canAccessToApp
          canAccessToWeb
          client
          active
          tokenExpo
          plus
          verifyLogin
          createdAt
          updatedAt
        }
        hour
        store {
          _id
          name
          address
        }
      }
      createdAt
      updatedAt
    }
  }
`
