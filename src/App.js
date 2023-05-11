import { useRoutes } from 'react-router-dom';
import routes from "./routes"
import './App.css';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass, faBagShopping, faBars, faArrowDown} from "@fortawesome/free-solid-svg-icons";

// 
library.add( faMagnifyingGlass, faBagShopping, faBars, faArrowDown);


const App = () => {
  const element = useRoutes(routes)
  return element
}

export default App;
