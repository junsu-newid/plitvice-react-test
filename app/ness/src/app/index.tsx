import { AppProvider } from './provider';
import { AppRouter } from './router';

export const App = () => {
    console.log('test');
    return (
        <AppProvider>
            <AppRouter />
        </AppProvider>
    );
};

export default App;
