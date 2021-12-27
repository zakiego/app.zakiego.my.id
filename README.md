# Zakiego Public API set

## Twitter Public Metrics

```http
GET /api/twitter/v1/public?username={username}
```

Parameter

| Name       | Type     | Description                    |
| :--------- | :------- | :----------------------------- |
| `username` | `string` | **Required**. Twitter username |

Example

```
https://app.zakiego.my.id/api/twitter/v1/public?username=prasastipagi
```

Response

```json
{
  "error": false,
  "data": {
    "id": "2833803318",
    "username": "prasastipagi",
    "name": "Zaki",
    "tweet": 3187,
    "followers": 662,
    "following": 337,
    "timestamp": "2021-12-23T05:17:23.320+00:00"
  }
}
```

## Countdown Ramadan

```http
GET /api/ramadan/v1/countdown?utc={utc}
```

Parameter

| Name  | Type    | Description                                |
| :---- | :------ | :----------------------------------------- |
| `utc` | `float` | **Optional**. Default value is 0. UTC time |

Example

```
https://app.zakiego.my.id/api/ramadan/v1/countdown?utc=8
```

Response

```json
  "error": false,
  "data": {
    "utc": 8,
    "today": "2021/12/27 06:44:01",
    "nextRamadan": "2022/4/2",
    "countdown": 96,
    "isRamadanNow": false,
    "ramadanDay": 0,
    "ramadanProgress": "0%"
  }
```
