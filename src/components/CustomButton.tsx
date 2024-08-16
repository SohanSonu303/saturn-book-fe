import { useState } from "react";
import {be_url} from "../routes"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {ErrorToast} from "./error/ErrorToast"

export const CustomButton = ({label,signindata} : inputType) =>{

    const navigate = useNavigate();

    const signSetToken = async () =>{
        try{
            let url = be_url+"/api/v1/user/signin"
        console.log('Sign in with token calling '+url)

        const response = await axios.post(url, signindata)
            if(response.status === 401){
                console.log("error in authorization")
            }
            else{
                const { token } = response.data;
                localStorage.setItem('authToken', token);
                localStorage.setItem('userName',signindata.username);
                navigate('/MainDashboard');
            }
        

        
        
    } catch (err) {
        <ErrorToast message="Sign-in failed. Please check your credentials." ></ErrorToast>
      }
    }
    return (
        <>
        {label === "signin" ?
            <button onClick={signSetToken} type="button" className="mt-10 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >Signin</button> 
            :
            <button type="button" className="mt-10 py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >Signup</button>}
        </>
    );
}

interface inputType{
    label : string,
    signindata : any
}

const SavedMessage = () =>{
    return(
        <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
            <span className="font-medium">Saved Successfully.</span>
        </div>
    );
}

const ErrorMessage = () =>{
    return (
        <div className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
            <span className="font-medium">Error while saving! Please refresh screen</span>
        </div>
    );
}