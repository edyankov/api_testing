import os
import time
import pytest
from dotenv import load_dotenv
from api.clickup_client import ClickUpClient

load_dotenv()

TOKEN = os.getenv("CLICKUP_TOKEN")
TEAM_ID = os.getenv("CLICKUP_TEAM_ID")
USER_ID = int(os.getenv("CLICKUP_USER_ID", "0"))


@pytest.fixture(scope="module")
def client():
    return ClickUpClient(TOKEN)


@pytest.fixture(scope="module")
def goal_context():
    return {"goal_id": None, "name": f"py_goal_{int(time.time())}"}


class TestGoalLifecycle:
    """Full lifecycle: create -> verify -> update -> negative -> delete."""

    # 1. CREATE
    def test_create_goal(self, client, goal_context):
        body = {
            "name": goal_context["name"],
            "due_date": int((time.time() + 7 * 24 * 3600) * 1000),
            "description": "Created by pytest autotest",
            "multiple_owners": True,
            "owners": [USER_ID],
            "color": "#32a852",
        }
        res = client.create_goal(TEAM_ID, body)
        assert res.status_code == 200, res.text
        goal = res.json()["goal"]
        assert "id" in goal
        assert goal["name"] == goal_context["name"]
        goal_context["goal_id"] = goal["id"]

    # 2. VERIFY by ID
    def test_get_goal(self, client, goal_context):
        res = client.get_goal(goal_context["goal_id"])
        assert res.status_code == 200, res.text
        goal = res.json()["goal"]
        assert goal["id"] == goal_context["goal_id"]
        assert goal["name"] == goal_context["name"]

    # 2b. VERIFY in list
    def test_goal_in_list(self, client, goal_context):
        res = client.get_goals(TEAM_ID)
        assert res.status_code == 200, res.text
        goals = res.json().get("goals", [])
        ids = [g["id"] for g in goals]
        print("All goal IDs:", ids)
        assert goal_context["goal_id"] in ids

    # 3. UPDATE
    def test_update_goal(self, client, goal_context):
        new_name = goal_context["name"] + "_updated"
        body = {
            "name": new_name,
            "due_date": int((time.time() + 14 * 24 * 3600) * 1000),
            "description": "Updated by pytest autotest",
            "rem_owners": [],
            "add_owners": [USER_ID],
            "color": "#e63946",
        }
        res = client.update_goal(goal_context["goal_id"], body)
        assert res.status_code == 200, res.text
        assert res.json()["goal"]["name"] == new_name
        goal_context["name"] = new_name

    # NEGATIVE: no token
    def test_get_goal_without_token(self, client, goal_context):
        res = client.get_goal(goal_context["goal_id"], with_token=False)
        assert res.status_code in (400, 401)

    # 4. DELETE
    def test_delete_goal(self, client, goal_context):
        res = client.delete_goal(goal_context["goal_id"])
        assert res.status_code == 200, res.text
