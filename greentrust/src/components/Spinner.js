import CircularProgress from '@mui/material/CircularProgress';

import Image from 'next/image';

export default function Spinner() {
    return (
        <div className="fixed top-0 left-0 w-screen h-screen bg-darkGray/30 flex items-center justify-center">
            {/* <CircularProgress /> */}
            <Image src="/loading.gif" width={128} height={128} className="w-[20%] mix-blend-multiply opacity-50" />
        </div>
    );
}
