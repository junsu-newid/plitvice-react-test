import styled, { keyframes } from 'styled-components';
import viteLogo from '@/asset/vite.svg';
import reactLogo from '@/asset/react.svg';
import { Button } from '@plitvice/ui';

function App() {
    return (
        <Container>
            <Wrapper>
                <a href="https://vite.dev" target="_blank">
                    <LogoImg src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <SpinLogo src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </Wrapper>
            <a href="https://www.its-newid.com/" target="_blank">
                <NewidTitle>NEWID</NewidTitle>
            </a>
            <Button primary size="lg">
                Click me
            </Button>
        </Container>
    );
}

export default App;

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Container = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 1200px;
    margin: 0 auto;
    height: 100dvh;
`;

const Wrapper = styled.div`
    display: flex;
    gap: 20px;
`;

const LogoImg = styled.img`
    position: relative;
    width: 150px;
    height: 150px;
`;

const SpinLogo = styled(LogoImg)`
    animation: ${spin} 10s linear infinite;
`;

const NewidTitle = styled.h1`
    font-size: 10rem;
    background: -webkit-linear-gradient(left, rgb(0, 111, 185), rgb(111, 44, 135), rgb(221, 37, 20));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    text-align: center;
    box-sizing: border-box;
    overflow-wrap: break-word;
    width: 100%;
    line-height: 1.2;
    white-space: nowrap;
`;
