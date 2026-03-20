import './App.css'
import { Person } from './Person.tsx'

// let name: string = "Raman"
// let age: number = 21
// let isStudent: boolean = true
// let hobbies: string[] = ["Coding", "Gaming", "Traveling"]
function App() {
  const fetchUser = () => ({name: "Raman", age: 21, isStudent: true, hobbies: ["Coding", "Gaming", "Traveling"]});
  const userFetched = fetchUser();
  return (
    <>
      <Person
        name = {userFetched.name}
        age = {userFetched.age}
        isStudent = {userFetched.isStudent}
        hobbies = {userFetched.hobbies}
      />
    </>
  )
}

export default App
