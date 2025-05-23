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

  // enrich participants
  const enriched = participants.map((p, idx) => {
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

  const weightSum = enriched.reduce((sum, p) => sum + p.coefficient, 0);
  if (weightSum === 0) throw new Error("total coefficient cannot be 0");

  // compute ideal per-person
  const perIdeal = enriched.map((p) => ({
    id: p.id,
    ideal: (totalAmount * p.coefficient) / weightSum,
  }));

  // floor each person's amount to unit
  const remainders: Record<string | number, number> = {};
  const baseAmounts: Record<string | number, number> = {};
  perIdeal.forEach(({ id, ideal }) => {
    const floored = Math.floor(ideal / unit) * unit;
    baseAmounts[id] = floored;
    remainders[id] = ideal - floored;
  });

  // assemble initial results
  const results: Result[] = enriched.map((p) => ({
    id: p.id,
    name: p.name,
    attribute: p.attribute,
    amount: baseAmounts[p.id] || 0,
    isPaid: p.isPaid,
    coefficient: p.coefficient,
    effectiveCoefficient: 0,
    effectivePercentage: 0,
  }));

  // sum and distribute any shortfall or surplus to match at least totalAmount
  let actualTotal = results.reduce((s, r) => s + r.amount, 0);
  const diff = totalAmount - actualTotal;

  if (diff >= 0) {
    // 属性ごとにグループ化
    const attributeGroups = new Map<string, Result[]>();
    results.forEach((r) => {
      if (!attributeGroups.has(r.attribute)) {
        attributeGroups.set(r.attribute, []);
      }
      attributeGroups.get(r.attribute)!.push(r);
    });

    // 各属性グループ内で均等に分配
    const steps = Math.ceil(diff / unit);
    const groups = Array.from(attributeGroups.entries());

    for (let i = 0; i < steps; i++) {
      const groupIndex = i % groups.length;
      const [_, groupResults] = groups[groupIndex];

      // グループ内の全員に同じ金額を追加
      groupResults.forEach((r) => {
        r.amount += unit;
      });
    }

    actualTotal = results.reduce((s, r) => s + r.amount, 0);
  } else if (diff < 0) {
    // if we over-collected too much, optionally trim to just above totalAmount
    // but we leave rounding-based over-collection minimal
  }

  // recalculate effective shares
  results.forEach((r) => {
    r.effectivePercentage = Math.round((r.amount / actualTotal) * 10000) / 100;
    r.effectiveCoefficient = Math.round((r.amount / actualTotal) * weightSum * 100) / 100;
  });

  console.log(results);
  return results;
}
