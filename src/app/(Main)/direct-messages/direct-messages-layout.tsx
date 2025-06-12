"use client";

import { useState } from "react";
import { DMChatArea } from "./dm-chat-area";
import { DMSidebar } from "./dm-sidebar";

export function DirectMessagesLayout() {
	const [selectedDM, setSelectedDM] = useState<number | null>(null);

	return (
		<div className="flex-1 flex bg-[#1e1f22] text-white min-h-0 ">
			<DMSidebar SelectedDM={selectedDM} onSelectDM={setSelectedDM} />
			<DMChatArea selectedDM={selectedDM} />
		</div>
	);
}
