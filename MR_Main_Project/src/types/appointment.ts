// We need Role from the enums file, so we import it
import { Role } from './enums'

// 'export' means other files can use this interface
export interface User {
  fullName: string
  password: string
}

// 'extends User' works just like C# — Radiographer gets User's fields too
export interface Radiographer extends User {
  employeeNumber: string
  role: Role  // uses the enum we imported above
}