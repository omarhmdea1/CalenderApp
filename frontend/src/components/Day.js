import dayjs from "dayjs";
import React, { useContext, useState, useEffect } from "react";
import GlobalContext from "../context/GlobalContext";

export default function Day({ day, rowIdx }) {
	const [dayEvents, setDayEvents] = useState([]);

	const { setDaySelected, setShowEventModal, events, setSelectedEvent } =
		useContext(GlobalContext);

	useEffect(() => {
		const Myevents = events.filter((evt) => {
			return (
				dayjs(evt.start).format("DD-MM-YY") ===
					day.format("DD-MM-YY") ||
				dayjs(evt.end).format("DD-MM-YY") === day.format("DD-MM-YY")
			);
		});

		setDayEvents(Myevents);
	}, [events, day]);

	function getCurrentDayClass() {
		return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
			? "bg-blue-600 text-white rounded-full w-7"
			: "";
	}
	return (
		<div className="border border-gray-200 flex flex-col">
			<header className="flex flex-col items-center">
				{rowIdx === 0 && (
					<p className="text-sm mt-1">
						{day.format("ddd").toUpperCase()}
					</p>
				)}
				<p
					className={`text-sm p-1 my-1 text-center  ${getCurrentDayClass()}`}
				>
					{day.format("DD")}
				</p>
			</header>
			<div
				className="flex-1 cursor-pointer scorllable"
				onClick={() => {
					setDaySelected(day);
					setShowEventModal(true);
				}}
			>
				{dayEvents.map((evt, idx) => (
					<div
						key={idx}
						onClick={() => setSelectedEvent(evt)}
						className={`bg-${evt.label}-200 p-1 mr-3 text-gray-600 text-sm rounded mb-1 truncate`}
					>
						{dayjs(evt.start).format("hh:mm")} {evt.title}
					</div>
				))}
			</div>
		</div>
	);
}
