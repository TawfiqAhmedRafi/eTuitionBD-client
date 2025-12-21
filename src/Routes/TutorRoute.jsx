import React from 'react';
import useUserRole from '../hooks/useUserRole';
import useAuth from '../hooks/useAuth';
import Forbidden from '../Components/Forbidden/Forbidden';

const TutorRoute = ({children}) => {
    const {loading} = useAuth();
    const {role , isLoading} = useUserRole();
    if(loading || isLoading){
        return <span className='loading loading-bars text-primary'></span>
    }
     if(role!== 'tutor'){
        return <Forbidden></Forbidden>
    }
    return children;
};

export default TutorRoute;