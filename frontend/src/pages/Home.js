import { useEffect } from "react"
//use the added hook
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"

//components
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'
const Home = () => {
    //declare multiple state variable
    //const [workouts, setWorkouts] = useState(null) -- comment out and remove userState import because we will use the hook we created

    const { workouts, dispatch } = useWorkoutsContext()

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('/api/workouts')
            // pass json from this response object
            const json = await response.json()

            //validation
            if(response.ok){
                //setWorkouts(json) comment out cause we will use the hook we created
                dispatch({type: 'SET_WORKOUTS', payload: json})
            }
        }

        fetchWorkouts();
    }, [])

    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout) => (
                    <WorkoutDetails key={workout._id} workout={workout} />
                ))}
            </div>
            <WorkoutForm />
        </div>
    )
}

export default Home