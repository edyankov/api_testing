import requests


class ClickUpClient:
    BASE_URL = "https://api.clickup.com/api/v2"

    def __init__(self, token):
        self.token = token

    def _headers(self, with_token=True):
        headers = {"Content-Type": "application/json"}
        if with_token and self.token:
            headers["Authorization"] = self.token
        return headers

    def create_goal(self, team_id, body):
        return requests.post(
            f"{self.BASE_URL}/team/{team_id}/goal",
            headers=self._headers(),
            json=body,
        )

    def get_goal(self, goal_id, with_token=True):
        return requests.get(
            f"{self.BASE_URL}/goal/{goal_id}",
            headers=self._headers(with_token),
        )

    def get_goals(self, team_id):
        return requests.get(
            f"{self.BASE_URL}/team/{team_id}/goal",
            headers=self._headers(),
        )

    def update_goal(self, goal_id, body):
        return requests.put(
            f"{self.BASE_URL}/goal/{goal_id}",
            headers=self._headers(),
            json=body,
        )

    def delete_goal(self, goal_id):
        return requests.delete(
            f"{self.BASE_URL}/goal/{goal_id}",
            headers=self._headers(),
        )
