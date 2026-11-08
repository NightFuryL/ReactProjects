interface UserProfileProps {
  fullName: string;
  phone: string;
  email: string;
  city: string;
  specialty: string;
}

export default function UserProfile({
  fullName,
  phone,
  email,
  city,
  specialty,
}: UserProfileProps) {
  return (
    <div className="profile-card">
      <div className="avatar-placeholder">
        {fullName.charAt(0)}
      </div>
      <h2>{fullName}</h2>
      <p className="specialty-badge">{specialty}</p>
      <div className="contact-info">
        <div className="contact-row">
          <span className="label">Телефон:</span>
          <span className="value">{phone}</span>
        </div>
        <div className="contact-row">
          <span className="label">Email:</span>
          <span className="value">{email}</span>
        </div>
        <div className="contact-row">
          <span className="label">Місто:</span>
          <span className="value">{city}</span>
        </div>
      </div>
    </div>
  );
}
