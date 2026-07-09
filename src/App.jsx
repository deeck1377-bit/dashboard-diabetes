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
function Home({ go, completed }) {
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
      {/* Encabezado estilo brand palette */}
      <div style={{ textAlign: "center", padding: "26px 12px 8px" }}>
        <div className="fd-body" style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.28em", color: C.sub, textTransform: "uppercase" }}>
          Sesión educativa 1 de 3
        </div>
        <h1 className="fd-display" style={{ fontSize: "clamp(30px, 6vw, 46px)", margin: "10px 0 4px", color: C.ink, letterSpacing: "0.06em", fontWeight: 600 }}>
          CONOCE <em style={{ fontWeight: 500, letterSpacing: 0, color: C.rosa }}>tu</em> DIABETES
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
   ACTIVIDAD 1 · LA LLAVE Y LA CERRADURA
   ============================================================ */
function Llave({ onBack, onComplete }) {
  const [step, setStep] = useState(0); // 0 intro, 1 sim, 2 quiz
  const [scenario, setScenario] = useState(null);
  const [ran, setRan] = useState(false);
  const [quizOk, setQuizOk] = useState(0);

  const scenarios = {
    normal: {
      name: "Cuerpo sin diabetes", color: C.verde, soft: C.verdeSoft, keys: 3, enter: 8, lockOk: true,
      msg: "El páncreas produce insulina (las llaves 🔑). Cada llave abre la cerradura de la célula y la glucosa entra para dar energía. La glucosa en sangre se mantiene en equilibrio. ⚖️",
    },
    tipo1: {
      name: "Diabetes tipo 1", color: C.rosa, soft: C.rosaSoft, keys: 0, enter: 0, lockOk: true,
      msg: "El páncreas dejó de fabricar llaves: casi no hay insulina. La glucosa no puede entrar a las células y se acumula en la sangre. Por eso el tratamiento siempre incluye insulina. 💉",
    },
    tipo2: {
      name: "Diabetes tipo 2", color: C.terra, soft: C.terraSoft, keys: 3, enter: 2, lockOk: false,
      msg: "Hay llaves, pero la cerradura está 'oxidada': las células se resisten a la insulina. Solo un poco de glucosa entra y el resto se queda en la sangre. La alimentación, el movimiento y los medicamentos ayudan a 'destapar' la cerradura. 🏃",
    },
  };
  const sc = scenario ? scenarios[scenario] : null;

  // posiciones de glucosa (porcentajes dentro del escenario visual)
  const outside = [
    { x: 8, y: 18 }, { x: 20, y: 40 }, { x: 6, y: 60 }, { x: 24, y: 74 },
    { x: 14, y: 88 }, { x: 30, y: 22 }, { x: 34, y: 58 }, { x: 18, y: 8 },
  ];
  const inside = [
    { x: 66, y: 34 }, { x: 76, y: 48 }, { x: 68, y: 62 }, { x: 80, y: 30 },
    { x: 84, y: 58 }, { x: 72, y: 44 }, { x: 78, y: 68 }, { x: 86, y: 42 },
  ];

  return (
    <div className="fd-pop">
      <TopBar title="Actividad 1 · La llave y la cerradura" onBack={onBack} done={step} total={3} color={C.rosa} />

      {step === 0 && (
        <Card>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
            <BrushCircle color={C.rosa} size={90} float>🔑</BrushCircle>
            <div style={{ flex: 1, minWidth: 240 }}>
              <h2 className="fd-display" style={{ margin: "0 0 8px", fontSize: 22, color: C.ink }}>Tu cuerpo funciona con energía</h2>
              <p className="fd-body" style={{ fontSize: 15.5, lineHeight: 1.7, color: C.ink, margin: 0 }}>
                Cuando comes, los alimentos se convierten en <b>glucosa</b> (🟠 azúcar en la sangre), el combustible
                de tus células. Pero la glucosa no puede entrar sola: necesita que la <b>insulina</b> 🔑 — una hormona
                que fabrica el <b>páncreas</b> — abra la <b>cerradura</b> 🔒 de cada célula.
              </p>
              <p className="fd-body" style={{ fontSize: 15.5, lineHeight: 1.7, color: C.ink, margin: "10px 0 0" }}>
                La <b>diabetes</b> aparece cuando este sistema de llaves y cerraduras falla. ¿Quieres verlo en acción?
              </p>
            </div>
          </div>
          <div style={{ marginTop: 18, textAlign: "right" }}>
            <BigBtn onClick={() => setStep(1)} bg={C.rosa}>Ver la simulación →</BigBtn>
          </div>
        </Card>
      )}

      {step === 1 && (
        <Card>
          <p className="fd-body" style={{ fontWeight: 800, fontSize: 16, margin: "0 0 12px", color: C.ink }}>
            Elige un escenario y presiona <span style={{ color: C.rosa }}>“Comer 🍎”</span> para ver qué pasa con la glucosa:
          </p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
            {Object.entries(scenarios).map(([id, s]) => (
              <button
                key={id}
                onClick={() => { setScenario(id); setRan(false); }}
                className="fd-body"
                style={{
                  border: `2px solid ${scenario === id ? s.color : C.line}`,
                  background: scenario === id ? s.soft : "#fff",
                  borderRadius: 999, padding: "10px 16px", fontWeight: 800, fontSize: 14,
                  color: C.ink, cursor: "pointer",
                }}
              >
                {s.name}
              </button>
            ))}
          </div>

          {/* Escena */}
          <div style={{ position: "relative", height: 300, background: C.mentaSoft, borderRadius: 18, overflow: "hidden", border: `1px solid ${C.line}` }}>
            {/* etiquetas */}
            <div className="fd-body" style={{ position: "absolute", top: 10, left: 12, fontSize: 12, fontWeight: 800, color: C.sub, letterSpacing: ".08em" }}>SANGRE 🩸</div>
            <div className="fd-body" style={{ position: "absolute", top: 10, right: 12, fontSize: 12, fontWeight: 800, color: C.sub, letterSpacing: ".08em" }}>CÉLULA ⚡</div>

            {/* célula */}
            <div style={{
              position: "absolute", right: "4%", top: "14%", width: "44%", height: "72%",
              background: "#fff", border: `4px solid ${C.verde}`, borderRadius: "48% 52% 55% 45% / 52% 46% 54% 48%",
            }} />
            {/* cerradura */}
            <div style={{ position: "absolute", right: "44%", top: "46%", fontSize: 34, transform: "translate(50%,-50%)", filter: sc && !sc.lockOk ? "grayscale(.4) sepia(.5)" : "none" }}>
              {ran && sc && sc.enter > 0 ? "🔓" : "🔒"}
            </div>
            {sc && !sc.lockOk && (
              <div className="fd-body" style={{ position: "absolute", right: "38%", top: "58%", fontSize: 11, fontWeight: 800, color: C.terra, background: "#fff", borderRadius: 999, padding: "2px 8px" }}>
                cerradura resistente
              </div>
            )}

            {/* llaves */}
            {sc && Array.from({ length: sc.keys }).map((_, i) => (
              <div key={i} style={{ position: "absolute", left: `${40 + i * 5}%`, top: `${30 + i * 14}%`, fontSize: 22, transition: "all .8s ease", transform: ran ? "translateX(30px) rotate(20deg)" : "none" }}>🔑</div>
            ))}
            {sc && sc.keys === 0 && (
              <div className="fd-body" style={{ position: "absolute", left: "38%", top: "34%", fontSize: 12, fontWeight: 800, color: C.rosa, background: "#fff", borderRadius: 999, padding: "3px 10px" }}>
                sin llaves 🚫🔑
              </div>
            )}

            {/* glucosa */}
            {outside.map((p, i) => {
              const goesIn = sc && ran && i < sc.enter;
              const pos = goesIn ? inside[i] : ran && sc ? { x: p.x + 4, y: p.y } : p;
              return (
                <div key={i} style={{
                  position: "absolute", left: `${pos.x}%`, top: `${pos.y}%`,
                  width: 18, height: 18, borderRadius: "50%",
                  background: goesIn ? C.verde : C.terra,
                  border: "2px solid #fff", boxShadow: "0 1px 4px rgba(0,0,0,.15)",
                  transition: "all 1.1s cubic-bezier(.5,0,.3,1)",
                }} />
              );
            })}
          </div>

          <div style={{ display: "flex", gap: 10, marginTop: 14, flexWrap: "wrap", alignItems: "center" }}>
            <BigBtn disabled={!scenario} onClick={() => setRan(true)} bg={C.rosa}>Comer 🍎</BigBtn>
            {ran && <BigBtn onClick={() => setRan(false)} bg="#fff" color={C.ink}>↺ Reiniciar</BigBtn>}
          </div>

          {ran && sc && (
            <div className="fd-body fd-pop" style={{ marginTop: 14, background: sc.soft, borderRadius: 16, padding: "14px 16px", fontSize: 15, lineHeight: 1.65, color: C.ink }}>
              <b>{sc.name}:</b> {sc.msg}
            </div>
          )}

          <div style={{ marginTop: 18, textAlign: "right" }}>
            <BigBtn onClick={() => setStep(2)} bg={C.ink}>Ya lo probé, ¡al reto! →</BigBtn>
          </div>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <h2 className="fd-display" style={{ margin: "0 0 16px", fontSize: 22, color: C.ink }}>Reto rápido 🔑</h2>
          <div style={{ display: "grid", gap: 22 }}>
            <Quiz
              q="1. En la historia de la llave y la cerradura, ¿qué papel juega la insulina?"
              options={["Es el azúcar que viaja por la sangre", "Es la llave que abre la célula para que entre la glucosa", "Es la energía de las células"]}
              correct={1}
              explain="La insulina es la llave 🔑: sin ella (o si la cerradura se resiste), la glucosa se queda en la sangre."
              onAnswered={(ok) => ok && setQuizOk((v) => v + 1)}
            />
            <Quiz
              q="2. ¿Qué órgano fabrica la insulina?"
              options={["El hígado", "El corazón", "El páncreas"]}
              correct={2}
              explain="El páncreas es la fábrica de llaves de tu cuerpo. En la diabetes, esa fábrica produce poca insulina o el cuerpo no la aprovecha bien."
              onAnswered={(ok) => ok && setQuizOk((v) => v + 1)}
            />
            <Quiz
              q="3. ¿Qué pasa con la glucosa cuando la insulina falta o no funciona bien?"
              options={["Se acumula en la sangre", "Desaparece del cuerpo", "Se convierte en insulina"]}
              correct={0}
              explain="Exacto: la glucosa se acumula en la sangre (hiperglucemia). Eso es, en esencia, la diabetes."
              onAnswered={(ok) => ok && setQuizOk((v) => v + 1)}
            />
          </div>
          <div style={{ marginTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
            <span className="fd-body" style={{ color: C.sub, fontWeight: 700, fontSize: 14 }}>Aciertos: {quizOk} / 3</span>
            <BigBtn onClick={() => { onComplete(); onBack(); }} bg={C.verde}>Terminar actividad ✓</BigBtn>
          </div>
        </Card>
      )}
    </div>
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
   APP
   ============================================================ */
export default function App() {
  const [view, setView] = useState("home");
  const [completed, setCompleted] = useState({ llave: false, tarjetas: false, velocimetro: false });
  const complete = (id) => setCompleted((c) => ({ ...c, [id]: true }));

  return (
    <div className="fd-body" style={{ minHeight: "100vh", background: C.bg, color: C.ink }}>
      <style>{FONT_CSS}</style>
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "12px 16px 40px" }}>
        {view === "home" && <Home go={setView} completed={completed} />}
        {view === "llave" && <Llave onBack={() => setView("home")} onComplete={() => complete("llave")} />}
        {view === "tarjetas" && <Tarjetas onBack={() => setView("home")} onComplete={() => complete("tarjetas")} />}
        {view === "velocimetro" && <Velocimetro onBack={() => setView("home")} onComplete={() => complete("velocimetro")} />}
      </div>
    </div>
  );
}
