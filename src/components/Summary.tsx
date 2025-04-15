interface SummaryProps {
    results: any[];
    totalAmount: number;
}

export const Summary = ({ results, totalAmount }: SummaryProps) => {
    return (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <h2 className="text-xl font-bold mb-2">合計金額</h2>
            <p className="text-lg">{totalAmount.toLocaleString()}円</p>
            <h2 className="text-xl font-bold mt-4 mb-2">各参加者の支払い金額</h2>
            <div className="space-y-2">
                {results.map((result, index) => (
                    <div key={index} className="flex justify-between">
                        <span>{result.name}</span>
                        <span>{result.amount.toLocaleString()}円</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
