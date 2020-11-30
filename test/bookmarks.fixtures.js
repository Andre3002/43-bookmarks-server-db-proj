
function makeBookmarksArray() {
    return [
        {
            "id": 1,
            "title": "First bookmark!",
            "url": "www.test.com",
            "description": "Lorem ipsum dolor sit amet",
            "rating": 5
        },
        {
            "id": 2,
            "title": "Second bookmark!",
            "url": "www.test2.com",
            "description": "Cum, exercitationem cupiditate",
            "rating": 1
        },
        {
            "id": 3,
            "title": "Third bookmark!",
            "url": "www.test3.com",
            "description": "Possimus, voluptate ipsa dignissimos",
            "rating": 2
        },
    ];
}

module.exports = {
    makeBookmarksArray,
}