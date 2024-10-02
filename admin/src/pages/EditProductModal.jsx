import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const EditProductModal = ({ product, onSubmit, onClose }) => {
    const [formData, setFormData] = useState({
      name: '',
      description: '',
      price: '',
      category: '',
      subCategory: '',
      sizes: '',
      bestseller: false,
      image1: null,
      image2: null,
      image3: null,
      image4: null,
    });
  
    useEffect(() => {
      if (product) {
        setFormData({
          name: product.name,
          description: product.description,
          price: product.price,
          category: product.category,
          subCategory: product.subCategory,
          sizes: JSON.stringify(product.sizes),
          bestseller: product.bestseller,
          image1: null,
          image2: null,
          image3: null,
          image4: null,
        });
      }
    }, [product]);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleFileChange = (e) => {
      const { name, files } = e.target;
      if (files && files.length > 0) {
        setFormData((prev) => ({ ...prev, [name]: files[0] }));
      }
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(formData);
    };
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
          <h2 className="text-2xl mb-4">Edit Product</h2>
          <form onSubmit={handleSubmit} className='flex flex-col w-full items-start gap-3'>
            {/* Form Inputs */}
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Product Name"
              required
              className="border p-2 rounded w-full"
            />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              required
              className="border p-2 rounded w-full"
            />
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
              required
              className="border p-2 rounded w-full"
            />
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Category"
              required
              className="border p-2 rounded w-full"
            />
            <input
              type="text"
              name="subCategory"
              value={formData.subCategory}
              onChange={handleChange}
              placeholder="Subcategory"
              required
              className="border p-2 rounded w-full"
            />
            <input
              type="text"
              name="sizes"
              value={formData.sizes}
              onChange={handleChange}
              placeholder='Sizes (JSON format, e.g. ["S", "M", "L"])'
              required
              className="border p-2 rounded w-full"
            />
            
            {/* Image Upload Section */}
            <div>
              <p className='mb-2'>Upload Images</p>
              <div className='flex gap-2'>
                <label htmlFor="image1">
                  <img className='w-20' src={!formData.image1 ? assets.upload_area : URL.createObjectURL(formData.image1)} alt="" />
                  <input onChange={handleFileChange} type="file" name="image1" id="image1" hidden />
                </label>
                <label htmlFor="image2">
                  <img className='w-20' src={!formData.image2 ? assets.upload_area : URL.createObjectURL(formData.image2)} alt="" />
                  <input onChange={handleFileChange} type="file" name="image2" id="image2" hidden />
                </label>
                <label htmlFor="image3">
                  <img className='w-20' src={!formData.image3 ? assets.upload_area : URL.createObjectURL(formData.image3)} alt="" />
                  <input onChange={handleFileChange} type="file" name="image3" id="image3" hidden />
                </label>
                <label htmlFor="image4">
                  <img className='w-20' src={!formData.image4 ? assets.upload_area : URL.createObjectURL(formData.image4)} alt="" />
                  <input onChange={handleFileChange} type="file" name="image4" id="image4" hidden />
                </label>
              </div>
            </div>
  
            {/* Bestseller Checkbox */}
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.bestseller}
                onChange={() => setFormData((prev) => ({ ...prev, bestseller: !prev.bestseller }))}
                className="form-checkbox"
              />
              Bestseller
            </label>
  
            {/* Buttons */}
            <div className="flex gap-3 mt-4">
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Update Product</button>
              <button type="button" onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  export default EditProductModal;