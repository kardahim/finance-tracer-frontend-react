export interface User {
  id: number | null
  firstName: string | null
  lastName: string | null
  email: string | null
  token: string | null
  refreshToken: string | null
  role: string | null
  isLogged: boolean
}
