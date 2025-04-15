interface CalculationPanelProps {
    totalAmount: number;
    setTotalAmount: React.Dispatch<React.SetStateAction<number>>;
    unit: number;
    setUnit: React.Dispatch<React.SetStateAction<number>>;
    onCalculate: () => void;
}

export const CalculationPanel = ({ totalAmount, setTotalAmount, unit, setUnit, onCalculate }: CalculationPanelProps) => {
    return (
        <div
            style={{
                backgroundColor: "white",
                padding: "1rem",
                borderRadius: "0.5rem",
                boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
                marginBottom: "1rem",
            }}
        >
            <h2
                style={{
                    fontSize: "1.125rem",
                    fontWeight: 600,
                    marginBottom: "1rem",
                }}
            >
                計算設定
            </h2>
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
                        onChange={(e) => setTotalAmount(Number(e.target.value))}
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
                        onChange={(e) => setUnit(Number(e.target.value))}
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
                >
                    計算する
                </button>
            </div>
        </div>
    );
};
