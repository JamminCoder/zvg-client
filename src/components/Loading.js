export function LoadingAnimation() {
    return <div className="loading"></div>
}

export function LoadingPage() {
    return (
        <div className="fixed w-[100%] h-[100vh] grid place-items-center">
            <div className="text-center text-xl font-medium top-[25%] absolute">
                Loading...
                <LoadingAnimation/>
            </div>
        </div>
    );
}