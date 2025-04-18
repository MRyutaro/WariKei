import { Result } from "../utils/calculate";

interface SummaryProps {
    results: Result[];
    totalAmount: number;
}

export const Summary = ({ results, totalAmount }: SummaryProps) => {
    // 合計集金額の計算
    const totalCollected = results.reduce((acc, result) => acc + result.amount, 0);

    // 属性ごとの合計金額と人数を計算
    const attributeTotals = results.reduce((acc: Record<string, { total: number; count: number; avgCoefficient: number }>, result) => {
        const attribute = result.attribute || "未設定";
        if (!acc[attribute]) {
            acc[attribute] = { total: 0, count: 0, avgCoefficient: 0 };
        }
        acc[attribute].total += result.amount;
        acc[attribute].count += 1;
        acc[attribute].avgCoefficient += result.coefficient || 1;
        return acc;
    }, {});

    // 各属性の平均係数を計算
    Object.keys(attributeTotals).forEach((attribute) => {
        if (attributeTotals[attribute].count > 0) {
            attributeTotals[attribute].avgCoefficient = attributeTotals[attribute].avgCoefficient / attributeTotals[attribute].count;
        }
    });

    return (
        <div style={{ marginBottom: "1rem" }}>
            <h2 style={{ fontSize: "1.25rem", fontWeight: "bold" }}>3. 集金額の確認</h2>
            <p style={{ fontSize: "0.875rem", color: "#64748b" }}>集金額を確認してください。</p>

            {/* 属性ごとの支払い金額 */}
            <div style={{ marginBottom: "1rem" }}>
                <div style={{ padding: "1rem", backgroundColor: "#f3f4f6" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                            <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
                                <th style={{ textAlign: "left", padding: "0.5rem", fontSize: "1rem", fontWeight: "bold" }}>属性</th>
                                <th style={{ textAlign: "right", padding: "0.5rem", fontSize: "1rem", fontWeight: "bold" }}>人数</th>
                                <th style={{ textAlign: "right", padding: "0.5rem", fontSize: "1rem", fontWeight: "bold" }}>一人あたり</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(attributeTotals).map(([attribute, data]) => (
                                <tr key={attribute} style={{ borderBottom: "1px solid #e5e7eb" }}>
                                    <td style={{ textAlign: "left", padding: "0.5rem", fontSize: "0.95rem" }}>{attribute}</td>
                                    <td style={{ textAlign: "right", padding: "0.5rem", fontSize: "0.95rem" }}>{data.count}人</td>
                                    <td style={{ textAlign: "right", padding: "0.5rem", fontSize: "0.95rem" }}>
                                        {Math.round(data.total / data.count).toLocaleString()}円
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div style={{ padding: "1rem", backgroundColor: "#f3f4f6" }}>
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
        </div>
    );
};
