interface ResetButtonProps {
    onReset: () => void;
}

export const ResetButton = ({ onReset }: ResetButtonProps) => {
    return (
        <button
            onClick={onReset}
            style={{
                width: "100%",
                marginTop: "1rem",
                padding: "0.5rem",
                backgroundColor: "#ef4444",
                color: "white",
                borderRadius: "0.25rem",
                transition: "background-color 0.3s",
                cursor: "pointer",
                border: "none",
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#dc2626")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#ef4444")}
        >
            リセット
        </button>
    );
};
