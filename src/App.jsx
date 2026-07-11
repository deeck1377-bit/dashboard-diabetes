import React, { useState } from "react";

/* ============================================================
   PALETA (basada en el brand palette de la doctora)
   ============================================================ */
const C = {
  bg: "#F7F4F1",
  card: "#FFFFFF",
  ink: "#423D3A",
  sub: "#8A817C",
  line: "#EAE2DC",
  rosa: "#DA98A6",
  rosaSoft: "#F5E1E5",
  verde: "#82AC8C",
  verdeSoft: "#DFEBE2",
  menta: "#BFDBC9",
  mentaSoft: "#E9F2EC",
  durazno: "#F2C9AF",
  duraznoSoft: "#FBEADF",
  nude: "#EDE4DF",
  terra: "#D28E6F",
  terraSoft: "#F5E0D5",
};

const FONT_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,500;1,9..144,600&family=Nunito+Sans:ital,wght@0,400;0,600;0,700;0,800;1,400&display=swap');
.fd-display { font-family: 'Fraunces', Georgia, serif; }
.fd-body { font-family: 'Nunito Sans', 'Segoe UI', sans-serif; }
@keyframes fd-pop { 0% { transform: scale(.92); opacity: 0 } 100% { transform: scale(1); opacity: 1 } }
@keyframes fd-float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-6px) } }
@keyframes fd-shake { 0%,100% { transform: translateX(0) rotate(0) } 20% { transform: translateX(-4px) rotate(-6deg) } 40% { transform: translateX(4px) rotate(6deg) } 60% { transform: translateX(-3px) rotate(-4deg) } 80% { transform: translateX(3px) rotate(4deg) } }
@keyframes fd-beat { 0%,100% { transform: scale(1) } 30% { transform: scale(1.18) } 50% { transform: scale(1.02) } }
@keyframes fd-energy { 0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(130,172,140,.6) } 50% { transform: scale(1.03); box-shadow: 0 0 0 18px rgba(130,172,140,0) } 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(130,172,140,0) } }
@keyframes fd-spark { 0%,100% { opacity: .3; transform: scale(.8) } 50% { opacity: 1; transform: scale(1.25) } }
.fd-shake { animation: fd-shake .5s ease-in-out infinite }
.fd-beat { animation: fd-beat 1.1s ease-in-out infinite }
.fd-energy { animation: fd-energy 1.4s ease-in-out infinite }
.fd-spark { animation: fd-spark 1s ease-in-out infinite }
.fd-pop { animation: fd-pop .35s ease both }
@media (prefers-reduced-motion: reduce) {
  .fd-pop { animation: none }
  * { transition-duration: 0.01ms !important; animation-duration: 0.01ms !important }
}
input[type=range].fd-range { -webkit-appearance: none; appearance: none; height: 10px; border-radius: 999px; outline: none; width: 100%; }
input[type=range].fd-range::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 28px; height: 28px; border-radius: 50%; background: #fff; border: 4px solid ${C.ink}; cursor: pointer; box-shadow: 0 2px 6px rgba(0,0,0,.18); }
input[type=range].fd-range::-moz-range-thumb { width: 28px; height: 28px; border-radius: 50%; background: #fff; border: 4px solid ${C.ink}; cursor: pointer; box-shadow: 0 2px 6px rgba(0,0,0,.18); }
button:focus-visible { outline: 3px solid ${C.verde}; outline-offset: 2px; }
`;

/* ============================================================
   PIEZAS COMUNES
   ============================================================ */
function BrushCircle({ color, size = 84, children, float = false }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        position: "relative",
        display: "grid",
        placeItems: "center",
        animation: float ? "fd-float 4s ease-in-out infinite" : "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: color,
          opacity: 0.55,
          borderRadius: "58% 42% 47% 53% / 46% 55% 45% 54%",
          transform: "rotate(14deg) scale(1.04)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: color,
          borderRadius: "47% 53% 55% 45% / 52% 46% 54% 48%",
          transform: "rotate(-8deg)",
        }}
      />
      <div style={{ position: "relative", fontSize: size * 0.42, lineHeight: 1 }}>{children}</div>
    </div>
  );
}

function Pill({ children, bg, color = C.ink }) {
  return (
    <span
      className="fd-body"
      style={{
        background: bg,
        color,
        fontSize: 12,
        fontWeight: 800,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        padding: "5px 12px",
        borderRadius: 999,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}

function TopBar({ title, onBack, done, total, color }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
      <button
        onClick={onBack}
        className="fd-body"
        style={{
          border: `2px solid ${C.line}`,
          background: "#fff",
          borderRadius: 999,
          padding: "8px 16px",
          fontWeight: 800,
          fontSize: 14,
          color: C.ink,
          cursor: "pointer",
        }}
      >
        ← Menú
      </button>
      <div style={{ flex: 1 }}>
        <div className="fd-display" style={{ fontWeight: 700, fontSize: 18, color: C.ink }}>
          {title}
        </div>
        {total ? (
          <div style={{ display: "flex", gap: 5, marginTop: 6 }}>
            {Array.from({ length: total }).map((_, i) => (
              <div
                key={i}
                style={{
                  height: 6,
                  flex: 1,
                  maxWidth: 42,
                  borderRadius: 999,
                  background: i < done ? color : C.line,
                  transition: "background .3s",
                }}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function BigBtn({ children, onClick, bg = C.ink, color = "#fff", disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="fd-body"
      style={{
        background: disabled ? C.line : bg,
        color: disabled ? C.sub : color,
        border: "none",
        borderRadius: 999,
        padding: "13px 26px",
        fontSize: 15,
        fontWeight: 800,
        cursor: disabled ? "default" : "pointer",
        boxShadow: disabled ? "none" : "0 3px 10px rgba(66,61,58,.18)",
      }}
    >
      {children}
    </button>
  );
}

function Card({ children, style }) {
  return (
    <div
      style={{
        background: C.card,
        borderRadius: 22,
        border: `1px solid ${C.line}`,
        boxShadow: "0 4px 18px rgba(66,61,58,.05)",
        padding: 20,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* Pregunta de opción múltiple reutilizable */
function Quiz({ q, options, correct, explain, onAnswered, accent = C.verde }) {
  const [picked, setPicked] = useState(null);
  const answered = picked !== null;
  return (
    <div>
      <p className="fd-body" style={{ fontWeight: 800, fontSize: 16, color: C.ink, margin: "0 0 12px" }}>{q}</p>
      <div style={{ display: "grid", gap: 8 }}>
        {options.map((op, i) => {
          const isCorrect = i === correct;
          let bg = "#fff", border = C.line;
          if (answered && isCorrect) { bg = C.verdeSoft; border = C.verde; }
          else if (answered && picked === i && !isCorrect) { bg = C.terraSoft; border = C.terra; }
          return (
            <button
              key={i}
              disabled={answered}
              onClick={() => { setPicked(i); onAnswered && onAnswered(i === correct); }}
              className="fd-body"
              style={{
                textAlign: "left", background: bg, border: `2px solid ${border}`,
                borderRadius: 14, padding: "12px 14px", fontSize: 15, color: C.ink,
                cursor: answered ? "default" : "pointer", fontWeight: 600, transition: "all .2s",
              }}
            >
              {answered && isCorrect ? "✅ " : answered && picked === i ? "✖️ " : ""}{op}
            </button>
          );
        })}
      </div>
      {answered && (
        <div className="fd-body fd-pop" style={{ marginTop: 12, background: picked === correct ? C.verdeSoft : C.duraznoSoft, borderRadius: 14, padding: "12px 14px", fontSize: 14, color: C.ink }}>
          <b>{picked === correct ? "¡Muy bien! " : "No pasa nada, así se aprende. "}</b>{explain}
        </div>
      )}
    </div>
  );
}

/* ============================================================
   PANTALLA DE INICIO
   ============================================================ */
function Home({ go, completed, toPortada }) {
  const acts = [
    {
      id: "llave", emoji: "🔑", color: C.rosa, soft: C.rosaSoft,
      title: "La llave y la cerradura",
      desc: "Descubre qué es la diabetes jugando con la insulina, la glucosa y tus células.",
      tag: "¿Qué es la diabetes?",
    },
    {
      id: "tarjetas", emoji: "🃏", color: C.verde, soft: C.verdeSoft,
      title: "Tarjetas comparativas",
      desc: "Voltea las tarjetas y aprende a diferenciar la diabetes tipo 1, tipo 2 y gestacional.",
      tag: "Tipos de diabetes",
    },
    {
      id: "velocimetro", emoji: "🧭", color: C.terra, soft: C.terraSoft,
      title: "Velocímetro glucémico",
      desc: "Explora las metas de glucosa, resuelve un caso clínico y pon a prueba lo aprendido.",
      tag: "Metas de control",
    },
  ];
  const doneCount = acts.filter((a) => completed[a.id]).length;

  return (
    <div className="fd-pop">
      {/* Encabezado Trabajo 1 */}
      <div style={{ display: "flex", justifyContent: "flex-start", paddingTop: 14 }}>
        <button
          onClick={toPortada}
          className="fd-body"
          style={{ border: `2px solid ${C.line}`, background: "#fff", borderRadius: 999, padding: "8px 16px", fontWeight: 800, fontSize: 14, color: C.ink, cursor: "pointer" }}
        >
          ← Portada
        </button>
      </div>
      <div style={{ textAlign: "center", padding: "10px 12px 8px" }}>
        <div className="fd-body" style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.28em", color: C.sub, textTransform: "uppercase" }}>
          Trabajo 1 · Sesión educativa 1 de 3
        </div>
        <h1 className="fd-display" style={{ fontSize: "clamp(26px, 5vw, 38px)", margin: "10px 0 4px", color: C.ink, letterSpacing: "0.04em", fontWeight: 600 }}>
          GENERALIDADES <em style={{ fontWeight: 500, letterSpacing: 0, color: C.rosa }}>de la</em> DIABETES
        </h1>
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 10 }}>
          {[C.rosa, C.verde, C.menta, C.durazno, C.nude, C.terra].map((c, i) => (
            <div key={i} style={{ width: 14, height: 14, background: c, borderRadius: "47% 53% 55% 45% / 52% 46% 54% 48%" }} />
          ))}
        </div>
      </div>

      {/* Tarjeta de bienvenida */}
      <Card style={{ margin: "18px 0", padding: 24 }}>
        <div style={{ display: "flex", gap: 16, alignItems: "flex-start", flexWrap: "wrap" }}>
          <BrushCircle color={C.menta} size={72} float>🌱</BrushCircle>
          <div style={{ flex: 1, minWidth: 230 }}>
            <h2 className="fd-display" style={{ margin: "2px 0 8px", fontSize: 22, color: C.ink, fontWeight: 700 }}>
              Te damos la bienvenida
            </h2>
            <p className="fd-body" style={{ margin: 0, fontSize: 15.5, lineHeight: 1.65, color: C.ink }}>
              Este programa de educación en diabetes te acompañará a través de actividades
              interactivas. En esta primera sesión abordarás <b>qué es la diabetes</b>, los{" "}
              <b>tipos que existen</b> y las <b>metas de control glucémico</b>: la base para un
              manejo informado y activo de tu salud.
            </p>
            <p className="fd-body" style={{ margin: "10px 0 0", fontSize: 14, color: C.sub }}>
              Completa las 3 actividades a tu ritmo. 💚
            </p>
          </div>
        </div>
        {doneCount > 0 && (
          <div className="fd-body" style={{ marginTop: 14, background: C.verdeSoft, borderRadius: 12, padding: "10px 14px", fontSize: 14, fontWeight: 700, color: C.ink }}>
            {doneCount === 3 ? "🎉 ¡Completaste toda la sesión 1! Excelente trabajo." : `Progreso de la sesión: ${doneCount} de 3 actividades completadas`}
          </div>
        )}
      </Card>

      {/* Paneles de actividades */}
      <div style={{ display: "grid", gap: 14, gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
        {acts.map((a, i) => (
          <button
            key={a.id}
            onClick={() => go(a.id)}
            style={{
              textAlign: "left", background: C.card, border: `1px solid ${C.line}`,
              borderRadius: 22, padding: 20, cursor: "pointer",
              boxShadow: "0 4px 18px rgba(66,61,58,.05)", transition: "transform .15s",
              display: "flex", flexDirection: "column", gap: 12, position: "relative",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-3px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
          >
            {completed[a.id] && (
              <div style={{ position: "absolute", top: 14, right: 14, background: C.verde, color: "#fff", borderRadius: 999, width: 28, height: 28, display: "grid", placeItems: "center", fontSize: 15 }}>✓</div>
            )}
            <BrushCircle color={a.color} size={78}>{a.emoji}</BrushCircle>
            <div>
              <Pill bg={a.soft}>{a.tag}</Pill>
              <h3 className="fd-display" style={{ margin: "10px 0 6px", fontSize: 20, color: C.ink, fontWeight: 700 }}>
                Actividad {i + 1} · {a.title}
              </h3>
              <p className="fd-body" style={{ margin: 0, fontSize: 14.5, lineHeight: 1.55, color: C.sub }}>{a.desc}</p>
            </div>
            <div className="fd-body" style={{ marginTop: "auto", display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
              <span style={{ fontWeight: 800, color: C.ink, fontSize: 14 }}>{completed[a.id] ? "Repasar →" : "Comenzar →"}</span>
            </div>
          </button>
        ))}
      </div>

      <p className="fd-body" style={{ textAlign: "center", fontSize: 12.5, color: C.sub, margin: "22px 8px 8px", lineHeight: 1.6 }}>
        Programa de educación en diabetes · Hecho en un modelo activo por PromptKilla Studio.<br />
        Este contenido no sustituye la consulta médica: tus metas personales las define tu equipo de salud.
      </p>
    </div>
  );
}

/* ============================================================
   ACTIVIDAD 1 · LA LLAVE Y LA CERRADURA (DIAGRAMA)
   ============================================================ */
function Llave({ onBack, onComplete }) {
  const [step, setStep] = useState(0); // 0 intro, 1 diagrama, 2 reto

  const scenarios = {
    normal: {
      name: "Paciente sin diabetes", short: "Sin diabetes", color: C.verde, soft: C.verdeSoft,
      keys: 3, entering: 4, lockOpen: true, pancreasOn: true,
      titulo: "El sistema funciona en equilibrio ⚖️",
      msg: "El páncreas produce suficiente insulina (las llaves 🔑). Cada llave abre la cerradura de la célula y la glucosa entra para dar energía. La glucosa en la sangre se mantiene normal.",
    },
    tipo1: {
      name: "Paciente con diabetes tipo 1", short: "Tipo 1", color: C.rosa, soft: C.rosaSoft,
      keys: 0, entering: 0, lockOpen: false, pancreasOn: false,
      titulo: "Falta la llave: no hay insulina 🚫🔑",
      msg: "El páncreas dejó de producir insulina, así que no hay llaves para abrir la célula. La glucosa no puede entrar y se acumula en la sangre. Por eso el tratamiento incluye insulina (💉).",
    },
    tipo2: {
      name: "Paciente con diabetes tipo 2", short: "Tipo 2", color: C.terra, soft: C.terraSoft,
      keys: 3, entering: 1, lockOpen: false, pancreasOn: true,
      titulo: "La cerradura se resiste 🔒",
      msg: "El páncreas sí produce llaves, pero la cerradura de la célula está 'resistente' y no abre bien. Solo un poco de glucosa entra; el resto se queda en la sangre. La alimentación, el movimiento y los medicamentos ayudan a que la llave vuelva a funcionar.",
    },
  };

  const [scenario, setScenario] = useState("normal");
  const sc = scenarios[scenario];
  // fase de animación automática MUY LENTA con subtítulo por paso:
  // 0 reposo · 1 comes · 2 glucosa en sangre · 3 páncreas suelta insulina · 4 resultado
  const [phase, setPhase] = useState(0);
  const [playing, setPlaying] = useState(false);

  // Subtítulos grandes por escenario y fase
  const subtitulos = {
    normal: [
      "",
      "Paso 1 · Comes alimentos 🍎",
      "Paso 2 · La comida se vuelve GLUCOSA (azúcar) 🟠 y viaja por tu SANGRE 🩸",
      "Paso 3 · El PÁNCREAS 🫀 suelta INSULINA 🔑 (las llaves)",
      "Paso 4 · La llave abre la puerta y la glucosa ENTRA a la célula ⚡ ¡ENERGÍA!",
    ],
    tipo1: [
      "",
      "Paso 1 · Comes alimentos 🍎",
      "Paso 2 · La GLUCOSA 🟠 viaja por tu SANGRE 🩸",
      "Paso 3 · El PÁNCREAS 🫀 está apagado: NO hay llaves 🚫🔑",
      "Paso 4 · Sin llaves, la glucosa NO entra y se queda en la sangre 🟠",
    ],
    tipo2: [
      "",
      "Paso 1 · Comes alimentos 🍎",
      "Paso 2 · La GLUCOSA 🟠 viaja por tu SANGRE 🩸",
      "Paso 3 · El PÁNCREAS 🫀 sí suelta llaves 🔑, pero la puerta se RESISTE 🔒",
      "Paso 4 · La puerta casi no abre: poca glucosa entra, el resto se acumula 🟠",
    ],
  };

  React.useEffect(() => {
    if (!playing) return;
    const timers = [];
    const STEP = 2600; // muy lento para tercera edad
    setPhase(1);
    timers.push(setTimeout(() => setPhase(2), STEP));
    timers.push(setTimeout(() => setPhase(3), STEP * 2));
    timers.push(setTimeout(() => setPhase(4), STEP * 3));
    timers.push(setTimeout(() => setPlaying(false), STEP * 4));
    return () => timers.forEach(clearTimeout);
  }, [playing]);

  const play = () => { setPhase(0); setPlaying(true); };
  const resetScene = (id) => { setScenario(id); setPhase(0); setPlaying(false); };

  // glucosa en sangre (dentro del río rojo, lado izquierdo) y destino dentro de la célula
  const bloodGlucose = [
    { x: 14, y: 42 }, { x: 24, y: 56 }, { x: 18, y: 68 }, { x: 30, y: 48 },
    { x: 22, y: 34 }, { x: 34, y: 62 },
  ];
  const cellGlucose = [
    { x: 74, y: 42 }, { x: 82, y: 56 }, { x: 76, y: 68 }, { x: 86, y: 46 },
    { x: 80, y: 34 }, { x: 70, y: 58 },
  ];

  return (
    <div className="fd-pop">
      <TopBar title="Actividad 1 · La llave y la cerradura" onBack={onBack} done={step + 1} total={3} color={C.rosa} />

      {/* ---------- INTRO ---------- */}
      {step === 0 && (
        <Card>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
            <BrushCircle color={C.rosa} size={90} float>🔑</BrushCircle>
            <div style={{ flex: 1, minWidth: 240 }}>
              <h2 className="fd-display" style={{ margin: "0 0 8px", fontSize: 22, color: C.ink }}>Tu cuerpo funciona con energía</h2>
              <p className="fd-body" style={{ fontSize: 15.5, lineHeight: 1.7, color: C.ink, margin: 0 }}>
                Cuando comes 🍎, los alimentos se convierten en <b>glucosa</b> (el azúcar de la sangre), que es el
                combustible de tus células. Pero la glucosa no entra sola: necesita una <b>llave</b>.
              </p>
              <p className="fd-body" style={{ fontSize: 15.5, lineHeight: 1.7, color: C.ink, margin: "10px 0 0" }}>
                Esa llave es la <b>insulina 🔑</b>, una hormona que fabrica el <b>páncreas 🫀</b>. La insulina abre la{" "}
                <b>cerradura 🔒</b> de cada <b>célula ⚡</b> para que la glucosa pase. Veamos el recorrido completo. 👇
              </p>
            </div>
          </div>

          {/* Mini leyenda de elementos */}
          <div style={{ display: "grid", gap: 8, gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", marginTop: 18 }}>
            {[
              { e: "🍎", n: "Comida", d: "se vuelve glucosa" },
              { e: "🟠", n: "Glucosa", d: "azúcar en la sangre" },
              { e: "🫀", n: "Páncreas", d: "fabrica insulina" },
              { e: "🔑", n: "Insulina", d: "la llave" },
              { e: "🔒", n: "Cerradura", d: "puerta de la célula" },
              { e: "⚡", n: "Célula", d: "usa la energía" },
            ].map((it) => (
              <div key={it.n} className="fd-body" style={{ background: C.bg, border: `1px solid ${C.line}`, borderRadius: 14, padding: "10px 12px", display: "flex", gap: 10, alignItems: "center" }}>
                <span style={{ fontSize: 24 }}>{it.e}</span>
                <span style={{ fontSize: 13, lineHeight: 1.3, color: C.ink }}><b>{it.n}</b><br /><span style={{ color: C.sub }}>{it.d}</span></span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 18, textAlign: "right" }}>
            <BigBtn onClick={() => setStep(1)} bg={C.rosa}>Ver el diagrama →</BigBtn>
          </div>
        </Card>
      )}

      {/* ---------- DIAGRAMA AUTOMÁTICO (grande, lento, rotulado) ---------- */}
      {step === 1 && (
        <Card>
          <p className="fd-body" style={{ fontWeight: 800, fontSize: 18, margin: "0 0 10px", color: C.ink }}>
            1) Elige quién es el paciente. 2) Presiona el botón grande <span style={{ color: C.rosa }}>“Comer 🍎”</span>. Observa el recorrido paso a paso.
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", margin: "12px 0 16px" }}>
            {Object.entries(scenarios).map(([id, s]) => (
              <button
                key={id}
                onClick={() => resetScene(id)}
                className="fd-body"
                style={{
                  border: `3px solid ${scenario === id ? s.color : C.line}`,
                  background: scenario === id ? s.soft : "#fff",
                  borderRadius: 999, padding: "12px 20px", fontWeight: 800, fontSize: 16,
                  color: C.ink, cursor: "pointer",
                }}
              >
                {s.short}
              </button>
            ))}
          </div>

          {/* SUBTÍTULO GRANDE del paso actual */}
          <div
            className="fd-body"
            style={{
              minHeight: 56, display: "flex", alignItems: "center", justifyContent: "center",
              textAlign: "center", background: phase === 0 ? C.bg : sc.soft,
              border: `2px solid ${phase === 0 ? C.line : sc.color}`, borderRadius: 16,
              padding: "12px 16px", marginBottom: 12, fontSize: 18, fontWeight: 800,
              color: C.ink, lineHeight: 1.35, transition: "all .4s",
            }}
          >
            {phase === 0 ? "Presiona “Comer 🍎” para comenzar 👇" : subtitulos[scenario][phase]}
          </div>

          {/* ESCENA DEL DIAGRAMA (más alta) */}
          <div style={{ position: "relative", height: 440, background: "linear-gradient(180deg,#FCF6F3,#F3ECE6)", borderRadius: 20, border: `1px solid ${C.line}`, overflow: "hidden" }}>

            {/* RÍO / TORRENTE SANGUÍNEO (mitad izquierda, bien visible) */}
            <div style={{
              position: "absolute", left: 0, top: 0, width: "52%", height: "100%",
              background: "linear-gradient(180deg, #FBE3E3, #F6CFCF)",
              borderRight: `3px dashed ${C.rosa}`,
            }} />
            <div className="fd-body" style={{ position: "absolute", top: 12, left: 14, fontSize: 15, fontWeight: 900, color: "#B0596A", letterSpacing: ".04em" }}>
              🩸 TORRENTE SANGUÍNEO
              <div style={{ fontSize: 12, fontWeight: 700, color: "#B0596A" }}>(tu sangre)</div>
            </div>

            {/* CÉLULA (lado derecho) con animación de energía al recibir glucosa */}
            <div
              className={phase >= 4 && sc.entering > 0 ? "fd-energy" : ""}
              style={{
                position: "absolute", right: "3%", top: "20%", width: "40%", height: "62%",
                background: phase >= 4 && sc.entering > 0 ? "rgba(223,235,226,.95)" : "rgba(255,255,255,.8)",
                border: `5px solid ${C.verde}`,
                borderRadius: "48% 52% 55% 45% / 52% 46% 54% 48%",
                transition: "background .5s",
              }}
            />
            <div className="fd-body" style={{ position: "absolute", right: "14%", top: "12%", fontSize: 16, fontWeight: 900, color: C.verde }}>⚡ CÉLULA</div>
            {/* Chispas de energía cuando entra glucosa */}
            {phase >= 4 && sc.entering > 0 && (
              <>
                <div className="fd-spark" style={{ position: "absolute", right: "30%", top: "28%", fontSize: 26 }}>⚡</div>
                <div className="fd-spark" style={{ position: "absolute", right: "10%", top: "62%", fontSize: 22, animationDelay: ".3s" }}>✨</div>
                <div className="fd-body fd-pop" style={{ position: "absolute", right: "16%", top: "84%", fontSize: 15, fontWeight: 900, color: C.verde, background: "#fff", borderRadius: 999, padding: "3px 12px", border: `2px solid ${C.verde}` }}>¡ENERGÍA! 💪</div>
              </>
            )}

            {/* CERRADURA en la puerta de la célula (con temblor si resiste) */}
            <div style={{ position: "absolute", right: "41%", top: "50%", transform: "translateY(-50%)", textAlign: "center", zIndex: 3 }}>
              <div
                className={!sc.lockOpen && scenario === "tipo2" && phase >= 3 ? "fd-shake" : ""}
                style={{ fontSize: 44, transition: "all .4s" }}
              >
                {sc.lockOpen && phase >= 4 ? "🔓" : "🔒"}
              </div>
              <div className="fd-body" style={{ fontSize: 13, fontWeight: 900, color: C.ink, background: "#fff", borderRadius: 999, padding: "2px 10px", marginTop: 3, border: `2px solid ${C.line}` }}>CERRADURA</div>
              {!sc.lockOpen && scenario === "tipo2" && phase >= 3 && (
                <div className="fd-body fd-pop" style={{ fontSize: 12, fontWeight: 900, color: C.terra, marginTop: 4, background: "#fff", borderRadius: 999, padding: "2px 8px", border: `2px solid ${C.terra}` }}>¡SE RESISTE! 🔒</div>
              )}
            </div>

            {/* PÁNCREAS (abajo izquierda, grande, late al producir) */}
            <div style={{ position: "absolute", left: "4%", bottom: "8%", textAlign: "center", zIndex: 3 }}>
              <div
                className={sc.pancreasOn && phase >= 3 ? "fd-beat" : ""}
                style={{ fontSize: 54, opacity: sc.pancreasOn ? 1 : 0.35, filter: sc.pancreasOn ? "none" : "grayscale(1)", transition: "all .4s" }}
              >🫀</div>
              <div className="fd-body" style={{ fontSize: 14, fontWeight: 900, color: C.ink, background: "#fff", borderRadius: 999, padding: "2px 12px", border: `2px solid ${C.line}` }}>PÁNCREAS</div>
              <div className="fd-body" style={{ fontSize: 12, fontWeight: 800, color: sc.pancreasOn ? C.verde : C.rosa, marginTop: 3 }}>
                {sc.pancreasOn ? "fabrica insulina 🔑" : "no fabrica insulina 🚫"}
              </div>
            </div>

            {/* COMIDA que entra (fase 1) */}
            <div style={{
              position: "absolute", left: phase >= 1 ? "10%" : "-14%", top: "14%",
              fontSize: 40, transition: "left 2s ease", opacity: phase >= 2 ? 0 : 1, zIndex: 2,
            }}>
              🍎<div className="fd-body" style={{ fontSize: 13, fontWeight: 900, color: C.ink, textAlign: "center" }}>COMIDA</div>
            </div>

            {/* GLUCOSA en sangre (bolitas grandes) */}
            {bloodGlucose.map((p, i) => {
              const goesIn = phase >= 4 && i < sc.entering;
              const pos = goesIn ? cellGlucose[i] : p;
              const visible = phase >= 2;
              return (
                <div key={i} style={{
                  position: "absolute", left: `${pos.x}%`, top: `${pos.y}%`,
                  width: 28, height: 28, borderRadius: "50%",
                  background: goesIn ? C.verde : C.terra,
                  border: "3px solid #fff", boxShadow: "0 2px 6px rgba(0,0,0,.2)",
                  opacity: visible ? 1 : 0, zIndex: 2,
                  transition: "all 2s cubic-bezier(.5,0,.3,1), opacity .6s",
                }} />
              );
            })}
            {/* etiqueta glucosa */}
            {phase >= 2 && (
              <div className="fd-body fd-pop" style={{ position: "absolute", left: "8%", top: "30%", fontSize: 13, fontWeight: 900, color: C.terra, background: "#fff", borderRadius: 999, padding: "2px 10px", border: `2px solid ${C.terra}`, zIndex: 3 }}>🟠 GLUCOSA (azúcar)</div>
            )}

            {/* LLAVES (insulina) saliendo del páncreas hacia la cerradura (fase 3) */}
            {Array.from({ length: sc.keys }).map((_, i) => (
              <div key={i} style={{
                position: "absolute",
                left: phase >= 3 ? `${40 + i * 2}%` : "9%",
                top: phase >= 3 ? `${46 + i * 3}%` : "80%",
                fontSize: 30, transition: "all 2s ease", zIndex: 2,
                opacity: phase >= 2 ? 1 : 0,
              }}>🔑</div>
            ))}
            {sc.keys === 0 && phase >= 3 && (
              <div className="fd-body fd-pop" style={{ position: "absolute", left: "8%", top: "70%", fontSize: 13, fontWeight: 900, color: C.rosa, background: "#fff", borderRadius: 999, padding: "3px 12px", border: `2px solid ${C.rosa}`, zIndex: 3 }}>
                SIN INSULINA 🚫🔑
              </div>
            )}
          </div>

          {/* Controles grandes */}
          <div style={{ display: "flex", gap: 12, marginTop: 16, flexWrap: "wrap", alignItems: "center", justifyContent: "center" }}>
            <button
              onClick={play}
              disabled={playing}
              className="fd-body"
              style={{
                background: playing ? C.line : C.rosa, color: playing ? C.sub : "#fff",
                border: "none", borderRadius: 999, padding: "16px 36px", fontSize: 20, fontWeight: 900,
                cursor: playing ? "default" : "pointer", boxShadow: playing ? "none" : "0 4px 12px rgba(66,61,58,.2)",
              }}
            >
              {playing ? "▶ Reproduciendo…" : "Comer 🍎"}
            </button>
            {phase > 0 && !playing && <BigBtn onClick={() => setPhase(0)} bg="#fff" color={C.ink}>↺ Volver a empezar</BigBtn>}
          </div>

          {/* Explicación del escenario (aparece al terminar) */}
          {phase >= 4 && (
            <div className="fd-body fd-pop" style={{ marginTop: 16, background: sc.soft, borderRadius: 16, padding: "16px 18px", border: `2px solid ${sc.color}` }}>
              <div style={{ fontWeight: 900, fontSize: 17, color: C.ink, marginBottom: 6 }}>{sc.name}: {sc.titulo}</div>
              <div style={{ fontSize: 16, lineHeight: 1.65, color: C.ink }}>{sc.msg}</div>
            </div>
          )}

          <div style={{ marginTop: 18, textAlign: "right" }}>
            <BigBtn onClick={() => setStep(2)} bg={C.ink}>Ya lo entendí, ¡al reto! →</BigBtn>
          </div>
        </Card>
      )}

      {/* ---------- RETO PASO POR PASO ---------- */}
      {step === 2 && <RetoLlave onFinish={() => { onComplete(); onBack(); }} />}
    </div>
  );
}

/* Reto paso por paso: una pregunta a la vez */
function RetoLlave({ onFinish }) {
  const preguntas = [
    {
      q: "En el diagrama, ¿qué representa la llave 🔑?",
      options: ["La glucosa (el azúcar)", "La insulina que fabrica el páncreas", "La célula"],
      correct: 1,
      explain: "La llave es la insulina 🔑. Sin ella (o si la cerradura se resiste), la glucosa no puede entrar a la célula.",
    },
    {
      q: "¿Qué órgano fabrica la insulina (las llaves)?",
      options: ["El hígado", "El páncreas 🫀", "El estómago"],
      correct: 1,
      explain: "El páncreas es la fábrica de llaves del cuerpo. En la diabetes, produce poca insulina o el cuerpo no la aprovecha.",
    },
    {
      q: "En la diabetes tipo 1, ¿qué sucede?",
      options: ["El páncreas deja de producir insulina (no hay llaves)", "Hay demasiadas llaves", "La célula desaparece"],
      correct: 0,
      explain: "En el tipo 1 no hay llaves: por eso la glucosa se queda en la sangre y el tratamiento incluye insulina 💉.",
    },
    {
      q: "En la diabetes tipo 2, ¿qué falla principalmente?",
      options: ["No existe la glucosa", "La cerradura de la célula se resiste a abrir", "El páncreas explota"],
      correct: 1,
      explain: "En el tipo 2 sí hay llaves, pero la cerradura está 'resistente'. Hábitos y medicamentos ayudan a que vuelva a abrir.",
    },
    {
      q: "Cuando la glucosa no entra a la célula, ¿dónde se queda?",
      options: ["Se acumula en la sangre", "Se convierte en insulina", "Sale por la piel"],
      correct: 0,
      explain: "Se acumula en la sangre (hiperglucemia). Eso es, en esencia, lo que ocurre en la diabetes.",
    },
  ];
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState(null);
  const [ok, setOk] = useState(0);
  const q = preguntas[idx];
  const answered = picked !== null;
  const last = idx === preguntas.length - 1;

  return (
    <Card>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <h2 className="fd-display" style={{ margin: 0, fontSize: 22, color: C.ink }}>Reto rápido 🔑</h2>
        <span className="fd-body" style={{ fontSize: 13, fontWeight: 800, color: C.sub }}>Pregunta {idx + 1} de {preguntas.length}</span>
      </div>
      {/* barra de progreso */}
      <div style={{ display: "flex", gap: 5, marginBottom: 18 }}>
        {preguntas.map((_, i) => (
          <div key={i} style={{ height: 6, flex: 1, borderRadius: 999, background: i < idx ? C.verde : i === idx ? C.rosa : C.line, transition: "background .3s" }} />
        ))}
      </div>

      <p className="fd-body" style={{ fontWeight: 800, fontSize: 17, color: C.ink, margin: "0 0 14px" }}>{q.q}</p>
      <div style={{ display: "grid", gap: 10 }}>
        {q.options.map((op, i) => {
          const isCorrect = i === q.correct;
          let bg = "#fff", border = C.line;
          if (answered && isCorrect) { bg = C.verdeSoft; border = C.verde; }
          else if (answered && picked === i && !isCorrect) { bg = C.terraSoft; border = C.terra; }
          return (
            <button
              key={i}
              disabled={answered}
              onClick={() => { setPicked(i); if (i === q.correct) setOk((v) => v + 1); }}
              className="fd-body"
              style={{ textAlign: "left", background: bg, border: `2px solid ${border}`, borderRadius: 14, padding: "13px 16px", fontSize: 15.5, color: C.ink, cursor: answered ? "default" : "pointer", fontWeight: 600, transition: "all .2s" }}
            >
              {answered && isCorrect ? "✅ " : answered && picked === i ? "✖️ " : ""}{op}
            </button>
          );
        })}
      </div>

      {answered && (
        <div className="fd-body fd-pop" style={{ marginTop: 14, background: picked === q.correct ? C.verdeSoft : C.duraznoSoft, borderRadius: 14, padding: "13px 16px", fontSize: 14.5, lineHeight: 1.6, color: C.ink }}>
          <b>{picked === q.correct ? "¡Muy bien! " : "Casi. "}</b>{q.explain}
        </div>
      )}

      {answered && (
        <div style={{ marginTop: 18, textAlign: "right" }}>
          {!last ? (
            <BigBtn onClick={() => { setIdx((i) => i + 1); setPicked(null); }} bg={C.rosa}>Siguiente →</BigBtn>
          ) : (
            <div className="fd-pop" style={{ textAlign: "center", background: C.verdeSoft, borderRadius: 18, padding: 20 }}>
              <div style={{ fontSize: 40 }}>{ok >= 4 ? "🏆" : ok >= 3 ? "🌟" : "💪"}</div>
              <div className="fd-display" style={{ fontSize: 22, color: C.ink, fontWeight: 700, margin: "6px 0" }}>{ok} de {preguntas.length} aciertos</div>
              <p className="fd-body" style={{ margin: "0 0 14px", fontSize: 15, color: C.ink }}>
                {ok >= 4 ? "¡Dominaste cómo funciona la insulina! 💚" : ok >= 3 ? "¡Buen trabajo! Puedes repasar el diagrama cuando quieras." : "Vuelve a ver el diagrama y reintenta: cada vez lo entiendes mejor."}
              </p>
              <BigBtn onClick={onFinish} bg={C.verde}>Terminar actividad ✓</BigBtn>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}


/* ============================================================
   ACTIVIDAD 2 · TARJETAS COMPARATIVAS
   ============================================================ */
function Tarjetas({ onBack, onComplete }) {
  const [step, setStep] = useState(0); // 0 explorar, 1 reto
  const [flipped, setFlipped] = useState({});
  const [answers, setAnswers] = useState({});

  const tipos = [
    {
      id: "t1", nombre: "Tipo 1", color: C.rosa, soft: C.rosaSoft, emoji: "1️⃣",
      cards: [
        { cat: "¿Qué pasa en el cuerpo?", txt: "El sistema de defensa ataca al páncreas y este deja de producir insulina. No hay llaves 🔑." },
        { cat: "¿A quién suele darle?", txt: "Con más frecuencia a niños, adolescentes y jóvenes, aunque puede aparecer a cualquier edad." },
        { cat: "Tratamiento", txt: "Insulina siempre 💉, junto con alimentación saludable, actividad física y monitoreo." },
        { cat: "Dato clave", txt: "No se causa por comer azúcar ni por el estilo de vida. Nadie tiene la culpa." },
      ],
    },
    {
      id: "t2", nombre: "Tipo 2", color: C.verde, soft: C.verdeSoft, emoji: "2️⃣",
      cards: [
        { cat: "¿Qué pasa en el cuerpo?", txt: "Las células se resisten a la insulina (cerradura oxidada 🔒) y con el tiempo el páncreas se agota." },
        { cat: "¿A quién suele darle?", txt: "Es el tipo más común (9 de cada 10 casos). Influyen la herencia familiar, el peso y el estilo de vida." },
        { cat: "Tratamiento", txt: "Alimentación, movimiento 🏃, pastillas y, en algunos casos, insulina. ¡Los hábitos son medicina!" },
        { cat: "Dato clave", txt: "Puede pasar años sin síntomas. Por eso el chequeo y el automonitoreo son tan importantes." },
      ],
    },
    {
      id: "g", nombre: "Gestacional", color: C.terra, soft: C.terraSoft, emoji: "🤰",
      cards: [
        { cat: "¿Qué pasa en el cuerpo?", txt: "Las hormonas del embarazo hacen que la insulina funcione menos y la glucosa sube." },
        { cat: "¿A quién suele darle?", txt: "A algunas mujeres durante el embarazo, generalmente detectada entre las semanas 24 y 28." },
        { cat: "Tratamiento", txt: "Plan de alimentación, actividad física y, si hace falta, insulina. Cuida a mamá y a bebé 💕." },
        { cat: "Dato clave", txt: "Suele desaparecer después del parto, pero aumenta el riesgo de diabetes tipo 2 en el futuro." },
      ],
    },
  ];

  const reto = [
    { txt: "Aparece con más frecuencia en la infancia o la juventud", ans: "t1" },
    { txt: "Es el tipo más común y se relaciona con herencia y estilo de vida", ans: "t2" },
    { txt: "Aparece durante el embarazo y suele desaparecer después del parto", ans: "g" },
    { txt: "El páncreas deja de producir insulina casi por completo", ans: "t1" },
    { txt: "El cuerpo sí produce insulina, pero las células se resisten a ella", ans: "t2" },
    { txt: "Aumenta el riesgo de desarrollar diabetes tipo 2 más adelante", ans: "g" },
  ];
  const answeredCount = Object.keys(answers).length;
  const okCount = reto.filter((r, i) => answers[i] === r.ans).length;

  return (
    <div className="fd-pop">
      <TopBar title="Actividad 2 · Tarjetas comparativas" onBack={onBack} done={step + 1} total={2} color={C.verde} />

      {step === 0 && (
        <>
          <Card style={{ marginBottom: 14 }}>
            <p className="fd-body" style={{ margin: 0, fontSize: 15.5, lineHeight: 1.65, color: C.ink }}>
              No existe una sola diabetes: existen <b>varios tipos</b> y cada uno tiene su propia historia.
              <b> Toca cada tarjeta para voltearla</b> 👆 y descubre en qué se parecen y en qué se diferencian.
              Identificar <b>tu tipo de diabetes</b> es el primer paso para cuidarte mejor.
            </p>
          </Card>

          {tipos.map((t) => (
            <div key={t.id} style={{ marginBottom: 18 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "0 4px 10px" }}>
                <BrushCircle color={t.color} size={44}>{t.emoji}</BrushCircle>
                <h3 className="fd-display" style={{ margin: 0, fontSize: 20, color: C.ink }}>Diabetes {t.nombre}</h3>
              </div>
              <div style={{ display: "grid", gap: 10, gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))" }}>
                {t.cards.map((cardData, ci) => {
                  const key = t.id + ci;
                  const isFlip = !!flipped[key];
                  return (
                    <button
                      key={key}
                      onClick={() => setFlipped((f) => ({ ...f, [key]: !f[key] }))}
                      style={{ perspective: 900, background: "none", border: "none", padding: 0, cursor: "pointer", minHeight: 150 }}
                      aria-pressed={isFlip}
                    >
                      <div style={{
                        position: "relative", width: "100%", height: "100%", minHeight: 150,
                        transformStyle: "preserve-3d", transition: "transform .5s",
                        transform: isFlip ? "rotateY(180deg)" : "none",
                      }}>
                        <div style={{
                          position: "absolute", inset: 0, backfaceVisibility: "hidden",
                          background: t.soft, border: `2px solid ${t.color}`, borderRadius: 16,
                          display: "grid", placeItems: "center", padding: 12,
                        }}>
                          <div>
                            <div style={{ fontSize: 26, marginBottom: 6 }}>❔</div>
                            <div className="fd-body" style={{ fontWeight: 800, fontSize: 14, color: C.ink }}>{cardData.cat}</div>
                            <div className="fd-body" style={{ fontSize: 12, color: C.sub, marginTop: 4 }}>toca para voltear</div>
                          </div>
                        </div>
                        <div style={{
                          position: "absolute", inset: 0, backfaceVisibility: "hidden", transform: "rotateY(180deg)",
                          background: "#fff", border: `2px solid ${t.color}`, borderRadius: 16,
                          display: "grid", placeItems: "center", padding: 14,
                        }}>
                          <p className="fd-body" style={{ margin: 0, fontSize: 13.5, lineHeight: 1.5, color: C.ink, textAlign: "left" }}>{cardData.txt}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          <div style={{ textAlign: "right", marginTop: 6 }}>
            <BigBtn onClick={() => setStep(1)} bg={C.verde}>Ir al mini reto →</BigBtn>
          </div>
        </>
      )}

      {step === 1 && (
        <Card>
          <h2 className="fd-display" style={{ margin: "0 0 6px", fontSize: 22, color: C.ink }}>Mini reto: ¿de qué tipo hablamos? 🃏</h2>
          <p className="fd-body" style={{ margin: "0 0 16px", fontSize: 14.5, color: C.sub }}>Lee cada pista y elige el tipo de diabetes que corresponde.</p>
          <div style={{ display: "grid", gap: 14 }}>
            {reto.map((r, i) => {
              const picked = answers[i];
              return (
                <div key={i} style={{ border: `1px solid ${C.line}`, borderRadius: 16, padding: 14 }}>
                  <p className="fd-body" style={{ margin: "0 0 10px", fontWeight: 700, fontSize: 15, color: C.ink }}>{i + 1}. {r.txt}</p>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {tipos.map((t) => {
                      const isPick = picked === t.id;
                      const isRight = r.ans === t.id;
                      let bg = "#fff", bd = C.line;
                      if (picked) {
                        if (isRight) { bg = C.verdeSoft; bd = C.verde; }
                        else if (isPick) { bg = C.terraSoft; bd = C.terra; }
                      }
                      return (
                        <button
                          key={t.id}
                          disabled={!!picked}
                          onClick={() => setAnswers((a) => ({ ...a, [i]: t.id }))}
                          className="fd-body"
                          style={{ border: `2px solid ${bd}`, background: bg, borderRadius: 999, padding: "8px 14px", fontWeight: 800, fontSize: 13.5, color: C.ink, cursor: picked ? "default" : "pointer" }}
                        >
                          {picked && isRight ? "✅ " : ""}{t.nombre}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: 18, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
            <span className="fd-body" style={{ color: C.sub, fontWeight: 700, fontSize: 14 }}>
              {answeredCount === reto.length ? `Resultado: ${okCount} / ${reto.length} 🎯` : `Respondidas: ${answeredCount} / ${reto.length}`}
            </span>
            <BigBtn disabled={answeredCount < reto.length} onClick={() => { onComplete(); onBack(); }} bg={C.verde}>
              Terminar actividad ✓
            </BigBtn>
          </div>
        </Card>
      )}
    </div>
  );
}

/* ============================================================
   ACTIVIDAD 3 · VELOCÍMETRO GLUCÉMICO + CASO + EVALUACIÓN
   ============================================================ */
function Velocimetro({ onBack, onComplete }) {
  const [step, setStep] = useState(0); // 0 velocímetro, 1 caso, 2 evaluación
  const metrics = {
    ayuno: {
      label: "Glucosa en ayuno", unit: "mg/dL", min: 40, max: 300, start: 100,
      zones: [
        { to: 70, label: "Baja (hipoglucemia)", color: C.rosa, msg: "⚠️ Por debajo de 70 mg/dL es hipoglucemia: requiere actuar rápido según lo indicado por tu equipo de salud." },
        { to: 130, label: "En meta", color: C.verde, msg: "💚 ¡En meta! La meta general en ayuno es de 80 a 130 mg/dL." },
        { to: 180, label: "Precaución", color: C.durazno, msg: "🟠 Por arriba de la meta. Vale la pena revisar alimentación, medicamento y comentarlo en consulta." },
        { to: 300, label: "Alta", color: C.terra, msg: "🔴 Glucosa alta. El automonitoreo te ayuda a detectarlo a tiempo y ajustar el plan con tu médico." },
      ],
    },
    post: {
      label: "Glucosa posprandial (2 h después de comer)", unit: "mg/dL", min: 40, max: 350, start: 140,
      zones: [
        { to: 70, label: "Baja (hipoglucemia)", color: C.rosa, msg: "⚠️ Menos de 70 mg/dL es hipoglucemia, incluso después de comer." },
        { to: 180, label: "En meta", color: C.verde, msg: "💚 ¡En meta! La meta general 2 horas después de comer es menos de 180 mg/dL." },
        { to: 250, label: "Precaución", color: C.durazno, msg: "🟠 Por arriba de la meta posprandial. Observa qué comiste: las porciones y el tipo de alimento influyen mucho." },
        { to: 350, label: "Alta", color: C.terra, msg: "🔴 Muy por arriba de la meta. Regístralo y coméntalo con tu equipo de salud." },
      ],
    },
    hba1c: {
      label: "Hemoglobina glucosilada (HbA1c)", unit: "%", min: 4, max: 14, start: 6.5, stepSize: 0.1,
      zones: [
        { to: 7, label: "En meta", color: C.verde, msg: "💚 ¡En meta! La meta general de HbA1c es menos de 7%. Refleja tu promedio de glucosa de los últimos 3 meses." },
        { to: 8, label: "Precaución", color: C.durazno, msg: "🟠 Ligeramente arriba de la meta general. Pequeños cambios sostenidos hacen gran diferencia." },
        { to: 14, label: "Alta", color: C.terra, msg: "🔴 Por arriba de la meta: es momento de revisar el plan de tratamiento junto con tu médico." },
      ],
    },
  };
  const [metric, setMetric] = useState("ayuno");
  const [values, setValues] = useState({ ayuno: 100, post: 140, hba1c: 6.5 });
  const m = metrics[metric];
  const v = values[metric];
  const zone = m.zones.find((z) => v < z.to) || m.zones[m.zones.length - 1];

  // geometría del gauge
  const W = 320, H = 190, cx = W / 2, cy = 165, R = 130, r2 = 96;
  const pt = (t, rad) => ({ x: cx + rad * Math.cos(Math.PI * (1 - t)), y: cy - rad * Math.sin(Math.PI * (1 - t)) });
  const frac = (val) => (val - m.min) / (m.max - m.min);
  const arc = (t0, t1, color) => {
    const a = pt(t0, R), b = pt(t1, R), c2 = pt(t1, r2), d = pt(t0, r2);
    return (
      <path
        key={t0}
        d={`M ${a.x} ${a.y} A ${R} ${R} 0 0 1 ${b.x} ${b.y} L ${c2.x} ${c2.y} A ${r2} ${r2} 0 0 0 ${d.x} ${d.y} Z`}
        fill={color}
      />
    );
  };
  let prev = 0;
  const zoneArcs = m.zones.map((z) => { const t1 = frac(z.to); const el = arc(prev, Math.min(t1, 1), z.color); prev = t1; return el; });
  const needle = pt(Math.max(0, Math.min(1, frac(v))), r2 - 12);

  const [caseOk, setCaseOk] = useState(0);
  const [evalOk, setEvalOk] = useState(0);
  const [evalAnswered, setEvalAnswered] = useState(0);

  return (
    <div className="fd-pop">
      <TopBar title="Actividad 3 · Velocímetro glucémico" onBack={onBack} done={step + 1} total={3} color={C.terra} />

      {step === 0 && (
        <Card>
          <p className="fd-body" style={{ margin: "0 0 14px", fontSize: 15.5, lineHeight: 1.65, color: C.ink }}>
            Conocer tus <b>metas de control</b> es como conocer los límites de velocidad del camino 🚗.
            Elige una medición y <b>mueve el control deslizante</b> para descubrir en qué zona cae cada valor.
          </p>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
            {Object.entries(metrics).map(([id, mm]) => (
              <button
                key={id}
                onClick={() => setMetric(id)}
                className="fd-body"
                style={{
                  border: `2px solid ${metric === id ? C.terra : C.line}`,
                  background: metric === id ? C.terraSoft : "#fff",
                  borderRadius: 999, padding: "9px 14px", fontWeight: 800, fontSize: 13, color: C.ink, cursor: "pointer",
                }}
              >
                {id === "ayuno" ? "🌅 Ayuno" : id === "post" ? "🍽️ Después de comer" : "🩸 HbA1c"}
              </button>
            ))}
          </div>

          <div style={{ textAlign: "center" }}>
            <div className="fd-body" style={{ fontWeight: 800, fontSize: 15, color: C.ink, marginBottom: 4 }}>{m.label}</div>
            <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", maxWidth: 380 }} role="img" aria-label={`Velocímetro: ${v} ${m.unit}, zona ${zone.label}`}>
              {zoneArcs}
              <line x1={cx} y1={cy} x2={needle.x} y2={needle.y} stroke={C.ink} strokeWidth="6" strokeLinecap="round" style={{ transition: "all .3s" }} />
              <circle cx={cx} cy={cy} r="12" fill={C.ink} />
              <text x={cx} y={cy - 34} textAnchor="middle" className="fd-display" style={{ fontSize: 30, fontWeight: 700, fill: C.ink }}>
                {metric === "hba1c" ? v.toFixed(1) : v}
              </text>
              <text x={cx} y={cy - 14} textAnchor="middle" className="fd-body" style={{ fontSize: 13, fontWeight: 700, fill: C.sub }}>{m.unit}</text>
            </svg>
            <input
              type="range" className="fd-range"
              min={m.min} max={m.max} step={m.stepSize || 1} value={v}
              onChange={(e) => setValues((s) => ({ ...s, [metric]: parseFloat(e.target.value) }))}
              style={{ background: `linear-gradient(90deg, ${m.zones.map((z) => z.color).join(",")})`, marginTop: 4 }}
              aria-label={m.label}
            />
          </div>

          <div className="fd-body fd-pop" key={zone.label + metric} style={{ marginTop: 14, borderRadius: 16, padding: "13px 16px", fontSize: 15, lineHeight: 1.6, color: C.ink, background: zone.color + "33", border: `2px solid ${zone.color}` }}>
            <b>Zona: {zone.label}.</b> {zone.msg}
          </div>

          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 12 }}>
            {m.zones.map((z) => (
              <span key={z.label} className="fd-body" style={{ fontSize: 12, fontWeight: 700, color: C.ink, background: z.color + "44", borderRadius: 999, padding: "4px 10px" }}>
                ● {z.label}
              </span>
            ))}
          </div>

          <p className="fd-body" style={{ fontSize: 12.5, color: C.sub, margin: "12px 0 0", lineHeight: 1.5 }}>
            * Metas generales para adultos (ADA). Tu médico puede definir metas personalizadas para ti.
          </p>

          <div style={{ marginTop: 16, textAlign: "right" }}>
            <BigBtn onClick={() => setStep(1)} bg={C.terra}>Ir al caso clínico →</BigBtn>
          </div>
        </Card>
      )}

      {step === 1 && (
        <Card>
          <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 14 }}>
            <BrushCircle color={C.durazno} size={64}>👩</BrushCircle>
            <h2 className="fd-display" style={{ margin: 0, fontSize: 22, color: C.ink }}>Caso clínico: María</h2>
          </div>
          <p className="fd-body" style={{ fontSize: 15.5, lineHeight: 1.7, color: C.ink, background: C.nude, borderRadius: 16, padding: "14px 16px", margin: "0 0 20px" }}>
            María tiene 52 años y vive con <b>diabetes tipo 2</b>. Hoy comenzó su automonitoreo:
            en ayuno su glucómetro marcó <b>180 mg/dL</b>. Dos horas después del desayuno se midió otra vez:
            <b> 165 mg/dL</b>. En su último laboratorio, su <b>HbA1c salió en 8.5%</b>. Ayúdala a interpretar sus números. 💪
          </p>
          <div style={{ display: "grid", gap: 22 }}>
            <Quiz
              q="1. Su glucosa en ayuno fue de 180 mg/dL. ¿Cómo está ese valor?"
              options={["Dentro de la meta (80–130 mg/dL)", "Por arriba de la meta", "Es hipoglucemia"]}
              correct={1}
              explain="La meta general en ayuno es 80–130 mg/dL, así que 180 está por arriba. Detectarlo es justo el poder del automonitoreo."
              onAnswered={(ok) => ok && setCaseOk((x) => x + 1)}
            />
            <Quiz
              q="2. Dos horas después de desayunar marcó 165 mg/dL. ¿Ese valor…?"
              options={["Está fuera de la meta posprandial", "Está dentro de la meta posprandial (menos de 180 mg/dL)", "Es un error del glucómetro"]}
              correct={1}
              explain="La meta general posprandial es menos de 180 mg/dL a las 2 horas, así que 165 sí está en meta. 🎉"
              onAnswered={(ok) => ok && setCaseOk((x) => x + 1)}
            />
            <Quiz
              q="3. Su HbA1c fue de 8.5%. ¿Qué significa este estudio?"
              options={["Su glucosa de ese momento exacto", "El promedio de su glucosa de los últimos 3 meses, y está arriba de la meta (<7%)", "Su nivel de insulina en sangre"]}
              correct={1}
              explain="La HbA1c es como la 'película' de 3 meses (el glucómetro es la 'foto' del momento). 8.5% indica que el plan de María necesita ajustes con su médico."
              onAnswered={(ok) => ok && setCaseOk((x) => x + 1)}
            />
          </div>
          <div style={{ marginTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
            <span className="fd-body" style={{ color: C.sub, fontWeight: 700, fontSize: 14 }}>Aciertos: {caseOk} / 3</span>
            <BigBtn onClick={() => setStep(2)} bg={C.terra}>Ir a la mini evaluación →</BigBtn>
          </div>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <h2 className="fd-display" style={{ margin: "0 0 6px", fontSize: 22, color: C.ink }}>Mini evaluación de la sesión 📝</h2>
          <p className="fd-body" style={{ margin: "0 0 18px", fontSize: 14.5, color: C.sub }}>5 preguntas para cerrar con broche de oro. ¡Tú puedes!</p>
          <div style={{ display: "grid", gap: 22 }}>
            {[
              { q: "1. ¿Qué es la insulina?", o: ["El azúcar de la sangre", "La llave que permite que la glucosa entre a las células", "Una vitamina"], c: 1, e: "La insulina es la hormona-llave que fabrica el páncreas." },
              { q: "2. En la diabetes tipo 1…", o: ["El páncreas deja de producir insulina", "Sobra insulina en el cuerpo", "Solo aparece en el embarazo"], c: 0, e: "En tipo 1 no hay llaves: por eso la insulina es parte del tratamiento siempre." },
              { q: "3. En la diabetes tipo 2…", o: ["No existe la insulina", "Las células se resisten a la insulina y/o el páncreas no produce suficiente", "Se cura con solo dejar el azúcar"], c: 1, e: "Es la 'cerradura oxidada': hábitos y medicamentos ayudan a que la insulina vuelva a funcionar mejor." },
              { q: "4. La meta general de glucosa en ayuno es…", o: ["80 a 130 mg/dL", "200 a 250 mg/dL", "Menos de 50 mg/dL"], c: 0, e: "80–130 mg/dL en ayuno es la meta general para la mayoría de los adultos." },
              { q: "5. Una HbA1c en meta general es…", o: ["Menor a 7%", "Mayor a 10%", "Exactamente 8%"], c: 0, e: "Menos de 7% es la meta general: refleja tu promedio de los últimos 3 meses." },
            ].map((item, i) => (
              <Quiz key={i} q={item.q} options={item.o} correct={item.c} explain={item.e}
                onAnswered={(ok) => { setEvalAnswered((x) => x + 1); ok && setEvalOk((x) => x + 1); }} />
            ))}
          </div>

          {evalAnswered >= 5 && (
            <div className="fd-pop" style={{ marginTop: 20, textAlign: "center", background: C.verdeSoft, borderRadius: 18, padding: 20 }}>
              <div style={{ fontSize: 40 }}>{evalOk >= 4 ? "🏆" : evalOk >= 3 ? "🌟" : "💪"}</div>
              <div className="fd-display" style={{ fontSize: 22, color: C.ink, fontWeight: 700, margin: "6px 0" }}>
                {evalOk} de 5 aciertos
              </div>
              <p className="fd-body" style={{ margin: 0, fontSize: 15, color: C.ink }}>
                {evalOk >= 4
                  ? "¡Excelente! Dominaste las generalidades de la diabetes. Nos vemos en la sesión 2. 💚"
                  : evalOk >= 3
                  ? "¡Muy buen trabajo! Puedes repasar las actividades cuando quieras para reforzar."
                  : "Lo importante es que estás aprendiendo. Repite las actividades: cada intento te hace más experto en tu salud."}
              </p>
            </div>
          )}

          <div style={{ marginTop: 18, textAlign: "right" }}>
            <BigBtn disabled={evalAnswered < 5} onClick={() => { onComplete(); onBack(); }} bg={C.verde}>
              Terminar sesión ✓
            </BigBtn>
          </div>
        </Card>
      )}
    </div>
  );
}

/* ============================================================
   PORTADA GENERAL
   ============================================================ */
function Portada({ go, done1, done2 }) {
  const p1 = Object.values(done1).filter(Boolean).length;
  const p2 = Object.values(done2).filter(Boolean).length;
  const trabajos = [
    {
      id: "home1", num: "Trabajo 1", title: "Generalidades de la diabetes",
      desc: "Qué es la diabetes, la función del páncreas y la insulina, los tipos que existen y las metas de control glucémico.",
      emoji: "📘", color: C.verde, soft: C.verdeSoft, prog: p1, total: 3,
      temas: ["La llave y la cerradura", "Tarjetas comparativas", "Velocímetro glucémico"],
    },
    {
      id: "home2", num: "Trabajo 2", title: "Resolver problemas",
      desc: "Hipoglucemia e hiperglucemia: cómo reconocerlas y actuar a tiempo, cuidados en días de enfermedad y evaluación final.",
      emoji: "🧩", color: C.terra, soft: C.terraSoft, prog: p2, total: 4,
      temas: ["Regla del 15-15", "Semáforo de decisiones", "Días de enfermedad", "Evaluación sumativa"],
    },
  ];
  return (
    <div className="fd-pop">
      <div style={{ textAlign: "center", padding: "30px 12px 10px" }}>
        <div className="fd-body" style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.28em", color: C.sub, textTransform: "uppercase" }}>
          Programa de educación en diabetes
        </div>
        <h1 className="fd-display" style={{ fontSize: "clamp(30px, 6vw, 46px)", margin: "10px 0 4px", color: C.ink, letterSpacing: "0.06em", fontWeight: 600 }}>
          CONOCE <em style={{ fontWeight: 500, letterSpacing: 0, color: C.rosa }}>tu</em> DIABETES
        </h1>
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 10 }}>
          {[C.rosa, C.verde, C.menta, C.durazno, C.nude, C.terra].map((c, i) => (
            <div key={i} style={{ width: 14, height: 14, background: c, borderRadius: "47% 53% 55% 45% / 52% 46% 54% 48%" }} />
          ))}
        </div>
        <p className="fd-body" style={{ maxWidth: 560, margin: "16px auto 0", fontSize: 15.5, lineHeight: 1.65, color: C.ink }}>
          Un espacio interactivo para aprender, practicar y tomar decisiones informadas sobre tu salud.
          Selecciona un módulo para comenzar.
        </p>
      </div>

      <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))", marginTop: 12 }}>
        {trabajos.map((t) => (
          <button
            key={t.id}
            onClick={() => go(t.id)}
            style={{
              textAlign: "left", background: C.card, border: `1px solid ${C.line}`, borderRadius: 24,
              padding: 24, cursor: "pointer", boxShadow: "0 4px 18px rgba(66,61,58,.05)",
              display: "flex", flexDirection: "column", gap: 12, transition: "transform .15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-3px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <BrushCircle color={t.color} size={78} float>{t.emoji}</BrushCircle>
              <div>
                <Pill bg={t.soft}>{t.num}</Pill>
                <h2 className="fd-display" style={{ margin: "8px 0 0", fontSize: 24, color: C.ink, fontWeight: 700 }}>{t.title}</h2>
              </div>
            </div>
            <p className="fd-body" style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: C.sub }}>{t.desc}</p>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {t.temas.map((tm) => (
                <span key={tm} className="fd-body" style={{ fontSize: 12, fontWeight: 700, color: C.ink, background: C.bg, border: `1px solid ${C.line}`, borderRadius: 999, padding: "4px 10px" }}>{tm}</span>
              ))}
            </div>
            <div className="fd-body" style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 13, color: t.prog === t.total ? C.verde : C.sub, fontWeight: 800 }}>
                {t.prog === t.total ? "✓ Completado" : `${t.prog} / ${t.total} actividades`}
              </span>
              <span style={{ fontWeight: 800, color: C.ink, fontSize: 14 }}>Entrar →</span>
            </div>
          </button>
        ))}
      </div>

      <p className="fd-body" style={{ textAlign: "center", fontSize: 12.5, color: C.sub, margin: "26px 8px 8px", lineHeight: 1.6 }}>
        Programa de educación en diabetes · Hecho en un modelo activo por PromptKilla Studio.<br />
        Este contenido no sustituye la consulta médica: tus metas y tu plan personal los define tu equipo de salud.
      </p>
    </div>
  );
}

/* ============================================================
   TRABAJO 2 · INICIO
   ============================================================ */
function Home2({ go, completed, toPortada }) {
  const acts = [
    {
      id: "hipo", emoji: "🍬", color: C.rosa, soft: C.rosaSoft, tag: "Hipoglucemia",
      title: "La Regla del 15-15",
      desc: "Reconoce la glucosa baja, practica el algoritmo del 15-15 y aprende a diferenciar hipoglucemia de hiperglucemia.",
    },
    {
      id: "hiper", emoji: "🚦", color: C.terra, soft: C.terraSoft, tag: "Hiperglucemia",
      title: "Semáforo de decisiones",
      desc: "Identifica la glucosa alta, sus causas y señales de alarma, y decide qué hacer con el semáforo de decisiones.",
    },
    {
      id: "dias", emoji: "🤒", color: C.verde, soft: C.verdeSoft, tag: "Días de enfermedad",
      title: "¿Qué hacer en días de enfermedad?",
      desc: "Cuidados cuando te enfermas: hidratación, monitoreo, tratamiento y cuándo acudir a urgencias. Incluye el juego \u201c¿Qué harías si...?\u201d",
    },
    {
      id: "evalsum", emoji: "📝", color: C.durazno, soft: C.duraznoSoft, tag: "Cierre",
      title: "Evaluación sumativa",
      desc: "Cuestionario virtual para demostrar todo lo que aprendiste en esta sesión.",
    },
  ];
  const doneCount = acts.filter((a) => completed[a.id]).length;
  return (
    <div className="fd-pop">
      <div style={{ display: "flex", justifyContent: "flex-start", paddingTop: 14 }}>
        <button
          onClick={toPortada}
          className="fd-body"
          style={{ border: `2px solid ${C.line}`, background: "#fff", borderRadius: 999, padding: "8px 16px", fontWeight: 800, fontSize: 14, color: C.ink, cursor: "pointer" }}
        >
          ← Portada
        </button>
      </div>
      <div style={{ textAlign: "center", padding: "10px 12px 8px" }}>
        <div className="fd-body" style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.28em", color: C.sub, textTransform: "uppercase" }}>
          Trabajo 2 · Sesión educativa 3 de 3
        </div>
        <h1 className="fd-display" style={{ fontSize: "clamp(26px, 5vw, 38px)", margin: "10px 0 4px", color: C.ink, letterSpacing: "0.04em", fontWeight: 600 }}>
          RESOLVER <em style={{ fontWeight: 500, letterSpacing: 0, color: C.terra }}>problemas</em>
        </h1>
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 10 }}>
          {[C.rosa, C.verde, C.menta, C.durazno, C.nude, C.terra].map((c, i) => (
            <div key={i} style={{ width: 14, height: 14, background: c, borderRadius: "47% 53% 55% 45% / 52% 46% 54% 48%" }} />
          ))}
        </div>
      </div>

      <Card style={{ margin: "18px 0", padding: 24 }}>
        <div style={{ display: "flex", gap: 16, alignItems: "flex-start", flexWrap: "wrap" }}>
          <BrushCircle color={C.durazno} size={72} float>🧭</BrushCircle>
          <div style={{ flex: 1, minWidth: 230 }}>
            <h2 className="fd-display" style={{ margin: "2px 0 8px", fontSize: 22, color: C.ink, fontWeight: 700 }}>
              Aprende a actuar a tiempo
            </h2>
            <p className="fd-body" style={{ margin: 0, fontSize: 15.5, lineHeight: 1.65, color: C.ink }}>
              En esta sesión desarrollarás habilidades para <b>resolver problemas</b>: identificar los signos de la{" "}
              <b>hipoglucemia</b> y la <b>hiperglucemia</b>, aplicar las medidas iniciales para manejarlas,
              cuidarte durante los <b>días de enfermedad</b> y reconocer los <b>signos de alarma</b> que requieren
              atención médica inmediata.
            </p>
            <p className="fd-body" style={{ margin: "10px 0 0", fontSize: 14, color: C.sub }}>
              Completa las 4 actividades a tu ritmo. 💚
            </p>
          </div>
        </div>
        {doneCount > 0 && (
          <div className="fd-body" style={{ marginTop: 14, background: C.verdeSoft, borderRadius: 12, padding: "10px 14px", fontSize: 14, fontWeight: 700, color: C.ink }}>
            {doneCount === 4 ? "🎉 ¡Completaste toda la sesión! Excelente trabajo." : `Progreso de la sesión: ${doneCount} de 4 actividades completadas`}
          </div>
        )}
      </Card>

      <div style={{ display: "grid", gap: 14, gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
        {acts.map((a, i) => (
          <button
            key={a.id}
            onClick={() => go(a.id)}
            style={{
              textAlign: "left", background: C.card, border: `1px solid ${C.line}`,
              borderRadius: 22, padding: 20, cursor: "pointer",
              boxShadow: "0 4px 18px rgba(66,61,58,.05)", transition: "transform .15s",
              display: "flex", flexDirection: "column", gap: 12, position: "relative",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-3px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
          >
            {completed[a.id] && (
              <div style={{ position: "absolute", top: 14, right: 14, background: C.verde, color: "#fff", borderRadius: 999, width: 28, height: 28, display: "grid", placeItems: "center", fontSize: 15 }}>✓</div>
            )}
            <BrushCircle color={a.color} size={78}>{a.emoji}</BrushCircle>
            <div>
              <Pill bg={a.soft}>{a.tag}</Pill>
              <h3 className="fd-display" style={{ margin: "10px 0 6px", fontSize: 20, color: C.ink, fontWeight: 700 }}>
                Actividad {i + 1} · {a.title}
              </h3>
              <p className="fd-body" style={{ margin: 0, fontSize: 14.5, lineHeight: 1.55, color: C.sub }}>{a.desc}</p>
            </div>
            <div className="fd-body" style={{ marginTop: "auto", display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
              <span style={{ fontWeight: 800, color: C.ink, fontSize: 14 }}>{completed[a.id] ? "Repasar →" : "Comenzar →"}</span>
            </div>
          </button>
        ))}
      </div>

      <p className="fd-body" style={{ textAlign: "center", fontSize: 12.5, color: C.sub, margin: "22px 8px 8px", lineHeight: 1.6 }}>
        Programa de educación en diabetes · Hecho en un modelo activo por PromptKilla Studio.<br />
        Este contenido no sustituye la consulta médica: ante una urgencia, contacta a tu equipo de salud o acude a emergencias.
      </p>
    </div>
  );
}

/* ============================================================
   T2 · ACTIVIDAD 1 · HIPOGLUCEMIA (REGLA DEL 15-15)
   ============================================================ */
function Hipo({ onBack, onComplete }) {
  const [step, setStep] = useState(0); // 0 intro, 1 regla 15-15, 2 tarjetas hipo/hiper

  // --- Simulador Regla 15-15 ---
  const readings = [62, 68, 94];
  const [attempt, setAttempt] = useState(0);
  const [phase, setPhase] = useState("measure"); // measure -> eat -> wait -> (repeat) -> success
  const [feedback, setFeedback] = useState(null);
  const glucose = readings[Math.min(attempt, readings.length - 1)];

  const carbs = [
    { txt: "½ vaso de jugo de fruta 🧃", ok: true },
    { txt: "Una barra de chocolate 🍫", ok: false, why: "El chocolate tiene grasa, y la grasa hace que el azúcar suba muy lento. En hipoglucemia necesitas azúcar rápida." },
    { txt: "3–4 tabletas de glucosa 💊", ok: true },
    { txt: "Refresco light 🥤", ok: false, why: "Los productos light no tienen azúcar: no subirán tu glucosa." },
    { txt: "1 cucharada de miel 🍯", ok: true },
    { txt: "Papas fritas 🍟", ok: false, why: "La grasa y la sal no resuelven la hipoglucemia; necesitas 15 g de carbohidrato de acción rápida." },
  ];

  const sintomas = [
    { txt: "Temblor y sudoración fría", ans: "hipo" },
    { txt: "Mucha sed y boca seca", ans: "hiper" },
    { txt: "Hambre intensa y repentina", ans: "hipo" },
    { txt: "Orinar con mucha frecuencia", ans: "hiper" },
    { txt: "Mareo, confusión o visión borrosa súbita", ans: "hipo" },
    { txt: "Cansancio que se acumula durante días", ans: "hiper" },
    { txt: "Palpitaciones y nerviosismo", ans: "hipo" },
    { txt: "Piel seca y visión borrosa gradual", ans: "hiper" },
  ];
  const [cardAns, setCardAns] = useState({});
  const cardsDone = Object.keys(cardAns).length;
  const cardsOk = sintomas.filter((s, i) => cardAns[i] === s.ans).length;

  return (
    <div className="fd-pop">
      <TopBar title="Actividad 1 · Hipoglucemia y la Regla del 15-15" onBack={onBack} done={step + 1} total={3} color={C.rosa} />

      {step === 0 && (
        <Card>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
            <BrushCircle color={C.rosa} size={90} float>🍬</BrushCircle>
            <div style={{ flex: 1, minWidth: 240 }}>
              <h2 className="fd-display" style={{ margin: "0 0 8px", fontSize: 22, color: C.ink }}>¿Qué es la hipoglucemia?</h2>
              <p className="fd-body" style={{ fontSize: 15.5, lineHeight: 1.7, color: C.ink, margin: 0 }}>
                Es cuando la glucosa baja de <b>70 mg/dL</b>. Puede ocurrir por saltarse comidas, por un exceso de
                medicamento o insulina, por ejercicio intenso sin colación o por consumir alcohol sin alimento.
              </p>
            </div>
          </div>
          <div style={{ display: "grid", gap: 10, gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", marginTop: 16 }}>
            <div className="fd-body" style={{ background: C.rosaSoft, borderRadius: 16, padding: 14, fontSize: 14, lineHeight: 1.6, color: C.ink }}>
              <b>Señales tempranas 👀</b><br />Temblor, sudoración fría, hambre intensa, palpitaciones, nerviosismo.
            </div>
            <div className="fd-body" style={{ background: C.duraznoSoft, borderRadius: 16, padding: 14, fontSize: 14, lineHeight: 1.6, color: C.ink }}>
              <b>Señales avanzadas ⚠️</b><br />Mareo, confusión, dificultad para hablar, visión borrosa, somnolencia.
            </div>
            <div className="fd-body" style={{ background: C.terraSoft, borderRadius: 16, padding: 14, fontSize: 14, lineHeight: 1.6, color: C.ink }}>
              <b>Importante 🚨</b><br />Si hay pérdida de conciencia o no puede tragar, NO dar alimento: es una urgencia, pide ayuda de inmediato.
            </div>
          </div>
          <div style={{ marginTop: 18, textAlign: "right" }}>
            <BigBtn onClick={() => setStep(1)} bg={C.rosa}>Practicar la Regla del 15-15 →</BigBtn>
          </div>
        </Card>
      )}

      {step === 1 && (
        <Card>
          <h2 className="fd-display" style={{ margin: "0 0 6px", fontSize: 22, color: C.ink }}>Algoritmo: la Regla del 15-15 🔄</h2>
          <p className="fd-body" style={{ margin: "0 0 16px", fontSize: 14.5, color: C.sub }}>
            <b style={{ color: C.ink }}>15 g de carbohidrato rápido → esperar 15 minutos → volver a medir.</b> Se repite hasta que la glucosa sea de 70 mg/dL o más. Vive la situación:
          </p>

          {/* Lectura del glucómetro */}
          <div style={{ textAlign: "center", background: C.bg, borderRadius: 18, padding: 18, border: `1px solid ${C.line}` }}>
            <div className="fd-body" style={{ fontSize: 13, fontWeight: 800, color: C.sub, letterSpacing: ".08em" }}>TU GLUCÓMETRO MARCA {attempt > 0 ? `(medición ${attempt + 1})` : ""}</div>
            <div className="fd-display" style={{ fontSize: 52, fontWeight: 700, color: phase === "success" || glucose >= 70 ? C.verde : C.rosa, lineHeight: 1.1 }}>
              {glucose} <span style={{ fontSize: 20 }}>mg/dL</span>
            </div>
            <div className="fd-body" style={{ fontSize: 14, fontWeight: 700, color: C.ink }}>
              {glucose < 70 ? "⬇️ Hipoglucemia: hay que actuar" : "✅ ¡Fuera de peligro!"}
            </div>
          </div>

          {phase === "measure" && glucose < 70 && (
            <div style={{ marginTop: 16 }}>
              <p className="fd-body" style={{ fontWeight: 800, fontSize: 15.5, color: C.ink, margin: "0 0 10px" }}>
                Paso 1 · Elige qué consumir (necesitas ~15 g de carbohidrato rápido):
              </p>
              <div style={{ display: "grid", gap: 8, gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
                {carbs.map((cOp, i) => (
                  <button
                    key={i}
                    className="fd-body"
                    onClick={() => {
                      if (cOp.ok) { setFeedback({ ok: true, msg: "¡Buena elección! Es azúcar de acción rápida. Ahora toca esperar." }); setPhase("wait"); }
                      else setFeedback({ ok: false, msg: cOp.why });
                    }}
                    style={{ border: `2px solid ${C.line}`, background: "#fff", borderRadius: 14, padding: "12px 14px", fontSize: 14.5, fontWeight: 700, color: C.ink, cursor: "pointer", textAlign: "left" }}
                  >
                    {cOp.txt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {phase === "wait" && (
            <div style={{ marginTop: 16, textAlign: "center" }}>
              <p className="fd-body" style={{ fontWeight: 800, fontSize: 15.5, color: C.ink }}>Paso 2 · Espera 15 minutos sin actividad física ⏱</p>
              <BigBtn onClick={() => { setAttempt((a) => a + 1); setPhase(readings[attempt + 1] >= 70 ? "success" : "measure"); setFeedback(null); }} bg={C.rosa}>
                Pasaron los 15 min: volver a medir 🩸
              </BigBtn>
            </div>
          )}

          {(phase === "success" || (phase === "measure" && glucose >= 70)) && (
            <div className="fd-body fd-pop" style={{ marginTop: 16, background: C.verdeSoft, borderRadius: 16, padding: "14px 16px", fontSize: 15, lineHeight: 1.65, color: C.ink }}>
              <b>🎉 ¡Lo lograste!</b> Tu glucosa volvió a zona segura después de {attempt} ciclo(s) del 15-15.
              Último paso: si falta más de 1 hora para tu próxima comida, come una <b>colación</b> (por ejemplo,
              galletas con queso o medio sándwich) para que no vuelva a bajar. Y registra el episodio para comentarlo con tu equipo de salud. 📓
            </div>
          )}

          {feedback && phase !== "success" && (
            <div className="fd-body fd-pop" style={{ marginTop: 12, background: feedback.ok ? C.verdeSoft : C.duraznoSoft, borderRadius: 14, padding: "12px 14px", fontSize: 14, color: C.ink }}>
              <b>{feedback.ok ? "✅ " : "🤔 "}</b>{feedback.msg}
            </div>
          )}

          <div style={{ marginTop: 18, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
            <BigBtn onClick={() => { setAttempt(0); setPhase("measure"); setFeedback(null); }} bg="#fff" color={C.ink}>↺ Reiniciar simulación</BigBtn>
            <BigBtn onClick={() => setStep(2)} bg={C.ink}>Ir a las tarjetas →</BigBtn>
          </div>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <h2 className="fd-display" style={{ margin: "0 0 6px", fontSize: 22, color: C.ink }}>¿Hipoglucemia o hiperglucemia? 🃏</h2>
          <p className="fd-body" style={{ margin: "0 0 16px", fontSize: 14.5, color: C.sub }}>
            Lee cada síntoma y clasifícalo. Pista: la hipoglucemia aparece <b>rápido</b>; la hiperglucemia suele instalarse <b>poco a poco</b>.
          </p>
          <div style={{ display: "grid", gap: 12 }}>
            {sintomas.map((s, i) => {
              const picked = cardAns[i];
              const opts = [
                { id: "hipo", label: "⬇️ Hipoglucemia", color: C.rosa, soft: C.rosaSoft },
                { id: "hiper", label: "⬆️ Hiperglucemia", color: C.terra, soft: C.terraSoft },
              ];
              return (
                <div key={i} style={{ border: `1px solid ${C.line}`, borderRadius: 16, padding: 14 }}>
                  <p className="fd-body" style={{ margin: "0 0 10px", fontWeight: 700, fontSize: 15, color: C.ink }}>{i + 1}. {s.txt}</p>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {opts.map((o) => {
                      const isRight = s.ans === o.id;
                      let bg = "#fff", bd = C.line;
                      if (picked) {
                        if (isRight) { bg = C.verdeSoft; bd = C.verde; }
                        else if (picked === o.id) { bg = C.terraSoft; bd = C.terra; }
                      }
                      return (
                        <button
                          key={o.id}
                          disabled={!!picked}
                          onClick={() => setCardAns((a) => ({ ...a, [i]: o.id }))}
                          className="fd-body"
                          style={{ border: `2px solid ${bd}`, background: bg, borderRadius: 999, padding: "8px 14px", fontWeight: 800, fontSize: 13.5, color: C.ink, cursor: picked ? "default" : "pointer" }}
                        >
                          {picked && isRight ? "✅ " : ""}{o.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: 18, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
            <span className="fd-body" style={{ color: C.sub, fontWeight: 700, fontSize: 14 }}>
              {cardsDone === sintomas.length ? `Resultado: ${cardsOk} / ${sintomas.length} 🎯` : `Respondidas: ${cardsDone} / ${sintomas.length}`}
            </span>
            <BigBtn disabled={cardsDone < sintomas.length} onClick={() => { onComplete(); onBack(); }} bg={C.verde}>Terminar actividad ✓</BigBtn>
          </div>
        </Card>
      )}
    </div>
  );
}

/* ============================================================
   T2 · ACTIVIDAD 2 · HIPERGLUCEMIA (SEMÁFORO DE DECISIONES)
   ============================================================ */
function Hiper({ onBack, onComplete }) {
  const [step, setStep] = useState(0); // 0 intro, 1 semáforo
  const S = {
    verde: { label: "🟢 Verde · Continúa", color: C.verde, soft: C.verdeSoft },
    amarillo: { label: "🟡 Amarillo · Precaución", color: "#E5C15A", soft: "#F8EED2" },
    rojo: { label: "🔴 Rojo · Atención inmediata", color: C.terra, soft: C.terraSoft },
  };
  const escenarios = [
    { txt: "Tu glucosa antes de comer es de 118 mg/dL y te sientes bien.", ans: "verde", why: "Está dentro de la meta: continúa con tu plan de alimentación, medicamento y monitoreo." },
    { txt: "Tu glucosa marca 215 mg/dL. No tienes síntomas de alarma.", ans: "amarillo", why: "Está alta: toma agua, revisa qué pudo causarlo (comida, medicamento olvidado, estrés), evita azúcares y vuelve a medir más tarde. Regístralo." },
    { txt: "Llevas 3 días con glucosa arriba de 250 mg/dL a pesar de seguir tu tratamiento.", ans: "amarillo", why: "Hiperglucemia sostenida: contacta a tu equipo de salud pronto para ajustar el plan. No esperes a que aparezcan síntomas graves." },
    { txt: "Glucosa de 320 mg/dL con vómito que no cede y mucho sueño.", ans: "rojo", why: "Vómito persistente + somnolencia con glucosa muy alta son signos de alarma: acude a urgencias de inmediato." },
    { txt: "Glucosa de 280 mg/dL, respiración agitada y aliento con olor a fruta.", ans: "rojo", why: "Puede ser cetoacidosis, una complicación grave. Es una urgencia médica: busca atención inmediata." },
    { txt: "Hoy amaneciste con 125 mg/dL en ayuno después de cenar ligero y caminar.", ans: "verde", why: "¡En meta! Tus hábitos están funcionando: mantén el plan." },
  ];
  const [ans, setAns] = useState({});
  const done = Object.keys(ans).length;
  const ok = escenarios.filter((e, i) => ans[i] === e.ans).length;

  return (
    <div className="fd-pop">
      <TopBar title="Actividad 2 · Hiperglucemia y semáforo de decisiones" onBack={onBack} done={step + 1} total={2} color={C.terra} />

      {step === 0 && (
        <Card>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
            <BrushCircle color={C.terra} size={90} float>⬆️</BrushCircle>
            <div style={{ flex: 1, minWidth: 240 }}>
              <h2 className="fd-display" style={{ margin: "0 0 8px", fontSize: 22, color: C.ink }}>¿Qué es la hiperglucemia?</h2>
              <p className="fd-body" style={{ fontSize: 15.5, lineHeight: 1.7, color: C.ink, margin: 0 }}>
                Es la glucosa <b>elevada de forma sostenida</b> (por arriba de tus metas). Sus causas más comunes:
                comer más de lo planeado, olvidar el medicamento o la insulina, infecciones, estrés o poca actividad física.
              </p>
            </div>
          </div>
          <div style={{ display: "grid", gap: 10, gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", marginTop: 16 }}>
            <div className="fd-body" style={{ background: C.duraznoSoft, borderRadius: 16, padding: 14, fontSize: 14, lineHeight: 1.6, color: C.ink }}>
              <b>Síntomas frecuentes 👀</b><br />Mucha sed, orinar con frecuencia, cansancio, visión borrosa, boca seca.
            </div>
            <div className="fd-body" style={{ background: C.verdeSoft, borderRadius: 16, padding: 14, fontSize: 14, lineHeight: 1.6, color: C.ink }}>
              <b>Acciones iniciales 💧</b><br />Hidrátate con agua, revisa posibles causas, evita azúcares simples, muévete ligero si tu médico lo permite y monitorea más seguido.
            </div>
            <div className="fd-body" style={{ background: C.terraSoft, borderRadius: 16, padding: 14, fontSize: 14, lineHeight: 1.6, color: C.ink }}>
              <b>Signos de alarma 🚨</b><br />Vómito persistente, respiración rápida, aliento afrutado, dolor abdominal, confusión o somnolencia extrema → urgencias.
            </div>
          </div>
          <div style={{ marginTop: 18, textAlign: "right" }}>
            <BigBtn onClick={() => setStep(1)} bg={C.terra}>Ir al semáforo de decisiones →</BigBtn>
          </div>
        </Card>
      )}

      {step === 1 && (
        <Card>
          <h2 className="fd-display" style={{ margin: "0 0 6px", fontSize: 22, color: C.ink }}>Semáforo de decisiones 🚦</h2>
          <p className="fd-body" style={{ margin: "0 0 14px", fontSize: 14.5, color: C.sub }}>
            🟢 continúa con tu plan · 🟡 actúa y vigila de cerca · 🔴 busca atención médica inmediata.
            Lee cada situación y decide el color.
          </p>
          <div style={{ display: "grid", gap: 12 }}>
            {escenarios.map((e, i) => {
              const picked = ans[i];
              return (
                <div key={i} style={{ border: `1px solid ${C.line}`, borderRadius: 16, padding: 14 }}>
                  <p className="fd-body" style={{ margin: "0 0 10px", fontWeight: 700, fontSize: 15, color: C.ink }}>{i + 1}. {e.txt}</p>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {Object.entries(S).map(([id, o]) => {
                      const isRight = e.ans === id;
                      let bg = "#fff", bd = C.line;
                      if (picked) {
                        if (isRight) { bg = C.verdeSoft; bd = C.verde; }
                        else if (picked === id) { bg = C.terraSoft; bd = C.terra; }
                      }
                      return (
                        <button
                          key={id}
                          disabled={!!picked}
                          onClick={() => setAns((a) => ({ ...a, [i]: id }))}
                          className="fd-body"
                          style={{ border: `2px solid ${bd}`, background: bg, borderRadius: 999, padding: "8px 13px", fontWeight: 800, fontSize: 13, color: C.ink, cursor: picked ? "default" : "pointer" }}
                        >
                          {picked && isRight ? "✅ " : ""}{o.label}
                        </button>
                      );
                    })}
                  </div>
                  {picked && (
                    <div className="fd-body fd-pop" style={{ marginTop: 10, background: picked === e.ans ? C.verdeSoft : C.duraznoSoft, borderRadius: 12, padding: "10px 12px", fontSize: 13.5, lineHeight: 1.55, color: C.ink }}>
                      {e.why}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: 18, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
            <span className="fd-body" style={{ color: C.sub, fontWeight: 700, fontSize: 14 }}>
              {done === escenarios.length ? `Resultado: ${ok} / ${escenarios.length} 🎯` : `Respondidas: ${done} / ${escenarios.length}`}
            </span>
            <BigBtn disabled={done < escenarios.length} onClick={() => { onComplete(); onBack(); }} bg={C.verde}>Terminar actividad ✓</BigBtn>
          </div>
        </Card>
      )}
    </div>
  );
}

/* ============================================================
   T2 · ACTIVIDAD 3 · DÍAS DE ENFERMEDAD
   ============================================================ */
function Dias({ onBack, onComplete }) {
  const [step, setStep] = useState(0); // 0 infografía, 1 juego
  const [open, setOpen] = useState(null);
  const reglas = [
    { emoji: "💊", t: "No suspendas tu tratamiento", d: "Aunque no comas igual que siempre, no dejes tu medicamento o insulina sin indicación médica: la enfermedad suele SUBIR la glucosa.", color: C.rosa, soft: C.rosaSoft },
    { emoji: "🩸", t: "Monitorea más seguido", d: "Mide tu glucosa cada 2 a 4 horas mientras estés enfermo y anota los resultados. Así detectas a tiempo si algo se sale de control.", color: C.terra, soft: C.terraSoft },
    { emoji: "💧", t: "Hidrátate constantemente", d: "Toma agua a sorbos frecuentes (o suero oral si hay vómito o diarrea). La deshidratación empeora la hiperglucemia.", color: C.verde, soft: C.verdeSoft },
    { emoji: "🍲", t: "No dejes de comer", d: "Si no toleras comida normal, opta por opciones suaves: caldos, gelatina, pan tostado, puré. El cuerpo necesita energía para recuperarse.", color: C.durazno, soft: C.duraznoSoft },
    { emoji: "📞", t: "Mantén contacto con tu equipo de salud", d: "Avisa si la fiebre dura más de 24-48 h, si no toleras líquidos o si tu glucosa se mantiene muy alta a pesar del tratamiento.", color: C.menta, soft: C.mentaSoft },
    { emoji: "🚨", t: "Acude a urgencias si...", d: "Vómito o diarrea persistentes, dificultad para respirar, aliento afrutado, confusión, somnolencia extrema o glucosa muy alta que no baja.", color: C.terra, soft: C.terraSoft },
  ];
  const juego = [
    { q: "Amaneces con gripe y sin apetito. ¿Qué haces con tu medicamento para la diabetes?", o: ["Lo suspendo hasta sentirme mejor", "Lo continúo como siempre y consulto a mi médico si tengo dudas", "Tomo doble dosis por si acaso"], c: 1, e: "Enfermarse suele subir la glucosa, por eso el tratamiento continúa. Cualquier ajuste lo indica tu médico, nunca por cuenta propia." },
    { q: "Tienes vómito y no toleras alimentos sólidos. ¿Qué es lo más importante?", o: ["Dormir todo el día sin tomar nada", "Hidratarte a sorbos pequeños y frecuentes", "Esperar a tener hambre para tomar líquidos"], c: 1, e: "La hidratación es prioridad: sorbos pequeños de agua o suero, aunque no tengas sed. Si no toleras ni líquidos, es momento de buscar atención." },
    { q: "Estás enfermo y tu glucosa marca 290 mg/dL, con respiración rápida y mucho sueño. ¿Qué haces?", o: ["Espero a mañana a ver cómo sigo", "Hago ejercicio para bajarla", "Busco atención médica de inmediato"], c: 2, e: "Glucosa muy alta + respiración rápida + somnolencia son signos de alarma de una complicación grave: es urgencia." },
    { q: "¿Cada cuánto conviene medir tu glucosa en días de enfermedad?", o: ["Una vez a la semana", "Cada 2 a 4 horas", "Solo si me siento mal"], c: 1, e: "En días de enfermedad el monitoreo se intensifica: cada 2-4 horas, anotando resultados para compartirlos con tu equipo de salud." },
  ];
  const [ok, setOk] = useState(0);
  const [answered, setAnswered] = useState(0);

  return (
    <div className="fd-pop">
      <TopBar title="Actividad 3 · Días de enfermedad" onBack={onBack} done={step + 1} total={2} color={C.verde} />

      {step === 0 && (
        <Card>
          <h2 className="fd-display" style={{ margin: "0 0 6px", fontSize: 22, color: C.ink }}>¿Qué hacer en días de enfermedad? 🤒</h2>
          <p className="fd-body" style={{ margin: "0 0 16px", fontSize: 15, lineHeight: 1.65, color: C.ink }}>
            Una gripe, una infección o cualquier enfermedad puede <b>subir tu glucosa</b>, incluso si comes menos.
            Toca cada tarjeta de la infografía para conocer las 6 reglas de oro:
          </p>
          <div style={{ display: "grid", gap: 10, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
            {reglas.map((r, i) => (
              <button
                key={i}
                onClick={() => setOpen(open === i ? null : i)}
                className="fd-body"
                style={{ textAlign: "left", background: open === i ? r.soft : "#fff", border: `2px solid ${open === i ? r.color : C.line}`, borderRadius: 18, padding: 16, cursor: "pointer", transition: "all .2s" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <BrushCircle color={r.color} size={44}>{r.emoji}</BrushCircle>
                  <b style={{ fontSize: 15, color: C.ink }}>{i + 1}. {r.t}</b>
                </div>
                {open === i && (
                  <p className="fd-pop" style={{ margin: "10px 0 0", fontSize: 14, lineHeight: 1.6, color: C.ink }}>{r.d}</p>
                )}
              </button>
            ))}
          </div>
          <div style={{ marginTop: 18, textAlign: "right" }}>
            <BigBtn onClick={() => setStep(1)} bg={C.verde}>Jugar “¿Qué harías si...?” →</BigBtn>
          </div>
        </Card>
      )}

      {step === 1 && (
        <Card>
          <h2 className="fd-display" style={{ margin: "0 0 6px", fontSize: 22, color: C.ink }}>Juego: ¿Qué harías si...? 🎲</h2>
          <p className="fd-body" style={{ margin: "0 0 18px", fontSize: 14.5, color: C.sub }}>Ponte en la situación y elige la mejor decisión.</p>
          <div style={{ display: "grid", gap: 22 }}>
            {juego.map((item, i) => (
              <Quiz key={i} q={`${i + 1}. ${item.q}`} options={item.o} correct={item.c} explain={item.e}
                onAnswered={(isOk) => { setAnswered((x) => x + 1); isOk && setOk((x) => x + 1); }} />
            ))}
          </div>
          <div style={{ marginTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
            <span className="fd-body" style={{ color: C.sub, fontWeight: 700, fontSize: 14 }}>Aciertos: {ok} / {juego.length}</span>
            <BigBtn disabled={answered < juego.length} onClick={() => { onComplete(); onBack(); }} bg={C.verde}>Terminar actividad ✓</BigBtn>
          </div>
        </Card>
      )}
    </div>
  );
}

/* ============================================================
   T2 · ACTIVIDAD 4 · EVALUACIÓN SUMATIVA
   ============================================================ */
function EvalSumativa({ onBack, onComplete }) {
  const preguntas = [
    { q: "1. La hipoglucemia se define como una glucosa por debajo de…", o: ["100 mg/dL", "70 mg/dL", "180 mg/dL"], c: 1, e: "Menos de 70 mg/dL es hipoglucemia y requiere actuar de inmediato." },
    { q: "2. La Regla del 15-15 consiste en…", o: ["Tomar 15 tragos de agua y caminar 15 minutos", "Consumir 15 g de carbohidrato rápido, esperar 15 minutos y volver a medir", "Comer 15 g de proteína cada 15 minutos"], c: 1, e: "15 g de carbohidrato de acción rápida + 15 minutos de espera + nueva medición, repitiendo hasta llegar a 70 mg/dL o más." },
    { q: "3. ¿Cuál de estos es un buen ejemplo de carbohidrato rápido para tratar una hipoglucemia?", o: ["Una barra de chocolate", "Medio vaso de jugo o tabletas de glucosa", "Papas fritas"], c: 1, e: "El azúcar 'sin grasa' actúa rápido. La grasa del chocolate o las papas retrasa la absorción." },
    { q: "4. Temblor, sudoración fría y hambre repentina son señales típicas de…", o: ["Hipoglucemia", "Hiperglucemia", "Presión alta"], c: 0, e: "La hipoglucemia aparece rápido, con temblor, sudor frío, hambre y palpitaciones." },
    { q: "5. Mucha sed, orinar con frecuencia y cansancio que se acumula sugieren…", o: ["Hipoglucemia", "Hiperglucemia", "Buena hidratación"], c: 1, e: "La hiperglucemia se instala poco a poco: sed excesiva, orina frecuente, fatiga y visión borrosa." },
    { q: "6. Ante glucosa muy alta con vómito persistente, respiración rápida o aliento afrutado debes…", o: ["Esperar 24 horas a ver si mejora", "Hacer ejercicio intenso", "Acudir a urgencias de inmediato"], c: 2, e: "Son signos de alarma de cetoacidosis u otra complicación aguda: atención médica inmediata." },
    { q: "7. En días de enfermedad, tu medicamento para la diabetes…", o: ["Se suspende hasta comer normal", "Se continúa, y cualquier ajuste lo indica tu médico", "Se duplica automáticamente"], c: 1, e: "La enfermedad tiende a subir la glucosa: el tratamiento continúa y los ajustes solo los indica tu equipo de salud." },
    { q: "8. ¿Qué debe incluir tu plan personal de acción?", o: ["Solo el teléfono de urgencias", "Qué hacer ante hipoglucemia, hiperglucemia y días de enfermedad, en un lugar visible", "Únicamente mi lista de medicamentos"], c: 1, e: "Un plan visible con pasos claros para cada situación te permite actuar rápido y sin dudar. ¡Elabóralo y compártelo con tu familia!" },
  ];
  const [ok, setOk] = useState(0);
  const [answered, setAnswered] = useState(0);
  const total = preguntas.length;

  return (
    <div className="fd-pop">
      <TopBar title="Actividad 4 · Evaluación sumativa" onBack={onBack} done={answered >= total ? 1 : 0} total={1} color={C.durazno} />
      <Card>
        <h2 className="fd-display" style={{ margin: "0 0 6px", fontSize: 22, color: C.ink }}>Cuestionario virtual 📝</h2>
        <p className="fd-body" style={{ margin: "0 0 18px", fontSize: 14.5, color: C.sub }}>
          {total} preguntas para demostrar lo aprendido en esta sesión. ¡Confía en ti!
        </p>
        <div style={{ display: "grid", gap: 22 }}>
          {preguntas.map((item, i) => (
            <Quiz key={i} q={item.q} options={item.o} correct={item.c} explain={item.e}
              onAnswered={(isOk) => { setAnswered((x) => x + 1); isOk && setOk((x) => x + 1); }} />
          ))}
        </div>

        {answered >= total && (
          <div className="fd-pop" style={{ marginTop: 20, textAlign: "center", background: C.verdeSoft, borderRadius: 18, padding: 20 }}>
            <div style={{ fontSize: 40 }}>{ok >= 7 ? "🏆" : ok >= 5 ? "🌟" : "💪"}</div>
            <div className="fd-display" style={{ fontSize: 22, color: C.ink, fontWeight: 700, margin: "6px 0" }}>
              {ok} de {total} aciertos
            </div>
            <p className="fd-body" style={{ margin: 0, fontSize: 15, color: C.ink }}>
              {ok >= 7
                ? "¡Excelente! Estás listo para resolver problemas y actuar a tiempo. 💚"
                : ok >= 5
                ? "¡Muy buen trabajo! Repasa las actividades para reforzar los puntos que fallaste."
                : "Cada intento cuenta. Vuelve a las actividades y repite el cuestionario: dominar esto puede marcar la diferencia."}
            </p>
            <p className="fd-body" style={{ margin: "10px 0 0", fontSize: 13.5, color: C.sub }}>
              Recuerda tu compromiso: elabora tu plan personal de acción y colócalo en un lugar visible. 📌
            </p>
          </div>
        )}

        <div style={{ marginTop: 18, textAlign: "right" }}>
          <BigBtn disabled={answered < total} onClick={() => { onComplete(); onBack(); }} bg={C.verde}>Terminar sesión ✓</BigBtn>
        </div>
      </Card>
    </div>
  );
}

/* ============================================================
   APP
   ============================================================ */
export default function App() {
  const [view, setView] = useState("portada");
  const [done1, setDone1] = useState({ llave: false, tarjetas: false, velocimetro: false });
  const [done2, setDone2] = useState({ hipo: false, hiper: false, dias: false, evalsum: false });
  const complete1 = (id) => setDone1((c) => ({ ...c, [id]: true }));
  const complete2 = (id) => setDone2((c) => ({ ...c, [id]: true }));

  return (
    <div className="fd-body" style={{ minHeight: "100vh", background: C.bg, color: C.ink }}>
      <style>{FONT_CSS}</style>
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "12px 16px 40px" }}>
        {view === "portada" && <Portada go={setView} done1={done1} done2={done2} />}

        {view === "home1" && <Home go={setView} completed={done1} toPortada={() => setView("portada")} />}
        {view === "llave" && <Llave onBack={() => setView("home1")} onComplete={() => complete1("llave")} />}
        {view === "tarjetas" && <Tarjetas onBack={() => setView("home1")} onComplete={() => complete1("tarjetas")} />}
        {view === "velocimetro" && <Velocimetro onBack={() => setView("home1")} onComplete={() => complete1("velocimetro")} />}

        {view === "home2" && <Home2 go={setView} completed={done2} toPortada={() => setView("portada")} />}
        {view === "hipo" && <Hipo onBack={() => setView("home2")} onComplete={() => complete2("hipo")} />}
        {view === "hiper" && <Hiper onBack={() => setView("home2")} onComplete={() => complete2("hiper")} />}
        {view === "dias" && <Dias onBack={() => setView("home2")} onComplete={() => complete2("dias")} />}
        {view === "evalsum" && <EvalSumativa onBack={() => setView("home2")} onComplete={() => complete2("evalsum")} />}
      </div>
    </div>
  );
}
