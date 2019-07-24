// UI/ui/Components/User/useUser/index.tsx
import { useQuery, QueryHookOptions } from '@apollo/react-hooks'
import USERS_GQL from 'ui/lib/GraphQL/Users.graphql'
import USER_GQL from './User.graphql'

interface User {
  username: string
  _id: string
}

interface LoadingResponse {
  loading: true;
  error: false;
}

interface ValidResponse {
  loading: false;
  error: false;
}

interface InvalidResponse {
  loading: false
  error: true
}

interface UsersLoadingResponse extends LoadingResponse {
  Users: undefined
}

interface UserLoadingResponse extends LoadingResponse {
  User: undefined
}

interface UsersValidResponse extends ValidResponse {
  Users: User[]
}

interface UserValidResponse extends ValidResponse {
  User: User
}

interface UsersInvalidResponse extends InvalidResponse {
  Users: undefined
}

interface UserInvalidResponse extends InvalidResponse {
  User: undefined
}

type UseUsers = (search?: string) => UsersValidResponse | UsersLoadingResponse | UsersInvalidResponse

type Query = { users: User[] }

type Variables = { search?: string }

export const useUsers: UseUsers = (search) => {
  const opts: QueryHookOptions<Query, Variables> = { variables: { search }   }
  const { data, loading } = useQuery<Query, Variables>(USERS_GQL, opts);
  if (!data && loading) return { loading: true, error: false, Users: undefined }
  else if (data && !loading) return { loading: false, error: false, Users: data.users }
  return { loading: false, error: true, Users: undefined }
}

type UseUser = (userID: string) => UserValidResponse | UserLoadingResponse | UserInvalidResponse

export const useUser: UseUser = (userID) => {
  const opts: QueryHookOptions<{ User: User }, { id: string }> = { variables: { id: userID }   }
  const { data, loading, error } = useQuery<{ User: User }, { id: string }>(USER_GQL, opts)
  if (!data && loading) return { loading: true, error: false, User: undefined }
  else if (data && !loading) return { loading: false, error: false, User: data.User }
  return { loading: false, error: true, User: undefined }

}