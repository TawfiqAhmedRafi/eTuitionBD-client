import React from 'react';
import StudentDashboard from './StudentDashboard';
import useUserRole from '../../hooks/useUserRole';
import TutorDashboard from './TutorDashboard';
import AdminDashboard from './AdminDashboard';

const DashboardHome = () => {
    const {role} = useUserRole();
    if(role==="student"){
        return <StudentDashboard></StudentDashboard>
    }
    if(role==="tutor"){
        return <TutorDashboard></TutorDashboard>
    }
    if(role==="admin"){
        return <AdminDashboard></AdminDashboard>
    }
};

export default DashboardHome;