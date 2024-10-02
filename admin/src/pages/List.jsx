import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendURL, currency } from '../App';
import { toast } from 'react-toastify';
import EditProductModal from './EditProductModal';

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); 

  const fetchList = async () => {
    try {
      const response = await axios.get(backendURL + '/api/product/list');
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(`${backendURL}/api/product/remove`, { id }, { headers: { token } });
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedProduct(null);
  };

  const editProduct = async (updatedData) => {
    try {
      const formData = new FormData();
      formData.append('productId', selectedProduct._id);
      formData.append('name', updatedData.name);
      formData.append('description', updatedData.description);
      formData.append('price', updatedData.price);
      formData.append('category', updatedData.category);
      formData.append('subCategory', updatedData.subCategory);
      formData.append('sizes', updatedData.sizes);
      formData.append('bestseller', updatedData.bestseller);
      
      if (updatedData.image1) formData.append('image1', updatedData.image1);
      if (updatedData.image2) formData.append('image2', updatedData.image2);
      if (updatedData.image3) formData.append('image3', updatedData.image3);
      if (updatedData.image4) formData.append('image4', updatedData.image4);

      const response = await axios.post(`${backendURL}/api/product/edit`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          token,
        },
      });

      if (response.data.success) {
        toast.success('Product Updated Successfully');
        await fetchList();
        closeEditModal(); 
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className='mb-2 w-full text-base text-xl font-medium'>All Product List</p>
      <div className='flex flex-col gap-2'>
        {/* List Table */}
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items_center py-2 px-4 border bg-purple-600 text-sm text-white rounded-md'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>
        {/* Product List */}
        {list.map((item, index) => (
          <div key={index} className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-2 px-4 border text-sm rounded-md bg-gray-100 hover:scale-105">
            <img src={item.image[0]} alt={item.name} className="w-16 h-16 object-cover" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{currency} {item.price}</p>
            <p onClick={() => removeProduct(item._id)} className='text-right md:text-center cursor-pointer text-red-500'>X</p>
            <p onClick={() => openEditModal(item)} className='text-right md:text-center cursor-pointer text-blue-500'>Edit</p>
          </div>
        ))}
      </div>

      {/* Render the edit modal if it's open */}
      {isEditModalOpen && (
        <EditProductModal 
          product={selectedProduct} 
          onSubmit={editProduct} 
          onClose={closeEditModal} 
        />
      )}
    </>
  );
};

export default List;
