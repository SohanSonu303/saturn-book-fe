import { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import {be_url} from "../routes"


export const Createpost = () =>{

    const [comment, setComment] = useState('');
    const [aicomment, setAiComment] = useState('tell me about ');
    const [aiResComment, SetAiResComment] = useState("");
    const [isSpin,SetIsSpin] = useState(false);
    const [sucMsg, SetSucMsg] = useState(false);
    const [errorMsg, SetErrorMsg] = useState(false);

    const token = localStorage.getItem('authToken');
    const userLoggedin = localStorage.getItem('userName');  
    console.log("userLoggedin "+userLoggedin);
    const [creatPost,SetCreatePost] = useState({
        "title":"",
       "description":"",
       "author":userLoggedin ,
       "tags":"" ,
       "coverage_image_url" :"",
       "likes":0 ,
       "story":""
   })
  const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
    SetCreatePost((creatPost) => ({
        ...creatPost,
        story: event.target.value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle the form submission logic here
    console.log('Comment submitted:', comment);
    // Reset comment after submission
    setComment('');
  };

  const handleAiCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAiComment(event.target.value);
  };

  const callAIApi = () =>{
    SetIsSpin(true);
    SetAiResComment("")
    apiCallGoogleAiAssisstant({aicomment,SetAiResComment, SetIsSpin});
  }

  const savePost = async () =>{
    console.log(JSON.stringify(creatPost));

    const url = be_url+"/api/v1/story/updateNewStory"; 

    const response = await axios.post(url,
        creatPost
    ,{
        headers: {
            Authorization: `Bearer ${token}`, 
        }
    } )

    if(response.status === 200){
        SetSucMsg(true);
        const timeoutId = setTimeout(() => {
            SetSucMsg(false);
          }, 3000);
    }
    else{
        SetErrorMsg(true);
        const timeoutId = setTimeout(() => {
            SetErrorMsg(false);
          }, 3000);
    }

  }
    return (
        <div>
            <div className="bg-slate-300 flex flex-wrap items-center justify-between mx-auto p-4 mb-5">
                <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Saturn Books</span>
                </a>
            </div>
            <div className="grid grid-cols-3 gap-5">
                <div className="flex flex-col pl-4">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                    <input onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                            SetCreatePost((creatPost) => ({
                                ...creatPost,
                                title: e.target.value,
                            }));
                            }} 
                    type="text" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-4/5 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Game of thrones" required />
                </div>
                <div className="flex flex-col">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tags</label>
                    <input 
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                        SetCreatePost((creatPost) => ({
                            ...creatPost,
                            tags: e.target.value,
                        }));
                        }} 
                    type="text" id="tags" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-4/5 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="mystical,thriller,fantasy,drama" required />
                </div>

                <div className="flex flex-col">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image URL</label>
                    <input 
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                        SetCreatePost((creatPost) => ({
                            ...creatPost,
                            coverage_image_url: e.target.value,
                        }));
                        }} 
                    type="text" id="imgurl" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-4/5 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="http://example.com/image5.jpg" required />
                </div>
            </div>

            <div className="grid grid-cols-3 gap-5 mt-5">
                <div className="flex flex-col pl-4">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                    <input 
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                        SetCreatePost((creatPost) => ({
                            ...creatPost,
                            description: e.target.value,
                        }));
                        }} 
                    type="desc" id="Description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-4/5 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nine noble families wage war against each other in order to gain control over the mythical land of Westeros." required />
                </div>
                <div className="flex flex-col">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Likes</label>
                    <input 
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                        SetCreatePost((creatPost) => ({
                            ...creatPost,
                            likes: parseInt(e.target.value),
                        }));
                        }} 
                    type="likes" id="likes" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-4/5 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="69" required />
                </div>

                <div className="pt-5  w-4/5">
                    <form onSubmit={handleSubmit}>
                <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                    <div className="px-1 py-1 bg-white rounded-t-lg dark:bg-gray-800">
                    <label htmlFor="comment" className="sr-only">
                        Your comment
                    </label>
                    <textarea
                        id="comment"
                        rows={parseInt("5")}
                        className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                        placeholder="Write a comment..."
                        required
                        value={aicomment}
                        onChange={handleAiCommentChange}
                    ></textarea>
                    </div>
                </div>
                    </form>
                    <button type="button" onClick={callAIApi} className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Go</button>
                </div>
                
            </div>


            <div className="flex flex-row">
                
                <div className=" basis-3/4 p-3 w-5/5">
                    <form onSubmit={handleSubmit}>
                    <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                        <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                        <label htmlFor="comment" className="sr-only">
                            Your comment
                        </label>
                        <textarea
                            id="comment"
                            rows={parseInt("15")}
                            className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                            placeholder="Write a comment..."
                            required
                            value={comment}
                            onChange={handleCommentChange}
                        ></textarea>
                        </div>
                        <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                        <button
                        onClick={savePost}
                            type="submit"
                            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                        >
                            Post comment
                        </button>
                        </div>
                    </div>
                    </form>
                    
                { sucMsg &&<SavedMessage/> }
                { errorMsg && <ErrorMessage/> }
                </div>

                <div className="basis-1/2 flex w-64 bg-slate-500 flex-col">
                    {isSpin && <Spinner/>}
                    <a className="font-black text-center">AI Response</a>
                    <a className="p-2">{aiResComment}</a>
                </div>
            </div>

        </div>
    )
}

async function apiCallGoogleAiAssisstant({aicomment,SetAiResComment, SetIsSpin} : any){
    const token = localStorage.getItem('authToken'); 
    const url = be_url+"/api/v1/chatty/getGoogleAIAssisstance"; 

    const response = await axios.post(url,
        {
            "query":aicomment
        }
    ,{
        headers: {
            Authorization: `Bearer ${token}`, 
        }
    } )

    SetAiResComment(response.data.message);
    SetIsSpin(false);
}

const Spinner = () =>{
    return (<div role="status" className="flex justify-center items-center">
        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span className="sr-only">Loading...</span>
    </div>
    );
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