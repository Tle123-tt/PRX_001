import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import { BrowserRouter } from "react-router-dom";

const Layout = () => {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Main />
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default Layout;
