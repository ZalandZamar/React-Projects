import '../css/DisplayNotes.css';

export const DisplayNotes = ({ setStep, STEPS, notes, setNotes, displayCategory, setDisplayCategory }) => {
  function addNote() {
    setStep(STEPS.addNotes);
  }

  function deleteTodo(i) {
    setNotes(prevNotes =>
      prevNotes.map(item =>
        item.category === displayCategory
          ? {
            ...item,
            categoryArray: item.categoryArray.filter((_, index) => index !== i)
          }
          : item
      )
    );
  }

  return (
    <div>
      <div className='add-note-container'>
        <div className='select-options-container'>
          <label htmlFor="category">Choose a category</label>
          <select name="category" id="category" value={displayCategory}
            onChange={(e) => {
              setDisplayCategory(e.target.value);
            }}
          >
            <option value="work">Work</option>
            <option value="study">Study</option>
            <option value="personal">Personal</option>
            <option value="else">Else</option>
          </select>
        </div>

        <button className="add-note-button" onClick={addNote}>Add Note</button>
      </div>

      {
        notes.map((item) => {
          return item.category === displayCategory &&
            <div key={item.id} className='display-notes-container'>
              <p>Category:&nbsp;({item.category})</p>
              <div>
                {
                  item.categoryArray.map((note, i) => {
                    return (
                      <div key={note.id} className='notes-name-date-container'>
                        <span>{note.name}</span>
                        <span>{note.date}</span>
                        <button onClick={() => deleteTodo(i)}>Delete</button>
                      </div>
                    )
                  })
                }
              </div>
            </div>
        })
      }
    </div>
  );
}