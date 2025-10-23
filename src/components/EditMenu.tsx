import type { Dispatch, SetStateAction } from 'react';

type EditForm = {
  fullName: string;
  age: string;
  direction: string;
  course: string;
  website: string;
  username: string;
  email: string;
  phone: string;
  about: string;
  techStack: string;
};

type Props = {
  form: EditForm;
  updateField: (key: keyof EditForm, value: string) => void;
  availableDirections: string[];
  directionTags: string[];
  setDirectionTags: Dispatch<SetStateAction<string[]>>;
  techTags: string[];
  setTechTags: Dispatch<SetStateAction<string[]>>;
  tagInput: string;
  setTagInput: Dispatch<SetStateAction<string>>;
  onChangePhoto: () => void;
};

function EditMenu({
  form,
  updateField,
  availableDirections,
  directionTags,
  setDirectionTags,
  onChangePhoto,
}: Props) {
  return (
    <div className="edit-menu">
      <button className="edit-change-photo" onClick={onChangePhoto}>Выбрать новую фотографию</button>
      <input
        className="edit-input"
        value={form.fullName}
        onChange={(e) => updateField('fullName', e.target.value)}
        placeholder="ФИО"
      />
      <div className="edit-row">
        <div className="edit-field" style={{flex:1}}>
          <div className="edit-field-label">Направление</div>
          <div className="edit-checkbox-list">
            {availableDirections.map(opt => {
              const checked = directionTags.includes(opt);
              return (
                <label key={opt} className={`edit-checkbox-item${checked ? ' edit-checkbox-item--checked' : ''}`}>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => {
                      if (e.currentTarget.checked) {
                        setDirectionTags(prev => [...prev, opt]);
                      } else {
                        setDirectionTags(prev => prev.filter(v => v !== opt));
                      }
                    }}
                  />
                  <span>{opt}</span>
                </label>
              );
            })}
          </div>
        </div>
        <input
          className="edit-input edit-input--small"
          value={form.age}
          onChange={(e) => updateField('age', e.target.value)}
          placeholder="Возраст"
          inputMode="numeric"
        />
        <input
          className="edit-input edit-input--small"
          value={form.course}
          onChange={(e) => updateField('course', e.target.value)}
          placeholder="Курс"
        />
      </div>
    </div>
  );
}

export default EditMenu;


