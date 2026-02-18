import { useUser } from '../context/UserContext';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { IconCop, IconCopy, IconEdit } from '../icon/icons.tsx';

import type { UserProfile } from '../types/user'; 

const AccountContainer = styled.div<{ isEditing: boolean }>`
  ${props => props.isEditing && `background: white;`}
`;

const AccountCard = styled.div`
  padding: 16px;
  padding-bottom: 76px;
  background: white;
  border-radius: 16px;
 
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
  width: 48px;
  height: 48px;
  font-size: 18px;
  border: none;
  border-radius: 8px;
  display: grid;
  place-items: center;
  cursor: pointer;
  background: #c3f8ff1a
  color: #111827;



  &.save {
    background: #007AFF;
    color: white;
  }
    &.cancel {
    background: #4378FF1A;
    color: #007AFF;
   
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
  font-size: 15px;
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

const FieldLabel = styled.label<{ isEditing?: boolean; isFocused?: boolean }>`
  position: absolute;
  left: 12px;
  top: 0;
  transform: translateY(-50%);
  background: white;
  padding: 0 6px;
  color: #9ca3af;
  color: ${props => {
    if (props.isFocused) return '#1f6feb';
    if (props.isEditing) return '#9ca3af';
  
  }};
  font-size: 15px;
  line-height: 1;
  pointer-events: none;
  transition: color 0.2s ease;
  
 
`;

const Input = styled.input<{ isEditing?: boolean }>`
  width: 100%;
  padding: 16px;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  background: white;
  color: #111827;
  font-size: 16px;
  line-height: 150%;
  box-sizing: border-box;
  
  &:focus {
    border-color: #1f6feb;

    outline: none;
  }
  
  ${props => props.isEditing && `
    &:focus {
      border-color: #1f6feb;
      outline: none;
    }
  `}
  
  &[disabled], &[readonly] {
    color: #111827 !important;
    background: white !important;
    cursor: default;
  }

`;

const TextareaWrapper = styled.div<{ isEditing?: boolean }>`
  padding: 16px;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  background: white;
  overflow-y: auto;
  margin-bottom: 20px;
  
  ${props => props.isEditing && `
    &:focus-within {
      border-color: #1f6feb;
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
margin-top:30px;
  
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
  cursor: ${props => (props.readOnly ? 'pointer' : 'text')};
  transition: all 0.2s ease;

  ${props =>
    props.isEditing &&
    `
    border: 2px solid #e5e7eb;
    background: white;
    color: #111827;
    cursor: text;

    &:focus {
      border-color: #1f6feb;
      outline: none;

    }

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
`;

const EditCheckboxList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 8px;
`;

const EditCheckboxItem = styled.label<{ checked: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 6px 12px;
  background: #f3f4f6;
  color: #374151;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  background: ${props => props.checked ? '#eef2ff' : '#f3f4f6'};
  color: #4b5563;
  cursor: pointer;
 
`;

const AccountTagsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px 12px;
`;

const AccountTag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 6px 12px;
  background: #f3f4f6;
  color: #374151;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
`;




const TagsBox = styled.div`
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  padding: 24px 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  min-height: 48px;
`;

const TechTag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 6px 12px;
  background: #f3f4f6;
  color: #374151;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
`;

const RemoveTag = styled.button`
  background: none;
  border: none;
  color: #707579;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
  padding-left: -12px;
`;

const TechInput = styled.input`
  width: 100%;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 15px;
  background: white;
   padding: 16px;



  &:focus {
    border-color: #1f6feb;
    outline: none;
  }

  &::placeholder {
    color: #adb1b6;
  }
`;

const AddButton = styled.button`
  padding: 12px 28px;
  background: #4378FF1A;
  color: #007AFF;
  border: none;
  border-radius: 14px;
  font-size: 17px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 20px;
  align-self: flex-start;
  width: 100%;
`;

const DirectionEditContainer = styled.div<{ isEditing?: boolean }>`
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  background: #f9fafb;
  padding: 12px 14px;
  margin-top: 30px;
  transition: all 0.2s ease;

  ${props => props.isEditing && `
    background: white;

    &:focus-within {
      border-color: #1f6feb;

    }
  `}
`;

const Select = styled.select<{ isEditing?: boolean }>`
  width: 100%;
  padding: 16px;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  font-size: 16px;
  line-height: 150%;
  background: white;
  color: #111827;

    appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'/></svg>");
  background-repeat: no-repeat;
  background-position: right 16px center;
  background-size: 16px;
  padding-right: 40px;


  &:focus {
    outline: none;
  }

  ${({ isEditing }) =>
    isEditing &&
    `
    &:focus {
      border-color: #1f6feb;

    }
  `}
`;

function AccountPage() {
  const { user, updateUserProfile } = useUser() as {
    user: UserProfile | null;
    updateUserProfile: (updates: Partial<UserProfile>) => Promise<void>;
  };

  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isCopied, setIsCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

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

  const AVAILABLE_DIRECTIONS = ['Frontend', 'Backend', 'UX/UI'] as const;

  const updateField = <K extends keyof typeof form>(
    key: K,
    value: string
  ) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleEditStart = () => {
    setIsEditing(true);
    navigate('/account', { 
      state: { isEditing: true },
      replace: true
    });
  };

  const handleEditEnd = () => {
    setIsEditing(false);
    navigate('/account', { 
      state: { isEditing: false },
      replace: true
    });
  };

 const handleCancel = () => {
  handleEditEnd();
  setForm({
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
  setDirectionTags(
    user?.direction?.split(/[,;/]\s*/).filter(Boolean) ?? ['Frontend']
  );
  setTechTags(user?.techStack ?? []);
};

const handleSave = () => {
  if (!user) return;
  
  const updates: Partial<UserProfile> = {
    fullName: form.fullName.trim() || undefined,
    age: form.age ? Number(form.age) : undefined,
    direction: directionTags.length ? directionTags.join(', ') : undefined,
    course: form.course || undefined,
    website: form.website.trim() || undefined,
    username: form.username.trim() || undefined,
    email: form.email.trim() || undefined,
    phone: form.phone.trim() || undefined,
    about: form.about.trim() || undefined,
    techStack: techTags.length ? techTags : undefined,
  };
  
  updateUserProfile(updates);
  handleEditEnd();
};

  if (!user) {
    return <div style={{ padding: 16 }}>Вы не авторизованы.</div>;
  }

  return (
    <AccountContainer isEditing={isEditing}>
      <AccountCard>
        <AccountHeader>
          <AccountHeaderActions>
            {!isEditing ? (
              <AccountAction onClick={handleEditStart}>
                <IconEdit />
              </AccountAction>
            ) : (
              <>
                <AccountAction 
                className="cancel"
                onClick={handleCancel}>
                  ✕
                  
                </AccountAction>
                <AccountAction
                  className="save"
                  onClick={handleSave}
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
                  <FieldLabel 
                    isEditing={isEditing} 
                    isFocused={focusedField === 'fullName'}
                  >
                    ФИО
                  </FieldLabel>
                  <Input
                    isEditing={isEditing}
                    value={form.fullName}
                    onChange={e => updateField('fullName', e.target.value)}
                    onFocus={() => setFocusedField('fullName')}
                    onBlur={() => setFocusedField(null)}
                  />
                </Field>

                <Field>
                  <DirectionEditContainer isEditing={isEditing}>
                    <FieldLabel 
                      isEditing={isEditing}
                      isFocused={focusedField === 'direction'}
                    >
                      Направление
                    </FieldLabel>
                    <EditCheckboxList>
                      {AVAILABLE_DIRECTIONS.map(opt => {
                        const checked = directionTags.includes(opt);
                        return (
                          <EditCheckboxItem key={opt} checked={checked}>
                            <input
                              type="checkbox"
                              checked={checked}
                              onFocus={() => setFocusedField('direction')}
                              onBlur={() => setFocusedField(null)}
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
                    <FieldLabel 
                      isEditing={isEditing}
                      isFocused={focusedField === 'age'}
                    >
                      Возраст
                    </FieldLabel>
                    <Input
                      isEditing={isEditing}
                      type="number"
                      min={14}
                      max={25}
                      value={form.age}
                      onFocus={() => setFocusedField('age')}
                      onBlur={() => setFocusedField(null)}
                      onChange={e => {
                        const val = e.target.value;
                        if (val === '' || (+val >= 14 && +val <= 25)) {
                          updateField('age', val);
                        }
                      }}
                            style={{                              
                              appearance: 'none',
                              WebkitAppearance: 'none',
                              MozAppearance: 'none',
                              backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'/></svg>")`,
                              backgroundRepeat: 'no-repeat',
                              backgroundPosition: 'right 16px center',
                              backgroundSize: '16px',
                              paddingRight: '40px',
    }}
                    />
                  </Field>

                  <Field style={{ flex: 1, position: 'relative' }}>
                    <FieldLabel 
                      isEditing={isEditing}
                      isFocused={focusedField === 'course'}
                    >
                      Курс
                    </FieldLabel>
                    <Select
                      isEditing={isEditing}
                      value={form.course}
                      onFocus={() => setFocusedField('course')}
                      onBlur={() => setFocusedField(null)}
                      onChange={e => updateField('course', e.target.value)}
                    >
                      <option value="">Выбери курс</option>
                      <option value="1 курс">1 курс</option>
                      <option value="2 курс">2 курс</option>
                      <option value="3 курс">3 курс</option>
                      <option value="4 курс">4 курс</option>
                    </Select>
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

        <Field>
          <WebsiteField>
             {isEditing && (
              <FieldLabel 
              isEditing={isEditing}
              isFocused={focusedField === 'website'}
              >
                Ссылка на портфолио
                </FieldLabel>
              )}
            <WebsiteInput
              isEditing={isEditing}
              placeholder="url"
              readOnly={!isEditing}
              value={isEditing ? form.website : user.website ?? ''}
              onFocus={() => setFocusedField('website')}
              onBlur={() => setFocusedField(null)}
              onChange={e => updateField('website', e.target.value)}
              onClick={() => {
                if (!isEditing && user.website) {
                  window.open(user.website, '_blank');
                }
              }}
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
        </Field>

        <div style={{ display: 'grid', gap: '20px', marginTop: '16px' }}>
          {(['username', 'email', 'phone'] as const).map(key => (
            <Field key={key}>
              <FieldLabel 
                isEditing={isEditing}
                isFocused={focusedField === key}
              >
                {key === 'username' ? 'Username' : key === 'email' ? 'Почта' : 'Телефон'}
              </FieldLabel>
              <Input
                isEditing={isEditing}
                disabled={!isEditing}
                value={isEditing ? form[key] : (user[key] ?? '')}
                onFocus={() => setFocusedField(key)}
                onBlur={() => setFocusedField(null)}
                onChange={e => updateField(key, e.target.value)}
              />
            </Field>
          ))}

          <Field>
            <FieldLabel 
              isEditing={isEditing}
              isFocused={focusedField === 'about'}
            >
              О себе
            </FieldLabel>
            <TextareaWrapper isEditing={isEditing}>
              <Textarea
                disabled={!isEditing}
                value={isEditing ? form.about : (user.about ?? '')}
                onFocus={() => setFocusedField('about')}
                onBlur={() => setFocusedField(null)}
                onChange={e => updateField('about', e.target.value)}
              />
            </TextareaWrapper>
          </Field>
        </div>

        {isEditing ? (
            <Field>
            <FieldLabel 
              isEditing={isEditing}
    
            >
              Стек технологий
            </FieldLabel>
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
            <Field style={{ marginTop: '30px' }}>

              <FieldLabel 
              isEditing={isEditing}
              isFocused={focusedField === 'techStack'}
            >
             Технология
            </FieldLabel> 
            <TechInput
              value={tagInput}
              onChange={e => setTagInput(e.target.value)}
              placeholder="1C"
              onFocus={() => setFocusedField('techStack')}
              onBlur={() => setFocusedField(null)}
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
            </Field>
          
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
                   </Field>
        ) : (
          techTags.length > 0 && (
           <Field>
             <TagsBox>
                          <FieldLabel 
              isEditing={isEditing}
              
            >
              Стек технологий
            </FieldLabel>
              <AccountTagsList>
                {techTags.map(tag => (
                  <AccountTag key={tag}>#{tag}</AccountTag>
                ))}
              </AccountTagsList>
              </TagsBox>
           </Field>
          )
        )}
      </AccountCard>
    </AccountContainer>
  );
}

export default AccountPage;