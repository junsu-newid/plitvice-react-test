import { AppProvider } from './provider';
import { AppRouter } from './router';

export const App = () => {
    console.log('test');
    console.log('test2');
    return (
        <AppProvider>
            <AppRouter />
        </AppProvider>
    );
};

export default App;
