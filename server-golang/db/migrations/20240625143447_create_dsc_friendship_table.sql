-- migrate:up
CREATE TABLE dsc_friendship (
    user_id INT NOT NULL,
    friend_id INT NOT NULL,
    inviter_id INT NOT NULL,
    ------- invite_status
    -- 0 -- pending
    -- 1 -- accepted 
    -- 2 -- declined
    -------
    invite_status INT NOT NULL DEFAULT 0,
    
    ------- block_status
    -- 0 -- not blocked
    -- 1 -- blocked
    -------
    block_status INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,

    CONSTRAINT pk_dsc_friendship PRIMARY KEY (user_id, friend_id, inviter_id),
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES dsc_user(user_id) ON DELETE CASCADE,
    CONSTRAINT fk_friend_id FOREIGN KEY (friend_id) REFERENCES dsc_user(user_id) ON DELETE CASCADE,
    CONSTRAINT fk_inviter_id FOREIGN KEY (inviter_id) REFERENCES dsc_user(user_id) ON DELETE CASCADE
);

-- migrate:down
DROP TABLE IF EXISTS dsc_friendship CASCADE;