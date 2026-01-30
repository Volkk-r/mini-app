import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";

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
};

function UserProfile({
  form,
  updateField,
  availableDirections,
  directionTags,
  setDirectionTags,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="user-profile">
      <button
        className="edit-toggle-btn"
        onClick={() => setIsEditing(!isEditing)}
      >
        {isEditing ? "Сохранить" : "Редактировать"}
      </button>

      {/* ФИО */}
      <div className="field">
        <div className="field-label">ФИО</div>
        {isEditing ? (
          <input
            type="text"
            className="account-edit-input"
            value={form.fullName}
            onChange={(e) => updateField("fullName", e.target.value)}
            placeholder="ФИО"
          />
        ) : (
          <div className="view-field-value">{form.fullName || "Не указано"}</div>
        )}
      </div>

      {/* Направление */}
      <div className="field">
        <div className="field-label">Направление</div>
        {isEditing ? (
          <div className="edit-checkbox-list">
            {availableDirections.map((opt) => {
              const checked = directionTags.includes(opt);
              return (
                <label
                  key={opt}
                  className={`edit-checkbox-item${checked ? " edit-checkbox-item--checked" : ""}`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => {
                      if (e.currentTarget.checked) {
                        setDirectionTags((prev) => [...prev, opt]);
                      } else {
                        setDirectionTags((prev) =>
                          prev.filter((v) => v !== opt)
                        );
                      }
                    }}
                  />
                  <span>{opt}</span>
                </label>
              );
            })}
          </div>
        ) : (
          <div className="view-field-value">
            {directionTags.length > 0 ? directionTags.join(", ") : "Не указаны"}
          </div>
        )}
      </div>

      {/* Возраст и курс */}
      <div className="edit-row">
        <div className="field small">
          <div className="field-label">Возраст</div>
          {isEditing ? (
            <input
              type="number"
              min={14}
              max={25}
              className="account-edit-input"
              value={form.age}
              onChange={(e) => {
                const val = e.target.value;
                if (val === "" || (+val >= 14 && +val <= 25)) {
                  updateField("age", val);
                }
              }}
              placeholder="Возраст"
            />
          ) : (
            <div className="view-field-value">{form.age || "Не указан"}</div>
          )}
        </div>

        <div className="field small">
          <div className="field-label">Курс</div>
          {isEditing ? (
            <select
              className="account-edit-input"
              value={form.course}
              onChange={(e) => updateField("course", e.target.value)}
            >
              <option value="">Выбери курс</option>
              <option value="1">1 курс</option>
              <option value="2">2 курс</option>
              <option value="3">3 курс</option>
              <option value="4">4 курс</option>
            </select>
          ) : (
            <div className="view-field-value">
              {form.course ? `${form.course} курс` : "Не указан"}
            </div>
          )}
        </div>
      </div>

      
    </div>
  );
}

export default UserProfile;