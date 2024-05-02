import { Navigate, Outlet } from 'react-router-dom';
import { getToken } from '../service/authentication';


const IsLoggedIn = () => {
    return(
      getToken()? <Outlet/> : <Navigate to="/login" replace/>
    )
}

export default IsLoggedIn