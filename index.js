const { createCache, createResource } = window.simpleCacheProvider;

const cache = createCache()

// utility that mimicks a server request 
const fetchData = timeout => new Promise((res, rej) => {
    setTimeout(() => {
        res(Math.random())
    }, timeout);
})

// this lets React know it needs to wait for this resource
const fooResource = createResource(fetchData);

// Foo's rendering will be deffered until data resolves
const Foo = () => {
    const data = fooResource.read(cache, 500);

    return (
        <div>{data}</div>
    )
}

const App = () => {
    return (
        <React.Placeholder fallback="loading...">
            <Foo />
        </React.Placeholder>
    )
}

ReactDOM.render(<App />, document.querySelector("#root"))