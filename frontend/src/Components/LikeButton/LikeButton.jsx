import React from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import './LikeButton.scss';

const LikeButton = ({ isLiked, onToggle, id }) => {
  return (
    <button
      className={`like-button ${id}`}
      onClick={onToggle}
      aria-label={isLiked ? "Usuń z ulubionych" : "Dodaj do ulubionych"}
    >
      {isLiked ? <FaHeart color="red" /> : <FaRegHeart />}
    </button>
  );
};

export default LikeButton;
