import Header from './Header';
import Footer from './Footer';
function DefaultLayout({ children }) {
    return ( 
        <div>
            <Header />
            <div className = 'container'>
                <div classname = 'content'>{children}</div>

            </div>
            <Footer />
        </div>
     );
}

export default DefaultLayout;