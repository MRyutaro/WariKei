export default function calculateShare(participants: any[], attributes: any[], totalAmount: number, unit: number) {
    console.log(participants, attributes, totalAmount, unit);

    // 各参加者の割合を計算
    const shares = participants.map((participant, index) => {
        // 単純な例として、均等に分配
        const amount = Math.floor(totalAmount / participants.length / unit) * unit;

        return {
            id: participant.id || index,
            name: participant.name || `参加者${index + 1}`,
            attribute: participant.attribute || "",
            amount: amount,
            isPaid: false,
        };
    });

    return shares;
}
