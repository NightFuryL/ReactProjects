import { useState, type ChangeEvent } from "react";

export interface ProfileState {
  name: string;
  specialty: string;
  ContactPhone: string;
  ContactEmail: string;
  isOnline: boolean;
}

interface ProfileEditorProps {
  initialProfile?: ProfileState;
  onProfileChange?: (profile: ProfileState) => void;
}

export default function ProfileEditor({
  initialProfile,
  onProfileChange,
}: ProfileEditorProps) {
  const [profile, setProfile] = useState<ProfileState>(
    initialProfile || {
      name: "Лев",
      specialty: "Full stack Developer",
      ContactPhone: "+380 11 111 1111",
      ContactEmail: "lvumba@example.com",
      isOnline: true,
    }
  );

  const updateProfile = (newProfile: ProfileState) => {
    setProfile(newProfile);
    if (onProfileChange) {
      onProfileChange(newProfile);
    }
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateProfile({
      ...profile,
      name: e.target.value,
    });
  };

  const handleSpecialtyChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateProfile({
      ...profile,
      specialty: e.target.value,
    });
  };

  const handleOnlineChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateProfile({
      ...profile,
      isOnline: e.target.checked,
    });
  };

  return (
    <div className="profile-editor-container">
      <div className="editor-column form-column">
        <h3>Налаштування профілю</h3>
        <div className="input-group">
          <label htmlFor="name-input">Ім'я:</label>
          <input
            id="name-input"
            type="text"
            value={profile.name}
            onChange={handleNameChange}
            placeholder="Введіть ваше ім'я"
          />
        </div>

        <div className="input-group">
          <label htmlFor="specialty-input">Спеціальність:</label>
          <input
            id="specialty-input"
            type="text"
            value={profile.specialty}
            onChange={handleSpecialtyChange}
            placeholder="Введіть спеціальність"
          />
        </div>
        <div className="input-group">
          <label htmlFor="phone-input">Телефон:</label>
          <input
            id="phone-input"
            type="text"
            value={profile.ContactPhone}
            onChange={(e) =>
              updateProfile({ ...profile, ContactPhone: e.target.value })
            }
            placeholder="Введіть номер телефону"
          />
        </div>
        <div className="input-group">
          <label htmlFor="email-input">Email:</label>
          <input
            id="email-input"
            type="email"
            value={profile.ContactEmail}
            onChange={(e) =>
              updateProfile({ ...profile, ContactEmail: e.target.value })
            }
            placeholder="Введіть email"
          />
        </div>
        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              checked={profile.isOnline}
              onChange={handleOnlineChange}
            />
            Статус онлайн
          </label>
        </div>
      </div>

      <div className="editor-column preview-column">
        <h3>Прев'ю бейджика</h3>
        <div className="preview-badge">
          <div className="badge-avatar">
            {profile.name ? profile.name.charAt(0).toUpperCase() : "?"}
          </div>
          <div className="badge-info">
            <div className="badge-name-row">
              <h4>{profile.name || "Без імені"}</h4>
              {profile.isOnline && <span className="online-indicator"></span>}
            </div>
            <p className="badge-specialty">
              {profile.specialty || "Без спеціальності"}
            </p>
            <p className="badge-contact">
              Телефон: {profile.ContactPhone || "Не вказано"}
            </p>
            <p className="badge-contact">
              Email: {profile.ContactEmail || "Не вказано"}
            </p>
            <p className="badge-status-text">
              {profile.isOnline ? "Зараз у мережі" : "Не в мережі"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
