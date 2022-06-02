export const getClientCurrentShoppingCardToPay = /* GraphQL */ `
  query getClientCurrentShoppingCardToPay($client: String) {
    getClientCurrentShoppingCardToPay(client: $client) {
      _id
      client {
        _id
        plus
        photo {
          filename
          key
        }
        name1
        name2
        createdAt
        lastName1
        lastName2
        lastName3
        phone1
        phone2
        country
        email
        privateAddress
        businessAddress
        occupation
        age
        sex
        ranking
        channel
        trm
        pt
        rom
        lastVisit
        referrals
        servicesNotes
        productsNotes
        document
        medicalNotes
        socialMedia
        active
      }
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
          photo {
            filename
            key
          }
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
        day
        store {
          _id
          name
          address
        }
      }
      timeToPay
      createdAt
      updatedAt
    }
  }
`
