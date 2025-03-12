// import { createContext } from "react";
// import CurrentUserContext from "../../contexts/CurrentUserContext";

// const CurrentUserContext = createContext(null);

// export default CurrentUserContext;

import { createContext } from "react";

const CurrentUserContext = createContext({
  currentUser: null,
  setCurrentUser: () => {},
  isLoggedIn: false, // Add isLoggedIn here
  setIsLoggedIn: () => {},
});

export default CurrentUserContext;
