const userNames = [
    "omeasraf",
    "admin",
    "root",
    "sudo"
];

function checkReserved(username) {
    return userNames.includes(username);
}

module.exports = checkReserved;