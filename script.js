body {
  font-family: sans-serif;
  background: #f4f6f8;
  padding: 20px;
}

h1 {
  text-align: center;
}

.input-area,
.alarm-area {
  background: #ffffff;
  padding: 15px;
  border-radius: 8px;
  max-width: 400px;
  margin: 0 auto 20px;
}

label {
  display: block;
  margin-bottom: 8px;
}

input {
  width: 100%;
  margin-top: 4px;
}

button {
  margin-top: 10px;
  width: 100%;
  padding: 8px;
  cursor: pointer;
}

.calendar {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 10px;
}

.day {
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 8px;
  font-size: 12px;
}

.day strong {
  display: block;
  margin-bottom: 4px;
}
