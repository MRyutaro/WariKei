interface ParticipantFormProps {
    participants: any[];
    setParticipants: React.Dispatch<React.SetStateAction<any[]>>;
    attributes: { name: string; coefficient: number }[];
}

export const ParticipantForm = ({ participants, setParticipants, attributes }: ParticipantFormProps) => {
    const handleAddParticipant = () => {
        const newParticipant = {
            id: Date.now(),
            name: "",
            attribute: "", // 選択された属性（単数）
        };
        setParticipants([...participants, newParticipant]);
    };

    const handleRemoveParticipant = (id: number) => {
        setParticipants(participants.filter((p) => p.id !== id));
    };

    const handleNameChange = (id: number, name: string) => {
        setParticipants(participants.map((p) => (p.id === id ? { ...p, name } : p)));
    };

    const handleAttributeChange = (id: number, attribute: string) => {
        setParticipants(
            participants.map((p) =>
                p.id === id
                    ? {
                          ...p,
                          attribute,
                      }
                    : p
            )
        );
    };

    return (
        <div style={{ marginBottom: "1rem" }}>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "0.5rem" }}>2. 参加者登録</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {participants.map((participant) => (
                    <div key={participant.id} style={{ border: "1px solid #e5e7eb", padding: "0.5rem", borderRadius: "0.25rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                            <input
                                type="text"
                                value={participant.name}
                                onChange={(e) => handleNameChange(participant.id, e.target.value)}
                                placeholder="参加者名"
                                style={{ border: "1px solid #e5e7eb", borderRadius: "0.25rem", padding: "0.25rem 0.5rem", flexGrow: 1 }}
                            />
                            <select
                                value={participant.attribute || ""}
                                onChange={(e) => handleAttributeChange(participant.id, e.target.value)}
                                style={{ border: "1px solid #e5e7eb", borderRadius: "0.25rem", padding: "0.25rem 0.5rem", minWidth: "180px" }}
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
                                style={{ backgroundColor: "#ef4444", color: "white", padding: "0.25rem 0.5rem", borderRadius: "0.25rem", whiteSpace: "nowrap" }}
                            >
                                削除
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <button
                onClick={handleAddParticipant}
                style={{ marginTop: "0.5rem", backgroundColor: "#3b82f6", color: "white", padding: "0.5rem 1rem", borderRadius: "0.25rem", width: "100%" }}
            >
                参加者を追加
            </button>
        </div>
    );
};
