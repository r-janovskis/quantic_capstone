# Signup with a new email -> success
def test_signup_success(client):
    response = client.post("/auth/signup", json={
        "email": "test@example.com",
        "password": "Password123!"
    })
    assert response.status_code == 200
    assert response.json()["status"] == "Success"

#Signup with an existing email -> error
def test_signup_with_existing_email(client):
    response = client.post("/auth/signup", json={
        "email": "test@example.com",
        "password": "Password123!"
    })
    assert response.status_code == 200
    assert response.json()["status"] == "Error"

# Login with valid credentials -> returns token
def test_login_success(client):
    response = client.post("/auth/login", json={
        "email": "test@example.com",
        "password": "Password123!"
    })
    assert response.status_code == 200
    assert response.json()["status"] == "Success"
    assert "token" in response.json()


# Login with unknown email -> error
def test_login_with_unknown_email(client):
    response = client.post("/auth/login", json={
        "email": "test_unknown@example.com",
        "password": "Password123!"
    })
    assert response.status_code == 200
    assert response.json()["status"] == "Error"

# Verify with a valid token -> 200
def test_verify_with_valid_token(client):
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
def test_verify_with_invalid_token(client):
    response = client.get("/auth/verify", headers={
        "Authorization": "Bearer invalid_token"
    })
    assert response.status_code == 401


# Email:Invalid format -> 422
def test_signup_with_invalid_email(client):
    response = client.post("auth/signup", json={
        "email": "invalid_email",
        "password": "Password123!"
    })
    assert response.status_code == 422


# Email: Missing domain -> 422
def test_signup_email_missing_domain(client):
    response = client.post("auth/signup", json={
        "email": "invalid_email@",
        "password": "Password123!"
    })
    assert response.status_code == 422


# Password: too short -> 422
def test_signup_password_too_short(client):
    response = client.post("auth/signup", json={
        "email": "test@password.com",
        "password": "Pa1!"
    })
    assert response.status_code == 422


# Password: No uppercase -> 422
def test_signup_password_no_uppercase(client):
    response = client.post("auth/signup", json={
        "email": "test@password.com",
        "password": "password123!"
    })
    assert response.status_code == 422


# Password: No number -> 422
def test_signup_password_no_number(client):
    response = client.post("auth/signup", json={
        "email": "test@password.com",
        "password": "Password!!!!!!"
    })
    assert response.status_code == 422


# Password: No special char -> 422
def test_signup_passowr_no_special(client):
    response = client.post("auth/signup", json={
        "email": "test@password.com",
        "password": "Password1234"
    })
    assert response.status_code == 422