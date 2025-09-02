import '../css/AddNotes.css';

export const AddNotes = ({ notes, setNotes, category, setCategory, noteValue, setNoteValue, setStep, STEPS }) => {
  const date = new Date();

  function addNoteTodo() {
    const newObj = {
      category,
      id: crypto.randomUUID(),
      categoryArray: [
        {
          name: noteValue,
          date: date.toDateString(),
          id: crypto.randomUUID()
        }
      ]
    }

    const obj = {
      name: noteValue,
      date: date.toDateString(),
      id: crypto.randomUUID()
    }

    if (!notes.some(item => item.category === category)) {
      setNotes(prev => [...prev, newObj]);
    } else {
      setNotes(prev => {
        return prev.map(item => {
          const updated = [...item.categoryArray, obj];

          if (item.category === category) {
            return { ...item, categoryArray: updated }
          } else {
            return item
          }
        });
      });
    }

    setNoteValue('');
    setStep(STEPS.displayNotes);
  }

  return (
    <div className='add-note-container'>
      <div className='select-options-container'>
        <label htmlFor="category">Choose a category</label>
        <select name="category" id="category" value={category}
          onChange={(e) => {
            setCategory(e.target.value);
          }}>
          <option value="work">Work</option>
          <option value="study">Study</option>
          <option value="personal">Personal</option>
          <option value="else">Else</option>
        </select>
      </div>

      <div className='textarea-container'>
        <textarea name="note" placeholder="Add a Note"
          className="add-note-area" value={noteValue}
          onChange={(e) => {
            setNoteValue(e.target.value);
          }}></textarea>
        <button className="add-button" onClick={addNoteTodo}>Add</button>
      </div>
    </div>
  );
}