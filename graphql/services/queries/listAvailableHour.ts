export const listAvailableHour = /* GraphQL */` 
 query listAvailableHour($storeId: String, $servicesId: [String], $servicesStaffers: [serviceStaffer], $day: String){
    listAvailableHour(storeId: $storeId, servicesId: $servicesId, servicesStaffers: $servicesStaffers, day: $day){
        service{
            _id
            plus
            name
            abbreviation
            type{
                _id
                name
            }
            products{
                productQuantity
            }
            eta
            price
            cost
            serviceFee
            taxes
            discounts
            serviceTime
            sex
            returnTime
            photo{
                filename
                key
            }
            subService{
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
                returnTime
                sex
                createdAt
                updatedAt
            }
            createdAt
            updatedAt
        }
        staffer{
            _id
            name
            name1
            name2
            lastName
            lastName1
            lastName2
            address
            stores{
                _id
                name
                address
            }
            phone
            phone1
            photo{
                filename
                key
            }
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
            services{
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
            createdAt
            updatedAt
        }
        hour
    }
}
`;