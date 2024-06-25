CREATE TABLE dsc_friendship (
    user_id INT PRIMARY KEY,
    friend_id INT PRIMARY KEY,
    inviter_id INT,
)

ALTER TABLE dsc_friendship
ADD CONSTRAINT fk_user_id
FOREIGN KEY (user_id)
REFERENCES dsc_user(user_id)
ON DELETE CASCADE;

ALTER TABLE dsc_friendship
ADD CONSTRAINT fk_friend_id
FOREIGN KEY (friend_id)
REFERENCES dsc_user(user_id)
ON DELETE CASCADE;

ALTER TABLE dsc_friendship
ADD CONSTRAINT fk_inviter_id
FOREIGN KEY (inviter_id)
REFERENCES dsc_user(user_id)
ON DELETE CASCADE;

