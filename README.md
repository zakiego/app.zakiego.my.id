# Zakiego Public API set

## Twitter Public Metrics

```http
GET /api/twitter/v1/public?username={username}
```

Parameter

| Name       | Type     | Description                    |
| :--------- | :------- | :----------------------------- |
| `username` | `string` | **Required**. Twitter username |

Response

```json
{
  "error": false,
  "data": {
    "id": "2833803318",
    "username": "prasastipagi",
    "name": "Zaki",
    "tweet": 3187,
    "followers": 663,
    "following": 337
  }
}
```
