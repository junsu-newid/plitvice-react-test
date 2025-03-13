export const MainErrorFallback = ({ error }: { error: Error }) => {
    // FIXME: 에러 처리 로직 추가
    console.log('error:', error);

    return (
        <div>
            <p>Something went wrong:</p>
            <button onClick={() => window.location.assign(window.location.origin)}>Refresh</button>
        </div>
    );
};
