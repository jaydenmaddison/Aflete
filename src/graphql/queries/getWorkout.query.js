import gql from "graphql-tag";

export default gql`
  query getVendors($workoutID: ID!) {
    getCustomerBoughtWorkout(workoutID: $workoutID) {
      data {
        id
        variant_id
        seller_id
        type
        name
        description
        seller_image
        bought_description
        background_image
        cover_image
        downloads {
          id
          order
          src
          name
          description
        }
        images {
          id
          order
          src
        }
        workouts {
          id
          name
          completed
          total_sessions
          completed_sessions
          sessions {
            id
            name
            estimated_time
            time_spent
            completed
            mood
            exercises {
              session_exercise_id
              order
              name
              video
              thumbnail
              sets
              reps
              time
              completed
              info
              is_superset
              is_dropset
              failure
            }
          }
        }
      }
    }
  }
`;
