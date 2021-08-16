const fs = require("fs");
const chalk = require("chalk");
const failure = chalk.red.inverse;
const success = chalk.green.inverse;

const addNote = (title, body) => {
	const notes = loadNotes();
	const duplicatedNote = notes.find((note) => note.title === title);
	if (!duplicatedNote) {
		notes.push({ title, body });
		saveNotes(notes);
		console.log(success("New note added!"));
	} else {
		console.log(failure("Note title taken!"));
	}
};

const removeNote = (title) => {
	const notes = loadNotes();
	if (notes.length > 0) {
		const newNotes = notes.filter((note) => note.title !== title);
		if (newNotes.length === notes.length) {
			console.log("No note found!");
			return;
		}
		saveNotes(newNotes);
		console.log(success("Removed a note"));
	} else {
		console.log(failure("Notes are empty!"));
	}
};

const listNotes = () => {
	const notes = loadNotes();
	if (notes.length > 0) {
		console.log(chalk.blue("List of notes:"));
		notes.map((note, key) =>
			console.log(chalk.yellow.bold(`${key + 1}: ${note.title}`))
		);
	} else {
		console.log(chalk.red("Notes are empty!"));
	}
};

const readNote = (title) => {
    const notes = loadNotes();
    const note = notes.find(note => note.title === title);
    if (note) {
        console.log(`${chalk.bold.cyanBright(note.title)}: ${note.body}`);
    } else {
        console.log(chalk.red('No note found!'))
    }
}

const loadNotes = () => {
	try {
		const data = fs.readFileSync("notes.json").toString();
		return JSON.parse(data);
	} catch (error) {
		return [];
	}
};

const saveNotes = (notes) => {
	fs.writeFileSync("notes.json", JSON.stringify(notes));
};

module.exports = {
	addNote,
	removeNote,
	listNotes,
	readNote,
};
