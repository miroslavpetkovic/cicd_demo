import express from "express";

const app = express();
app.use(express.json());

const courses = [
  { id: 1, name: "Python", duration: 40, price: 5000 },
  { id: 2, name: "AI", duration: 60, price: 8000 },
  { id: 3, name: "DevOps", duration: 50, price: 7000 },
];

app.get("/health", (_req, res) => {
  res.json({ status: "ok", version: "1.0.0" });
});

app.get("/courses", (_req, res) => {
  res.json({ success: true, data: courses });
});

app.get("/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === Number(req.params.id));

  if (!course) {
    return res
      .status(404)
      .json({ success: false, message: "Course not found" });
  }

  return res.json({ success: true, data: course });
});

export { app };

if (process.argv[1]?.includes("api")) {
  app.listen(3000, () => process.stdout.write("Server running on port 3000\n"));
}
