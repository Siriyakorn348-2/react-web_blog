import React, { useState, useEffect } from "react";
import SearchBlog from "./SearchBlog";
import { useFetchBlogsQuery } from "../../redux/features/blogs/blogsApi";
import { Link } from "react-router-dom";

const Blogs = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [query, setQuery] = useState({ search: "", category: "" });

  // Fetch data using redux
  const { data: blogs = [], isLoading, error } = useFetchBlogsQuery(query);
  console.log(blogs);

  // Handle the search input change
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // Handle the search click, updating the query state
  const handleSearch = () => setQuery({ search, category });

  // useEffect to update query when search or category changes
  useEffect(() => {
    setQuery({ search, category });
  }, [search, category]);

  return (
    <div className="mt-16 container mx-auto">
      <SearchBlog 
        search={search}
        handleSearchChange={handleSearchChange}
        handleSearch={handleSearch}
      />

      {/* Display loading and error */}
      {isLoading && <div>Loading...</div>}
      {error && <div className="text-red-500">{error.toString()}</div>}

      {/* Display blogs */}
      <div className="mt-8 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
        {blogs.length > 0 ? (
          blogs.map(blog => (
            <Link key={blog._id} to={`/blogs/${blog._id}`} className="shadow-md">
              <img 
                src={blog.coverImg} 
                alt={blog.title}
                className="h-80 w-full object-cover"
              />
              <h2 className="text-xl p-4">{blog.title}</h2>
            </Link>
          ))
        ) : (
          <div>No blogs found</div> // In case no blogs are returned
        )}
      </div>
    </div>
  );
};

export default Blogs;
