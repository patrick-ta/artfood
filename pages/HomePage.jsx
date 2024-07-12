import { useState } from "react";
import useGetUsers from "../hooks/useGetUsers";
import useLogout from "../hooks/useLogout";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const {handleLogout, isLoggingOut, error} = useLogout();
  const [inputValue, setInputValue] = useState();
  const {isLoading, users} = useGetUsers();
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setInputValue(e.target.value);
    if (e.target.value === "") {
      setInputValue(null);
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue) {
      navigate(`/${inputValue}`);
    }
  }

  const handleSuggestionOnClick = (username) => {
    console.log(username);
    navigate(`/${username}`);
  }

  return (
    <>
    <button type="button" onClick={() => handleLogout()}>Logout</button> 
    <div>
      {!isLoading && <input type="text" onChange={handleOnChange} onKeyDown={handleKeyDown}></input>}
      {inputValue &&
        users.filter(user => user.name.startsWith(inputValue)).map(user => <div key={user.id} onClick={() => handleSuggestionOnClick(user.name)}>
          {user.name}
        </div>)
      }
    </div>
    </>
  )
}

export default HomePage;