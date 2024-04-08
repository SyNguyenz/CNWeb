import Header from "./Header"
import Sidebar from "./Sidebar"
function DefaultLayout({children}) {
    return ( 
        <div>
            <Header/>
            <div classname="container">
                <Sidebar/>
                <div classname="content">
                    {children}
                </div>
            </div>
        </div>
     );
}

export default DefaultLayout
;