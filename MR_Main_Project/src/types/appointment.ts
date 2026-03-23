
import { Status } from "./enums";
import { Protocol } from "./enums";



export interface User {
  id: number
  ArrivalTime: Date
  ScheduleTime: number
  IsUrgent: boolean
  Status: Status
  Protocol: Protocol
}

