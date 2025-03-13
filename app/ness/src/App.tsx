import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { CommonButton } from '@plitvice/ui';

function App() {
    const { t } = useTranslation();
    console.log('거짓말');
    console.log('마지막 인사');
    console.log('하루하루');
    console.log('tell me');
    console.log('나를');
    console.log('사랑한다고');
    console.log('말해');
    console.log('말해에줘요');
    console.log('해야');
    console.log('숨참고');
    console.log('');

    return (
        <Container>
            <NewidTitle>NEWID</NewidTitle>
            <CommonButton size="lg" variant="stroke">
                {t('common.welcome')}
            </CommonButton>
        </Container>
    );
}

export default App;

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
