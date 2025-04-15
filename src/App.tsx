import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { AttributeForm } from "./components/AttributeForm";
import { CalculationPanel } from "./components/CalculationPanel";
import calculateShare from "./utils/calculate";
import { ParticipantForm } from "./components/ParticipantForm";
import { ResetButton } from "./components/ResetButton";
import { ResultTable } from "./components/ResultTable";
import { Summary } from "./components/Summary";

export default function App() {
    const [attributes, setAttributes] = useState<{ name: string; coefficient: number }[]>([]);
    const [participants, setParticipants] = useState<any[]>([]);
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [unit, setUnit] = useState<number>(1);
    const [results, setResults] = useState<any[]>([]);

    // Save to localStorage functions
    const saveAttributes = (newAttributes: SetStateAction<{ name: string; coefficient: number }[]>) => {
        setAttributes(newAttributes);
        const updatedValue = typeof newAttributes === "function" ? newAttributes(attributes) : newAttributes;
        localStorage.setItem("warikei_attributes", JSON.stringify(updatedValue));
    };

    const saveParticipants = (newParticipants: SetStateAction<any[]>) => {
        setParticipants(newParticipants);
        const updatedValue = typeof newParticipants === "function" ? newParticipants(participants) : newParticipants;
        localStorage.setItem("warikei_participants", JSON.stringify(updatedValue));
    };

    const saveTotalAmount = (newAmount: SetStateAction<number>) => {
        setTotalAmount(newAmount);
        const updatedValue = typeof newAmount === "function" ? newAmount(totalAmount) : newAmount;
        localStorage.setItem("warikei_totalAmount", String(updatedValue));
    };

    const saveUnit = (newUnit: SetStateAction<number>) => {
        setUnit(newUnit);
        const updatedValue = typeof newUnit === "function" ? newUnit(unit) : newUnit;
        localStorage.setItem("warikei_unit", String(updatedValue));
    };

    const saveResults = (newResults: SetStateAction<any[]>) => {
        setResults(newResults);
        const updatedValue = typeof newResults === "function" ? newResults(results) : newResults;
        localStorage.setItem("warikei_results", JSON.stringify(updatedValue));
    };

    // Load from localStorage on mount
    useEffect(() => {
        try {
            const storedAttributes = localStorage.getItem("warikei_attributes");
            const storedParticipants = localStorage.getItem("warikei_participants");
            const storedTotal = localStorage.getItem("warikei_totalAmount");
            const storedUnit = localStorage.getItem("warikei_unit");
            const storedResults = localStorage.getItem("warikei_results");

            if (storedAttributes) setAttributes(JSON.parse(storedAttributes));
            if (storedParticipants) setParticipants(JSON.parse(storedParticipants));
            if (storedTotal) setTotalAmount(Number(storedTotal));
            if (storedUnit) setUnit(Number(storedUnit));
            if (storedResults) setResults(JSON.parse(storedResults));
        } catch (error) {
            console.error("localStorageからのデータ読み込みに失敗しました:", error);
        }
    }, []);

    const handleCalculate = () => {
        const result = calculateShare(participants, attributes, totalAmount, unit);
        saveResults(result);
    };

    const handleReset = () => {
        if (window.confirm("すべてのデータをリセットしますか？")) {
            saveAttributes([]);
            saveParticipants([]);
            saveTotalAmount(0);
            saveUnit(1);
            saveResults([]);

            // localStorageからも削除
            try {
                localStorage.removeItem("warikei_attributes");
                localStorage.removeItem("warikei_participants");
                localStorage.removeItem("warikei_totalAmount");
                localStorage.removeItem("warikei_unit");
                localStorage.removeItem("warikei_results");
            } catch (error) {
                console.error("localStorageからのデータ削除に失敗しました:", error);
            }
        }
    };

    return (
        <div
            style={{
                maxWidth: "28rem",
                marginLeft: "auto",
                marginRight: "auto",
                padding: "1rem",
                textAlign: "center",
            }}
        >
            <h1
                style={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    textAlign: "center",
                    marginBottom: "1rem",
                }}
            >
                WariKei: 傾斜割り勘サービス
            </h1>
            <AttributeForm attributes={attributes} setAttributes={saveAttributes} />
            <ParticipantForm participants={participants} setParticipants={saveParticipants} attributes={attributes} />
            <CalculationPanel totalAmount={totalAmount} setTotalAmount={saveTotalAmount} unit={unit} setUnit={saveUnit} onCalculate={handleCalculate} />
            {results.length > 0 && (
                <>
                    <ResultTable results={results} setResults={saveResults} />
                    <Summary results={results} totalAmount={totalAmount} />
                </>
            )}
            <ResetButton onReset={handleReset} />
        </div>
    );
}
