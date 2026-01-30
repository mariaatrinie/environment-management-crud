const express = require("express");
const router = express.Router();
const Issue = require("../models/Issue");

/* CREATE */
router.post("/add", async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);   // 🔥 critical log

    const issue = new Issue({
      area: req.body.area,
      issueType: req.body.issueType,
      description: req.body.description,
      severity: req.body.severity,
      status: "Open"
    });

    await issue.save();

    res.status(201).json({ message: "Issue saved successfully" });
  } catch (err) {
    console.error("SAVE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});


/* READ */
router.get("/", async (req, res) => {
  const issues = await Issue.find();
  res.json(issues);
});

/* UPDATE */
router.put("/update/:id", async (req, res) => {
  await Issue.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: "Issue updated" });
});

/* DELETE */
router.delete("/delete/:id", async (req, res) => {
  await Issue.findByIdAndDelete(req.params.id);
  res.json({ message: "Issue deleted" });
});

/* SEARCH */
router.get("/search/:key", async (req, res) => {
  const data = await Issue.find({
    $or: [
      { area: { $regex: req.params.key, $options: "i" } },
      { issueType: { $regex: req.params.key, $options: "i" } },
      { severity: { $regex: req.params.key, $options: "i" } }
    ]
  });
  res.json(data);
});

module.exports = router;
