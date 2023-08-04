import { useRoutes } from "react-router-dom";
import routes from "./routes";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";

// import fontAwesome
library.add(fas, faBookmark);

const App: React.FC = () => {
  const element = useRoutes(routes);
  return element;
};

export default App;
