-- CreateIndex
CREATE INDEX "BroadcastTemplate_eventId_idx" ON "BroadcastTemplate"("eventId");

-- CreateIndex
CREATE INDEX "BroadcastTemplate_type_idx" ON "BroadcastTemplate"("type");

-- CreateIndex
CREATE INDEX "BroadcastTemplate_name_idx" ON "BroadcastTemplate"("name");

-- CreateIndex
CREATE INDEX "ClaimTransaction_guestId_idx" ON "ClaimTransaction"("guestId");

-- CreateIndex
CREATE INDEX "ClaimTransaction_claimableItemId_idx" ON "ClaimTransaction"("claimableItemId");

-- CreateIndex
CREATE INDEX "ClaimTransaction_adminId_idx" ON "ClaimTransaction"("adminId");

-- CreateIndex
CREATE INDEX "ClaimTransaction_timestamp_idx" ON "ClaimTransaction"("timestamp");

-- CreateIndex
CREATE INDEX "ClaimableItem_eventId_idx" ON "ClaimableItem"("eventId");

-- CreateIndex
CREATE INDEX "ClaimableItem_remainingQuantity_idx" ON "ClaimableItem"("remainingQuantity");

-- CreateIndex
CREATE INDEX "Event_isActive_idx" ON "Event"("isActive");

-- CreateIndex
CREATE INDEX "Event_name_idx" ON "Event"("name");

-- CreateIndex
CREATE INDEX "Guest_eventId_idx" ON "Guest"("eventId");

-- CreateIndex
CREATE INDEX "Guest_guestCategoryId_idx" ON "Guest"("guestCategoryId");

-- CreateIndex
CREATE INDEX "Guest_status_idx" ON "Guest"("status");

-- CreateIndex
CREATE INDEX "Guest_whatsappStatus_idx" ON "Guest"("whatsappStatus");

-- CreateIndex
CREATE INDEX "Guest_isDeleted_idx" ON "Guest"("isDeleted");

-- CreateIndex
CREATE INDEX "Guest_createdAt_idx" ON "Guest"("createdAt");

-- CreateIndex
CREATE INDEX "Guest_name_idx" ON "Guest"("name");

-- CreateIndex
CREATE INDEX "Guest_email_idx" ON "Guest"("email");

-- CreateIndex
CREATE INDEX "Guest_phoneNumber_idx" ON "Guest"("phoneNumber");

-- CreateIndex
CREATE INDEX "GuestCategory_eventId_idx" ON "GuestCategory"("eventId");

-- CreateIndex
CREATE INDEX "GuestCategory_isActive_idx" ON "GuestCategory"("isActive");

-- CreateIndex
CREATE INDEX "GuestCategory_name_idx" ON "GuestCategory"("name");

-- CreateIndex
CREATE INDEX "Message_eventId_idx" ON "Message"("eventId");

-- CreateIndex
CREATE INDEX "Message_guestId_idx" ON "Message"("guestId");

-- CreateIndex
CREATE INDEX "Message_approved_idx" ON "Message"("approved");

-- CreateIndex
CREATE INDEX "Message_timestamp_idx" ON "Message"("timestamp");
