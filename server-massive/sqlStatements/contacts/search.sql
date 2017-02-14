SELECT *
FROM "Contacts"
WHERE id < ?last_seen_id
ORDER BY id DESC
FETCH FIRST "10" ROWS ONLY;
