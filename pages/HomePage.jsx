import useLogout from "../hooks/useLogout";

const HomePage = () => {
  const {handleLogout, isLoggingOut, error} = useLogout();

  return (
    <>
    <button type="button" onClick={() => handleLogout()}>Logout</button>
    </>
  )
}

export default HomePage;