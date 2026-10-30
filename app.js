"use strict";

/* ===== Lista de objetos de conversión (datos) ===== */
const CONVERSIONES = [
  { id: "m-cm",  etiqueta: "Metros a centímetros",    desde: "m",  hacia: "cm", factor: 100 },
  { id: "cm-m",  etiqueta: "Centímetros a metros",    desde: "cm", hacia: "m",  factor: 0.01 },
  { id: "kg-g",  etiqueta: "Kilogramos a gramos",     desde: "kg", hacia: "g",  factor: 1000 },
  { id: "g-kg",  etiqueta: "Gramos a kilogramos",     desde: "g",  hacia: "kg", factor: 0.001 }
];

/* ===== Validación común: vacío, no finito y (opcional) negativo ===== */
function validarEntrada(texto, rechazarNegativo) {
  const limpio = String(texto).trim();
  if (limpio === "") return { ok: false, mensaje: "Complete el campo." };
  const n = Number(limpio.replace(",", "."));
  if (!Number.isFinite(n)) return { ok: false, mensaje: "Escriba un número válido." };
  if (rechazarNegativo && n < 0) return { ok: false, mensaje: "No se permiten valores negativos." };
  return { ok: true, valor: n };
}

/* ===== Calculadora (semana 7, completada) ===== */
function calcularOperacion(textoA, textoB, operacion) {
  if (String(textoA).trim() === "" || String(textoB).trim() === "") {
    return "Complete las dos entradas.";
  }
  const a = Number(String(textoA).trim());
  const b = Number(String(textoB).trim());
  if (!Number.isFinite(a) || !Number.isFinite(b)) {
    return "Escriba números válidos en ambas entradas.";
  }
  if (operacion === "dividir" && b === 0) {
    return "No se puede dividir entre cero.";
  }
  if (operacion === "sumar") return "Suma: " + (a + b);
  return "División: " + (a / b);
}

/* ===== Conversor (función de cálculo) ===== */
function convertir(texto, idConversion) {
  const conv = CONVERSIONES.find(function (c) { return c.id === idConversion; });
  if (!conv) return "Conversión no disponible.";
  const r = validarEntrada(texto, true);
  if (!r.ok) return r.mensaje;
  const resultado = Math.round(r.valor * conv.factor * 1e9) / 1e9; // evita 0.1+0.2 y similares
  return r.valor + " " + conv.desde + " = " + resultado + " " + conv.hacia;
}

/* ===== Conexión con la página (solo en el navegador) ===== */
if (typeof document !== "undefined") {
  const selector = document.getElementById("conv-tipo");
  CONVERSIONES.forEach(function (c) {
    const op = document.createElement("option");
    op.value = c.id;
    op.textContent = c.etiqueta;
    selector.appendChild(op);
  });

  document.getElementById("calcular").addEventListener("click", function () {
    document.getElementById("resultado").textContent = calcularOperacion(
      document.getElementById("a").value,
      document.getElementById("b").value,
      document.getElementById("operacion").value
    );
  });

  document.getElementById("convertir").addEventListener("click", function () {
    document.getElementById("conv-resultado").textContent = convertir(
      document.getElementById("conv-valor").value,
      selector.value
    );
  });
}

if (typeof module !== "undefined") {
  module.exports = { CONVERSIONES, validarEntrada, calcularOperacion, convertir };
}
