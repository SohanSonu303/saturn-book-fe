import React from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from "framer-motion"
import { useEffect, useState } from "react";
import {be_url} from "../routes"
import axios from 'axios';

export const ShowPosts = () =>{
    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
      };

    const [postData, SetPostData] = useState<postDataType>();

    const query = useQuery();
    const idVal = query.get('id');

    useEffect(()  => {
            const callingObj = async () : Promise<any>=>{
                try{ 
                    const token = localStorage.getItem('authToken'); 
                    const response = await axios.get(`${be_url}/api/v1/story/getStoryById?id=${idVal}`,{
                        headers: {
                            Authorization: `Bearer ${token}`, 
                        }
                    })

                    SetPostData(response.data);
                }
                catch(err){
                    console.log(err);
                }
            }
            callingObj();
    },[])

    return(    
        <div> 
            <div className="bg-slate-300 flex flex-wrap items-center justify-between mx-auto p-4 mb-5">
                <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Saturn Books</span>
                </a>
            </div>

            <div className="bg-slate-100">
                <div className='grid grid-cols-3 justify-center'>
                    <div className='flex flex-col'>
                        <div className='flex flex-row'>                         
                            <h3 className='bg-slate-100 font-serif font-black	'>Title : </h3>
                            <a className='bg-slate-100 ml-5'>{postData?.title}</a>
                        </div>

                        <div  className='flex flex-row'>                         
                            <h3 className='bg-slate-100 font-serif font-black	'>Author : </h3>
                            <a className='bg-slate-100 ml-5'> {postData?.author}</a>
                        </div>

                        <div  className='flex flex-row'>                         
                            <h3 className='bg-slate-100 font-serif font-black	'>likes :  </h3>
                            <a className='bg-slate-100 ml-5'> {postData?.likes}</a>
                        </div>


                    </div>

                    <div className='grid grid-cols-1 justify-center items-center'>
                        <div className='flex flex-col justify-center'>
                            <a className='bg-slate-300'>Story :</a>
                            <a className='bg-slate-300'> {postData?.story}</a>

                        </div>
                        
                    </div>

                     <div className='grid grid-cols-1 justify-center'></div>
                </div>
            </div>
        </div>
    );
}


interface postDataType{
        id: number,
        title: string,
        description: string,
        author: string,
        tags: string,
        cover_image_url: string,
        likes: number,
        createdAt: string,
        updatedAt: string,
        bookid: number,
        story: string
    
}