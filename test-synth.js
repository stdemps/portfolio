const { PolySynth, MonoSynth } = require("tone");

const poly = new PolySynth(MonoSynth);
poly.set({ oscillator: { type: "square" }});
console.log(poly.get().oscillator.type);
