import React from 'react'
import commentorIcon from "../../../assets/commentor.png"
import{formatDate} from "../../../utilis/formateDate"
import PostAComment from './PostAComment'
const CommentCard = ({comments}) => {
  return (
    <div className='my-6 bg-white p-8' >
      <div>
        {
          comments?.length > 0? <div>
            <h3 className='text-lg font-medium '>All Comments</h3>
            <div>
              {
                comments?.map((comment,index) => (
                  <div key={index}>
                    <div>
                      <img src={commentorIcon} alt="" className='h-14'/>
                      <div>
                        <p className='text-lg font-medium underline capitalize underline-offset-4 
                        text-blue-400'>
                          {comment?.user?.username}</p>
                          <p className='text-[12px] italic'>{formatDate(comment.createdAt)}</p>
                      </div>
                    </div>
                    {/*comment details */}
                    <div className='text-gray-600 mt-5 border p-8'>
                      <p className='md:w4/5'>{comment?.comment}</p>

                    </div>
                  </div>
                ))
              }
            </div>
          </div> : <div className='text-lg font-medium'>No comments found</div>
         }

      </div>

    {/* comment input here */}
    <PostAComment/>
    </div>
  )
}

export default CommentCard
