interface CalculationPanelProps {
    totalAmount: number;
    saveTotalAmount: React.Dispatch<React.SetStateAction<number>>;
    unit: number;
    saveUnit: React.Dispatch<React.SetStateAction<number>>;
    onCalculate: () => void;
}

export const CalculationPanel = ({ totalAmount, saveTotalAmount, unit, saveUnit, onCalculate }: CalculationPanelProps) => {
    return (
        <div
            style={{
                marginBottom: "1rem",
            }}
        >
            <h2
                style={{
                    fontWeight: 600,
                    marginBottom: "1rem",
                    fontSize: "1.25rem",
                }}
            >
                3. 計算設定
            </h2>
            <p style={{ fontSize: "0.875rem", color: "#64748b" }}>支払い金額と支払い単位を設定してください。</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div>
                    <label
                        htmlFor="totalAmount"
                        style={{
                            display: "block",
                            fontSize: "0.875rem",
                            fontWeight: 500,
                            color: "#374151",
                            marginBottom: "0.25rem",
                        }}
                    >
                        合計金額
                    </label>
                    <input
                        type="number"
                        id="totalAmount"
                        value={totalAmount}
                        onChange={(e) => saveTotalAmount(Number(e.target.value))}
                        style={{
                            width: "100%",
                            paddingTop: "0.5rem",
                            paddingBottom: "0.5rem",
                            paddingLeft: "0",
                            paddingRight: "0",
                            border: "1px solid #d1d5db",
                            borderRadius: "0.375rem",
                            outline: "none",
                            textAlign: "right",
                            boxSizing: "border-box",
                        }}
                        min="0"
                    />
                </div>
                <div>
                    <label
                        htmlFor="unit"
                        style={{
                            display: "block",
                            fontSize: "0.875rem",
                            fontWeight: 500,
                            color: "#374151",
                            marginBottom: "0.25rem",
                        }}
                    >
                        支払い単位
                    </label>
                    <select
                        id="unit"
                        value={unit}
                        onChange={(e) => saveUnit(Number(e.target.value))}
                        style={{
                            width: "100%",
                            paddingLeft: "0.75rem",
                            paddingRight: "0.75rem",
                            paddingTop: "0.5rem",
                            paddingBottom: "0.5rem",
                            border: "1px solid #d1d5db",
                            borderRadius: "0.375rem",
                            outline: "none",
                        }}
                    >
                        <option value="1">1円単位</option>
                        <option value="10">10円単位</option>
                        <option value="100">100円単位</option>
                        <option value="500">500円単位</option>
                        <option value="1000">1000円単位</option>
                    </select>
                </div>
                <button
                    onClick={onCalculate}
                    style={{
                        width: "100%",
                        backgroundColor: "#3b82f6",
                        color: "white",
                        paddingTop: "0.5rem",
                        paddingBottom: "0.5rem",
                        paddingLeft: "1rem",
                        paddingRight: "1rem",
                        borderRadius: "0.375rem",
                        border: "none",
                        cursor: "pointer",
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = "#2563eb";
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = "#3b82f6";
                    }}
                >
                    計算する
                </button>
            </div>
        </div>
    );
};
