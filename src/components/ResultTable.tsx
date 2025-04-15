import React from "react";

interface ResultTableProps {
    results: {
        name: string;
        attribute: string;
        amount: number;
        isPaid: boolean;
    }[];
    saveResults: React.Dispatch<React.SetStateAction<any[]>>;
}

export const ResultTable = ({ results, saveResults }: ResultTableProps) => {
    const [copyStatus, setCopyStatus] = React.useState<string | null>(null);

    const handlePaymentChange = (index: number) => {
        const newResults = [...results];
        newResults[index] = {
            ...newResults[index],
            isPaid: !newResults[index].isPaid,
        };
        saveResults(newResults);
    };

    const copyToClipboard = () => {
        const text = results
            .map((result) => `${result.name}（${result.attribute}）: ${result.amount}円（${result.isPaid ? "支払い済み" : "未払い"}）`)
            .join("\n");
        navigator.clipboard
            .writeText(text)
            .then(() => {
                setCopyStatus("コピーしました！");
                setTimeout(() => setCopyStatus(null), 3000);
            })
            .catch((err) => {
                console.error("クリップボードへのコピーに失敗しました:", err);
                setCopyStatus("コピーに失敗しました。");
                setTimeout(() => setCopyStatus(null), 3000);
            });
    };

    return (
        <div style={{ marginBottom: "1rem" }}>
            <h2 style={{ fontSize: "1.25rem", fontWeight: "bold" }}>4. 支払い状況の管理</h2>
            <p style={{ fontSize: "0.875rem", color: "#64748b" }}>支払い状況を管理してください。</p>
            <div style={{ overflowX: "auto", marginBottom: "0.5rem" }}>
                <table style={{ minWidth: "100%", backgroundColor: "white", border: "1px solid #d1d5db", borderCollapse: "collapse" }}>
                    <thead>
                        <tr>
                            <th style={{ padding: "0.5rem 1rem", border: "1px solid #d1d5db" }}>名前</th>
                            <th style={{ padding: "0.5rem 1rem", border: "1px solid #d1d5db" }}>属性</th>
                            <th style={{ padding: "0.5rem 1rem", border: "1px solid #d1d5db" }}>金額</th>
                            <th style={{ padding: "0.5rem 1rem", border: "1px solid #d1d5db" }}>支払い状況</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((result, index) => (
                            <tr key={index}>
                                <td style={{ padding: "0.5rem 1rem", border: "1px solid #d1d5db" }}>{result.name}</td>
                                <td style={{ padding: "0.5rem 1rem", border: "1px solid #d1d5db" }}>{result.attribute}</td>
                                <td style={{ padding: "0.5rem 1rem", border: "1px solid #d1d5db" }}>{result.amount}円</td>
                                <td style={{ padding: "0.5rem 1rem", border: "1px solid #d1d5db" }}>
                                    <input
                                        type="checkbox"
                                        checked={result.isPaid}
                                        onChange={() => handlePaymentChange(index)}
                                        style={{ width: "1rem", height: "1rem" }}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div style={{ marginBottom: "0.5rem", width: "100%" }}>
                <button
                    onClick={copyToClipboard}
                    style={{
                        padding: "0.5rem 1rem",
                        backgroundColor: "#3b82f6",
                        color: "white",
                        borderRadius: "0.25rem",
                        border: "none",
                        cursor: "pointer",
                        width: "100%",
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#2563eb")}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#3b82f6")}
                >
                    支払い状況のコピー
                </button>
                {copyStatus && (
                    <div
                        style={{
                            marginTop: "0.5rem",
                            padding: "0.5rem",
                            backgroundColor: copyStatus.includes("失敗") ? "#fee2e2" : "#dcfce7",
                            color: copyStatus.includes("失敗") ? "#b91c1c" : "#15803d",
                            borderRadius: "0.25rem",
                            textAlign: "center",
                        }}
                    >
                        {copyStatus}
                    </div>
                )}
            </div>
        </div>
    );
};
