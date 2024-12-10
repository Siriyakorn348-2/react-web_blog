import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useFetchBlogByIdQuery, useFetchRelatedBlogsQuery } from '../../../redux/features/blogs/blogsApi';

function RelatedBlogs() {
    const { id } = useParams();

    // Fetch blog by ID
    const { data: blog = {}, error: blogError, isLoading: isBlogLoading } = useFetchBlogByIdQuery(id);

    // Fetch related blogs
    const { data: relatedBlogs = {}, error: relatedBlogsError, isLoading: isRelatedBlogsLoading } = useFetchRelatedBlogsQuery(id);

    console.log('Related Blogs Data:', relatedBlogs);
    console.log('Blog ID:', id);


    if (isBlogLoading || isRelatedBlogsLoading) return <div>Loading...</div>;
    if (blogError || relatedBlogsError) return <div>Error loading related blog.</div>;

    if (!relatedBlogs.posts || relatedBlogs.posts.length === 0) {
      return <div>No related blogs found</div>;
    }

    return (
      <div>
        <h3 className="text-2xl font-medium pt-8 px-8 pb-5">Related Blogs</h3>
        <hr />
        <div className="space-y-4 mt-5">
          {relatedBlogs.posts.map((relatedBlog) => (
            <Link to={`/blogs/${relatedBlog._id}`} key={relatedBlog._id} className="flex flex-col sm:flex-row sm:item-center gap-4 shadow-sm px-8 py-4">
              <div className="size-14">
                <img src={relatedBlog.coverImg} alt="" className="h-full w-full rounded-full ring-2 ring-blue-700" />
              </div>
              <div>
                <h4 className="font-medium text-[#1E73BE]">{relatedBlog.title.substring(0, 50)}</h4>
                <p>{relatedBlog.description.substring(0, 50)}...</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
}

export default RelatedBlogs;
