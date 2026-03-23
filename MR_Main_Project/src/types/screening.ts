import { Clearance } from "../types/enums";
import type { Question } from "./Question";
export interface Screening {
    id: number
    height: number
    weight: number
    clearance: Clearance
    PatientSginature: boolean
    RadiographerSignature: boolean
    Questions: Question[]

}
