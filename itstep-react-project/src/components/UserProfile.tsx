import { useQuery } from "@tanstack/react-query";
import api from "../api/client";

export const fetchProfile = async () => {
  const response = await api.get("/api/update-profile");
  return response.data;
};

export interface UserProfileProps {
  fullName?: string;
  phone?: string;
  email?: string;
  city?: string;
  specialty?: string;
}

export default function UserProfile({
  fullName: fallbackFullName = "Лев",
  phone: fallbackPhone = "+380 12 345 67 89",
  email: fallbackEmail = "lvumba@gmail.com",
  city: fallbackCity = "Одеса, Україна",
  specialty: fallbackSpecialty = "Fullstack Developer",
}: UserProfileProps) {
  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
  });

  const fullName = profile?.fullName || fallbackFullName;
  const phoneNumbers = profile?.phones
    ?.map((entry: { number: string }) => entry.number)
    .filter((number: string) => number.trim());
  const phones =
    phoneNumbers?.length ? phoneNumbers : [profile?.phone || fallbackPhone];
  const email = profile?.email || fallbackEmail;
  const city = profile?.city || fallbackCity;
  const specialty = profile?.specialty || fallbackSpecialty;

  return (
    <div className="profile-card">
      <div className="avatar-placeholder">
        {fullName ? fullName.charAt(0) : "Л"}
      </div>
      <h2>{fullName}</h2>
      <p className="specialty-badge">{specialty}</p>
      <div className="contact-info">
        <div className="contact-row">
          <span className="label">Телефон:</span>
          <span className="value flex flex-col items-end gap-1">
            {phones.map((phone: string, index: number) => (
              <span key={`${phone}-${index}`}>{phone}</span>
            ))}
          </span>
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
