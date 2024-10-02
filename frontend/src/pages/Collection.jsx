import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevant');

  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory(prev =>
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
    );
  };

  const toggleSubCategory = (e) => {
    const value = e.target.value;
    setSubCategory(prev =>
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
    );
  };

  const applyFilterAndSort = () => {
    let filtered = [...products];

    if (showSearch && search) {
      filtered = filtered.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }

    if (category.length > 0) {
      filtered = filtered.filter(item => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      filtered = filtered.filter(item => subCategory.includes(item.subCategory));
    }

    switch (sortType) {
      case 'low-high':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'high-low':
        filtered.sort((a, b) => b.price - a.price);
        break;
      default:
        break; 
    }

    setFilteredProducts(filtered);
  };

  const clearFilters = () => {
    setCategory([]);
    setSubCategory([]);
    setSortType('relevant');
    setFilteredProducts(products);
  };

  useEffect(() => {
    applyFilterAndSort();
  }, [category, subCategory, search, showSearch, products, sortType]);

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* Filter Section */}
      <div className='w-full max-h-[400px] sm:w-1/4 bg-gray-100 p-3 mb-3 shadow-md rounded-lg '>
        {/* Filters Header with Clear Filters Button */}
        <div className='flex justify-between items-center'>
          <p
            onClick={() => setShowFilter(!showFilter)}
            className='my-2 text-xl font-semibold flex items-center cursor-pointer gap-2'
          >
            FILTERS
            <img
              className={`h-3 sm:hidden transition-transform duration-300 ${showFilter ? 'rotate-90' : ''}`}
              src={assets.dropdown_icon}
              alt="Dropdown"
            />
          </p>
          {/* Clear Filters Button */}
          <button
            onClick={clearFilters}
            className='text-sm text-purple-500 hover:underline sm:hidden' // Hidden on larger devices
          >
            Clear Filters
          </button>
        </div>

        {/* Category Filters */}
        <div className={`border-t border-gray-300 pt-4 mt-4 ${showFilter ? 'block' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-semibold text-gray-700'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm text-gray-600'>
            <label className='flex items-center gap-2'>
              <input
                type="checkbox"
                className='w-4 h-4'
                value="Men"
                checked={category.includes("Men")}
                onChange={toggleCategory}
              />
              Men
            </label>
            <label className='flex items-center gap-2'>
              <input
                type="checkbox"
                className='w-4 h-4'
                value="Women"
                checked={category.includes("Women")}
                onChange={toggleCategory}
              />
              Women
            </label>
            <label className='flex items-center gap-2'>
              <input
                type="checkbox"
                className='w-4 h-4'
                value="Kids"
                checked={category.includes("Kids")}
                onChange={toggleCategory}
              />
              Kids
            </label>
          </div>
        </div>

        {/* Sub-category Filters */}
        <div className={`border-t border-gray-300 pt-4 mt-4 ${showFilter ? 'block' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-semibold text-gray-700'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm text-gray-600'>
            <label className='flex items-center gap-2'>
              <input
                type="checkbox"
                className='w-4 h-4'
                value="Topwear"
                checked={subCategory.includes("Topwear")}
                onChange={toggleSubCategory}
              />
              Topwear
            </label>
            <label className='flex items-center gap-2'>
              <input
                type="checkbox"
                className='w-4 h-4'
                value="Bottomwear"
                checked={subCategory.includes("Bottomwear")}
                onChange={toggleSubCategory}
              />
              Bottomwear
            </label>
            <label className='flex items-center gap-2'>
              <input
                type="checkbox"
                className='w-4 h-4'
                value="Winterwear"
                checked={subCategory.includes("Winterwear")}
                onChange={toggleSubCategory}
              />
              Winterwear
            </label>
          </div>
        </div>

        {/* Clear Filters Button for larger devices */}
        <button onClick={clearFilters} className='text-sm text-purple-500 hover:underline mt-3 hidden sm:block'>
          Clear Filters
        </button>
      </div>

      {/* Right Section */}
      <div className='flex-1'>
        <div className='flex justify-between items-center text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'COLLECTION'} />
          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            className='border-2 border-gray-300 text-sm px-2 py-2 rounded-lg'
          >
            <option value="relevant">Sort By: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Display filtered product count */}
        <p className='text-sm text-gray-500 mb-3'>{filteredProducts.length} Products found</p>

        {/* Product Grid */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {filteredProducts.length === 0 ? (
            <p className="text-lg text-gray-500 col-span-full">No products found matching your criteria.</p>
          ) : (
            filteredProducts.map((item, index) => (
              <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Collection;
