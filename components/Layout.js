import Footer from "./Footer";

const Layout = (props) => {
    return ( 
        <div>
           <div className="p-5">
            {props.children}
        </div> 
        <Footer />
        </div>
        
     );
}
 
export default Layout;