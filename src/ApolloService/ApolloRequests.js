import gql from "graphql-tag";
// Profile Query
export const meQuery = gql`
  query($id: String!) {
    getUser(id: $id) {
      id
      email
      firstname
      lastname
      profilePic
      channels {
        id
      }
      shoes {
        brand
        numberOfLikes
        description
        model
        size
        photos
        averageRating
      }
    }
  }
`;
// Login and Register user mutation
export const loginMutation = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok
      token
      refreshToken
      errors {
        path
        message
      }
    }
  }
`;

export const registerMuration = gql`
  mutation(
    $email: String!
    $password: String!
    $firstname: String!
    $lastname: String!
  ) {
    registerUser(
      email: $email
      password: $password
      firstname: $firstname
      lastname: $lastname
    ) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

// Create private channel between 2 users for messaging
export const createChannelMutation = gql`
  mutation($senderId: Int!, $receiverId: Int!) {
    createChannel(senderId: $senderId, receiverId: $receiverId) {
      ok
    }
  }
`;
// Subscribe channel to messages
export const newMessageSubscription = gql`
  subscription($channelId: Int!) {
    newMessage(channelId: $channelId) {
      id
      text
      author {
        id
        email
      }
      created_at
    }
  }
`;
// Query all messages for channel
export const messagesQuery = gql`
  query($channelId: Int!) {
    getChannelMessages(channelId: $channelId) {
      id
      text
      author {
        id
        email
      }
      created_at
    }
  }
`;
// Create message for channel
export const createMessageMutation = gql`
  mutation($channelId: Int!, $text: String!) {
    createMessage(channelId: $channelId, text: $text)
  }
`;
// Like pair of shoes
export const LikeShoeMutation = gql`
  mutation($shoeId: Int!, $userId: Int!) {
    likeShoe(userId: $userId, shoeId: $shoeId) {
      ok
      errors {
        path
        message
      }
    }
  }
`;
// Create review for shoes
export const CreateReviewMutation = gql`
  mutation(
    $message: String!
    $userId: Int!
    $shoeId: Int!
    $starRating: Float
  ) {
    createReview(
      message: $message
      userId: $userId
      shoeId: $shoeId
      starRating: $starRating
    ) {
      ok
      errors {
        path
        message
      }
      review {
        id
        message
        user {
          email
          id
        }
      }
    }
  }
`;
// Sign and upload images of shoes to s3
export const s3SignMutation = gql`
  mutation($filename: String!, $filetype: String!) {
    signS3(filename: $filename, filetype: $filetype) {
      url
      signedRequest
    }
  }
`;
// upload a profile picture of yourslef
export const uploadProfilePicMutation = gql`
  mutation($profilePic: String!) {
    uploadProfilePic(profilePic: $profilePic) {
      ok
      errors {
        path
        message
      }
      profilePic
    }
  }
`;
// Create new shoe listing
export const createShoeMutation = gql`
  mutation(
    $brand: String!
    $model: String!
    $size: Float!
    $userId: Int!
    $price: Float!
    $description: String!
    $photos: [String!]
  ) {
    createShoe(
      brand: $brand
      model: $model
      size: $size
      userId: $userId
      price: $price
      description: $description
      photos: $photos
    ) {
      ok
      errors {
        path
        message
      }
      shoe {
        id
        brand
        owner {
          firstname
        }
        model
        photos
      }
    }
  }
`;
// Get specific pair of shoes
export const getShoeQuery = gql`
  query($shoeId: Int!) {
    getShoe(shoeId: $shoeId) {
      ok
      shoe {
        id
        brand
        model
        averageRating
        owner {
          id
          profilePic
          firstname
          lastname
        }
        description
        numberOfLikes
        photos
        size
      }
    }
  }
`;
// Get All listed shoes
export const AllShoesQuery = gql`
  query($searchBy: String) {
    getAllShoes(searchBy: $searchBy) {
      id
      brand
      owner {
        id
        profilePic
      }
      model
      numberOfLikes
      size
      description
      photos
      averageRating
    }
  }
`;
// Get each specific shoes reviews;q
export const GetShoeReviews = gql`
  query($shoeId: Int!) {
    getReviews(shoeId: $shoeId) {
      id
      message
      user {
        email
        id
      }
    }
  }
`;
