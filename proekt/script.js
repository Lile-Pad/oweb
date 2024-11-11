// Car Gallery Likes
const likeButtons = document.querySelectorAll('.like-btn');
likeButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    increaseLike(btn);
  });
});

function uploadImage() {
  const uploadInput = document.getElementById('uploadImage');
  const imageContainer = document.querySelector('.car-gallery');
  const deleteImagesContainer = document.querySelector('.delete-images');
      
  if (uploadInput.files.length > 0) {
    const file = uploadInput.files[0];
    const img = document.createElement('img');
    img.src = URL.createObjectURL(file);
    img.alt = file.name;
        
    const galleryItem = document.createElement('div');
    galleryItem.classList.add('gallery-item');
    // corrected with a current index
    const currentIndex = document.querySelectorAll('.gallery-item').length;
    galleryItem.dataset.index = currentIndex;
    galleryItem.appendChild(img);
        
    const likesDiv = document.createElement('div');
    likesDiv.classList.add('likes');
        
    const likeBtn = document.createElement('button');
    likeBtn.classList.add('btn', 'like-btn');
    likeBtn.innerHTML = '<i class="fas fa-thumbs-up"></i> <span class="like-count">0</span>';
    
    likeBtn.addEventListener('click', () => {
      increaseLike(likeBtn);
    });
        
    likesDiv.appendChild(likeBtn);
    galleryItem.appendChild(likesDiv);
    imageContainer.insertBefore(galleryItem, imageContainer.querySelector('.upload-image'));

    //new delete button for new image
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('btn');
    deleteBtn.textContent = `Delete Image ${currentIndex + 1}`;
    deleteBtn.onclick = () => deleteImage(currentIndex);
    deleteImagesContainer.appendChild(deleteBtn);
    
    uploadInput.value = '';
  }
}

function deleteImage(index) {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const item = document.querySelector(`.gallery-item[data-index="${index}"]`);
  if (item) {
    item.remove();
    // Update indexes of remaining items
    document.querySelectorAll('.gallery-item').forEach((item, newIndex) => {
      item.dataset.index = newIndex;
    });
    // Update delete buttons
    updateDeleteButtons();
  }
}

function updateDeleteButtons() {
  const deleteImagesContainer = document.querySelector('.delete-images');
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  // Clear existing buttons except the title
  const buttons = deleteImagesContainer.querySelectorAll('button');
  buttons.forEach(button => button.remove());
  
  // Add new buttons for each image
  galleryItems.forEach((item, index) => {
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('btn');
    deleteBtn.textContent = `Delete Image ${index + 1}`;
    deleteBtn.onclick = () => deleteImage(index);
    deleteImagesContainer.appendChild(deleteBtn);
  });
}

function increaseLike(btn) {
  const likeCount = btn.querySelector('.like-count');
  likeCount.textContent = (parseInt(likeCount.textContent) + 1).toString();
}

function addComment(event) {
  event.preventDefault();
  
  const nameInput = document.getElementById('name');
  const commentInput = document.getElementById('comment');
  const commentsContainer = document.querySelector('.car-comments');
  
  if (nameInput.value && commentInput.value) {
    const commentDiv = document.createElement('div');
    commentDiv.classList.add('comment');
    
    // Add comment header div to contain name and delete button
    const commentHeader = document.createElement('div'); ///<div class="comment-header">
    commentHeader.classList.add('comment-header');
    commentHeader.style.display = 'flex';
    commentHeader.style.justifyContent = 'space-between';
    commentHeader.style.alignItems = 'center';
    
    const nameH3 = document.createElement('h3');
    nameH3.textContent = nameInput.value;
    //delete button for comment
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('btn', 'delete-comment');
    deleteButton.innerHTML = '×'; // using × symbol for delete
    deleteButton.style.padding = '0.25rem 0.5rem';
    deleteButton.style.background = '#ff4444';
    deleteButton.style.color = 'white';
    deleteButton.style.border = 'none';
    deleteButton.style.borderRadius = '4px';
    deleteButton.style.cursor = 'pointer';
    
    //popup for delete
    deleteButton.addEventListener('click', () => {
      if (confirm('Are you sure you want to delete this comment?')) {
        commentDiv.remove();
      }
    });
    
    // Assemble comment header
    commentHeader.appendChild(nameH3);
    commentHeader.appendChild(deleteButton);
    
    const commentP = document.createElement('p');
    commentP.textContent = commentInput.value;
    
    //timestamp
    const timestamp = document.createElement('small');
    timestamp.textContent = new Date().toLocaleString();
    timestamp.style.display = 'block';
    timestamp.style.color = '#666';
    timestamp.style.marginTop = '5px';
    
    //assemble!
    commentDiv.appendChild(commentHeader);
    commentDiv.appendChild(commentP);
    commentDiv.appendChild(timestamp);
    
    //insert new comment before the comment form
    const commentForm = document.querySelector('.add-comment');
    commentsContainer.insertBefore(commentDiv, commentForm);
    
    //clear the form
    nameInput.value = '';
    commentInput.value = '';
  }
}

//for existing comments
function initializeExistingComments() {
  const existingComments = document.querySelectorAll('.comment');
  
  existingComments.forEach(comment => {
  //
    if (!comment.querySelector('.delete-comment')) {
      const commentHeader = document.createElement('div');
      commentHeader.classList.add('comment-header');
      commentHeader.style.display = 'flex';
      commentHeader.style.justifyContent = 'space-between';
      commentHeader.style.alignItems = 'center';
      
      const existingH3 = comment.querySelector('h3');
      if (existingH3) {
        commentHeader.appendChild(existingH3.cloneNode(true));
        existingH3.remove();
      }
      
      //the delete button
      const deleteButton = document.createElement('button');
      deleteButton.classList.add('btn', 'delete-comment');
      deleteButton.innerHTML = '×';
      deleteButton.style.padding = '0.25rem 0.5rem';
      deleteButton.style.background = '#ff4444';
      deleteButton.style.color = 'white';
      deleteButton.style.border = 'none';
      deleteButton.style.borderRadius = '4px';
      deleteButton.style.cursor = 'pointer';
      
      deleteButton.addEventListener('mouseover', () => {
        deleteButton.style.background = '#cc0000';
      });
      deleteButton.addEventListener('mouseout', () => {
        deleteButton.style.background = '#ff4444';
      });
      
      deleteButton.addEventListener('click', () => {
        if (confirm('Are you sure you want to delete this comment?')) {
          comment.remove();
        }
      });
      
      commentHeader.appendChild(deleteButton);
      comment.insertBefore(commentHeader, comment.firstChild);
    }
  });
}

document.querySelector('.add-comment').addEventListener('submit', addComment);

//initialise when page loads
document.addEventListener('DOMContentLoaded', () => {
  updateDeleteButtons();
  initializeExistingComments();
});
//event listener for comment form
document.querySelector('.add-comment').addEventListener('submit', addComment);

// Mock review data
const mockReviews = [
  {
    source: "Classic Cars For Dummies",
    author: "Lillien Roberts",
    content: "The 1973 Mazda Miata represents the golden age of Japanese sports cars. Its balanced chassis and responsive steering make it a joy to drive, and you can't go wrong with popup headlights.",
    rating: "4.5/5",
    date: "2024-01-15"
  },
  {
    source: "Vintage Auto Magazine",
    author: "Mitko Davidovich",
    content: "Jugo si je Jugo. Nikad poklasichnije.",
    rating: "10/5",
    date: "2024-01-20"
  }
];

function fetchReviews() {
  const reviewsContainer = document.getElementById('reviews');
  reviewsContainer.innerHTML = '<div class="loading">Loading reviews...</div>';

  setTimeout(() => {
    try {
      const reviewsHTML = mockReviews.map(review => `
        <div class="review">
          <h3>${review.source}</h3>
          <p><strong>By ${review.author}</strong> | Rating: ${review.rating} | ${review.date}</p>
          <p>${review.content}</p>
        </div>
      `).join('');
      
      reviewsContainer.innerHTML = reviewsHTML;
    } catch (error) {
      reviewsContainer.innerHTML = `
        <div class="error">
          Error loading reviews: ${error.message}
        </div>
      `;
    }
  }, 1000);
}

//initialize delete buttons for existing images
document.addEventListener('DOMContentLoaded', () => {
  updateDeleteButtons();
});