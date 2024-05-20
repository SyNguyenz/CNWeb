import React, { useState, useEffect} from 'react';
import './CommentAndRating.css';
import axios from 'axios'; 
import ReactStars from 'react-rating-stars-component';
import product_comments from '../Assets/comments.js';
import no_avt from '../Assets/no-avt.png'
import ProductRating from '../ProductRating/ProductRating.js';
import LoginPopup from '../LoginPopup/LoginPopup.js'; 

const CommentAndRating = ({product, onOpenPopup}) => {
  const [comments, setComments] = useState([]);
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');
  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };
  
/* useEffect(() => {
   if (product.id) {
     axios.get(`http://localhost:5000/products/${product.id}/comments`)
       .then(response => setComments(response.data))
       .catch(error => console.error(error));
   }
 }, [product.id]);
  */
 useEffect(() => {
  if (product.id) {
    const filteredComments = product_comments.filter(comment => comment.product_id === product.id);
    setComments(filteredComments);
  }

}, [product.id]);


  const handleSubmit = (event) => {
    event.preventDefault();
  //  axios.post(`http://localhost:5000/products/${product.id}/comments`, {
  //      user_id: 'USER_ID',  
  //      content,
  //      rating
  //  })
  //  .then(response => {
  //      setComments([...comments, response.data]);
  //      setContent('');
  //      setRating(0);
  //  })
  //  .catch(error => console.error(error));
};


  return (
    <div id="reviews-section">
        <div className="rating-form">
            <div className="name-product">
                <h3>Đánh giá và nhận xét về sản phẩm { product.name }</h3>
                  <div className = "rating-average">
                  <p> Stars:  {product.rating}</p>
                    <ProductRating rating = {product.rating}/> 
                   <p> / 100 đánh giá </p> 
                  </div>
                <p>(Vui lòng đăng nhập để đánh giá sản phẩm)</p>
            </div>
            <form onClick={onOpenPopup}className = "product-rating-box" onSubmit={handleSubmit}>          
              <div className = "comment-part">
                <textarea title="Nội dung" placeholder="Nội dung. Tối thiểu 15 ký tự *"
                name="Content" 
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
              <strong class = "user-name">{comment.user_id.username}</strong> 
              <span> ( {new Date(comment.created_at).toLocaleDateString()} )</span>
              <ProductRating rating = {comment.rating}/> 
              <div className = "review-item">{comment.content}</div>

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
