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


    def test_get_all_days(self, client):
        response = client.get("/lookup/days")
        assert response.status_code == 200
        assert len(response.json()) > 0


    def test_get_all_time_periods(self, client):
        response = client.get("/lookup/time_periods")
        assert response.status_code == 200
        data = response.json()
        assert len(data) > 0
        assert "start_time" in data[0]
        assert "end_time" in data[0]