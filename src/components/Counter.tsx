import { useState } from "react";

export default function Counter() {
    const [count, setCount] = useState(0);

    return (
        <div className="flex flex-col items-center gap-4 p-4">
            <h2 className="text-2xl font-bold">Counter: {count}</h2>
            <div className="flex gap-4">
                <button
                    onClick={() => setCount(count - 1)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                    Decrease
                </button>
                <button
                    onClick={() => setCount(count + 1)}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                    Increase
                </button>
            </div>
        </div>
    );
}
