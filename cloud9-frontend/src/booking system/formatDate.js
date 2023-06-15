// Convert datetime to human-readable format
const formatDate = (datetime) => {
    const startDate = new Date(datetime.start);
    const endDate = new Date(datetime.end);
    const options = {
    hour: "2-digit",
    minute: "2-digit",
    };

    return {
    date: startDate.toLocaleDateString(),
    startTime: startDate.toLocaleTimeString([], options),
    endTime: endDate.toLocaleTimeString([], options),
    };
};

export default formatDate;