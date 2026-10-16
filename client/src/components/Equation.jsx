import AnswerSlot from './AnswerSlot.jsx';
import { BLANK } from '../lib/speech-text.js';

const OP_WORDS = { '+': 'plus', '−': 'minus' };

// "3 + 2 = [slot]" row shared by the picture sums (artboards 6 and J2-0).
export default function Equation({ left, op, right, chosen, paddingTop }) {
  return (
    <div className="equation" style={{ paddingTop }}>
      <span className="eq-num">{left}</span>
      <span className="eq-op">{op}</span>
      <span className="eq-num">{right}</span>
      <span className="eq-op">=</span>
      <AnswerSlot variant="math" value={chosen} />
    </div>
  );
}

export function equationText(left, op, right, chosen) {
  return `${left} ${OP_WORDS[op]} ${right} equals, ${chosen ?? BLANK}.`;
}
