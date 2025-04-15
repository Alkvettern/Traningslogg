
import { useState, useEffect } from "react";

const defaultExercises = ["Bänkpress", "Marklyft", "Knäböj"];

export default function StrengthLogger() {
  const [logs, setLogs] = useState([]);
  const [exercise, setExercise] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [date, setDate] = useState("");
  const [customExercise, setCustomExercise] = useState("");
  const [exercises, setExercises] = useState(defaultExercises);

  useEffect(() => {
    const storedLogs = JSON.parse(localStorage.getItem("trainingLogs") || "[]");
    const storedExercises = JSON.parse(localStorage.getItem("exercises") || JSON.stringify(defaultExercises));
    setLogs(storedLogs);
    setExercises(storedExercises);
  }, []);

  useEffect(() => {
    localStorage.setItem("trainingLogs", JSON.stringify(logs));
  }, [logs]);

  useEffect(() => {
    localStorage.setItem("exercises", JSON.stringify(exercises));
  }, [exercises]);

  const handleAddLog = () => {
    if (!exercise || !reps || !weight || !date) return;
    const newLog = { exercise, reps, weight, date };
    setLogs([newLog, ...logs]);
    setExercise("");
    setReps("");
    setWeight("");
    setDate("");
  };

  const handleAddExercise = () => {
    if (customExercise && !exercises.includes(customExercise)) {
      setExercises([...exercises, customExercise]);
      setCustomExercise("");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h1>Träningslogg</h1>
      <select value={exercise} onChange={(e) => setExercise(e.target.value)}>
        <option value="">Välj övning</option>
        {exercises.map((ex, idx) => (
          <option key={idx} value={ex}>{ex}</option>
        ))}
      </select>
      <input placeholder="Datum (YYYY-MM-DD)" value={date} onChange={(e) => setDate(e.target.value)} />
      <input placeholder="Antal reps" type="number" value={reps} onChange={(e) => setReps(e.target.value)} />
      <input placeholder="Vikt (kg)" type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
      <button onClick={handleAddLog}>Spara pass</button>

      <h3>Lägg till ny övning</h3>
      <input placeholder="Ny övning" value={customExercise} onChange={(e) => setCustomExercise(e.target.value)} />
      <button onClick={handleAddExercise}>Lägg till</button>

      <h3>Tidigare pass</h3>
      <ul>
        {logs.map((log, idx) => (
          <li key={idx}>
            <strong>{log.date}</strong> – {log.exercise}: {log.reps} reps @ {log.weight} kg
          </li>
        ))}
      </ul>
    </div>
  );
}
