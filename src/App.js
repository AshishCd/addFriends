import React, { Component } from "react";
import "./App.css";
import {Container} from "react-bootstrap";

//import Component
import {
  NotFound,
  SearchForm,
  List,
  Pagination,
  ConfirmationModal,
} from "./components";

class FrindList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: "",
      friendListArr: [],
      filterStatus: "all",
      filteredList: [],
      currentPage: 1,
      friendsPerPage: 4,
      showModal: false,
    };
  }

  componentDidMount() {
    this.getLocalStorageList();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.friendListArr.length !== this.state.friendListArr) {
      this.saveToLocalStorage();
    }
    if (prevState.filterStatus !== this.state.filterStatus) {
      this.filtereListItem();
      this.clearSearch();
    }
  }

  clearSearch = () => {
    this.setState({
      inputText: "",
    });
  };

  //on chnage of input
  onChangeHandler = (event) => {
    const { value } = event.target;
    this.setState(
      {
        inputText: value,
      },
      () => this.search()
    );
  };

  //search on change
  search = () => {
    const { inputText, friendListArr } = this.state;
    if (friendListArr.length) {
      const searchArr = friendListArr.filter((item) => {
        return item.text.toLowerCase().includes(inputText.toLowerCase());
      });
      this.setState({
        filteredList: searchArr,
      });
    }
  };

  //on click plus icon or enter
  submitList = (event) => {
    event.preventDefault();
    this.setState(
      {
        friendListArr: [
          ...this.state.friendListArr,
          {
            text: this.state.inputText,
            isFavorite: false,
            id: Math.random() * 100,
          },
        ],
        inputText: "",
      },
      () => this.filtereListItem()
    );
  };

  //upon delete button click
  deleteFromList = (id) => {
    this.openCloseModal(id);
  };

  //add to fav
  addFavorite = (id) => {
    const addFavoriteArr = this.state.friendListArr.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          isFavorite: !item.isFavorite,
        };
      }
      return item;
    });
    this.setState(
      {
        friendListArr: addFavoriteArr,
      },
      () => this.filtereListItem()
    );
  };

  //on chnage of dropdown
  onStatusChange = (e) => {
    const { value } = e.target;
    this.setState({
      filterStatus: value,
      currentPage: 1,
    });
  };

  //filetr according to value from dropdown
  filtereListItem = () => {
    const { filterStatus, friendListArr } = this.state;
    switch (filterStatus) {
      case "favorite":
        this.setState({
          filteredList: friendListArr.filter((i) => i.isFavorite === true),
        });
        break;

      case "notSoFav":
        this.setState({
          filteredList: friendListArr.filter((i) => i.isFavorite === false),
        });
        break;

      default:
        this.setState({
          filteredList: friendListArr,
        });
        break;
    }
  };

  //save to local storage
  saveToLocalStorage = () => {
    localStorage.setItem(
      "friendList",
      JSON.stringify(this.state.friendListArr)
    );
  };

  //get existing list
  getLocalStorageList = () => {
    if (localStorage.getItem("friendList") === null) {
      localStorage.setItem("friendList", JSON.stringify([]));
    } else {
      let localFriendList = JSON.parse(localStorage.getItem("friendList"));
      this.setState({
        friendListArr: localFriendList,
        filteredList: localFriendList,
      });
    }
  };

  //pagination
  paginate = (number) => {
    this.setState({
      currentPage: number,
    });
  };

  //opne confirmation modal
  openCloseModal = (id) => {
    this.setState({
      showModal: !this.state.showModal,
      deleteBtnId: id,
    });
  };

  //delete freind permanently
  deletePermanently = () => {
    const filterList = this.state.friendListArr.filter(
      (i) => i.id !== this.state.deleteBtnId
    );
    this.setState(
      {
        friendListArr: filterList,
        showModal: false,
      },
      () => this.filtereListItem()
    );
  };


  setPagination = (friendListArr) => {
    const { currentPage } = this.state;
    if (friendListArr.length === 0 && currentPage > 1) {
      this.setState({
        currentPage: currentPage - 1,
      });
    }
  };

  render() {
    const {
      inputText,
      friendListArr,
      filterStatus,
      filteredList,
      currentPage,
      friendsPerPage,
      showModal,
      deleteBtnId,
    } = this.state;

    const indexOfLastFriend = currentPage * friendsPerPage;
    const indexOfFirstFriend = indexOfLastFriend - friendsPerPage;
    const currentFriendList = filteredList.slice(
      indexOfFirstFriend,
      indexOfLastFriend
    );
    this.setPagination(currentFriendList);

    const searchProps = {
      onChangeHandler: this.onChangeHandler,
      submitList: this.submitList,
      inputText,
      filterStatus,
      onStatusChange: this.onStatusChange,
    };

    const ListProps = {
      filteredList: currentFriendList,
      deleteFromList: this.deleteFromList,
      addFavorite: this.addFavorite,
      inputText,
    };

    const paginationProps = {
      friendsPerPage,
      totalFriends: filteredList.length,
      paginateFunction: this.paginate,
      currentPage,
    };

    return (
      <Container>
      <div className="App">
        <header>
          <h1>FriendsBook</h1>
        </header>
        <SearchForm {...searchProps} />
        {friendListArr.length ? (
          <List {...ListProps} />
        ) : (
          <NotFound
            text={"OOOPPsss....Nothing in the list. Please add new Friends."}
          />
        )}
        {filteredList.length > 4 && <Pagination {...paginationProps} />}
        {showModal && (
          <ConfirmationModal
            handleClose={this.openCloseModal}
            show={showModal}
            deleteBtnId={deleteBtnId}
            friendListArr={friendListArr}
            deletePermanently={this.deletePermanently}
          />
        )}
      </div>
      </Container>
    );
  }
}

export default FrindList;
