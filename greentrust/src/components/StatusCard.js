export default function StatusCard({ text, color }) {
    return (
        <div className={`text-white top-2 right-2 p-1 rounded-full px-2 text-sm w-fit ${color}`} title={text}>
            {text}
        </div>
    )
}
