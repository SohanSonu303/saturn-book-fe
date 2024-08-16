import { useEffect, useState } from "react";
import { BookComponent } from "../components/bookComponent/BookComponent";
import axios from 'axios';
import {be_url} from "../routes"
import { Link } from "react-router-dom";

export const MainDashboard = () => {
  const [objVal, setObjVal] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('authToken'); 
        const url = be_url+"/api/v1/story/getAllStories"; 
        
        const response = await axios.get(url,{
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        setObjVal(response.data);
        console.log(response.data);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Calculate the indexes for slicing the array
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = objVal.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total pages
  const totalPages = Math.ceil(objVal.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber : any) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div> 
        <div className="bg-slate-300 flex flex-wrap items-center justify-between mx-auto p-4 mb-5">
            <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Saturn Books</span>
            </a>
            <div>
              <Link to= {"/createpost"} type="button" className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-8 py-2 text-center me-2 mb-2">Create Story</Link>
              <Link to= {"/signin"} onClick= {removelocalStorage} type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-6 py-2 text-center me-2 mb-2">LOGOUT</Link>
            </div>
        </div>

      <div className="grid grid-cols-3 gap-4">
        {currentItems.map((obj : resObj, index) => (
          <BookComponent
            key={index}
            id = {obj.id}
            title={obj.title}
            author={obj.author}
            likes={obj.likes}
            uploaded={obj.createdAt}
          />
        ))}
      </div>

      <div className="flex justify-center mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-3 py-1 mx-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`px-3 py-1 mx-1 ${
              currentPage === index + 1 ? "bg-blue-700" : "bg-blue-500"
            } text-white rounded hover:bg-blue-600`}
          >
            {index + 1}
          </button>
        ))}
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-3 py-1 mx-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          Next
        </button>
      </div>
      
    </div>
  );
};

interface resObj{
  id:number,
  title: string;
  author: string;
  likes: string;
  createdAt: string;
}


const removelocalStorage = () =>{
  localStorage.removeItem('userName');
  localStorage.removeItem('authToken');
}