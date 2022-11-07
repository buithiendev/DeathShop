import Header from '~/components/Layout/Components/Header';
import Footer from '../components/Footer';

function DefaultLayout({children}) {
    return (<>
        <Header/>
        
        <Footer/>
    </>);
}

export default DefaultLayout;