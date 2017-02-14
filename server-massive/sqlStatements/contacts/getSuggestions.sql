SELECT * FROM "Contacts"
WHERE "firstName" ILIKE $1
OR "lastName" ILIKE $1
OR "middleName" ILIKE $1;
