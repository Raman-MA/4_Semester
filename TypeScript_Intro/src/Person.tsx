import {useState} from "react"; 
 
export interface Person{
    name: string;
    age: number;
    isStudent: boolean;
    hobbies: string[];
}

export const Person = (props: Person) => {
    const [isShowInfo, setShowInfo] = useState<boolean | null>(false);
    const toggleInfo = () => 
        {
            setShowInfo((prev=> !prev));
        }
    return (
        <div>
            {isShowInfo && (
                <>
                
                    <p>Name: {props.name}</p>
                    <p>Age: {props.age}</p>
                    <p>Is Student: {props.isStudent ? "Yes" : "No"}</p>
                    <h3>Hobbies:</h3>
                    <ul>
                        {props.hobbies.map((hobby, index) => (
                            <li key={index}>{hobby}</li>
                        ))}
                    </ul>
                </>
                
            )}
            <button onClick={toggleInfo}>Toggle Info</button>

        </div>
    )
}
