import { useState } from "react";
import { Form } from "react-bootstrap";

import "./AvatarUpload.css";

interface Props {
  name?: string;
  label?: string;
  currentAvatar?: string | null;
}

function AvatarUpload({
  name = "avatar",
  label = "Profile Picture",
  currentAvatar = null,
}: Props) {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    currentAvatar
  );
  const [avatarFeedback, setAvatarFeedback] = useState("");

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setAvatarPreview(reader.result as string);
      reader.readAsDataURL(file);

      if (file.size > 2 * 1024 * 1024) {
        event.currentTarget.setCustomValidity(
          "We only accept files smaller than 2MB"
        );
        setAvatarFeedback("We only accept files smaller than 2MB");
      } else {
        event.currentTarget.setCustomValidity("");
        setAvatarFeedback("");
      }
    }
  };

  return (
    <div className="avatar-section">
      <div className="avatar-preview">
        {avatarPreview ? (
          <img src={avatarPreview ?? undefined} alt="Avatar preview" />
        ) : (
          <span className="avatar-placeholder">No image</span>
        )}
      </div>
      <Form.Group>
        <Form.Label htmlFor={name}>{label}</Form.Label>
        <Form.Control
          id={name}
          name={name}
          type="file"
          accept="image/jpeg, image/png, image/webp"
          onChange={handleAvatarChange}
          isInvalid={!!avatarFeedback}
        />
        <Form.Text>JPEG, PNG, or WebP - max 2MB</Form.Text>
        <Form.Control.Feedback type="invalid">
          {avatarFeedback}
        </Form.Control.Feedback>
      </Form.Group>
    </div>
  );
}

export default AvatarUpload;
