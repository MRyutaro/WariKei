interface ParticipantFormProps {
    participants: any[];
    saveParticipants: React.Dispatch<React.SetStateAction<any[]>>;
    attributes: { name: string; coefficient: number }[];
}

export const ParticipantForm = ({ participants, saveParticipants, attributes }: ParticipantFormProps) => {
    const handleAddParticipant = () => {
        const newParticipant = {
            id: Date.now(),
            name: "",
            attribute: "", // 選択された属性（単数）
        };
        saveParticipants([...participants, newParticipant]);
    };

    const handleRemoveParticipant = (id: number) => {
        saveParticipants(participants.filter((p) => p.id !== id));
    };

    const handleNameChange = (id: number, name: string) => {
        saveParticipants(participants.map((p) => (p.id === id ? { ...p, name } : p)));
    };

    const handleAttributeChange = (id: number, attribute: string) => {
        saveParticipants(participants.map((p) => (p.id === id ? { ...p, attribute } : p)));
    };

    return (
        <div style={{ marginBottom: "1rem" }}>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "0.5rem" }}>2. 参加者登録</h2>
            <p style={{ fontSize: "0.875rem", color: "#64748b" }}>参加者名と属性を登録してください。</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {participants.map((participant) => (
                    <div key={participant.id} style={{ padding: "0.3rem 0", borderRadius: "0.25rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                            <input
                                type="text"
                                value={participant.name}
                                onChange={(e) => handleNameChange(participant.id, e.target.value)}
                                placeholder="参加者名"
                                style={{ border: "1px solid #e5e7eb", borderRadius: "0.25rem", flexGrow: 1, padding: "0.5rem" }}
                            />
                            <select
                                value={participant.attribute || ""}
                                onChange={(e) => handleAttributeChange(participant.id, e.target.value)}
                                style={{ border: "1px solid #e5e7eb", borderRadius: "0.25rem", flexGrow: 1, padding: "0.5rem" }}
                            >
                                <option value="" disabled>
                                    属性を選択してください
                                </option>
                                {attributes.map((attr) => (
                                    <option key={attr.name} value={attr.name}>
                                        {attr.name} (係数: {attr.coefficient})
                                    </option>
                                ))}
                            </select>
                            <button
                                onClick={() => handleRemoveParticipant(participant.id)}
                                style={{
                                    backgroundColor: "#ef4444",
                                    color: "white",
                                    padding: "0.4rem 0.8rem",
                                    borderRadius: "0.25rem",
                                    whiteSpace: "nowrap",
                                    border: "none",
                                    cursor: "pointer",
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
                    </div>
                ))}
            </div>
            <button
                onClick={handleAddParticipant}
                style={{
                    marginTop: "0.5rem",
                    backgroundColor: "#3b82f6",
                    color: "white",
                    padding: "0.5rem 1rem",
                    borderRadius: "0.25rem",
                    width: "100%",
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
                参加者を追加
            </button>
        </div>
    );
};
