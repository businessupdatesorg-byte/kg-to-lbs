/**
 * WeightConverter Pro - Universal Calculation Engine
 * Fully interactive, precision-accurate (1959 Avoirdupois standard)
 * 1 lb = 0.45359237 kg (exact legal definition)
 */

const LBS_PER_KG = 1 / 0.45359237; // ~2.2046226218487757
const KG_PER_LB = 0.45359237;

function convertWeight(source) {
  const kgInput = document.getElementById('input-kg');
  const lbsInput = document.getElementById('input-lbs');
  const lbsWhole = document.getElementById('input-lbs-whole');
  const ozInput = document.getElementById('input-oz');
  const stInput = document.getElementById('input-st');
  const stLbsInput = document.getElementById('input-st-lbs');
  const stepsBox = document.getElementById('calc-steps');
  
  if (!kgInput || !lbsInput) return;

  if (source === 'kg') {
    const kg = parseFloat(kgInput.value);
    if (isNaN(kg)) {
      clearOutputs(['input-lbs', 'input-lbs-whole', 'input-oz', 'input-st', 'input-st-lbs', 'calc-steps']);
      return;
    }

    const lbs = kg / KG_PER_LB;
    lbsInput.value = formatDecimals(lbs, 3);
    
    // Breakdown into whole pounds + ounces (1 lb = 16 oz)
    const wholeLbs = Math.floor(lbs);
    const remOz = (lbs - wholeLbs) * 16;
    if (lbsWhole) lbsWhole.value = wholeLbs;
    if (ozInput) ozInput.value = formatDecimals(remOz, 2);

    // Breakdown into stones + pounds (1 stone = 14 lbs)
    const stones = Math.floor(lbs / 14);
    const remLbsInStone = lbs % 14;
    if (stInput) stInput.value = stones;
    if (stLbsInput) stLbsInput.value = formatDecimals(remLbsInStone, 2);

    // Calculation step-by-step audit trail
    if (stepsBox) {
      stepsBox.value = 
        `Exact Formula:\n` +
        `pounds = ${kg} kg / 0.45359237\n` +
        `pounds = ${lbs.toFixed(8)} lb (~${formatDecimals(lbs, 3)} lbs)\n\n` +
        `Mental Shortcut:\n` +
        `Double and add 10%: (${kg} × 2 = ${kg * 2}) + 10% = ${(kg * 2.2).toFixed(2)} lbs\n\n` +
        `Stones & Ounces:\n` +
        `${stones} st ${formatDecimals(remLbsInStone, 2)} lb | ${wholeLbs} lb ${formatDecimals(remOz, 2)} oz`;
    }
  } else {
    const lbs = parseFloat(lbsInput.value);
    if (isNaN(lbs)) {
      clearOutputs(['input-kg', 'input-lbs-whole', 'input-oz', 'input-st', 'input-st-lbs', 'calc-steps']);
      return;
    }

    const kg = lbs * KG_PER_LB;
    kgInput.value = formatDecimals(kg, 3);

    const wholeLbs = Math.floor(lbs);
    const remOz = (lbs - wholeLbs) * 16;
    if (lbsWhole) lbsWhole.value = wholeLbs;
    if (ozInput) ozInput.value = formatDecimals(remOz, 2);

    const stones = Math.floor(lbs / 14);
    const remLbsInStone = lbs % 14;
    if (stInput) stInput.value = stones;
    if (stLbsInput) stLbsInput.value = formatDecimals(remLbsInStone, 2);

    if (stepsBox) {
      stepsBox.value = 
        `Exact Formula:\n` +
        `kilograms = ${lbs} lb × 0.45359237\n` +
        `kilograms = ${kg.toFixed(8)} kg (~${formatDecimals(kg, 3)} kg)\n\n` +
        `Mental Shortcut:\n` +
        `Subtract 10% and divide by 2: (${lbs} - 10% = ${lbs * 0.9}) / 2 = ${(lbs * 0.45).toFixed(2)} kg\n\n` +
        `Stones & Ounces:\n` +
        `${stones} st ${formatDecimals(remLbsInStone, 2)} lb | ${wholeLbs} lb ${formatDecimals(remOz, 2)} oz`;
    }
  }
}

function formatDecimals(num, decimals) {
  // Format with smart trimming of trailing zeros if cleaner
  const fixed = num.toFixed(decimals);
  return fixed;
}

function clearOutputs(ids) {
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
}

function swapWeightUnits() {
  const kgInput = document.getElementById('input-kg');
  const lbsInput = document.getElementById('input-lbs');
  const kgLabel = document.getElementById('label-kg');
  const lbsLabel = document.getElementById('label-lbs');
  
  if (!kgInput || !lbsInput) return;

  if (kgInput.readOnly) {
    kgInput.readOnly = false;
    lbsInput.readOnly = true;
    if (kgLabel) kgLabel.innerHTML = 'Kilograms (kg) [Input]:';
    if (lbsLabel) lbsLabel.innerHTML = 'Pounds (lb) [Output]:';
    kgInput.focus();
    if (kgInput.value) convertWeight('kg');
  } else {
    kgInput.readOnly = true;
    lbsInput.readOnly = false;
    if (kgLabel) kgLabel.innerHTML = 'Kilograms (kg) [Output]:';
    if (lbsLabel) lbsLabel.innerHTML = 'Pounds (lb) [Input]:';
    lbsInput.focus();
    if (lbsInput.value) convertWeight('lbs');
  }
}

function resetWeightConverter() {
  const ids = ['input-kg', 'input-lbs', 'input-lbs-whole', 'input-oz', 'input-st', 'input-st-lbs', 'calc-steps'];
  clearOutputs(ids);
  const kgInput = document.getElementById('input-kg');
  if (kgInput && !kgInput.readOnly) {
    kgInput.focus();
  } else {
    const lbsInput = document.getElementById('input-lbs');
    if (lbsInput) lbsInput.focus();
  }
}

function setPresetValue(unit, val) {
  const kgInput = document.getElementById('input-kg');
  const lbsInput = document.getElementById('input-lbs');
  if (unit === 'kg') {
    if (kgInput.readOnly) swapWeightUnits();
    kgInput.value = val;
    convertWeight('kg');
  } else {
    if (lbsInput.readOnly) swapWeightUnits();
    lbsInput.value = val;
    convertWeight('lbs');
  }
}

function copyResult() {
  const kgInput = document.getElementById('input-kg');
  const lbsInput = document.getElementById('input-lbs');
  if (!kgInput || !lbsInput || (!kgInput.value && !lbsInput.value)) return;

  const resultText = `${kgInput.value} kg = ${lbsInput.value} lbs`;
  
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(resultText).then(() => showToast());
  } else {
    const ta = document.createElement('textarea');
    ta.value = resultText;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showToast();
  }
}

function showToast() {
  const toast = document.getElementById('toast-notice');
  if (!toast) return;
  toast.style.display = 'block';
  setTimeout(() => {
    toast.style.display = 'none';
  }, 2000);
}

// Auto-run on DOM ready
document.addEventListener('DOMContentLoaded', function() {
  const kgInput = document.getElementById('input-kg');
  const lbsInput = document.getElementById('input-lbs');
  if (kgInput && kgInput.value) {
    convertWeight('kg');
  } else if (lbsInput && lbsInput.value) {
    convertWeight('lbs');
  }
});
