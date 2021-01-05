import React from 'react';


const ListItem = ({text, deleteFromList, addFavorite, id, isFavorite}) => {
    return( 
        <div className="list">
            <li className={`list-item`}>{text}</li>
            <button className="favorite-btn" onClick={() => addFavorite(id)} style={{color: isFavorite ? 'rgb(255 190 0)' : '#fff'}}>
                <i className="fas fa-star"></i>
            </button>
            <button className="trash-btn" onClick={() => deleteFromList(id)}>
                <i className="fas fa-trash"></i>
            </button>
        </div>
    )
}

export default ListItem;