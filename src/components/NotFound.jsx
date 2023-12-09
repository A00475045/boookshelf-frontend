import NotFoundGIF from './images/NotFound.gif';
const NotFound = () => {
    return (<main style={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
        <img style={{ height: "72vh" }} src={NotFoundGIF} alt="404 GIF" />
    </main>)
}

export default NotFound;