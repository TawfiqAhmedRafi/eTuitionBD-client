import React from 'react';
import StudentDashboard from './StudentDashboard';
import useUserRole from '../../hooks/useUserRole';
import TutorDashboard from './TutorDashboard';

const DashboardHome = () => {
    const {role} = useUserRole();
    if(role==="student"){
        return <StudentDashboard></StudentDashboard>
    }
    // if(role==="tutor"){
    //     return <TutorDashboard></TutorDashboard>
    // }
    // if(role==="admin"){
    //     return <StudentDashboard></StudentDashboard>
    // }
};

export default DashboardHome;