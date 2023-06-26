export const convertToRelativeTime = date => {
    const currentDate = new Date();
    const inputDate = new Date(date);
  
    const elapsed = currentDate.getTime() - inputDate.getTime();
  
    // Convert elapsed time to appropriate units
    const seconds = Math.floor(elapsed / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);
  
    if (years > 0) {
      return `${years} year${years === 1 ? '' : 's'} ago`;
    } else if (months > 0) {
      return `${months} month${months === 1 ? '' : 's'} ago`;
    } else if (days > 0) {
      return `${days} day${days === 1 ? '' : 's'} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours === 1 ? '' : 's'} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
    } else {
      return `less than a minute ago`;
    }
}
/*
INPUT: string => '2023-06-16T15:48:19.855Z'
OUTPUT: string => 'June 16,2023'

*/
export const convertTimeToDate = string =>{
  //use Date object
  const date = new Date(string);
  //define options 
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  //convert to desired format 
  const formattedDate = date.toLocaleDateString('en-US', options);

  return formattedDate 
}