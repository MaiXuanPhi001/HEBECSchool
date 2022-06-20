export const convertDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const day = date.getDate().toFixed(0).toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const hour = date.getHours().toString().padStart(2, "0");
    const minute = date.getMinutes().toString().padStart(2, "0");
 return `${hour}:${minute}, ${day}/${month}/${year}`;
}