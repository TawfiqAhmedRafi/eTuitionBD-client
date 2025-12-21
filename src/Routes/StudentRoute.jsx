import React from 'react';
import useUserRole from '../hooks/useUserRole';
import useAuth from '../hooks/useAuth';
import Forbidden from '../Components/Forbidden/Forbidden';


const StudentRoute = ({children}) => {
    const {loading} = useAuth();
    const {role , isLoading} = useUserRole();
   
    
    if(loading || isLoading){
        return <span className='loading loading-bars text-primary'></span>
    }
     if(role!== 'student'){
        return <Forbidden></Forbidden>
    }
    return children;
};

export default StudentRoute;