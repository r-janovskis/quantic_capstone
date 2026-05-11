class TestLookup:
    def test_get_all_countries(self, client):
        response = client.get("/lookup/countries")
        assert response.status_code == 200
        assert len(response.json()) > 0

    def test_get_all_skills(self, client):
        response = client.get("/lookup/skills")
        assert response.status_code == 200
        assert len(response.json()) > 0


    def test_get_all_interests(self, client):
        response = client.get("/lookup/interests")
        assert response.status_code == 200
        assert len(response.json()) > 0


    def test_get_all_languages(self, client):
        response = client.get("/lookup/languages")
        assert response.status_code == 200
        assert len(response.json()) > 0


    def test_get_all_shirt_sizes(self, client):
        response = client.get("/lookup/shirt_sizes")
        assert response.status_code == 200
        assert len(response.json()) > 0