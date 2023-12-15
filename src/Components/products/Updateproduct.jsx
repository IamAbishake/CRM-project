import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';


function Updateproduct() {
   
    const products ={
        product:"",
        category:"",
        price:"",
        stock:""
      }
      
        const {id}= useParams();
        const navigate =useNavigate();
        const [product,setProducts] = useState(products);
       
        const inputChangeHandler=(e)=>{
          const {name,value}=e.target;
        setProducts({...product, [name]:value});
        console.log(product);
        
      }
      useEffect(()=>{
        axios.get(`http://localhost:8000/api/getOneproduct/${id}`)
        .then((response)=>{
          setProducts(response.data) 
        })
        .catch((error)=>{
          console.log(error);
        })
      },[id])
      
      const submitForm=async(e)=>{
        e.preventDefault();
          await axios.put(`http://localhost:8000/api/updateproduct/${id}`, product)
          .then((response)=>{
            toast.success(response.data.msg, {position:"top-right"})
             navigate("/Product")
          }).catch((error)=>{
            console.log(error)
          })
      }
      


  return (
    <div className="w-full h-full mt-24  grid grid-cols-1 place-items-center">
    <form className="px-8 h-full w-96 py-8  shadow-2xl bg-white rounded-2xl shadow-black" onSubmit={submitForm}>
        <h1 className="font-bold text-center text-sky-500 text-3xl">Update Product</h1>
        <div className="mb-6">
          <label
            htmlFor="product"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            product
          </label>
          <input
            type="text"  id="product" name='product'
            onChange={inputChangeHandler} value={product.product}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Product Name"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="category"  
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Category
          </label>
          <input
            type="text" id='category' name='category'
            onChange={inputChangeHandler} value={product.category}
            
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Category Name"
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="price"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
          Price
          </label>
          <input
            type="price" id='price' name='price' 
            onChange={inputChangeHandler} value={product.price}
            
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Price"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="stock"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
          Stock
          </label>
          <input
            type="stock" id='stock' name='stock' 
            onChange={inputChangeHandler} value={product.stock}
            
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Your Email"
            required
          />
        </div>
        
        <div className="flex gap-2 flex-row-reverse">
        <button
          type="submit"
          className="text-white bg-sky-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Save
        </button>
        <Link to={"/Product"} className="text-white bg-sky-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
 >Back</Link>
        </div>
      </form>
    </div>
    )
}

export default Updateproduct