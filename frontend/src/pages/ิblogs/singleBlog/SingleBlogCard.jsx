import React from "react";
import moment from "moment";
import EditorJSHTML from "editorjs-html";

const editorJSHTML = EditorJSHTML();

const SingleBlogCard = ({ blog }) => {
  const { title, content, coverImg, createdAt, rating = "Not available" } = blog || {};

  console.log("Blog Data:", blog);

  // ฟอร์แมตวันที่
  const formattedDate = moment(createdAt).format('MMMM Do YYYY, h:mm:ss a');

  // ตรวจสอบ content และ blocks ก่อนที่จะพยายามแปลง
  let htmlContent = "<p>No content available</p>"; 

  if (blog?.content?.blocks) {
    const blocksArray = Array.isArray(blog.content.blocks)
      ? blog.content.blocks
      : [blog.content.blocks]; 
    try {
      htmlContent = editorJSHTML.parse({ blocks: blocksArray }).join('');
    } catch (error) {
      console.error("Error parsing content:", error);
    }
  } else {
    htmlContent = "<p>No blocks available in content.</p>";
    console.warn("No content or blocks available");
  }

  return (
    <div>
      <div className="bg-white p-8">
        <div>
          <h1 className="md:text-4xl text-3xl font-medium mb-4">{title}</h1>
          <p className="md-6">{formattedDate} by <span className="text-blue-400">Admin</span></p>
        </div>
        <div>
          <img 
            src={coverImg || "https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg"} 
            alt="cover Image" 
            className="w-full md:h-[520px] bg-cover" 
          />
        </div>
        {/* blog details */}
        <div className="mt-8 space-y-4">
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} className="space-y-3 editorjsdiv" />
          <div>
            <span>Rating: </span>
            <span>{rating} (based on 2,370 reviews)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBlogCard;
