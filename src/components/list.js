import React from "react";

//importing component
import { ListItem, NotFound } from "./index";

const List = ({ filteredList, deleteFromList, addFavorite }) => {
  return (
    <div className="friend-list-container">
      <ul className="friend-list">
        {filteredList.length > 0 ? (
          filteredList.map((friend) => {
            return (
              <ListItem
                key={friend.id}
                id={friend.id}
                text={friend.text}
                isFavorite={friend.isFavorite}
                deleteFromList={deleteFromList}
                addFavorite={addFavorite}
              />
            );
          })
        ) : (
          <NotFound text={"Nothing here, please add your friend"} />
        )}
      </ul>
    </div>
  );
};

export default List;
