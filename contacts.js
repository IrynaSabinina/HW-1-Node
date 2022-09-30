// const nanoid = require("nanoid");
const fs = require("fs/promises");

const path = require("path");

const contactsPath = path.resolve("./db/contacts.json");

// TODO: задокументувати кожну функцію
async function listContacts() {
  const contacts = await fs.readFile("./db/contacts.json", "utf-8");
  return JSON.parse(contacts);
}

async function getContactById(contactId) {
  const contacts = await listContacts();

  const findContactById = contacts.find(({ id }) => id === contactId);

  return findContactById;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const findContactById = contacts.find(({ id }) => id === contactId);
  const index = contacts.indexOf(findContactById);
  const newContacts = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const id = String(contacts.length + 1);
  const newContact = {
    id,
    name,
    email,
    phone,
  };
  contacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts));
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
