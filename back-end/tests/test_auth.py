class TestSignup:
    # Signup with a new email -> success
    def test_signup_success(self, client):
        response = client.post("/auth/signup", json={
            "email": "test@example.com",
            "password": "Password123!"
        })
        assert response.status_code == 200
        assert response.json()["status"] == "Success"

    #Signup with an existing email -> error
    def test_signup_with_existing_email(self, client):
        response = client.post("/auth/signup", json={
            "email": "test@example.com",
            "password": "Password123!"
        })
        assert response.status_code == 409


class TestLogin:
    # Login with valid credentials -> returns token
    def test_login_success(self, client):
        response = client.post("/auth/login", json={
            "email": "test@example.com",
            "password": "Password123!"
        })
        assert response.status_code == 200
        assert response.json()["status"] == "Success"
        assert "token" in response.json()


    # Login with unknown email -> error
    def test_login_with_unknown_email(self, client):
        response = client.post("/auth/login", json={
            "email": "test_unknown@example.com",
            "password": "Password123!"
        })
        assert response.status_code == 401


class TestVerify:
    # Verify with a valid token -> 200
    def test_verify_with_valid_token(self, client):
        response = client.post("/auth/login", json={
            "email": "test@example.com",
            "password": "Password123!"
        })
        token = response.json()["token"]

        response = client.get("/auth/verify", headers={
            "Authorization": f"Bearer {token}"
        })
        assert response.status_code == 200


    #Verify with an expired/invalid token -> 401
    def test_verify_with_invalid_token(self, client):
        response = client.get("/auth/verify", headers={
            "Authorization": "Bearer invalid_token"
        })
        assert response.status_code == 401


class TestEmail:
    # Email:Invalid format -> 422
    def test_signup_with_invalid_email(self, client):
        response = client.post("auth/signup", json={
            "email": "invalid_email",
            "password": "Password123!"
        })
        assert response.status_code == 422


    # Email: Missing domain -> 422
    def test_signup_email_missing_domain(self, client):
        response = client.post("auth/signup", json={
            "email": "invalid_email@",
            "password": "Password123!"
        })
        assert response.status_code == 422


class TestPassword:
    # Password: too short -> 422
    def test_signup_password_too_short(self, client):
        response = client.post("auth/signup", json={
            "email": "test@password.com",
            "password": "Pa1!"
        })
        assert response.status_code == 422


    # Password: No uppercase -> 422
    def test_signup_password_no_uppercase(self, client):
        response = client.post("auth/signup", json={
            "email": "test@password.com",
            "password": "password123!"
        })
        assert response.status_code == 422


    # Password: No number -> 422
    def test_signup_password_no_number(self, client):
        response = client.post("auth/signup", json={
            "email": "test@password.com",
            "password": "Password!!!!!!"
        })
        assert response.status_code == 422


    # Password: No special char -> 422
    def test_signup_passowr_no_special(self, client):
        response = client.post("auth/signup", json={
            "email": "test@password.com",
            "password": "Password1234"
        })
        assert response.status_code == 422