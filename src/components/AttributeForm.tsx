interface AttributeFormProps {
    attributes: { name: string; coefficient: number }[];
    saveAttributes: React.Dispatch<React.SetStateAction<{ name: string; coefficient: number }[]>>;
}

export const AttributeForm = ({ attributes, saveAttributes }: AttributeFormProps) => {
    const handleAddAttribute = () => {
        const newAttribute = { name: "", coefficient: 1 };
        if (attributes.some((attr) => attr.name === newAttribute.name)) {
            alert("この属性名は既に存在します。");
            return;
        }
        saveAttributes([...attributes, newAttribute]);
    };

    const handleRemoveAttribute = (index: number) => {
        saveAttributes(attributes.filter((_, i) => i !== index));
    };

    const handleAttributeChange = (index: number, field: "name" | "coefficient", value: string | number) => {
        if (field === "name") {
            const newName = value as string;
            const isDuplicate = attributes.some((attr, i) => i !== index && attr.name === newName);
            if (isDuplicate) {
                alert("この属性名は既に存在します。");
                return;
            }
        }

        // 係数は数値として扱う
        if (field === "coefficient" && typeof value === "string") {
            value = Number(value);
            // 係数が0以下の場合は0.1に設定
            if (value <= 0) {
                value = 0.1;
            }
        }

        const newAttributes = [...attributes];
        newAttributes[index] = {
            ...newAttributes[index],
            [field]: value,
        };
        saveAttributes(newAttributes);
    };

    return (
        <div style={{ marginBottom: "1rem" }}>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "0.5rem" }}>1. 属性設定</h2>
            <p style={{ fontSize: "0.875rem", color: "#64748b" }}>属性名と係数を設定してください。</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {attributes.map((attribute, index) => (
                    <div key={index} style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                        <input
                            type="text"
                            value={attribute.name}
                            onChange={(e) => handleAttributeChange(index, "name", e.target.value)}
                            placeholder="属性名"
                            style={{ height: "100%", flex: 1, padding: "0.5rem", border: "1px solid #e2e8f0", borderRadius: "0.25rem" }}
                        />
                        <input
                            type="number"
                            value={attribute.coefficient}
                            onChange={(e) => handleAttributeChange(index, "coefficient", Number(e.target.value))}
                            min="0.1"
                            step="0.1"
                            style={{
                                height: "100%",
                                width: "6rem",
                                padding: "0.5rem",
                                border: "1px solid #e2e8f0",
                                borderRadius: "0.25rem",
                                textAlign: "right",
                            }}
                        />
                        <button
                            onClick={() => handleRemoveAttribute(index)}
                            style={{
                                padding: "0.4rem 0.8rem",
                                backgroundColor: "#ef4444",
                                color: "white",
                                borderRadius: "0.25rem",
                                cursor: "pointer",
                                border: "none",
                                height: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.backgroundColor = "#dc2626";
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.backgroundColor = "#ef4444";
                            }}
                        >
                            削除
                        </button>
                    </div>
                ))}
                <button
                    onClick={handleAddAttribute}
                    style={{
                        width: "100%",
                        padding: "0.5rem 1rem",
                        backgroundColor: "#3b82f6",
                        color: "white",
                        borderRadius: "0.25rem",
                        cursor: "pointer",
                        border: "none",
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = "#2563eb";
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = "#3b82f6";
                    }}
                >
                    属性を追加
                </button>
            </div>
        </div>
    );
};
