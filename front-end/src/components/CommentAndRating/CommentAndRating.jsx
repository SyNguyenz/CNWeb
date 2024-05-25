import React, { useState, useEffect} from 'react';
import './CommentAndRating.css';
import axios from 'axios'; 
import ReactStars from 'react-rating-stars-component';
import product_comments from '../Assets/comments.js';
import no_avt from '../Assets/no-avt.png'
import ProductRating from '../ProductRating/ProductRating.js';
import LoginPopup from '../LoginPopup/LoginPopup.js';
import AllApi from '../../api/api';

const CommentAndRating = ({product, onOpenPopup}) => {
  const [comments, setComments] = useState([]);
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');
  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };
  
  const handleContentChange = (event) => {
    setContent(event.target.value); 
  };


  useEffect(() => {
    const fetchComments = async () => {
      if (product?.id) {
        try {
          const response = await AllApi.getComments(product.id);
          setComments(response.data);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchComments();
  }, [product?.id]);
  
 useEffect(() => {
  if (product.id) {
    const filteredComments = product_comments.filter(comment => comment.product_id === product.id);
    setComments(filteredComments);
  }

}, [product.id]);


  const handleSubmit = async (event) => {
    event.preventDefault();
   try{
    const response = await AllApi.addComments({
      productId: product.id,
      comment: content,
      rating: rating
     });
     setComments([...comments, response.data]);
     setContent('');
     setRating(0);
   }
   catch(error){
    console.log(error);
    if(error.response.data == "Not purchased")
      alert("Bạn chưa mua mặt hàng này!");
   }

};


  return (
    <div id="reviews-section">
        <div className="rating-form">
            <div className="name-product">
                <h3>Đánh giá và nhận xét về sản phẩm { product.name }</h3>
                  <div className = "rating-average">
                  <p> Stars:  {product.rating}</p>
                    <ProductRating rating = {product.rating}/> 
                   <p> / {product.totalRatings} đánh giá </p> 
                  </div>
                <p>(Vui lòng đăng nhập để đánh giá sản phẩm)</p>
            </div>
            <form onClick={onOpenPopup}className = "product-rating-box" onSubmit={handleSubmit}>          
              <div className = "comment-part">
                <textarea title="Nội dung" placeholder="Nội dung. Tối thiểu 15 ký tự *"
                name="Content" value = {content} onChange = {handleContentChange}
                ></textarea>
              </div>
              <div className = "rating-part">
                <label>
                  Rating:
                  <ReactStars
                    count={5}
                    onChange={handleRatingChange}
                    size={24}
                    activeColor="gold"
                    value={rating}
                  />
                </label>
              </div>
              <button className ="button-yin" type="submit">GỬI ĐÁNH GIÁ</button>
            </form>
            <div className="rating-content">
        <div>
        {comments.map(comment => (
          <div  key={comment.id} className = "item-comment" >
            <div className="avt">
              <img className = "avt-yin"src = {no_avt}/>
            </div>
            <div className = "info-comment">
              <strong class = "user-name">{comment.user.userName}</strong> 
              <span> ( {new Date(comment.created).toLocaleDateString()} )</span>
              <ProductRating rating = {comment.rating}/> 
              <div className = "review-item">{comment.comment}</div>

            </div>
          
          </div>
        ))}
      </div>
        </div>
        </div>
     
    </div>
  );
};

export default CommentAndRating;
