def serialize_user(user):
    return {
        "id": str(user.get("_id")),
        "auth_id": str(user.get("auth_id", "")),
        "email": user.get("email", ""),
        "fullName": user.get("fullName", ""),
        "phone": user.get("phone", ""),
        "dob": user.get("dob", ""),
        "gender": user.get("gender", ""),
        "department": user.get("department", ""),
        "position": user.get("position", ""),
        "skills": user.get("skills", []),
        "bio": user.get("bio", ""),
        "salary": user.get("salary", 0),
        "country": user.get("country", ""),
        "address": user.get("address", ""),
        "zipCode": user.get("zipCode", ""),
        "status": user.get("status", ""),
        "startDate": user.get("startDate", "")
    }
