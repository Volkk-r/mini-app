import { useUser } from '../context/UserContext';
import { useRef, useState } from 'react';
import styled from '@emotion/styled';
import { IconCop, IconCopy, IconEdit } from '../icon/icons.tsx';


const AccountContainer = styled.div<{ isEditing: boolean }>`

  ${props => props.isEditing && `background: white;`}
`;

const AccountCard = styled.div`
  padding: 16px;
  padding-bottom: 76px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.06);
`;

const AccountHeader = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const AccountHeaderActions = styled.div`
  position: absolute;
  top: 8px;
  right: 12px;
  display: flex;
  gap: 8px;
  z-index: 5;
`;

const AccountAction = styled.button`
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 8px;
  display: grid;
  place-items: center;
  cursor: pointer;
  background: #f3f4f6;
  color: #111827;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  transition: transform 0.12s ease, background-color 0.12s ease;

  &:hover {
    transform: translateY(-1px);
  }

  &.save {
    background: #1f6feb;
    color: white;
  }
`;

const AccountAvatarWrapper = styled.div`
  display: grid;
  place-items: center;
`;

const AccountAvatar = styled.img`
  width: 96px;
  height: 96px;
  border-radius: 50%;
  object-fit: cover;
`;

const AccountChangePhoto = styled.button`
  margin: 8px 0 10px;
  font-size: 14px;
  color: #1f6feb;
  background: none;
  border: none;
  cursor: pointer;
`;

const AccountName = styled.div`
  text-align: center;
`;

const AccountFullname = styled.div`
  font-weight: 500;
  font-size: 17px;
  line-height: 153%;
`;

const AccountMeta = styled.div`
  color: #6b7280;
  font-size: 16px;
  line-height: 150%;
`;

const Field = styled.div`
  position: relative;
  margin-top: 12px;
`;

const FieldLabel = styled.div<{ isEditing?: boolean }>`
  position: absolute;
  left: 12px;
  top: 0;
  transform: translateY(-50%);
  background: white;
  padding: 0 6px;
  color: #a2acb0;
  font-size: 15px;
  line-height: 1;
  pointer-events: none;

  ${props => props.isEditing && `color: #1f6feb;`}
`;

const Input = styled.input<{ isEditing?: boolean }>`
  width: 100%;
  padding: 16px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  background: white;
  color: #111827;
  font-size: 16px;
  line-height: 150%;
  box-sizing: border-box;

  &:focus {
    border-color: #1f6feb;
    box-shadow: 0 0 0 3px rgba(31,111,235,0.15);
    outline: none;
  }

  ${props => props.isEditing && `
    border-color: #1f6feb;
  `}

  &[disabled], &[readonly] {
    color: #111827 !important;
    background: white !important;
    cursor: default;
  }
`;

const TextareaWrapper = styled.div<{ isEditing?: boolean }>`
  padding: 16px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  background: white;
  overflow-y: auto;

  ${props => props.isEditing && `
    border-color: #1f6feb;

    &:focus-within {
      border-color: #1f6feb;
      box-shadow: 0 0 0 3px rgba(31,111,235,0.15);
    }
  `}
`;

const Textarea = styled.textarea`
  width: 100%;
  min-height: 135px;
  border: none;
  outline: none;
  resize: none;
  background: transparent;
  font-size: 16px;
  line-height: 150%;
  color: #111827;
`;

const WebsiteField = styled.div`
  position: relative;
  margin: 20px 0;
`;

const WebsiteInput = styled.input<{ isEditing?: boolean; readOnly?: boolean }>`
  width: 100%;
  padding: 16px;
  border: none;
  border-radius: 10px;
  background: rgba(67,120,255,0.05);
  color: #1f6feb;
  font-size: 16px;
  line-height: 150%;
  cursor: ${props => props.readOnly ? 'pointer' : 'text'};

  ${props => props.isEditing && `
    border: 1px solid #1f6feb;
    background: white;
    color: #111827;
    cursor: text;

    &:focus {
      box-shadow: 0 0 0 3px rgba(31,111,235,0.15);
      outline: none;
    }
  `}
`;

const CopyButton = styled.button<{ copied?: boolean }>`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  padding: 4px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: ${props => props.copied ? '#059669' : '#e5e7eb'};
  }
`;

const EditCheckboxList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const EditCheckboxItem = styled.label<{ checked: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: 10px;
  background: ${props => props.checked ? '#eef2ff' : '#f3f4f6'};
  color: ${props => props.checked ? '#1f6feb' : '#4b5563'};
  font-size: 14px;
  cursor: pointer;

  input {
    accent-color: #1f6feb;
  }
`;

const AccountTagsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px 12px;
`;

const AccountTag = styled.span`
  padding: 8px 16px;
  background: #f3f4f6;
  border-radius: 12px;
  font-size: 15px;
  color: #374151;
`;


const TechSection = styled.div`
  margin-top: 24px;
`;

const TechTitle = styled.div`
  font-size: 15px;
  color: #a2acb0;
  transform: translateY(-50%);
  margin-bottom: 8px;
`;

const TagsBox = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 12px 14px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  min-height: 48px;
`;

const TechTag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: #eef2ff;
  color: #1f6feb;
  border-radius: 9999px;
  font-size: 13px;
`;

const RemoveTag = styled.button`
  background: none;
  border: none;
  color: inherit;
  font-size: 16px;
  cursor: pointer;
  padding: 0 2px;
`;

const TechInput = styled.input`
  width: 100%;
  margin-top: 12px;
  padding: 12px 16px;
  border: 1px solid #1f6feb;
  border-radius: 8px;
  font-size: 15px;
  background: white;

  &:focus {
    border-color: #1f6feb;
    box-shadow: 0 0 0 3px rgba(31,111,235,0.12);
    outline: none;
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const AddButton = styled.button`
 padding: 10px 28px;
  background: #4378FF1A;
  color: #007AFF;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  margin-top: 12px;
  align-self: flex-start;
  width: 100%;
`;
const DirectionEditContainer = styled.div<{ isEditing?: boolean }>`
  border: 1px solid ${({ isEditing }) => (isEditing ? '#1f6feb' : '#e5e7eb')};
  border-radius: 10px;
  background: ${({ isEditing }) => (isEditing ? '#ffffff' : '#f9fafb')};
  padding: 12px 14px;
  margin-top: 30px;
  transition: border-color 0.2s, box-shadow 0.2s;

  ${({ isEditing }) =>
    isEditing &&
    `
      border-color: #1f6feb;
  
  `}
`;

function AccountPage() {
  const { user, updateUserProfile } = useUser();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [form, setForm] = useState({
    fullName: user?.fullName ?? '',
    age: String(user?.age ?? ''),
    course: user?.course ?? '',
    website: user?.website ?? '',
    username: user?.username ?? '',
    email: user?.email ?? '',
    phone: user?.phone ?? '',
    about: user?.about ?? '',
    techStack: (user?.techStack ?? []).join(', '),
  });

  const [directionTags, setDirectionTags] = useState<string[]>(
    user?.direction?.split(/[,;/]\s*/).filter(Boolean) ?? ['Frontend']
  );

  const [techTags, setTechTags] = useState<string[]>(user?.techStack ?? []);
  const [tagInput, setTagInput] = useState('');

  const AVAILABLE_DIRECTIONS = ['Frontend', 'Backend', 'UX/UI'];

  const updateField = (key: keyof typeof form, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  if (!user) return <div style={{ padding: 16 }}>Вы не авторизованы.</div>;

  return (
    <AccountContainer isEditing={isEditing}>
      <AccountCard>
        <AccountHeader>
          <AccountHeaderActions>
            {!isEditing ? (
              <AccountAction onClick={() => setIsEditing(true)}>
                <IconEdit />
              </AccountAction>
            ) : (
              <>
                <AccountAction
                  onClick={() => {
                    setIsEditing(false);
                    
                    setForm({
                      fullName: user.fullName ?? '',
                      age: String(user.age ?? ''),
                      course: user.course ?? '',
                      website: user.website ?? '',
                      username: user.username ?? '',
                      email: user.email ?? '',
                      phone: user.phone ?? '',
                      about: user.about ?? '',
                      techStack: (user.techStack ?? []).join(', '),
                    });
                    setDirectionTags(
                      user.direction?.split(/[,;/]\s*/).filter(Boolean) ?? ['Frontend']
                    );
                    setTechTags(user.techStack ?? []);
                  }}
                >
                  ✕
                </AccountAction>

                <AccountAction
                  className="save"
                  onClick={() => {
                    updateUserProfile({
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
                    });
                    setIsEditing(false);
                  }}
                >
                  ✓
                </AccountAction>
              </>
            )}
          </AccountHeaderActions>

          <AccountAvatarWrapper>
            <AccountAvatar src={user.avatarUrl} alt={user.fullName} />
          </AccountAvatarWrapper>

          {isEditing && (
            <AccountChangePhoto onClick={() => fileInputRef.current?.click()}>
              Выбрать новую фотографию
            </AccountChangePhoto>
          )}

          <AccountName>
            {isEditing ? (
              <>

                <Field>
                  <FieldLabel isEditing={isEditing}>ФИО</FieldLabel>
                  <Input  isEditing={isEditing}
                    value={form.fullName}
                    onChange={e => updateField('fullName', e.target.value)}
                  />
                </Field>

    
                <Field>
                  <DirectionEditContainer isEditing={isEditing}>
                  <FieldLabel isEditing={isEditing}>Направление</FieldLabel>
                  <EditCheckboxList>
                    {AVAILABLE_DIRECTIONS.map(opt => {
                      const checked = directionTags.includes(opt);
                      return (
                        <EditCheckboxItem key={opt} checked={checked}>
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={e => {
                              if (e.target.checked) {
                                setDirectionTags(prev => [...prev, opt]);
                              } else {
                                setDirectionTags(prev => prev.filter(v => v !== opt));
                              }
                            }}
                          />
                          <span>{opt}</span>
                        </EditCheckboxItem>
                      );
                    })}
                  </EditCheckboxList>
                  </DirectionEditContainer>
                </Field>

      
                <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
                  <Field style={{ flex: 1 }}>
                    <FieldLabel isEditing={isEditing}>Возраст</FieldLabel>
                    <Input isEditing={isEditing}
                      type="number"
                      min={14}
                      max={25}
                      value={form.age}
                      onChange={e => {
                        const val = e.target.value;
                        if (val === '' || (+val >= 14 && +val <= 25)) {
                          updateField('age', val);
                        }
                      }}
                    />
                  </Field>

                  <Field style={{ flex: 1 }}>
                    <FieldLabel isEditing={isEditing}>Курс</FieldLabel>
                    <select
                      style={{
                        width: '100%',
                        padding: '16px',
                        borderRadius: '10px',
                        fontSize: '16px',
                        border: isEditing ? '1px solid #1f6feb' : '1px solid #e5e7eb',
                        color: isEditing ? '#111827' : '#374151',
                      }}
                      value={form.course}
                      onChange={e => updateField('course', e.target.value)}
                    >
                      <option value="">Выбери курс</option>
                      <option value="1">1 курс</option>
                      <option value="2">2 курс</option>
                      <option value="3">3 курс</option>
                      <option value="4">4 курс</option>
                    </select>
                  </Field>
                </div>
              </>
            ) : (
              <>
                <AccountFullname>{user.fullName}</AccountFullname>
                <AccountMeta>
                  {user.age} лет — {user.direction} — {user.course}
                </AccountMeta>
              </>
            )}
          </AccountName>
        </AccountHeader>


        <WebsiteField>
          <WebsiteInput isEditing={isEditing}
            value={isEditing ? form.website : (user.website ?? '')}
            readOnly={!isEditing}
            onChange={e => updateField('website', e.target.value)}
            onClick={() => {
              if (!isEditing && user.website) window.open(user.website, '_blank');
            }}
            placeholder="Ссылка на портфолио"
          />
          {!isEditing && user.website && (
            <CopyButton
              copied={isCopied}
              onClick={async e => {
                e.stopPropagation();
                try {
                  await navigator.clipboard.writeText(user.website || '');
                  setIsCopied(true);
                  setTimeout(() => setIsCopied(false), 2000);
                } catch {}
              }}
            >
              {isCopied ? <IconCop /> : <IconCopy />}
            </CopyButton>
          )}
        </WebsiteField>


        <div style={{ display: 'grid', gap: '20px', marginTop: '16px' }}>
          {['username', 'email', 'phone'].map(key => (
            <Field key={key}>
              <FieldLabel isEditing={isEditing}>
                {key === 'username' ? 'Username' : key === 'email' ? 'Почта' : 'Телефон'}
              </FieldLabel>
              <Input isEditing={isEditing}
                disabled={!isEditing}
                value={isEditing ? form[key as keyof typeof form] : (user[key as keyof typeof user] ?? '')}
                onChange={e => updateField(key as keyof typeof form, e.target.value)}
              />
            </Field>
          ))}

          <Field>
            <FieldLabel isEditing={isEditing}>О себе</FieldLabel>
            <TextareaWrapper isEditing={isEditing}>
              <Textarea 
                disabled={!isEditing}
                value={isEditing ? form.about : (user.about ?? '')}
                onChange={e => updateField('about', e.target.value)}
              />
            </TextareaWrapper>
          </Field>
        </div>

{isEditing ? (
  <TechSection>
    
    <TechTitle>Стек технологий</TechTitle> 

    <TagsBox>
      {techTags.map(t => (
        <TechTag key={t}>
          #{t}
          <RemoveTag onClick={() => setTechTags(prev => prev.filter(x => x !== t))}>
            ×
          </RemoveTag>
        </TechTag>
      ))}
    </TagsBox>

    <TechInput 
      value={tagInput}
      onChange={e => setTagInput(e.target.value)}
      placeholder="Технология"
      onKeyDown={e => {
        if ((e.key === 'Enter' || e.key === ',') && tagInput.trim()) {
          e.preventDefault();
          const val = tagInput.trim();
          if (!techTags.includes(val)) {
            setTechTags([...techTags, val]);
          }
          setTagInput('');
        }
      }}
    />

    <AddButton
      type="button"
      onClick={() => {
        if (tagInput.trim()) {
          const val = tagInput.trim();
          if (!techTags.includes(val)) {
            setTechTags([...techTags, val]);
          }
          setTagInput('');
        }
      }}
      disabled={!tagInput.trim()}
    >
      Добавить
    </AddButton>
  </TechSection>
) : (

  <TechSection>
    <TechTitle>Стек технологий</TechTitle>
    <AccountTagsList>
      {techTags.map(tag => (
        <AccountTag key={tag}>#{tag}</AccountTag>
      ))}
    </AccountTagsList>
  </TechSection>
)}
      </AccountCard>
    </AccountContainer>
  );
}
export default AccountPage;
