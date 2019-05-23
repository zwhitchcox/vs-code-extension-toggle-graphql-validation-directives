export const graphqlModel = `
  directive @validation(
    min: Int,
    max: Int
  ) on FIELD_DEFINITION
  type User {
    id: ID! @id
    firstName: String! @authenticated
    @validation(
      min: 3,
      max: 4
    )
    middleName: String
    lastName: String!
    email: String! @unique
    emailVerified: Boolean! @default(value: false)
    username: String! @unique
    password: String!
    passwordResetToken: String
    tokenCreatedAt: DateTime
    lastSignOutAll: DateTime
    phoneNumbers: [PhoneNumber!]! @relation(name: "UserPhoneNumbers")
    phoneVerified: Boolean! @default(value: false)
    lastLogin: DateTime
    contractor: [Contractor!]!
    customer: Customer
    moderatorOf: [Company!]! @relation(name: "Moderators")
    ownedCompanies: [Company!]! @relation(name: "Owner")
    isAdmin: Boolean! @default(value: false)
    createdAt: DateTime! @createdAt
    suspensions: [Suspension!]! @relation(name: "Suspended")
    createdSuspensions: [Suspension!]! @relation(name: "CreatedSuspensions") # for admin
  }

  type Company {
    id: ID! @id
    name: String!
    companyname: String! @unique @authenticated
      @validation(
        min: 3
        max: 100
      )
    ein: String
    owners: [User!]! @relation(name: "Owner")
    contractors: [Contractor!]! @relation(name: "Employee")
    moderators: [User!]! @relation(name: "Moderators")
    phoneNumbers: [PhoneNumber!]! @relation(name: "CompanyPhoneNumbers")
    urls: [Url!]!
    jobTimeWindows: [JobTimeWindow!]!
    approvedBy: User @relation(name: "ApprovedBy")
    suspensions: [Suspension!]!
    blacklistBy: [CompanyBlacklist!]!
    blacklistedCustomers: [CustomerBlacklist!]!
    active: Boolean! @default(value: false)
    licenses: [License!]!
    trades: [Trade!]!
    laborMarkup: Float! @default(value: 2.4)
    materialMarkup: Float! @default(value: 0.3)
  }

`