import io
from PIL import Image
from unittest.mock import patch, MagicMock

# We create dict for our test volunteer
VALID_VOLUNTEER = {
    "display_name": "Test Volunteer",
    "first_name": "Test",
    "last_name": "Volunteer",
    "phone": "837541250",
    "date_of_birth": "1996-07-12",
    "area": "Dublin",
    "bio": "I'm a test bio",
    "country_id": 1,
    "shirt_size_id": 1,
    "skill_ids": [1],
    "interest_ids": [1],
    "language_ids": [1],
    "availability": [{"day_id": 1, "time_period_id": 1}]
}

def get_token(client, email, password="Password123!"):
    """
    Helper function to signup, login user and get a token
    """
    client.post("auth/signup", json={"email": email, "password": password})
    response = client.post("auth/login", json={"email": email, "password": password})
    return response.json()["token"]


def create_test_image():
    image = Image.new('RGB', (100, 100), color="red")
    buf = io.BytesIO()
    image.save(buf, format="JPEG")
    buf.seek(0)
    return buf

class TestVolunteerRegistrer:
    """
    Collection of tests for endpoint GET /volunteer/register
    """
    
    def test_register_success(self, client):
        token = get_token(client, "volunteer@example.com")
        response = client.post(
            "/volunteer/register", 
            json=VALID_VOLUNTEER, 
            headers={"Authorization": f"Bearer {token}"}
        )
        assert response.status_code == 200
        assert response.json()["status"] == "Success"


    def test_register_same_user_second_profile(self, client):
        token = get_token(client, "volunteer@example.com")
        response = client.post(
            "/volunteer/register", 
            json=VALID_VOLUNTEER, 
            headers={"Authorization": f"Bearer {token}"}
        )
        assert response.status_code == 409
        assert response.json()["detail"] == "There already is a volunteer profile associated with this email!"


    def test_register_with_invalid_token(self, client):
        response = client.post(
            "/volunteer/register", 
            json=VALID_VOLUNTEER, 
            headers={"Authorization": "Bearer INVALID_TOKEN"}
        )
        assert response.status_code == 401 


    def test_register_with_missing_required_field(self, client):
        invalid_volunteer = VALID_VOLUNTEER.copy()
        invalid_volunteer.pop("phone")

        token = get_token(client, "volunteer@example.com")
        response = client.post(
            "/volunteer/register",
            json=invalid_volunteer,
            headers={"Authorization": f"Bearer {token}"}    
        )
        assert response.status_code == 422

    
    def test_register_age_under_18(self, client):
        invalid_volunteer = VALID_VOLUNTEER.copy()
        invalid_volunteer["date_of_birth"] = "2020-01-01"
        
        token = get_token(client, "volunteer@example.com")
        response = client.post(
            "/volunteer/register",
            json=invalid_volunteer,
            headers={"Authorization": f"Bearer {token}"}
        )
        assert response.status_code == 422


class TestVolunteerProfile:
    """
    Collection of tests for endpoint GET /volunteer/me
    """
    
    def test_volunteer_profile_success(self, client):
        token = get_token(client, "volunteer@example.com")
        response = client.get(
            "/volunteer/me",
            headers={"Authorization": f"Bearer {token}"}
        )
        assert response.status_code == 200
        assert len(response.json()) == 14

    
    def test_volunteer_profile_with_no_profile(self, client):
        token = get_token(client, "fake_volunteer@example.com")
        response = client.get(
            "/volunteer/me",
            headers={"Authorization": f"Bearer {token}"}
        )

    def test_volunteer_profile_with_invalid_token(self, client):
        response = client.get(
            "/volunteer/me",
            headers={"Authorization": "Bearer INVALID_TOKEN"}
        )
        assert response.status_code == 401



class TestVolunteerUpdate:
    """
    Collection of tests for endpoint PUT /volunteer/me
    """

    def test_volunteer_update_successful(self, client):
        # Update some fields in volunteer profile 
        updated_volunteer = VALID_VOLUNTEER.copy()
        updated_volunteer["display_name"] = "Updated Name"
        updated_volunteer["phone"] = "0000000"

        token = get_token(client, "volunteer@example.com")
        response = client.put(
            "/volunteer/me", 
            json=updated_volunteer,
            headers={"Authorization": f"Bearer {token}"}
            )
        assert response.status_code == 200
        assert response.json()["status"] == "Success"


    def test_volunteer_update_with_no_profile(self, client):
        token = get_token(client, "fake_volunteer@example.com")
        response = client.put(
            "/volunteer/me",
            json=VALID_VOLUNTEER,
            headers={"Authorization": f"Bearer {token}"}
        )
        assert response.status_code == 404


    def test_volunteer_update_with_invalid_token(self, client):
        response = client.put(
            "/volunteer/me",
            json=VALID_VOLUNTEER,
            headers={"Authorization": "Bearer INVALID_TOKEN"}
        )
        assert response.status_code == 401

    
    def test_volunteer_update_with_missing_required_field(self, client):
        token = get_token(client, "volunteer@example.com")
        updated_volunteer = VALID_VOLUNTEER.copy()
        updated_volunteer.pop("first_name")
        response = client.put(
            "/volunteer/me",
            json=updated_volunteer,
            headers={"Authorization": f"Bearer {token}"}
        )
        assert response.status_code == 422

    
    def test_volunteer_update_with_age_less_than_18(self, client):
        token = get_token(client, "volunteer@example.com")
        updated_volunteer = VALID_VOLUNTEER.copy()
        updated_volunteer["date_of_birth"] = "2020-01-10"
        response = client.put(
            "/volunteer/me",
            json=updated_volunteer,
            headers={"Authorization": f"Bearer {token}"}
        )
        assert response.status_code == 422



class TestAvatarUpload:
    """
    Collection of tests for endpoint POST /volunteer/avatar
    """
    def test_avatar_upload_success(self, client):
        token = get_token(client, "volunteer@example.com")
        image = create_test_image()
        with patch("volunteer.os.makedirs"), patch("volunteer.Image") as mock_image:
            mock_image.open.return_value = MagicMock()

            response = client.post(
                "/volunteer/avatar",
                files={"file": ("avatar.jpg", image, "image/jpeg")},
                headers={"Authorization": f"Bearer {token}"}
            )
        assert response.status_code == 200
        assert response.json()["status"] == "Success"

    
    def test_avatar_upload_with_wrong_type(self, client):
        token = get_token(client, "volunteer@example.com")
        response = client.post(
            "/volunteer/avatar",
            files={"file": ("document.pdf", b"Fake content", "application/pdf")},
            headers={"Authorization": f"Bearer {token}"}
        )
        assert response.status_code == 400
        

    def test_avatar_upload_with_no_volunteer_profile(self, client):
        token = get_token(client, "organiser@example.com")
        response = client.post(
            "/volunteer/avatar",
            files={"file": ("avatar.jpg", b"Fake content", "image/jpeg")},
            headers={"Authorization": f"Bearer {token}"}
        )
        assert response.status_code == 404


    def test_avatar_upload_with_invalid_token(self, client):
        response = client.post(
            "/volunteer/avatar",
            files={"file": ("avatar.jpg", b"Fake content", "image/jpeg")},
            headers={"Authorization": "Bearer INVALID_TOKEN"}
        )
        assert response.status_code == 401
