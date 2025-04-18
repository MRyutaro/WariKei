export interface Participant {
    id?: string | number;
    name: string;
    attribute?: string;
    coefficient?: number;
    isPaid?: boolean;
}

export interface Attribute {
    name: string;
    coefficient: number;
}

export interface Result {
    id: string | number;
    name: string;
    attribute: string;
    amount: number;
    isPaid: boolean;
    coefficient: number; // 設定された係数
    effectiveCoefficient: number; // 実際の支払い金額から逆算した実質的な係数
    effectivePercentage: number; // 実質的な負担割合（%）
}

export default function calculate(participants: Participant[], attributes: Attribute[] = [], totalAmount: number, unit: number = 1): Result[] {
    console.log(participants, attributes, totalAmount, unit);

    if (unit <= 0) throw new Error("unit must be positive");
    if (totalAmount < 0) throw new Error("totalAmount must be non-negative");

    const enriched = participants.map((p, idx) => {
        // attribute テーブル優先
        const attrCoef = attributes.find((a) => a.name === p.attribute)?.coefficient;
        const coef = p.coefficient ?? attrCoef ?? 1;
        return {
            ...p,
            id: p.id ?? idx,
            attribute: p.attribute ?? "",
            coefficient: coef,
            isPaid: p.isPaid ?? false,
        } as Required<Participant>;
    });

    const weightSum = enriched.reduce((s, p) => s + p.coefficient, 0);
    if (weightSum === 0) throw new Error("total coefficient cannot be 0");

    // 属性ごとにグループ化
    const attributeGroups: Record<string, Required<Participant>[]> = {};
    enriched.forEach((p) => {
        const attr = p.attribute || "default";
        if (!attributeGroups[attr]) {
            attributeGroups[attr] = [];
        }
        attributeGroups[attr].push(p);
    });

    // 属性ごとの合計係数を計算
    const attrWeights: Record<string, number> = {};
    Object.entries(attributeGroups).forEach(([attr, group]) => {
        attrWeights[attr] = group.reduce((sum, p) => sum + p.coefficient, 0);
    });

    // 各属性グループの理想的な支払い金額を計算
    const attrIdealAmounts: Record<string, number> = {};
    Object.entries(attrWeights).forEach(([attr, weight]) => {
        attrIdealAmounts[attr] = (totalAmount * weight) / weightSum;
    });

    // 属性ごとに単位で切り捨てた金額を計算
    const attrFlooredAmounts: Record<string, number> = {};
    const attrRemainders: Record<string, number> = {};

    Object.entries(attrIdealAmounts).forEach(([attr, ideal]) => {
        const floored = Math.floor(ideal / unit) * unit;
        attrFlooredAmounts[attr] = floored;
        attrRemainders[attr] = ideal - floored;
    });

    // 合計収集金額と不足分/余剰分を計算
    const collected = Object.values(attrFlooredAmounts).reduce((sum, amount) => sum + amount, 0);
    let delta = totalAmount - collected;
    const steps = Math.round(delta / unit);

    if (steps !== 0) {
        // 属性の端数でソート: 足りなければ remainder 大→小, 余れば 小→大
        const attrEntries = Object.entries(attrRemainders);
        const cmp = steps > 0 ? (a: [string, number], b: [string, number]) => b[1] - a[1] : (a: [string, number], b: [string, number]) => a[1] - b[1];

        attrEntries.sort(cmp);

        for (let i = 0; i < Math.abs(steps); i++) {
            const targetAttr = attrEntries[i % attrEntries.length][0];
            attrFlooredAmounts[targetAttr] += Math.sign(steps) * unit;
        }
    }

    // 属性グループ内で一人あたりの金額を計算
    const attrPerPersonAmount: Record<string, number> = {};
    Object.entries(attributeGroups).forEach(([attr, group]) => {
        // グループの人数
        const count = group.length;
        if (count > 0) {
            // 属性グループの合計金額を人数で割る（端数が出ないように注意）
            const attrTotal = attrFlooredAmounts[attr];
            attrPerPersonAmount[attr] = Math.round(attrTotal / count / unit) * unit;
        }
    });

    // 最終的な支払い金額の配列を作成
    const results = enriched.map((p) => {
        const attr = p.attribute || "default";
        return {
            id: p.id,
            name: p.name || "参加者" + (Number(p.id) + 1),
            attribute: p.attribute,
            amount: attrPerPersonAmount[attr] || 0,
            isPaid: p.isPaid,
            coefficient: p.coefficient,
            effectiveCoefficient: 0, // 仮の値
            effectivePercentage: 0, // 仮の値
        };
    });

    // 実際の合計金額を計算
    const actualTotalAmount = results.reduce((sum, r) => sum + r.amount, 0);

    // 実際の支払い金額から実質的な傾斜を計算
    if (actualTotalAmount > 0) {
        results.forEach((r) => {
            // 実質的な負担割合を計算
            r.effectivePercentage = (r.amount / actualTotalAmount) * 100;

            // 実質的な係数を計算（全員の合計が元の係数合計と同じになるよう調整）
            r.effectiveCoefficient = (r.amount / actualTotalAmount) * weightSum;

            // 小数点第2位までに丸める
            r.effectivePercentage = Math.round(r.effectivePercentage * 100) / 100;
            r.effectiveCoefficient = Math.round(r.effectiveCoefficient * 100) / 100;
        });
    }

    console.log(results);
    return results;
}
