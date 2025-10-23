
import { useUser } from '../context/UserContext';
import { useRef, useState } from 'react';
import './Account.css';
import './EditMenu.css';
import edit from '../img/edit_24.svg';
import copy from '../img/copy.svg';
import cop from '../img/cop.svg';
import EditMenu from './EditMenu.tsx';

function Account() {
  const { user, updateUserProfile } = useUser();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState(() => ({
    fullName: user?.fullName ?? '',
    age: String(user?.age ?? ''),
    direction: user?.direction ?? '',
    course: user?.course ?? '',
    website: user?.website ?? '',
    username: user?.username ?? '',
    email: user?.email ?? '',
    phone: user?.phone ?? '',
    about: user?.about ?? '',
    techStack: (user?.techStack ?? []).join(', '),
  }));

  const AVAILABLE_DIRECTIONS = ['Frontend', 'Backend', 'UX/UI'];
  const [directionTags, setDirectionTags] = useState<string[]>(() =>
    (user?.direction ? user.direction.split(/[,;/]\s*/).filter(Boolean) : ['Frontend'])
  );
  const [techTags, setTechTags] = useState<string[]>(() => user?.techStack ?? ['React']);
  const [tagInput, setTagInput] = useState('');

  const updateField = (key: keyof typeof form, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  if (!user) {
    return <div style={{ padding: 16 }}>Вы не авторизованы.</div>;
  }

  return (
    <div className="account-container">
      <div className="account-card">
        <div className="account-header">
          <div
            className="account-avatar-wrapper"
            onClick={() => {
              // Вход в режим редактирования по клику на кнопку у аватара
              setIsEditing(true);
              setForm({
                fullName: user.fullName,
                age: String(user.age),
                direction: user.direction,
                course: user.course,
                website: user.website ?? '',
                username: user.username,
                email: user.email,
                phone: user.phone ?? '',
                about: user.about ?? '',
                techStack: (user.techStack ?? []).join(', '),
              });
            }}
            role="button"
            aria-label="Редактировать профиль"
            tabIndex={0}
          >
            <img className="account-avatar" src={user.avatarUrl} alt={user.fullName} />
            <span className="account-avatar-edit"><img src={edit} alt="" /></span>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            style={{ display: 'none' }}
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onload = () => {
                const dataUrl = String(reader.result ?? '');
                updateUserProfile({ avatarUrl: dataUrl });
              };
              reader.readAsDataURL(file);
            }}
          />
          <div className="account-name">
            {isEditing ? (
              <EditMenu
                form={form}
                updateField={updateField}
                availableDirections={AVAILABLE_DIRECTIONS}
                directionTags={directionTags}
                setDirectionTags={setDirectionTags}
                techTags={techTags}
                setTechTags={setTechTags}
                tagInput={tagInput}
                setTagInput={setTagInput}
                onChangePhoto={() => fileInputRef.current?.click()}
              />
            ) : (
              <>
                <div className="account-fullname">{user.fullName}</div>
                <div className="account-meta">{user.age} лет — {user.direction} — {user.course}</div>
              </>
            )}
          </div>
        </div>

          <div className="account-website-field field">
            <input 
              type="text" 
              value={isEditing ? form.website : (user.website ?? '')} 
              readOnly={!isEditing}
              className="account-website-input"
              onChange={(e) => updateField('website', e.target.value)}
              onClick={() => { if (!isEditing && user.website) window.open(user.website, '_blank'); }}
              placeholder="Ссылка на портфолио"
            />
            {!isEditing && user.website && (
              <button 
                className={`account-website-copy ${isCopied ? 'copied' : ''}`}
                onClick={async (e) => {
                  e.stopPropagation();
                  try {
                    await navigator.clipboard.writeText(user.website || '');
                    setIsCopied(true);
                    setTimeout(() => setIsCopied(false), 2000);
                  } catch (err) {
                    console.error('Ошибка копирования:', err);
                  }
                }}
                title={isCopied ? "Скопировано!" : "Копировать ссылку"}
              >
                {isCopied ? <img src={cop} alt="" /> : <img src={copy} alt="" />}
              </button>
            )}
          </div>
        <div className="account-fields">
          <div className="field">
            <div className="field-label">Username</div>
            <input disabled={!isEditing} value={isEditing ? form.username : user.username} onChange={(e) => updateField('username', e.target.value)} />
          </div>

          <div className="field">
            <div className="field-label">Почта</div>
            <input disabled={!isEditing} value={isEditing ? form.email : user.email} onChange={(e) => updateField('email', e.target.value)} />
          </div>

          <div className="field">
            <div className="field-label">Телефон</div>
            <input disabled={!isEditing} value={isEditing ? form.phone : (user.phone ?? '')} onChange={(e) => updateField('phone', e.target.value)} />
          </div>

          <div className="field">
            <div className="field-label">О себе</div>
            <textarea disabled={!isEditing} rows={5} value={isEditing ? form.about : (user.about ?? '')} onChange={(e) => updateField('about', e.target.value)} />
          </div>
        </div>

        {user.techStack && user.techStack.length > 0 && (
          <div className="account-tags">
            <div className="account-tags-title">Стек технологий</div>
            {isEditing ? (
              <div className="chip-input">
                <div className="chips">
                  {techTags.map((t) => (
                    <span key={t} className="chip">
                      #{t}
                      <button type="button" className="chip-x" onClick={() => setTechTags(techTags.filter(x => x !== t))}>×</button>
                    </span>
                  ))}
                  <input
                    className="chip-text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="Технология"
                    onKeyDown={(e) => {
                      if ((e.key === 'Enter' || e.key === ',') && tagInput.trim()) {
                        e.preventDefault();
                        const val = tagInput.trim();
                        if (!techTags.includes(val)) setTechTags([...techTags, val]);
                        setTagInput('');
                      }
                    }}
                  />
                </div>
              </div>
            ) : (
              <div className="account-tags-list">
                {user.techStack.map(tag => (
                  <span key={tag} className="account-tag">#{tag}</span>
                ))}
              </div>
            )}
          </div>
        )}

        {isEditing && (
          <div className="account-actions">
            <button
              className="account-btn cancel"
              onClick={(e) => {
                e.preventDefault();
                setIsEditing(false);
                setForm({
                  fullName: user.fullName,
                  age: String(user.age),
                  direction: user.direction,
                  course: user.course,
                  website: user.website ?? '',
                  username: user.username,
                  email: user.email,
                  phone: user.phone ?? '',
                  about: user.about ?? '',
                  techStack: (user.techStack ?? []).join(', '),
                });
                setDirectionTags(user.direction ? user.direction.split(/[,;/]\s*/).filter(Boolean) : ['Frontend']);
                setTechTags(user.techStack ?? ['React']);
              }}
            >Отмена</button>
            <button
              className="account-btn save"
              onClick={(e) => {
                e.preventDefault();
                const updates = {
                  fullName: form.fullName,
                  age: Number(form.age) || user.age,
                  direction: directionTags.join(', '),
                  course: form.course,
                  website: form.website,
                  username: form.username,
                  email: form.email,
                  phone: form.phone,
                  about: form.about,
                  techStack: techTags,
                };
                updateUserProfile(updates);
                setIsEditing(false);
              }}
            >Сохранить</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Account;