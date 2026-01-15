
function getDeliverydate(days: string): string {
    if (days !== '') {
        const current_date = new Date()
        const num_deliverydate = days.split(',').map((day => dayToNumber(day)))
        const num_currentdate = current_date.getDay()
        const x = getdelivery(num_deliverydate, num_currentdate)
        const y = current_date.getDate()
        const future_date = new Date()
        future_date.setDate(x + y)
        return future_date.toLocaleDateString()
    }
    else return '(date not yet fixed)'
}

function dayToNumber(day: string): number {
    const map: Record<string, number> = {
        sunday: 0,
        monday: 1,
        tuesday: 2,
        wednesday: 3,
        thursday: 4,
        friday: 5,
        saturday: 6
    };
    return map[day.toLocaleLowerCase()];
}

function getdelivery(deliverydays: number[], currentday: number): number {
    if (Math.max(...deliverydays) <= currentday) {
        const days_to_go = (6 - currentday) + (1 + Math.min(...deliverydays))
        return days_to_go
    }
    else {
        const next_day = deliverydays
            .filter((days) => {
                if (days > currentday && days - currentday !== 1) {
                    return days
                }
            })
            .sort((a, b) => a - b)[0]
        if (next_day === undefined) {
            return (6 - currentday) + (1 + Math.min(...deliverydays))
        }
        else return next_day - currentday
    }
}
export default getDeliverydate