import {Route, Routes} from "react-router-dom"
import Trangchu from "../screens/page/Trangchu"
import Sanpham from "../screens/page/Sanpham"
import Product from "../screens/Book/Products"
import Blog from "../screens/page/Blog"
import Lienhe from "../screens/page/Lienhe"
import Gioithieu from "../screens/page/Gioithieu"

const Main=()=>{
    return(
        <div>
            <div>
                <Routes>
                    <Route path="/" element={<Trangchu/>}/>
                    <Route path="/sanpham" element={<Sanpham/>}/>
                    <Route path="/sach/:id" element={<Product/>}/>
                    <Route path="/blog" element={<Blog/>}/>
                    <Route path="/lienhe" element={<Lienhe/>}/>
                    <Route path="/gioithieu" element={<Gioithieu/>}/>
                </Routes>
            </div>
        </div>
    )
}

export default Main