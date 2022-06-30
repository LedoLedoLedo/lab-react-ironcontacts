import React from "react";
import "./App.css";
import contactsJson from "./contacts.json";

function App() {
  const [contacts, setContacts] = React.useState(contactsJson.slice(0, 5));
  const [remainingContacts, setRemainingContacts] = React.useState(
    contactsJson.slice(5)
  );

  const addContact = () => {
    let num = Math.floor(Math.random() * remainingContacts.length);
    let contactCopy = [...contacts];
    let remContactCopy = [...remainingContacts];
    //setContacts(contactCopy.concat(remainingContacts(num)));

    if (remainingContacts.length > 0) {
      setContacts(contactCopy.concat(remainingContacts[num]));
      remContactCopy.splice(num, 1);
      setRemainingContacts(remContactCopy);
    }
  };

  const deleteCeleb = (id) => {
    let filteredArr = contacts.filter(function (celeb) {
      return celeb.id !== id;
    });
    let filteredceleb = contacts.find(function (celeb) {
      return celeb.id === id;
    });

    setContacts(filteredArr);
    setRemainingContacts(remainingContacts.concat(filteredceleb));
  };

  let sortName = () => {
    let contactCopy = [...contacts];
    contactCopy.sort(function (a, b) {
      return a.name.localeCompare(b.name);
    });

    setContacts(contactCopy);
  };

  let sortPop = () => {
    // let contactCopy = [...contacts];
    contacts.sort((a, b) => {
      return b.popularity - a.popularity;
    });

    setContacts([...contacts]);
  };

  return (
    <div className="images">
      <h1>IronContacts</h1>
      <div className="btnWrap">
        <button onClick={addContact}>Add Random Contact </button>
        <button onClick={sortPop}> Sort by Popularity</button>
        <button onClick={sortName}> Sort by Name</button>
      </div>
      <div className="tableCont">
        <table>
          <thead>
            <tr>
              <th>Picture</th>
              <th>Name</th>
              <th>Popularity</th>
              <th>Won <br/>Oscar</th>
              <th>Won <br/> Emmy</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map(function (contact) {
              return (
                <tr>
                  <td>
                    <img src={contact.pictureUrl} width="100px" alt="" />
                  </td>
                  <td>{contact.name}</td>
                  <td>{contact.popularity}</td>
                  <td>{contact.wonOscar && "🏆"}</td>
                  <td>{contact.wonEmmy ? "🏆" : ""}</td>
                  <td>
                    <button onClick={() => deleteCeleb(contact.id)}>Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
