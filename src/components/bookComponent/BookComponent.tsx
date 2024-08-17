import { motion } from "framer-motion"
import { useNavigate } from 'react-router-dom';

export const BookComponent = ({id,title,author,likes,uploaded}:bookCompTypes)=>{
    const colors = [
        "bg-red-100",
        "bg-blue-100",
        "bg-green-100",
        "bg-yellow-100",
        "bg-purple-100",
        "bg-pink-100",
        "bg-teal-100",
        "bg-indigo-100",
        "bg-gray-100",
        "bg-orange-100",
      ];
      const navigate = useNavigate();
      const getRandomColor = () => {
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
      };

      const date = new Date(uploaded);

      const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const year = date.getUTCFullYear();

        const openShowPosts = ()=>{
            navigate(`/ShowPosts?id=${id}`);
        }

    return( 
        <motion.div whileHover={{
            scale: 1.1,
          }} onClick={()=>openShowPosts()} className={`book-component ${getRandomColor()} m-1 p-3 cursor-pointer`}>
            <h1 className="font-bold">Title : {title}</h1>
            <h1 className="font-semibold">Author : {author}</h1>
            
            <div className="grid grid-cols-2">
                <div className="">
                    <a className="font-thin	font-serif	text-xs">Uploaded On : {day}/{month}/{year}</a>
                </div>
                <div className="flex flex-row-reverse">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>
                    <a className="font-thin	text-base">{likes}</a>
                </div>
            </div>
        </motion.div>
    );
}

interface bookCompTypes{
    id: number,
    title: string;
    author: string;
    likes: string;
    uploaded : string
}
