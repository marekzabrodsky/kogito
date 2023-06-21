import {gql, useQuery} from '@apollo/client';

import type {
  FinishRegistrationMutation,
  MeQueryQuery,
  MeQueryQueryVariables,
} from '~gql/graphql';

export const MeQuery = gql`
  query MeQuery {
    viewer {
      id
      me {
        id
        firstName
        lastName
        email
        finishedRegistration
        userInfoCompleted
        age
        dateOfBirth
        maritalStatus
        maritalStatusDescription
        numberOfChildren
        educationalAttainment
        population
        actualState
      }
      haveActiveQuestionnaire
    }
  }
`;

export const useMeQuery = () => {
  const {loading, error, data, refetch} = useQuery<
    MeQueryQuery,
    MeQueryQueryVariables
  >(MeQuery);

  console.log({error, data});

  const updateCacheValue = (
    _: FinishRegistrationMutation['finishRegistration']['viewer']['me'],
  ) => {
    // client.writeQuery({
    //   query: MeQuery,
    //   data: {
    //     viewer: {
    //       __typename: 'Viewer',
    //       me: newData,
    //     },
    //   },
    // });
  };

  return {
    me: data?.viewer.me,
    haveActiveQuestionnaire: data?.viewer.haveActiveQuestionnaire || false,
    refetch,
    loading,
    error,
    updateCacheValue,
  };
};
