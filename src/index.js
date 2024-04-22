import { program } from "commander";
import Contacts from "./contacts.js"
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();
const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
          const contacts = await Contacts.listContacts();
          return contacts;
    case "get":
          const contactById = await Contacts.getContactById(id);
          return contactById;

    case "add":
          const newContact = await Contacts.addContact(name, email, phone);
          return newContact;

    case "remove":
      const removedContact = await Contacts.removeContact(id)
      return removedContact

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options)
    .then((data) => {
        if (typeof(data) === "undefined") {
          throw new Error ("Unknown action type!")
        }
        console.log(data)
    })
    .catch((error) => console.log(error));
