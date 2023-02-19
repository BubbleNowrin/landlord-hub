import React from 'react';

const PhotoModal = ({photo}) => {
   
    return (
      <>
        <input type="checkbox" id="my-modal-3" class="modal-toggle" />
        <div class="modal">
          <div class="modal-box relative">
            <label
              for="my-modal-3"
              class="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </label>
             <img src={photo} alt="" />
          </div>
        </div>
      </>
    );
};

export default PhotoModal;