const { Command } = require("commander");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  nanoid,
} = require("./contacts.js");

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторить
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      console.log(await listContacts());
      break;

    case "get":
      console.table(await getContactById(id));
      break;

    case "add":
      await addContact(name, email, phone);
      console.table(await listContacts());
      break;

    case "remove":
      await removeContact(id);
      console.table(await listContacts());
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
// console.log("12345678gjhjhgjhgjhjh");

// const contactsOperation = async ({ action, data }) => {
//   switch (action) {
//     case "read":
//       const contacts = await fs.readFile("./db/contacts.json", "utf-8");
//       console.log(contacts);
//       break;
//     case "add":
//       await fs.appendFile("./db/contacts.json", data);
//       break;

//     case "replace":
//       await fs.writeFile("./db/contacts.json", data);
//       break;
//     default:
//       throw new Error("Unknown action");
//   }
// };
// contactsOperation({ action: "read" });
// contactsOperation({ action: "add", data: "WELCOME" });
// contactsOperation({ action: "replace", data: "WELCOME" });

// fs.readFile("./db/contacts.json")
//   .then((data) => console.log(data))
//   .catch((error) => console.log(error.message));
