import styled from 'styled-components';
import Header from '../components/Header';
import NavigationBar from '../components/NavigationBar';

function DefaultLayout(props) {
    return (
        <Wrapper>
            <NavigationBar />
            <div className="container">
                <Header />
                <div className="content">{props.children}</div>
            </div>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display: flex;
`;

export default DefaultLayout;
