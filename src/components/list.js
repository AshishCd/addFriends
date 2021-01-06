import React, { useEffect } from "react";

//importing component
import { ListItem, NotFound } from "./index";

const List = ({ filteredList, deleteFromList, addFavorite, currentPage, friendsPerPage, setPagination }) => {
  const indexOfLastFriend = currentPage * friendsPerPage;
    const indexOfFirstFriend = indexOfLastFriend - friendsPerPage;
    const currentFriendList = filteredList.slice(
      indexOfFirstFriend,
      indexOfLastFriend
    );
    useEffect(() => {
      setPagination(currentFriendList);
    }, [currentFriendList])
    // this.setPagination(currentFriendList);
  return (
    <div className="friend-list-container">
      <ul className="friend-list">
        {currentFriendList.length > 0 ? (
          currentFriendList.map((friend) => {
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
