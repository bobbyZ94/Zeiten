export function getDatesInRange(startDate: any, endDate: any) {
	const date = new Date(startDate.getTime())
	const dates = []
	while (date <= endDate) {
		dates.push(new Date(date))
		date.setDate(date.getDate() + 1)
	}
	return dates
}
