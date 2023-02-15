import CircularProgress from '@mui/material/CircularProgress';


export default function Spinner() {
    return (
        <div className="fixed top-0 w-full h-full bg-darkGray/30 flex items-center justify-center">
            <CircularProgress />
        </div>
    );
}
