import React from "react";

const SearchForm = ({onChangeHandler, submitList, inputText, filterStatus, onStatusChange}) => {
  return (
    <>
      <form>
        <input
          onChange={(e) => onChangeHandler(e)}
          type="text"
          className="friend-input"
          value={inputText}
          required
          placeholder="Enter your friend's name"
        />
        <button onClick={inputText.length > 0 ? (e) => submitList(e) : () => {}} className="todo-button" type="submit">
          <i className="fas fa-plus-square"></i>
        </button>
        <div className="select">
          <select onChange={(e) => onStatusChange(e)} name="todos" className="filter-todo">
            <option value="all">All</option>
            <option value="favorite">Favourite</option>
            <option value="notSoFav">Not so favourite</option>
          </select>
        </div>
      </form>
    </>
  );
};

export default SearchForm;
