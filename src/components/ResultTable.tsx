interface ResultTableProps {
    results: {
        name: string;
        attribute: string;
        amount: number;
        isPaid: boolean;
    }[];
    setResults: React.Dispatch<React.SetStateAction<any[]>>;
}

export const ResultTable = ({ results, setResults }: ResultTableProps) => {
    const handlePaymentChange = (index: number) => {
        const newResults = [...results];
        newResults[index] = {
            ...newResults[index],
            isPaid: !newResults[index].isPaid,
        };
        setResults(newResults);
    };

    const copyToClipboard = () => {
        const text = results
            .map((result) => `${result.name}（${result.attribute}）: ${result.amount}円（${result.isPaid ? "支払い済み" : "未払い"}）`)
            .join("\n");
        navigator.clipboard.writeText(text);
    };

    return (
        <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-bold">支払い状況</h2>
                <button onClick={copyToClipboard} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    コピー
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border">名前</th>
                            <th className="px-4 py-2 border">属性</th>
                            <th className="px-4 py-2 border">金額</th>
                            <th className="px-4 py-2 border">支払い状況</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((result, index) => (
                            <tr key={index}>
                                <td className="px-4 py-2 border">{result.name}</td>
                                <td className="px-4 py-2 border">{result.attribute}</td>
                                <td className="px-4 py-2 border">{result.amount}円</td>
                                <td className="px-4 py-2 border">
                                    <input type="checkbox" checked={result.isPaid} onChange={() => handlePaymentChange(index)} className="w-4 h-4" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
