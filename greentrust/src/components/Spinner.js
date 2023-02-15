import CircularProgress from '@mui/material/CircularProgress';


export default function Spinner() {
    return (
        <div className="fixed top-0 left-0 w-screen h-screen bg-darkGray/30 flex items-center justify-center">
            <CircularProgress />
        </div>
    );
}
