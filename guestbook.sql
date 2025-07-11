-- DDL for Guestbook App

-- User Roles Enum Type
CREATE TYPE user_role AS ENUM ('SuperAdmin', 'AdminEvents');

-- Broadcast Template Type Enum
CREATE TYPE broadcast_type AS ENUM ('WhatsApp', 'Email');

-- Table: "USER"
CREATE TABLE "USER" (
    id VARCHAR(255) PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role user_role NOT NULL
);

-- Table: "EVENT"
CREATE TABLE "EVENT" (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
);

-- Table: "GUEST_CATEGORY"
CREATE TABLE "GUEST_CATEGORY" (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    event_id VARCHAR(255) REFERENCES "EVENT"(id) ON DELETE CASCADE NOT NULL
);

-- Table: "GUEST"
CREATE TABLE "GUEST" (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone_number VARCHAR(50),
    event_id VARCHAR(255) REFERENCES "EVENT"(id) ON DELETE CASCADE NOT NULL,
    guest_category_id VARCHAR(255) REFERENCES "GUEST_CATEGORY"(id) ON DELETE SET NULL,
    UNIQUE (email, event_id),
    UNIQUE (phone_number, event_id)
);

-- Table: "MESSAGE"
CREATE TABLE "MESSAGE" (
    id VARCHAR(255) PRIMARY KEY,
    content TEXT NOT NULL,
    "timestamp" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    approved BOOLEAN DEFAULT FALSE NOT NULL,
    guest_id VARCHAR(255) REFERENCES "GUEST"(id) ON DELETE CASCADE NOT NULL,
    event_id VARCHAR(255) REFERENCES "EVENT"(id) ON DELETE CASCADE NOT NULL
);

-- Table: "BROADCAST_TEMPLATE"
CREATE TABLE "BROADCAST_TEMPLATE" (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    "type" broadcast_type NOT NULL,
    content TEXT NOT NULL,
    event_id VARCHAR(255) REFERENCES "EVENT"(id) ON DELETE CASCADE NOT NULL
);

-- Table: "CLAIMABLE_ITEM"
CREATE TABLE "CLAIMABLE_ITEM" (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    total_quantity INT NOT NULL,
    remaining_quantity INT NOT NULL,
    event_id VARCHAR(255) REFERENCES "EVENT"(id) ON DELETE CASCADE NOT NULL
);

-- Table: "CLAIM_TRANSACTION"
CREATE TABLE "CLAIM_TRANSACTION" (
    id VARCHAR(255) PRIMARY KEY,
    "timestamp" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
    guest_id VARCHAR(255) REFERENCES "GUEST"(id) ON DELETE CASCADE NOT NULL,
    claimable_item_id VARCHAR(255) REFERENCES "CLAIMABLE_ITEM"(id) ON DELETE CASCADE NOT NULL,
    admin_id VARCHAR(255) REFERENCES "USER"(id) ON DELETE SET NULL
);

-- Table: "USER_EVENT_ASSOCIATION"
CREATE TABLE "USER_EVENT_ASSOCIATION" (
    user_id VARCHAR(255) REFERENCES "USER"(id) ON DELETE CASCADE NOT NULL,
    event_id VARCHAR(255) REFERENCES "EVENT"(id) ON DELETE CASCADE NOT NULL,
    PRIMARY KEY (user_id, event_id)
);

-- Indexes for performance
CREATE INDEX idx_guest_event_id ON "GUEST"(event_id);
CREATE INDEX idx_guest_category_id ON "GUEST"(guest_category_id);
CREATE INDEX idx_message_guest_id ON "MESSAGE"(guest_id);
CREATE INDEX idx_message_event_id ON "MESSAGE"(event_id);
CREATE INDEX idx_broadcast_template_event_id ON "BROADCAST_TEMPLATE"(event_id);
CREATE INDEX idx_claimable_item_event_id ON "CLAIMABLE_ITEM"(event_id);
CREATE INDEX idx_claim_transaction_guest_id ON "CLAIM_TRANSACTION"(guest_id);
CREATE INDEX idx_claim_transaction_claimable_item_id ON "CLAIM_TRANSACTION"(claimable_item_id);