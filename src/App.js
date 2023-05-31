import { useRoutes } from 'react-router-dom';
import routes from "./routes"
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas, faMagnifyingGlass, faBagShopping, faBars, faArrowDown} from "@fortawesome/free-solid-svg-icons";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";


// import fontAwesome
library.add( fas, faBookmark, faMagnifyingGlass, faBagShopping, faBars, faArrowDown);


const App = () => {
  const element = useRoutes(routes)
  return element
}

export default App;
