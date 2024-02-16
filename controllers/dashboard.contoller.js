const express = require("express");
const router = express.Router();
const Note = require("../models/Notes.models.js");
const Announcement = require("../models/Announcement.models.js");
const bodyParser = require("body-parser");
const Notes = require("../models/Notes.models.js");
const Classroom = require("../models/Classroom.models.js");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

router.get("/student", async (req, res) => {
  let notes = await Note.find();
  let Announcements = await Announcement.find().sort({ createdAt: "desc" });
  res.render("studentDashboard", {
    title: "Student dashboard",
    notes: notes,
    announcements: Announcements,
  });
});
router.get("/teacher", (req, res) => {
  res.render("teacherDashboard", { title: "Teacher dashboard" });
});
router.get("/parent", (req, res) => {
  res.render("parentDashboard", { title: "Parent dashboard" });
});

router.get("/notes", async (req, res) => {
  let notes = await Note.find().sort({ createdAt: "desc" });
  console.log(notes);
  res.render("notes", { title: "Notes", notes: notes });
});

router.post("/notes", async (req, res) => {
  const { noteTitle, noteContent, fileUrl } = req.body;
  console.log(noteTitle, noteContent, fileUrl);
  try {
    const newNote = new Note({
      title: noteTitle,
      content: noteContent,
      fileUrl,
    });
    await newNote.save();
  } catch {
    res.send("An error occurred!");
  }
  res.redirect("/dashboard/notes");
});

router.get("/notes/:id", async (req, res) => {
  const note = await Notes.findById(req.params.id);
  if (note == null) redirect("/notes");
  res.render("showNotes", { title: note.title, note: note });
});

router.get("/announcement", async (req, res) => {
  let Announcements = await Announcement.find().sort({ createdAt: "desc" });
  res.render("announcement", {
    title: "Announcement Page",
    announcements: Announcements,
  });
});

router.post("/announcement", async (req, res) => {
  const { announcementTitle, announcementContent } = req.body;
  try {
    const newAnnouncement = new Announcement({
      title: announcementTitle,
      content: announcementContent,
    });
    await newAnnouncement.save();
  } catch {
    res.send("An error occurred!");
  }
  res.redirect("/dashboard/announcement");
});

router.get("/classroom", (req, res) => {
  res.render("classroom", { title: "Create Classroom" });
});

router.get("/showClassroom", async (req, res) => {
  const classroom = await Classroom.find();
  res.render("showClassroom", {
    title: "List of Classroom",
    classroom: classroom,
  });
});

router.get("/classroom/:id", async (req, res) => {
  const classroom = await Classroom.findById(req.params.id);
  if (classroom == null) {
    res.redirect("/");
  } else {
    res.render("viewClassroom", {
      title: classroom.name,
      classroom: classroom,
    });
  }
});

router.post("/classroom", async (req, res) => {
  const { classroomTitle, Program_names } = req.body;
  const newClassroom = new Classroom({
    name: classroomTitle,
    branch: Program_names,
  });
  try {
    await newClassroom.save();
    res.redirect(`/dashboard/classroom/${newClassroom.id}`);
  } catch {
    res.redirect("/dashboard/classroom");
  }
});

module.exports = router;
