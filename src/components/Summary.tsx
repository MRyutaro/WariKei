interface SummaryProps {
    results: any[];
    totalAmount: number;
}

export const Summary = ({ results, totalAmount }: SummaryProps) => {
    // 合計集金額の計算
    const totalCollected = results.reduce((acc, result) => acc + result.amount, 0);

    return (
        <div style={{ marginBottom: "1rem", padding: "1rem", backgroundColor: "#f3f4f6" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                        <th style={{ textAlign: "left", padding: "0.5rem", fontSize: "1.1rem", fontWeight: "bold" }}>項目</th>
                        <th style={{ textAlign: "right", padding: "0.5rem", fontSize: "1.1rem", fontWeight: "bold" }}>金額</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                        <td style={{ textAlign: "left", padding: "0.5rem", fontSize: "1rem" }}>支払い金額</td>
                        <td style={{ textAlign: "right", padding: "0.5rem", fontSize: "1rem" }}>{totalAmount.toLocaleString()}円</td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                        <td style={{ textAlign: "left", padding: "0.5rem", fontSize: "1rem" }}>合計集金額</td>
                        <td style={{ textAlign: "right", padding: "0.5rem", fontSize: "1rem" }}>{totalCollected.toLocaleString()}円</td>
                    </tr>
                    <tr>
                        <td style={{ textAlign: "left", padding: "0.5rem", fontSize: "1rem", fontWeight: "bold" }}>差額</td>
                        <td style={{ textAlign: "right", padding: "0.5rem", fontSize: "1rem", fontWeight: "bold" }}>
                            {(totalAmount - totalCollected).toLocaleString()}円
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};
